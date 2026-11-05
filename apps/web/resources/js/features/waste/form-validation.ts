export function formErrors(form: HTMLFormElement): string[] {
    const errors: string[] = [];
    for (const element of Array.from(form.elements)) {
        if (
            !(
                element instanceof HTMLInputElement ||
                element instanceof HTMLTextAreaElement ||
                element instanceof HTMLSelectElement
            ) ||
            !element.willValidate
        )
            continue;
        const label = element.labels?.[0]?.textContent?.trim() || element.name;
        const value =
            element instanceof HTMLInputElement && element.type === "password"
                ? element.value
                : element.value.trim();
        if (element.required && !value) errors.push(`${label} wajib diisi.`);
        else if (value) {
            if (element.validity.typeMismatch)
                errors.push(`${label} harus memiliki format yang valid.`);
            if (
                element.validity.badInput ||
                element.validity.rangeOverflow ||
                element.validity.rangeUnderflow
            )
                errors.push(`${label} berada di luar rentang yang diizinkan.`);
            if (
                element instanceof HTMLInputElement ||
                element instanceof HTMLTextAreaElement
            ) {
                if (element.minLength > 0 && value.length < element.minLength)
                    errors.push(
                        `${label} minimal ${element.minLength} karakter.`,
                    );
                if (element.maxLength > 0 && value.length > element.maxLength)
                    errors.push(
                        `${label} maksimal ${element.maxLength} karakter.`,
                    );
            }
        }
        if (element instanceof HTMLInputElement && element.type === "file") {
            for (const file of Array.from(element.files ?? [])) {
                if (
                    !["image/jpeg", "image/png", "image/webp"].includes(
                        file.type,
                    )
                )
                    errors.push("Foto harus berupa JPEG, PNG, atau WebP.");
                if (file.size > 5 * 1024 * 1024)
                    errors.push("Ukuran foto maksimal 5 MB.");
            }
        }
    }
    const data = new FormData(form);
    if (
        data.has("password_confirmation") &&
        data.get("password") !== data.get("password_confirmation")
    )
        errors.push("Konfirmasi kata sandi tidak sesuai.");
    return [...new Set(errors)];
}
