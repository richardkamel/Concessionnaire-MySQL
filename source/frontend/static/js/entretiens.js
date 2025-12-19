// entretiens.js - Gestion de la validation des formulaires et du tri
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer le formulaire
    const form = document.querySelector('form');
    
    // Ajouter la validation du formulaire
    form.addEventListener('submit', function(event) {
        // Empêcher l'envoi par défaut pour valider d'abord
        event.preventDefault();
        
        // Récupérer les champs du formulaire
        const vehiculeId = document.querySelector('input[name="vehicule"]');
        const typeEntretien = document.querySelector('input[name="type"]');
        const date = document.querySelector('input[name="date"]');
        const cout = document.querySelector('input[name="cout"]');
        
        // Supprimer les messages d'erreur précédents
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());
        
        // Valider les champs
        let isValid = true;
        
        // Validation de l'ID véhicule
        if (!vehiculeId.value.trim() || isNaN(vehiculeId.value) || parseInt(vehiculeId.value) <= 0) {
            displayError(vehiculeId, "L'ID du véhicule doit être un nombre positif");
            isValid = false;
        }
        
        // Validation du type d'entretien
        if (!typeEntretien.value.trim()) {
            displayError(typeEntretien, "Le type d'entretien est requis");
            isValid = false;
        }
        
        // Validation de la date
        if (!date.value) {
            displayError(date, "La date est requise");
            isValid = false;
        } else {
            const selectedDate = new Date(date.value);
            const today = new Date();
            
            if (selectedDate > today) {
                displayError(date, "La date ne peut pas être dans le futur");
                isValid = false;
            }
        }
        
        // Validation du coût
        if (!cout.value.trim() || isNaN(cout.value) || parseFloat(cout.value) <= 0) {
            displayError(cout, "Le coût doit être un nombre positif");
            isValid = false;
        }
        
        // Si le formulaire est valide, l'envoyer
        if (isValid) {
            form.submit();
        }
    });
    
    // Fonction pour afficher un message d'erreur sous un champ
    function displayError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '0.8em';
        errorDiv.style.marginTop = '5px';
        
        // Insérer le message après l'input
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
        
        // Mettre en évidence le champ en erreur
        input.style.borderColor = 'red';
    }
    
    // Réinitialiser le style des champs lorsque l'utilisateur commence à taper
    const inputs = document.querySelectorAll('form input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '#ccc';
            const errorMessage = this.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains('error-message')) {
                errorMessage.remove();
            }
        });
    });
    
    // Ajouter une fonctionnalité de tri sur les en-têtes du tableau
    const tableHeaders = document.querySelectorAll('th');
    tableHeaders.forEach((header, index) => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => sortTable(index));
    });
    
    // Fonction pour trier le tableau
    let sortDirection = 1; // 1 pour ascendant, -1 pour descendant
    let lastSortedColumn = -1;
    
    function sortTable(columnIndex) {
        const tableBody = document.querySelector('tbody');
        if (!tableBody) return; // Si aucun tableau n'est présent
        
        const rows = Array.from(tableBody.querySelectorAll('tr'));
        if (rows.length === 0) return;
        
        // Inverser la direction de tri si on clique sur la même colonne
        if (lastSortedColumn === columnIndex) {
            sortDirection *= -1;
        } else {
            sortDirection = 1;
        }
        lastSortedColumn = columnIndex;
        
        // Trier les lignes
        rows.sort((a, b) => {
            const aValue = a.querySelectorAll('td')[columnIndex]?.textContent || '';
            const bValue = b.querySelectorAll('td')[columnIndex]?.textContent || '';
            
            // Comparer en fonction du type de données
            if (columnIndex === 0 || columnIndex === 5) { // ID ou Coût
                return (parseFloat(aValue.replace(/[^\\d.,]/g, '')) - parseFloat(bValue.replace(/[^\\d.,]/g, ''))) * sortDirection;
            } else if (columnIndex === 3) { // Date
                return (new Date(aValue) - new Date(bValue)) * sortDirection;
            } else {
                return aValue.localeCompare(bValue) * sortDirection;
            }
        });
        
        // Vider le tableau et ajouter les lignes triées
        tableBody.innerHTML = '';
        rows.forEach(row => tableBody.appendChild(row));
    }
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const idVehiculeInput = document.querySelector('input[name="vehicule"]');
  const messageDiv = document.getElementById('message');

  form.addEventListener('submit', function (e) {
    const idVehicule = parseInt(idVehiculeInput.value);

    if (isNaN(idVehicule) || idVehicule <= 0) {
      e.preventDefault();
      messageDiv.textContent = "Veuillez entrer un ID de véhicule valide (positif)";
      messageDiv.style.color = "red";
    }
  });
});
