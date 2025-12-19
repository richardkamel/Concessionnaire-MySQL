document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email.value, password: password.value })
        });

        const result = await response.json();

        if (result.success) {
            afficherMessage(`Bienvenue, ${result.prenom} ${result.nom} !`, "green");
            setTimeout(() => window.location.href = "/dashboard", 1500);
        } else {
            afficherMessage(result.message, "red");
        }
    });
});
