// ventes.js - Gestion du tri et des fenêtres modales pour les ventes
document.addEventListener('DOMContentLoaded', function() {
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
            if (columnIndex === 6) { // Prix
                return (parseFloat(aValue.replace(/[^\\d.,]/g, '')) - parseFloat(bValue.replace(/[^\\d.,]/g, ''))) * sortDirection;
            } else if (columnIndex === 5) { // Date
                return (new Date(aValue) - new Date(bValue)) * sortDirection;
            } else {
                return aValue.localeCompare(bValue) * sortDirection;
            }
        });
        
        // Vider le tableau et ajouter les lignes triées
        tableBody.innerHTML = '';
        rows.forEach(row => tableBody.appendChild(row));
    }
    
    // Ajouter le comportement pour afficher les détails dans une fenêtre modale
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.style.cursor = 'pointer';
        row.addEventListener('click', function() {
            showVenteDetails(this);
        });
    });
    
    // Fonction pour créer et afficher la fenêtre modale avec les détails
    function showVenteDetails(row) {
        
        let modal = document.getElementById('venteModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'venteModal';
            modal.style.cssText = `
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.7);
                z-index: 1000;
            `;
            
            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                background-color: white;
                margin: 10% auto;
                padding: 20px;
                width: 60%;
                border-radius: 8px;
                position: relative;
            `;
            
            const closeBtn = document.createElement('span');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 20px;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
            `;
            closeBtn.onclick = function() {
                modal.style.display = 'none';
            };
            
            modalContent.appendChild(closeBtn);
            
            const modalTitle = document.createElement('h2');
            modalTitle.textContent = 'Détails de la vente';
            modalTitle.style.cssText = 'margin-top: 0; border-bottom: 1px solid #ccc; padding-bottom: 10px;';
            
            const modalDetails = document.createElement('div');
            modalDetails.id = 'modalDetails';
            
            modalContent.appendChild(modalTitle);
            modalContent.appendChild(modalDetails);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // Fermer la modale en cliquant en dehors
            window.onclick = function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            };
        }
        
        // Récupérer les données de la ligne
        const cells = row.querySelectorAll('td');
        const venteDetails = {
            id: cells[0].textContent,
            marque: cells[1].textContent,
            modele: cells[2].textContent,
            client: cells[3].textContent,
            employe: cells[4].textContent,
            date: cells[5].textContent,
            prix: cells[6].textContent
        };
        
        // Remplir la modale avec les détails
        const modalDetails = document.getElementById('modalDetails');
        modalDetails.innerHTML = `
            <p><strong>ID de la vente:</strong> ${venteDetails.id}</p>
            <p><strong>Véhicule:</strong> ${venteDetails.marque} ${venteDetails.modele}</p>
            <p><strong>Client:</strong> ${venteDetails.client}</p>
            <p><strong>Employé responsable:</strong> ${venteDetails.employe}</p>
            <p><strong>Date de la vente:</strong> ${venteDetails.date}</p>
            <p><strong>Prix de vente:</strong> ${venteDetails.prix}</p>
        `;
        
        // Afficher la modale
        modal.style.display = 'block';
    }
});