import argparse, csv, hashlib, zipfile, urllib.request
from pathlib import Path
from PIL import Image, ImageOps
import imagehash
from sklearn.model_selection import train_test_split

SOURCE = "https://archive.ics.uci.edu/static/public/908/realwaste.zip"
MAPPING = {
    "Food Organics": "organic",
    "Vegetation": "organic",
    "Paper": "paper",
    "Plastic": "plastic",
}


def prepare(root):
    root = Path(root)
    root.mkdir(parents=True, exist_ok=True)
    archive = root / "realwaste.zip"
    if not archive.exists():
        urllib.request.urlretrieve(SOURCE, archive)
    with zipfile.ZipFile(archive) as z:
        for info in z.infolist():
            target = (root / info.filename).resolve()
            if not target.is_relative_to(root.resolve()):
                raise ValueError("Unsafe archive path")
        z.extractall(root)
    rows, seen, hashes = [], set(), set()
    for path in sorted(root.rglob("*")):
        label = MAPPING.get(path.parent.name)
        if not label or path.suffix.lower() not in (".jpg", ".jpeg", ".png"):
            continue
        try:
            with Image.open(path) as image:
                image = ImageOps.exif_transpose(image).convert("RGB")
                sha = hashlib.sha256(image.tobytes()).hexdigest()
                phash = imagehash.phash(image)
                if sha in seen or any(phash - h <= 4 for h in hashes):
                    continue
                seen.add(sha)
                hashes.add(phash)
            rows.append(
                {
                    "path": str(path.relative_to(root)),
                    "label": label,
                    "sha256": sha,
                    "source": SOURCE,
                }
            )
        except (OSError, ValueError):
            continue
    train, rest = train_test_split(
        rows, test_size=0.30, stratify=[x["label"] for x in rows], random_state=42
    )
    val, test = train_test_split(
        rest, test_size=0.50, stratify=[x["label"] for x in rest], random_state=42
    )
    with (root / "manifest.csv").open("w", newline="") as f:
        writer = csv.DictWriter(
            f, fieldnames=["path", "label", "sha256", "source", "split"]
        )
        writer.writeheader()
        for split, data in [("train", train), ("validation", val), ("test", test)]:
            for row in data:
                writer.writerow({**row, "split": split})
    print(
        {k: len(v) for k, v in [("train", train), ("validation", val), ("test", test)]}
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", default="ml/data")
    prepare(parser.parse_args().root)
