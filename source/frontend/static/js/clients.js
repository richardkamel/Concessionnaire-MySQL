// clients.js - Gestion de la recherche et validation des clients
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter un formulaire de recherche s'il n'existe pas déjà
    const tableContainer = document.querySelector('table').parentElement;
    
    if (!document.querySelector('form')) {
        const searchForm = document.createElement('form');
        searchForm.innerHTML = `
            <div style="margin-bottom: 20px; text-align: center;">
                <input type="text" id="clientSearch" placeholder="Rechercher un client..." style="padding: 8px; width: 300px;">
                <button type="submit" style="padding: 8px; background-color: #007BFF; color: white; border: none; cursor: pointer;">Rechercher</button>
            </div>
        `;
        tableContainer.insertBefore(searchForm, document.querySelector('table'));
        
        // Empêcher le comportement par défaut du formulaire
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Récupérer la valeur de recherche
            const searchValue = document.getElementById('clientSearch').value.trim();
            
            // Effectuer la requête AJAX
            fetch(`/clients?filtre=${encodeURIComponent(searchValue)}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => {
                return response.text().then(html => {
                    // Créer un DOM temporaire pour extraire les données
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    return doc.querySelector('tbody').innerHTML;
                });
            })
            .then(tableContent => {
                // Mettre à jour le contenu du tableau
                document.querySelector('tbody').innerHTML = tableContent;
                
                // Afficher un message si aucun client trouvé
                if (document.querySelector('tbody').children.length === 0) {
                    const messageRow = document.createElement('tr');
                    const messageCell = document.createElement('td');
                    messageCell.setAttribute('colspan', '5');
                    messageCell.textContent = 'Aucun client trouvé';
                    messageCell.style.textAlign = 'center';
                    messageRow.appendChild(messageCell);
                    document.querySelector('tbody').appendChild(messageRow);
                }
            })
            .catch(error => {
                console.error('Erreur lors de la recherche:', error);
                // Afficher un message d'erreur
                document.querySelector('tbody').innerHTML = '';
                const errorRow = document.createElement('tr');
                const errorCell = document.createElement('td');
                errorCell.setAttribute('colspan', '5');
                errorCell.textContent = 'Erreur lors de la recherche. Veuillez réessayer.';
                errorCell.style.textAlign = 'center';
                errorCell.style.color = 'red';
                errorRow.appendChild(errorCell);
                document.querySelector('tbody').appendChild(errorRow);
            });
        });
    }
    
    // Ajouter une fonctionnalité de tri sur les en-têtes du tableau
    const tableHeaders = document.querySelectorAll('th');
    tableHeaders.forEach((header, index) => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => sortTable(index));
    });
    
    // Fonction pour trier le tableau
    let sortDirection = 1;
    let lastSortedColumn = -1;
    
    function sortTable(columnIndex) {
        const tableBody = document.querySelector('tbody');
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
            const aValue = a.querySelectorAll('td')[columnIndex]?.textContent || '';
            const bValue = b.querySelectorAll('td')[columnIndex]?.textContent || '';
            
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
});