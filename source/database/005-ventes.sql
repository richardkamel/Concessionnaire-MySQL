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
CREATE INDEX idx_dateVente ON Vente(dateVente);

CREATE INDEX idx_client_vehicule ON Vente(idClient, idVehicule);

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