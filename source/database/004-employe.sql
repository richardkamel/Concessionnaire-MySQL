CREATE TABLE Employe (
    idEmploye INT PRIMARY KEY,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    poste VARCHAR(30),
    email VARCHAR(100),
    password VARCHAR(255)
);

CREATE INDEX idx_posteEmploye ON Employe(poste);

-- Procédure : afficher les ventes faites par un employé dans une période donnée
DELIMITER //
CREATE PROCEDURE VentesParEmploye(
    IN p_idEmploye INT,
    IN p_dateDebut DATE,
    IN p_dateFin DATE
)
BEGIN
    SELECT V.idVente, V.dateVente, C.nom AS client, V.prixVente
    FROM Vente V
    JOIN Client C ON V.idClient = C.idClient
    WHERE V.idEmploye = p_idEmploye
      AND V.dateVente BETWEEN p_dateDebut AND p_dateFin;
END //
DELIMITER ;