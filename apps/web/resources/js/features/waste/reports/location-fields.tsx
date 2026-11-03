import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextField, Notice } from "../common";
import type { Report } from "../api";
export default function LocationFields({ report }: { report?: Report }) {
    const [latitude, setLatitude] = useState(report?.latitude ?? "");
    const [longitude, setLongitude] = useState(report?.longitude ?? "");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    function locate() {
        setError("");
        if (!navigator.geolocation) {
            setError(
                "Browser tidak mendukung lokasi. Isi koordinat secara manual.",
            );
            return;
        }
        setBusy(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(String(position.coords.latitude));
                setLongitude(String(position.coords.longitude));
                setBusy(false);
            },
            () => {
                setBusy(false);
                setError(
                    "Lokasi gagal diperoleh. Aktifkan izin lokasi atau isi koordinat secara manual.",
                );
            },
            { enableHighAccuracy: true, timeout: 15000 },
        );
    }
    return (
        <>
            <div className="sw-form-grid">
                <TextField
                    label="Latitude"
                    id="latitude"
                    name="latitude"
                    type="number"
                    step="any"
                    min={-90}
                    max={90}
                    required
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                />
                <TextField
                    label="Longitude"
                    id="longitude"
                    name="longitude"
                    type="number"
                    step="any"
                    min={-180}
                    max={180}
                    required
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                />
            </div>
            <Button
                type="button"
                variant="outline"
                disabled={busy}
                onClick={locate}
            >
                <MapPin />
                {busy ? "Mengambil lokasi…" : "Gunakan lokasi saat ini"}
            </Button>
            <Notice error={error} />
        </>
    );
}
