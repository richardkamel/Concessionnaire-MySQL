-- Création de la base de données
DROP DATABASE IF EXISTS Concessionnaire;
CREATE DATABASE Concessionnaire;
USE Concessionnaire;

-- Table Fournisseur
CREATE TABLE Fournisseur (
    idFournisseur INT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    adresse VARCHAR(255),
    contact VARCHAR(100),
    specialite VARCHAR(100)
);

-- Table Vehicule
CREATE TABLE Vehicule (
    idVehicule INT PRIMARY KEY,
    marque VARCHAR(50) NOT NULL,
    modele VARCHAR(50) NOT NULL,
    annee INT CHECK (annee >= 1900 AND annee <= 2025),
    kilometrage INT,
    prix DECIMAL(10,2),
    statut VARCHAR(15) CHECK (statut IN ('disponible', 'vendu')),
    idFournisseur INT,
    FOREIGN KEY (idFournisseur) REFERENCES Fournisseur(idFournisseur)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Table Client
CREATE TABLE Client (
    idClient INT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telephone VARCHAR(20)
);

-- Table Employe
CREATE TABLE Employe (
    idEmploye INT PRIMARY KEY,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    poste VARCHAR(30),
    email VARCHAR(100),
    password VARCHAR(255)  -- 👈 nouveau champ ajouté ici
);

-- Table Vente
CREATE TABLE Vente (
    idVente INT PRIMARY KEY,
    idVehicule INT NOT NULL,
    idClient INT NOT NULL,
    idEmploye INT NOT NULL,
    dateVente DATE NOT NULL,
    prixVente DECIMAL(10,2),
    FOREIGN KEY (idVehicule) REFERENCES Vehicule(idVehicule)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    FOREIGN KEY (idClient) REFERENCES Client(idClient)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    FOREIGN KEY (idEmploye) REFERENCES Employe(idEmploye)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Table Entretien
CREATE TABLE Entretien (
    idEntretien INT PRIMARY KEY,
    idVehicule INT NOT NULL,
    idEmploye INT, -- on enlève NOT NULL ici
    date DATE NOT NULL,
    typeEntretien VARCHAR(100),
    cout DECIMAL(10,2),
    description TEXT,
    FOREIGN KEY (idVehicule) REFERENCES Vehicule(idVehicule)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (idEmploye) REFERENCES Employe(idEmploye)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);
