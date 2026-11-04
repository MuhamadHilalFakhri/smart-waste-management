import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Platform, View } from "react-native";
import { baseUrl } from "../../api";
import { s } from "./styles";
import { Text } from "./typography";
import { colors } from "./theme";

export function ProtectedPhoto({
  id,
  token,
}: {
  id: number;
  token: string | null;
}) {
  const endpoint = `${baseUrl}/reports/${id}/photo`;
  const [uri, setUri] = useState<string>();
  const [error, setError] = useState(false);
  useEffect(() => {
    if (Platform.OS !== "web") return;
    const controller = new AbortController();
    let objectUrl: string | undefined;
    fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Foto tidak dapat dimuat.");
        return response.blob();
      })
      .then((blob) => {
        if (controller.signal.aborted) return;
        objectUrl = URL.createObjectURL(blob);
        setUri(objectUrl);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [endpoint, token]);
  if (error)
    return (
      <View style={[s.photo, { justifyContent: "center", padding: 16 }]}>
        <Text style={s.sub}>
          Foto tidak dapat dimuat. Buka ulang detail laporan untuk mencoba lagi.
        </Text>
      </View>
    );
  if (Platform.OS === "web" && !uri)
    return (
      <View style={[s.photo, { justifyContent: "center" }]}>
        <ActivityIndicator
          accessibilityLabel="Memuat foto"
          color={colors.brand}
        />
      </View>
    );
  return (
    <Image
      accessibilityLabel="Foto sampah pada laporan"
      source={
        Platform.OS === "web"
          ? { uri }
          : { uri: endpoint, headers: { Authorization: `Bearer ${token}` } }
      }
      style={s.photo}
      onError={() => setError(true)}
    />
  );
}
