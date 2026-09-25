const form = document.querySelector("#contact-form");

if (form) {
    const fields = {
        name: {
            input: document.querySelector("#name"),
            error: document.querySelector("#name-error"),
        },
        email: {
            input: document.querySelector("#email"),
            error: document.querySelector("#email-error"),
        },
        message: {
            input: document.querySelector("#message"),
            error: document.querySelector("#message-error"),
        },
    };

    const status = document.querySelector("#form-status");

    function clearErrors() {
        Object.values(fields).forEach(({ input, error }) => {
            error.textContent = "";
            input.removeAttribute("aria-invalid");
        });

        status.textContent = "";
    }

    function validate() {
        clearErrors();

        let valid = true;

        if (!fields.name.input.value.trim()) {
            fields.name.error.textContent = "Please enter your name.";
            fields.name.input.setAttribute("aria-invalid", "true");
            valid = false;
        }

        const email = fields.email.input.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            fields.email.error.textContent = "Please enter your email.";
            fields.email.input.setAttribute("aria-invalid", "true");
            valid = false;
        } else if (!emailPattern.test(email)) {
            fields.email.error.textContent =
                "Please enter a valid email address.";
            fields.email.input.setAttribute("aria-invalid", "true");
            valid = false;
        }

        if (!fields.message.input.value.trim()) {
            fields.message.error.textContent =
                "Please enter a message.";
            fields.message.input.setAttribute("aria-invalid", "true");
            valid = false;
        }

        return valid;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!validate()) {
            status.textContent = "Please correct the highlighted fields.";
            return;
        }

        status.textContent =
            "Message validated successfully. No backend is connected.";

        form.reset();
    });
}