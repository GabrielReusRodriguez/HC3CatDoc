data = [];
let filteredData = [];
let currentPage = 1;
let rowsPerPage = 10;
let sortColumn = -1;
let sortDirection = 1;

// Cargar la librería xlsx
const script = document.createElement('script');
script.src = 'xlsx.full.min.js';
script.onload = function() {
    console.log('xlsx library loaded');
};
document.head.appendChild(script);

// Event listeners
document.getElementById('fileInput').addEventListener('change', handleFileSelect);
document.getElementById('searchInput').addEventListener('input', filterData);
document.getElementById('rowsPerPage').addEventListener('change', function() {
    rowsPerPage = parseInt(this.value);
    currentPage = 1;
    renderTable();
});

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const fileData = new Uint8Array(e.target.result);
        const workbook = XLSX.read(fileData, { type: 'array' });
        const sheetName = 'Catàleg definitiu';
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Procesar los datos
        const headers = jsonData[3];
        const rows = jsonData.slice(4);

        data = rows.map(row => {
            return {
                codigo: row[headers.indexOf('Codi tipus document')] || '',
                nombre_doc: row[headers.indexOf('Nom tipus document')] || '',
                agrupador: row[headers.indexOf('Agrupador')] || ''
            };
        });

        filteredData = data;
        currentPage = 1;
        renderTable();
    };
    reader.readAsArrayBuffer(file);
}

function filterData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    filteredData = data.filter(item => {
        return item.codigo.toLowerCase().includes(searchTerm) ||
               item.nombre_doc.toLowerCase().includes(searchTerm) ||
               item.agrupador.toLowerCase().includes(searchTerm);
    });
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
    document.getElementById('pageInfo').textContent = `Página ${currentPage} de ${totalPages}`;
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
