# serveur.py
from flask import Flask, request, render_template
import mysql.connector
from password_utils import verify_password
from flask import jsonify


# Déclaration de l'application Flask
app = Flask(__name__, template_folder="../frontend/templates", static_folder="../frontend/static")

# Connexion à la base de données MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="Concessionnaire"
)

# Création d'un curseur avec les résultats sous forme de dictionnaire
cursor = conn.cursor(dictionary=True)

# Route pour la page de connexion
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # Récupération des données envoyées par l'utilisateur
        email = request.form.get("email")
        password = request.form.get("password")

        try:
            # Requête SQL pour récupérer l'employé correspondant à l'email
            cursor.execute("SELECT * FROM Employe WHERE email = %s", (email,))
            employe = cursor.fetchone()

            # Vérification du mot de passe haché
            if employe and verify_password(password, employe["password"]):
                return f"Bienvenue, {employe['prenom']} {employe['nom']}!"
            else:
                return "Connexion échouée. Vérifie tes identifiants."

        except mysql.connector.Error as err:
            # Gestion des erreurs de base de données
            return f"Erreur lors de la connexion à la base de données : {err}"

    # Si la méthode est GET, on retourne simplement le formulaire de connexion
    return render_template("login.html")


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/vehicules")
def vehicules():
    filtre = request.args.get("filtre")  # récupère ce que l'utilisateur a tapé
    try:
        if filtre:
            cursor.execute("""
                SELECT * FROM Vehicule
                WHERE marque LIKE %s OR modele LIKE %s
            """, (f"%{filtre}%", f"%{filtre}%"))
        else:
            cursor.execute("SELECT * FROM Vehicule")
        vehicules = cursor.fetchall()
    except mysql.connector.Error as err:
        return f"Erreur BD : {err}"

    return render_template("vehicules.html", vehicules=vehicules)


@app.route("/clients")
def clients():
    filtre = request.args.get("filtre")
    try:
        if filtre:
            cursor.execute("""
                SELECT * FROM Client
                WHERE nom LIKE %s OR prenom LIKE %s
            """, (f"%{filtre}%", f"%{filtre}%"))
        else:
            cursor.execute("SELECT * FROM Client")
        clients = cursor.fetchall()
    except mysql.connector.Error as err:
        return f"Erreur lors de l'accès aux clients : {err}"

    return render_template("clients.html", clients=clients)


@app.route("/ventes")
def ventes():
    try:
        cursor.execute("""
            SELECT v.idVente, ve.marque, ve.modele, c.nom AS nomClient, e.nom AS nomEmploye, v.dateVente, v.prixVente
            FROM Vente v
            JOIN Vehicule ve ON v.idVehicule = ve.idVehicule
            JOIN Client c ON v.idClient = c.idClient
            JOIN Employe e ON v.idEmploye = e.idEmploye
        """)
        ventes = cursor.fetchall()
    except mysql.connector.Error as err:
        return f"Erreur lors de l'accès aux ventes : {err}"

    return render_template("ventes.html", ventes=ventes)


@app.route("/entretiens", methods=["GET", "POST"])
def entretiens():
    message = None
    couleur = "black"

    if request.method == "POST":
        vehicule_id = request.form.get("vehicule")
        type_entretien = request.form.get("type")
        date = request.form.get("date")
        cout = request.form.get("cout")

        # Validation du coût
        try:
            cout_val = float(cout)
            if cout_val <= 0:
                message = "Le cout doit etre un nombre positif."
                couleur = "red"
                raise ValueError
        except:
            if not message:
                message = "Cout invalide."
                couleur = "red"
            return render_template("entretiens.html", entretiens=get_entretiens(), message=message, couleur=couleur)

        # Validation de la date
        if not date:
            message = "La date est requise."
            couleur = "red"
            return render_template("entretiens.html", entretiens=get_entretiens(), message=message, couleur=couleur)

        # Tentative d'insertion
        try:
            cursor.execute("""
                INSERT INTO Entretien (idVehicule, idEmploye, date, typeEntretien, cout, description)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (
                vehicule_id,
                1,
                date,
                type_entretien,
                cout,
                "Ajouté via formulaire"
            ))
            conn.commit()
            message = "Entretien ajouté avec succès."
            couleur = "green"
        except mysql.connector.Error as err:
            if err.errno == 1452:
                message = "Véhicule invalide"
            else:
                message = f"Erreur lors de l'ajout : {err.msg}"
            couleur = "red"

    # Partie GET ou après soumission
    return render_template("entretiens.html", entretiens=get_entretiens(), message=message, couleur=couleur)


# Petite fonction utilitaire pour charger les entretiens
def get_entretiens():
    cursor.execute("""
        SELECT e.idEntretien, v.marque, v.modele, e.date, e.typeEntretien, e.cout
        FROM Entretien e
        JOIN Vehicule v ON e.idVehicule = v.idVehicule
    """)
    return cursor.fetchall()



@app.route("/api/login", methods=["POST"])
def api_login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    cursor.execute("SELECT * FROM Employe WHERE email = %s", (email,))
    employe = cursor.fetchone()

    if employe and verify_password(password, employe["password"]):
        return jsonify(success=True, prenom=employe["prenom"], nom=employe["nom"])
    else:
        return jsonify(success=False, message="Identifiants invalides.")


# Démarrage
if __name__ == "__main__":
    app.run(debug=True)
