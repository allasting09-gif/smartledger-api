const fileInput = document.getElementById('fileInput');
const dropzone = document.getElementById('dropzone');
const fileName = document.getElementById('fileName');
const processBtn = document.getElementById('processBtn');
const statusBox = document.getElementById('statusBox');
const registryTable = document.getElementById('registryTable');
const emptyRow = document.getElementById('emptyRow');

// Клик по зоне загрузки
dropzone.addEventListener('click', function() {
    fileInput.click();
});

// Изменение инпута файлов
fileInput.addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        updateFileDisplay(e.target.files[0]);
    }
});

// Drag & Drop
['dragenter', 'dragover'].forEach(function(eventName) {
    dropzone.addEventListener(eventName, function(e) {
        e.preventDefault();
        dropzone.classList.add('border-blue-500', 'bg-blue-500/5');
    }, false);
});

['dragleave', 'drop'].forEach(function(eventName) {
    dropzone.addEventListener(eventName, function(e) {
        e.preventDefault();
        dropzone.classList.remove('border-blue-500', 'bg-blue-500/5');
    }, false);
});

dropzone.addEventListener('drop', function(e) {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        updateFileDisplay(e.dataTransfer.files[0]);
    }
});

function updateFileDisplay(fileItem) {
    fileName.textContent = fileItem.name;
    fileName.className = "text-xs text-blue-400 mt-2 font-medium bg-blue-500/5 px-2 py-1 rounded border border-blue-500/10 truncate max-w-xs mx-auto";
}

// Отправка запроса на FastAPI
processBtn.addEventListener('click', async function() {
    if (fileInput.files.length === 0) {
        showStatus('⚠️ Выберите файл перед отправкой!', 'border-red-500/20 text-red-400 bg-red-500/5');
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]); // Забираем строго первый файл

    showStatus('⌛ ИИ анализирует структуру документа...', 'border-blue-500/20 text-blue-400 bg-blue-500/5');
    processBtn.disabled = true;

    try {
        const response = await fetch('/api/extract-document', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            showStatus('✅ Документ успешно разобран!', 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5');
            if (emptyRow) {
                emptyRow.remove();
            }
            
            const row = document.createElement('tr');
            row.className = "hover:bg-slate-800/30 transition-colors duration-150";
            row.innerHTML = `
                <td class="px-6 py-3.5 font-semibold text-slate-200">${data.vendor_name}</td>
                <td class="px-6 py-3.5 text-slate-400 font-mono text-xs">${data.inn}</td>
                <td class="px-6 py-3.5 text-slate-400">${data.invoice_date}</td>
                <td class="px-6 py-3.5 text-right text-emerald-400 font-bold font-mono">${data.total_amount.toLocaleString('ru-RU', {minimumFractionDigits: 2})}</td>
                <td class="px-6 py-3.5 text-center"><span class="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700 font-medium">${data.currency}</span></td>
            `;
            registryTable.appendChild(row);
        } else {
            showStatus('❌ Ошибка бэкенда:\n' + (data.detail || 'Неизвестная ошибка'), 'border-red-500/20 text-red-400 bg-red-500/5 text-left text-xs whitespace-pre-wrap font-mono');
        }
    } catch (err) {
        showStatus('❌ Ошибка сети: не удалось связаться с FastAPI.', 'border-red-500/20 text-red-400 bg-red-500/5');
    } finally {
        processBtn.disabled = false;
    }
});

function showStatus(text, className) {
    statusBox.className = 'flex-1 flex flex-col items-center justify-center text-center p-4 rounded-xl border text-sm font-medium transition-all duration-200 ' + className;
    statusBox.textContent = text;
}
