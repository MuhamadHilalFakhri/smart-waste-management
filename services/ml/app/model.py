import json
from pathlib import Path
import numpy as np
from PIL import Image, ImageOps
class Classifier:
    def __init__(self, directory):
        self.model = None
        self.metadata = None
        path = Path(directory)
        if (path / 'model.keras').is_file() and (path / 'metadata.json').is_file():
            from tensorflow.keras.models import load_model
            self.metadata = json.loads((path / 'metadata.json').read_text())
            if self.metadata['labels'] != ['organic', 'paper', 'plastic']:
                raise ValueError('Urutan label model tidak sesuai kontrak.')
            self.model = load_model(path / 'model.keras', compile=False)
    def predict(self, image):
        image = ImageOps.exif_transpose(image).convert('RGB').resize((224,224), Image.Resampling.BILINEAR)
        batch = np.asarray(image, dtype=np.float32)[None, ...]
        scores = self.model(batch, training=False).numpy()[0]
        index = int(np.argmax(scores))
        return {'label': self.metadata['labels'][index], 'confidence': float(scores[index]),
                'probabilities': dict(zip(self.metadata['labels'], map(float, scores))),
                'model_version': self.metadata['version']}
