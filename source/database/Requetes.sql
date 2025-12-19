-- Objectif : afficher toutes les ventes avec les noms du client, de l’employé vendeur, et les détails du véhicule vendu.
SELECT V.idVente, C.nom AS nomClient, C.prenom AS prenomClient,
       E.nom AS nomVendeur, E.prenom AS prenomVendeur,
       VE.marque, VE.modele, V.dateVente, V.prixVente
FROM Vente V
JOIN Client C ON V.idClient = C.idClient
JOIN Employe E ON V.idEmploye = E.idEmploye
JOIN Vehicule VE ON V.idVehicule = VE.idVehicule;

-- Objectif : afficher le total des ventes effectuées par chaque employé (vendeur uniquement).
SELECT E.idEmploye, E.nom, E.prenom, SUM(V.prixVente) AS totalVentes
FROM Vente V
JOIN Employe E ON V.idEmploye = E.idEmploye
WHERE E.poste = 'vendeur'
GROUP BY E.idEmploye;

-- Objectif : afficher tous les véhicules disponibles qui n'ont jamais été vendus.
SELECT *
FROM Vehicule
WHERE statut = 'disponible'
  AND idVehicule NOT IN (SELECT idVehicule FROM Vente);

-- Objectif : afficher les clients ayant acheté plus d’un véhicule.
SELECT C.idClient, C.nom, C.prenom, COUNT(*) AS nbAchats
FROM Vente V
JOIN Client C ON V.idClient = C.idClient
GROUP BY C.idClient
HAVING COUNT(*) > 1;

-- Objectif : afficher les employés qui n'ont jamais effectué d’entretien.
SELECT E.idEmploye, E.nom, E.prenom
FROM Employe E
WHERE E.poste = 'mecanicien'
  AND NOT EXISTS (
      SELECT 1
      FROM Entretien En
      WHERE En.idEmploye = E.idEmploye
  );

