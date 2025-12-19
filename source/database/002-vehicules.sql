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

CREATE INDEX idx_idFournisseur ON Vehicule(idFournisseur);

-- Trigger : empêcher une vente si le véhicule est déjà vendu
DELIMITER //
CREATE TRIGGER VerifierVehiculeAvantVente
BEFORE INSERT ON Vente
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1 FROM Vehicule
        WHERE idVehicule = NEW.idVehicule AND statut = 'vendu'
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Erreur : ce véhicule est déjà vendu.';
    END IF;
END //
DELIMITER ;

-- Trigger : mettre à jour automatiquement le statut du véhicule après une vente
DELIMITER //
CREATE TRIGGER MajStatutVehiculeApresVente
AFTER INSERT ON Vente
FOR EACH ROW
BEGIN
    UPDATE Vehicule
    SET statut = 'vendu'
    WHERE idVehicule = NEW.idVehicule;
END //
DELIMITER ;

-- Fonction : calculer le prix moyen de tous les véhicules vendus
DELIMITER //
CREATE FUNCTION PrixMoyenVendu()
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE moyenne DECIMAL(10,2);
    SELECT AVG(prixVente) INTO moyenne FROM Vente;
    RETURN moyenne;
END //
DELIMITER ;