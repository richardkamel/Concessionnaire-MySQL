CREATE TABLE Fournisseur (
    idFournisseur INT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    adresse VARCHAR(255),
    contact VARCHAR(100),
    specialite VARCHAR(100)
);

-- Fonction : obtenir le nombre de véhicules fournis par un fournisseur donné
DELIMITER //
CREATE FUNCTION NbVehiculesParFournisseur(p_idFournisseur INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE nb INT;
    SELECT COUNT(*) INTO nb FROM Vehicule WHERE idFournisseur = p_idFournisseur;
    RETURN nb;
END //
DELIMITER ;
