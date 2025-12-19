// vehicules.js - Gestion de la recherche dynamique des véhicules
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les éléments du DOM
    const searchForm = document.querySelector('form');
    const searchInput = document.querySelector('input[name="filtre"]');
    const tableBody = document.querySelector('tbody');
    
    // Empêcher le comportement par défaut du formulaire
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Récupérer la valeur de recherche
        const searchValue = searchInput.value.trim();
        
        // Effectuer la requête AJAX avec fetch
        fetch(`/vehicules?filtre=${encodeURIComponent(searchValue)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => {
            // Vérifier si la réponse est en JSON ou HTML
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
               
                return response.text().then(html => {
                 
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const rows = Array.from(doc.querySelectorAll('tbody tr'));
                    
                 
                    return rows.map(row => {
                        const cells = Array.from(row.querySelectorAll('td'));
                        return {
                            marque: cells[0].textContent,
                            modele: cells[1].textContent,
                            annee: cells[2].textContent,
                            kilometrage: cells[3].textContent,
                            prix: cells[4].textContent,
                            statut: cells[5].textContent
                        };
                    });
                });
            }
        })
        .then(vehicules => {
            // Vider le tableau
            tableBody.innerHTML = '';
            
            // Afficher un message si aucun véhicule trouvé
            if (vehicules.length === 0) {
                const messageRow = document.createElement('tr');
                const messageCell = document.createElement('td');
                messageCell.setAttribute('colspan', '6');
                messageCell.textContent = 'Aucun véhicule trouvé';
                messageCell.style.textAlign = 'center';
                messageRow.appendChild(messageCell);
                tableBody.appendChild(messageRow);
                return;
            }
            
            // Ajouter les véhicules au tableau
            vehicules.forEach(vehicule => {
                const row = document.createElement('tr');
                
                // Créer les cellules pour chaque propriété
                const properties = ['marque', 'modele', 'annee', 'kilometrage', 'prix', 'statut'];
                properties.forEach(prop => {
                    const cell = document.createElement('td');
                    cell.textContent = vehicule[prop];
                    row.appendChild(cell);
                });
                
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la recherche:', error);
            // Afficher un message d'erreur
            tableBody.innerHTML = '';
            const errorRow = document.createElement('tr');
            const errorCell = document.createElement('td');
            errorCell.setAttribute('colspan', '6');
            errorCell.textContent = 'Erreur lors de la recherche. Veuillez réessayer.';
            errorCell.style.textAlign = 'center';
            errorCell.style.color = 'red';
            errorRow.appendChild(errorCell);
            tableBody.appendChild(errorRow);
        });
    });
    
    // Ajouter une fonctionnalité de tri sur les en-têtes du tableau
    const tableHeaders = document.querySelectorAll('th');
    tableHeaders.forEach((header, index) => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => sortTable(index));
    });
    
    // Fonction pour trier le tableau
    let sortDirection = 1;
    function sortTable(columnIndex) {
        const rows = Array.from(tableBody.querySelectorAll('tr'));
        
        // Inverser la direction de tri si on clique sur la même colonne
        if (lastSortedColumn === columnIndex) {
            sortDirection *= -1;
        } else {
            sortDirection = 1;
        }
        lastSortedColumn = columnIndex;
        
        // Trier les lignes
        rows.sort((a, b) => {
            const aValue = a.querySelectorAll('td')[columnIndex].textContent;
            const bValue = b.querySelectorAll('td')[columnIndex].textContent;
            
            // Comparer en fonction du type de données
            if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
                return (parseFloat(aValue) - parseFloat(bValue)) * sortDirection;
            } else {
                return aValue.localeCompare(bValue) * sortDirection;
            }
        });
        
        // Vider le tableau et ajouter les lignes triées
        tableBody.innerHTML = '';
        rows.forEach(row => tableBody.appendChild(row));
    }
    
    let lastSortedColumn = -1;
});