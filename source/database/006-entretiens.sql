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

CREATE INDEX idx_typeEntretien ON Entretien(typeEntretien);

-- Procédure : afficher les entretiens récents d’un véhicule donné
DELIMITER //
CREATE PROCEDURE DerniersEntretiensVehicule(IN p_idVehicule INT)
BEGIN
    SELECT date, typeEntretien, cout, description
    FROM Entretien
    WHERE idVehicule = p_idVehicule
    ORDER BY date DESC
    LIMIT 5;
END //
DELIMITER ;