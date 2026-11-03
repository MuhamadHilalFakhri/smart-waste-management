import argparse, csv, json, hashlib
from pathlib import Path
import numpy as np
import tensorflow as tf
from PIL import Image, ImageOps
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    ConfusionMatrixDisplay,
)
from sklearn.utils.class_weight import compute_class_weight
import matplotlib.pyplot as plt

LABELS = ["organic", "paper", "plastic"]


def run(root, output):
    tf.keras.utils.set_random_seed(42)
    root, output = Path(root), Path(output)
    output.mkdir(parents=True, exist_ok=True)
    rows = list(csv.DictReader((root / "manifest.csv").open()))

    def dataset(split, training=False):
        subset = [r for r in rows if r["split"] == split]

        def generate():
            for r in subset:
                with Image.open(root / r["path"]) as im:
                    im = (
                        ImageOps.exif_transpose(im)
                        .convert("RGB")
                        .resize((224, 224), Image.Resampling.BILINEAR)
                    )
                    yield np.asarray(im, dtype=np.float32), LABELS.index(r["label"])

        ds = tf.data.Dataset.from_generator(
            generate,
            output_signature=(
                tf.TensorSpec((224, 224, 3), tf.float32),
                tf.TensorSpec((), tf.int32),
            ),
        )
        if training:
            ds = ds.shuffle(len(subset), seed=42)
        return ds.batch(32).prefetch(tf.data.AUTOTUNE)

    inputs = tf.keras.Input((224, 224, 3))
    x = tf.keras.layers.RandomFlip("horizontal")(inputs)
    x = tf.keras.layers.RandomRotation(0.08)(x)
    x = tf.keras.layers.Rescaling(1.0 / 127.5, offset=-1)(x)
    base = tf.keras.applications.MobileNetV2(
        include_top=False, weights="imagenet", input_shape=(224, 224, 3)
    )
    base.trainable = False
    x = base(x, training=False)
    x = tf.keras.layers.GlobalAveragePooling2D()(x)
    x = tf.keras.layers.Dropout(0.25)(x)
    model = tf.keras.Model(inputs, tf.keras.layers.Dense(3, activation="softmax")(x))
    y = np.array([LABELS.index(r["label"]) for r in rows if r["split"] == "train"])
    weights = dict(
        enumerate(compute_class_weight("balanced", classes=np.arange(3), y=y))
    )
    callbacks = [
        tf.keras.callbacks.EarlyStopping(patience=5, restore_best_weights=True),
        tf.keras.callbacks.ModelCheckpoint(
            str(output / "model.keras"), save_best_only=True
        ),
    ]
    model.compile(
        optimizer=tf.keras.optimizers.Adam(1e-3),
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"],
    )
    head = model.fit(
        dataset("train", True),
        validation_data=dataset("validation"),
        epochs=15,
        class_weight=weights,
        callbacks=callbacks,
    )
    base.trainable = True
    for layer in base.layers[:-30]:
        layer.trainable = False
    model.compile(
        optimizer=tf.keras.optimizers.Adam(1e-5),
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"],
    )
    fine = model.fit(
        dataset("train", True),
        validation_data=dataset("validation"),
        epochs=20,
        class_weight=weights,
        callbacks=callbacks,
    )
    model = tf.keras.models.load_model(output / "model.keras")
    truth = np.array([LABELS.index(r["label"]) for r in rows if r["split"] == "test"])
    prediction = np.argmax(model.predict(dataset("test")), axis=1)
    accuracy = float(accuracy_score(truth, prediction))
    report = classification_report(
        truth,
        prediction,
        labels=[0, 1, 2],
        target_names=LABELS,
        output_dict=True,
        zero_division=0,
    )
    (output / "evaluation.json").write_text(
        json.dumps(
            {
                "accuracy": accuracy,
                "target_met": accuracy >= 0.8,
                "classification_report": report,
                "confusion_matrix": confusion_matrix(truth, prediction).tolist(),
            },
            indent=2,
        )
    )
    ConfusionMatrixDisplay.from_predictions(truth, prediction, display_labels=LABELS)
    plt.tight_layout()
    plt.savefig(output / "confusion-matrix.png")
    plt.close()
    for metric in ["accuracy", "loss"]:
        plt.plot(head.history[metric] + fine.history[metric], label="training")
        plt.plot(
            head.history["val_" + metric] + fine.history["val_" + metric],
            label="validation",
        )
        plt.legend()
        plt.savefig(output / (metric + ".png"))
        plt.close()
    checksum = hashlib.sha256((output / "model.keras").read_bytes()).hexdigest()
    (output / "metadata.json").write_text(
        json.dumps(
            {
                "version": checksum[:12],
                "sha256": checksum,
                "labels": LABELS,
                "input_size": [224, 224],
                "preprocessing": "RGB, EXIF transpose, bilinear resize; normalization embedded",
            },
            indent=2,
        )
    )
    print("Testing accuracy:", accuracy)


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--root", default="ml/data")
    p.add_argument("--output", default="ml/artifacts")
    a = p.parse_args()
    run(a.root, a.output)
