from password_utils import hash_password
import mysql.connector
from faker import Faker
import random


conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="Concessionnaire"
)
cursor = conn.cursor()

faker = Faker(locale='fr_CA')

vehicules_vendus_ids = random.sample(range(1, 101), 60)

# Fournisseurs
for i in range(1, 11):
    cursor.execute("""
        INSERT INTO Fournisseur (idFournisseur, nom, adresse, contact, specialite)
        VALUES (%s, %s, %s, %s, %s)
    """, (
        i,
        faker.company(),
        faker.address().replace("\n", ", "),
        faker.phone_number(),
        random.choice(['Pneus', 'Freins', 'Filtres', 'Huile'])
    ))

# Véhicules
for i in range(1, 101):
    statut = 'vendu' if i in vehicules_vendus_ids else 'disponible'
    cursor.execute("""
        INSERT INTO Vehicule (idVehicule, marque, modele, annee, kilometrage, prix, statut, idFournisseur)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        i,
        random.choice(['Toyota', 'Ford', 'Honda']),
        random.choice(['Civic', 'Corolla', 'Focus']),
        random.randint(2005, 2023),
        random.randint(30000, 200000),
        round(random.uniform(3000, 25000), 2),
        statut,
        random.randint(1, 10)
    ))

# Clients
for i in range(1, 101):
    cursor.execute("""
        INSERT INTO Client (idClient, nom, prenom, email, telephone)
        VALUES (%s, %s, %s, %s, %s)
    """, (
        i,
        faker.last_name(),
        faker.first_name(),
        faker.email(),
        faker.phone_number()[:20]
    ))

# Employés
employes = []
for i in range(1, 21):
    poste = random.choice(['vendeur', 'mecanicien'])
    password_clair = faker.password(length=10)
    password = hash_password(password_clair)
    email = faker.email()

    print(f"EMAIL TEST: {email} | MOT DE PASSE: {password_clair}")

    employes.append({'id': i, 'poste': poste})
    cursor.execute("""
        INSERT INTO Employe (idEmploye, nom, prenom, poste, email, password)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        i,
        faker.last_name(),
        faker.first_name(),
        poste,
        email,
        password
    ))



# Ventes
vendeurs_ids = [e['id'] for e in employes if e['poste'] == 'vendeur']
for i in range(1, 61):
    cursor.execute("""
        INSERT INTO Vente (idVente, idVehicule, idClient, idEmploye, dateVente, prixVente)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        i,
        vehicules_vendus_ids[i - 1],
        random.randint(1, 100),
        random.choice(vendeurs_ids),
        faker.date_between(start_date='-2y', end_date='today'),
        round(random.uniform(5000, 25000), 2)
    ))

# Entretiens
mecaniciens_ids = [e['id'] for e in employes if e['poste'] == 'mecanicien']
for i in range(1, 61):
    cursor.execute("""
        INSERT INTO Entretien (idEntretien, idVehicule, idEmploye, date, typeEntretien, cout, description)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (
        i,
        random.randint(1, 100),
        random.choice(mecaniciens_ids),
        faker.date_between(start_date='-2y', end_date='today'),
        random.choice(['Vidange', 'Freins', 'Diagnostic', 'Pneus']),
        round(random.uniform(100, 1000), 2),
        faker.sentence().replace("'", "")
    ))

# Sauvegarder
conn.commit()
cursor.close()
conn.close()
