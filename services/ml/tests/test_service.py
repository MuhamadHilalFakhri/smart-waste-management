import os

os.environ.setdefault("ML_TOKEN", "test-service-token-123456")
os.environ["MODEL_DIR"] = "/tmp/nonexistent-smart-waste-model"
import unittest
import numpy as np
from PIL import Image
from fastapi.testclient import TestClient
from app.main import app
from app.model import Classifier


class ServiceTests(unittest.TestCase):
    def test_health_and_missing_model(self):
        with TestClient(app) as client:
            self.assertEqual(client.get("/health").status_code, 200)
            self.assertEqual(client.get("/ready").status_code, 503)
            response = client.post(
                "/predict",
                headers={"Authorization": "Bearer " + os.environ["ML_TOKEN"]},
                files={"file": ("test.jpg", b"invalid", "image/jpeg")},
            )
            self.assertEqual(response.status_code, 503)

    def test_wrong_token_is_rejected(self):
        with TestClient(app) as client:
            response = client.post(
                "/predict",
                headers={"Authorization": "Bearer wrong"},
                files={"file": ("test.jpg", b"invalid", "image/jpeg")},
            )
            self.assertEqual(response.status_code, 401)

    def test_preprocessing_and_label_contract(self):
        classifier = Classifier("/tmp/nonexistent-smart-waste-model")

        class Output:
            def numpy(self):
                return np.array([[0.1, 0.2, 0.7]])

        class Model:
            def __call__(self, batch, training=False):
                assert batch.shape == (1, 224, 224, 3)
                assert batch.dtype == np.float32
                assert batch.min() >= 0 and batch.max() <= 255
                return Output()

        classifier.model = Model()
        classifier.metadata = {
            "labels": ["organic", "paper", "plastic"],
            "version": "test",
        }
        result = classifier.predict(Image.new("RGB", (300, 100), "white"))
        self.assertEqual(result["label"], "plastic")
        self.assertAlmostEqual(result["confidence"], 0.7)


if __name__ == "__main__":
    unittest.main()
