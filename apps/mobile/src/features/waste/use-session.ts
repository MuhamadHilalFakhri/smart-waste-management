import { router } from "expo-router";
import * as SecureStore from "../../storage";
import { useEffect, useState } from "react";
import { api } from "../../api";
export function useSession() {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  useEffect(() => {
    SecureStore.getItemAsync("token")
      .then(setToken)
      .finally(() => setReady(true));
  }, []);
  async function auth() {
    const result = await api<{ token: string }>(
      register ? "register" : "login",
      {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: confirmation,
        }),
      },
    );
    await SecureStore.setItemAsync("token", result.token);
    setToken(result.token);
    setPassword("");
    setConfirmation("");
  }
  async function logout() {
    try {
      await api("logout", { method: "POST" });
    } finally {
      await SecureStore.deleteItemAsync("token");
      setToken(null);
      router.replace("/");
    }
  }
  return {
    token,
    ready,
    register,
    setRegister,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmation,
    setConfirmation,
    auth,
    logout,
  };
}
