

document.addEventListener("DOMContentLoaded", () => {
    console.log("Application JavaScript démarrée.");

    const path = window.location.pathname;
    document.querySelectorAll("nav a").forEach(link => {
        if (link.getAttribute("href") === path) {
            link.classList.add("active-link");
        }
    });
});

function afficherMessage(texte, couleur = "red") {
    const messageDiv = document.getElementById("message");
    if (messageDiv) {
        messageDiv.textContent = texte;
        messageDiv.style.color = couleur;
        messageDiv.style.display = "block";
    }
}
