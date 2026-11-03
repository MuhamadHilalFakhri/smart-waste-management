import { Head, Link, useForm } from "@inertiajs/react";
import {
    Droplet,
    Lock,
    Mail,
    type LucideIcon,
} from "lucide-react";
import type { InputHTMLAttributes } from "react";
import "./login.css";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    icon: LucideIcon;
    id: string;
    error?: string;
};

function Field({ label, icon: Icon, id, error, ...props }: FieldProps) {
    return (
        <div className="login-field">
            <label htmlFor={id}>{label}</label>
            <div className={`login-input${error ? " login-input-error" : ""}`}>
                <Icon size={18} aria-hidden="true" />
                <span className="login-input-divider" aria-hidden="true" />
                <input
                    {...props}
                    id={id}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                />
            </div>
            {error && (
                <p id={`${id}-error`} className="login-error" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}

export default function Login({
    canResetPassword = false,
    status,
}: {
    canResetPassword?: boolean;
    status?: string;
}) {
    const form = useForm({ email: "", password: "", remember: true });

    return (
        <div className="smart-login">
            <Head title="Masuk · Smart Waste">
                <meta
                    name="description"
                    content="Masuk untuk membuat laporan sampah dan memantau penanganannya."
                />
            </Head>
            <aside className="login-story" aria-label="Tentang Smart Waste">
                <div className="login-story-copy">
                    <h2>
                        Lingkungan bersih.
                        <br />
                        Mulai dari laporan Anda.
                    </h2>
                    <p>
                        Catat lokasi dan foto sampah, lalu ikuti perkembangan
                        laporan Anda dalam satu tempat.
                    </p>
                </div>
            </aside>

            <main className="login-content">
                <form
                    className="login-form"
                    onSubmit={(event) => {
                        event.preventDefault();
                        form.post("/login", {
                            onFinish: () => form.reset("password"),
                        });
                    }}
                    aria-labelledby="login-title"
                >
                    <div className="login-intro">
                        <Droplet
                            className="login-mark"
                            size={42}
                            aria-hidden="true"
                        />

                        <h1 id="login-title">Selamat datang kembali</h1>
                    </div>
                    {status && (
                        <p className="login-status" role="status">
                            {status}
                        </p>
                    )}
                    <Field
                        id="email"
                        name="email"
                        label="Email"
                        icon={Mail}
                        type="email"
                        inputMode="email"
                        autoComplete="username"
                        placeholder="nama@email.com"
                        value={form.data.email}
                        onChange={(event) =>
                            form.setData("email", event.target.value)
                        }
                        error={form.errors.email}
                        disabled={form.processing}
                        required
                    />
                    <Field
                        id="password"
                        name="password"
                        label="Kata sandi"
                        icon={Lock}
                        type="password"
                        autoComplete="current-password"
                        placeholder="Masukkan kata sandi"
                        value={form.data.password}
                        onChange={(event) =>
                            form.setData("password", event.target.value)
                        }
                        error={form.errors.password}
                        disabled={form.processing}
                        required
                    />
                    <label className="login-remember">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={form.data.remember}
                            onChange={(event) =>
                                form.setData("remember", event.target.checked)
                            }
                            disabled={form.processing}
                        />
                        <span>Ingat saya</span>
                    </label>
                    <button
                        className="login-submit"
                        disabled={form.processing}
                        aria-busy={form.processing}
                    >
                        {form.processing ? "Memproses..." : "Masuk"}
                    </button>
                </form>
                <footer className="login-footer">
                    {canResetPassword && (
                        <Link href="/forgot-password">Lupa kata sandi?</Link>
                    )}
                    <p>Smart Waste · Catat sampah dan pantau penanganannya.</p>
                </footer>
            </main>
        </div>
    );
}
