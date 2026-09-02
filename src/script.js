let data = [];
let filteredData = [];
let currentPage = 1;
let rowsPerPage = 10;
let sortColumn = -1;
let sortDirection = 1;

// Event listeners
document.getElementById('fileInput').addEventListener('change', handleFileSelect);
document.getElementById('search-input').addEventListener('input', filterData);
document.getElementById('rowsPerPage').addEventListener('change', function() {
    rowsPerPage = parseInt(this.value);
    currentPage = 1;
    renderTable();
});

// Auto-load CSV on page load
window.addEventListener('DOMContentLoaded', function() {
    loadDefaultCSV();
});

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        processCSVContent(e.target.result);
    };
    reader.readAsText(file);
}

function loadDefaultCSV() {
    fetch('data/HC3_Cataleg.csv')
        .then(response => response.text())
        .then(data => {
            processCSVContent(data);
        })
        .catch(error => {
            console.error('Error loading default CSV:', error);
        });
}

function processCSVContent(content) {
    const lines = content.split('\n');
    
    // Procesar los datos del CSV
    const headers = lines[3].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const rows = lines.slice(4).filter(line => line.trim() !== '');

    console.log('Headers:', headers);
    console.log('First row:', rows[0]);

    data = rows.map(row => {
        const columns = row.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
        return {
            codigo: String(columns[headers.indexOf('Codi tipus document')] || ''),
            nombre_doc: String(columns[headers.indexOf('Nom tipus document')] || ''),
            agrupador: String(columns[headers.indexOf('Agrupador')] || '')
        };
    }).filter(item => item.codigo !== '');

    console.log('Processed data:', data);
    filteredData = data;
    currentPage = 1;
    renderTable();
}

function filterData() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    console.log('Search term:', searchTerm);
    console.log('Data:', data);
    filteredData = data.filter(item => {
        return item.codigo.toLowerCase().includes(searchTerm) ||
               item.nombre_doc.toLowerCase().includes(searchTerm) ||
               item.agrupador.toLowerCase().includes(searchTerm);
    });
    console.log('Filtered data:', filteredData);
    currentPage = 1;
    renderTable();
}

function clearFilters() {
    document.getElementById('search-input').value = '';
    filteredData = data;
    currentPage = 1;
    renderTable();
}

function sortTable(columnIndex) {
    if (sortColumn === columnIndex) {
        sortDirection *= -1;
    } else {
        sortColumn = columnIndex;
        sortDirection = 1;
    }

    filteredData.sort((a, b) => {
        const key = Object.keys(a)[columnIndex];
        if (a[key] < b[key]) return -1 * sortDirection;
        if (a[key] > b[key]) return 1 * sortDirection;
        return 0;
    });

    renderTable();
}

function renderTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    paginatedData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.codigo}</td>
            <td>${item.nombre_doc}</td>
            <td>${item.agrupador}</td>
        `;
        tableBody.appendChild(row);
    });

    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    document.getElementById('pageInfo').textContent = `Pàgina ${currentPage} de ${totalPages}`;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
}