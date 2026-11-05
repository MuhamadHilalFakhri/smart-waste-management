import { useForm, Link } from "@inertiajs/react";
import "./waste.css";
import "./styles/tokens.css";
import { useConfirmation } from "./use-confirmation";
export default function Auth({ register = false }: { register?: boolean }) {
    const confirmation = useConfirmation();
    const form = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        remember: false,
    });
    return (
        <div className="waste">
            <header>
                <div className="brand">
                    Smart Waste<span>Pengelolaan laporan sampah</span>
                </div>
            </header>
            <main style={{ maxWidth: 500 }}>
                <p className="eyebrow">RUANG PELAPOR DAN ADMIN</p>
                <h1>{register ? "Buat akun pelapor" : "Masuk ke akun"}</h1>
                <p className="muted" style={{ margin: "12px 0 24px" }}>
                    Laporkan sampah dan pantau proses penanganannya.
                </p>
                <form
                    noValidate
                    className="panel"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (form.processing) return;
                        const submit = () =>
                            form.post(register ? "/register" : "/login", {
                                onError: (errors) =>
                                    confirmation.show(
                                        Object.values(errors).join("\n"),
                                    ),
                            });
                        if (register)
                            confirmation.ask(
                                "Buat akun pelapor menggunakan data yang telah diisi?",
                                submit,
                                e.currentTarget,
                            );
                        else submit();
                    }}
                >
                    {Object.entries(form.errors).map(([k, v]) => (
                        <p key={k} role="alert" className="error">
                            {v}
                        </p>
                    ))}
                    {register && (
                        <label>
                            Nama
                            <input
                                name="name"
                                maxLength={100}
                                value={form.data.name}
                                onChange={(e) =>
                                    form.setData("name", e.target.value)
                                }
                                required
                                autoComplete="name"
                            />
                        </label>
                    )}
                    <label>
                        Email
                        <input
                            name="email"
                            type="email"
                            value={form.data.email}
                            onChange={(e) =>
                                form.setData("email", e.target.value)
                            }
                            required
                            autoComplete="email"
                        />
                    </label>
                    <label>
                        Kata sandi
                        <input
                            name="password"
                            minLength={register ? 8 : undefined}
                            type="password"
                            value={form.data.password}
                            onChange={(e) =>
                                form.setData("password", e.target.value)
                            }
                            required
                            autoComplete={
                                register ? "new-password" : "current-password"
                            }
                        />
                    </label>
                    {register && (
                        <label>
                            Konfirmasi kata sandi
                            <input
                                name="password_confirmation"
                                type="password"
                                value={form.data.password_confirmation}
                                onChange={(e) =>
                                    form.setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                required
                                autoComplete="new-password"
                            />
                        </label>
                    )}
                    <button
                        disabled={form.processing}
                        style={{ width: "100%" }}
                    >
                        {form.processing
                            ? "Memproses..."
                            : register
                              ? "Daftar sebagai pelapor"
                              : "Masuk"}
                    </button>
                </form>
                <Link href={register ? "/login" : "/register"}>
                    {register
                        ? "Sudah punya akun? Masuk"
                        : "Belum punya akun? Daftar"}
                </Link>
            </main>
            {confirmation.dialog}
        </div>
    );
}
