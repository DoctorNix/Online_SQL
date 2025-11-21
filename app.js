// Import PGlite from CDN
import { PGlite } from 'https://cdn.jsdelivr.net/npm/@electric-sql/pglite/dist/index.js';

// Initialize PGlite database
let db;
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB in bytes

// Initialize database on page load
async function initDatabase() {
    try {
        db = new PGlite();
        console.log('PostgreSQL database initialized successfully');
        showMessage('Database ready! 🎉', 'success');
    } catch (error) {
        console.error('Failed to initialize database:', error);
        showMessage('Error initializing database: ' + error.message, 'error');
    }
}

// Toggle guide visibility
window.toggleGuide = function() {
    const guideContent = document.getElementById('guideContent');
    guideContent.classList.toggle('show');
};

// Insert command into editor
window.insertCommand = function(command) {
    const editor = document.getElementById('sqlEditor');
    editor.value = command.trim();
    editor.focus();
    // Scroll to editor
    editor.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

// Handle file upload
window.handleFileUpload = async function(event) {
    const file = event.target.files[0];
    const fileNameSpan = document.getElementById('fileName');
    const statusDiv = document.getElementById('uploadStatus');
    
    if (!file) {
        return;
    }
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
        statusDiv.textContent = `❌ File too large! Maximum size is 20MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`;
        statusDiv.className = 'status-message error';
        fileNameSpan.textContent = '';
        event.target.value = ''; // Reset file input
        return;
    }
    
    fileNameSpan.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
    
    try {
        const text = await file.text();
        const editor = document.getElementById('sqlEditor');
        editor.value = text;
        
        statusDiv.textContent = `✅ File "${file.name}" loaded successfully! Click "Run Query" to execute.`;
        statusDiv.className = 'status-message success';
        
        // Scroll to editor
        editor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) {
        statusDiv.textContent = `❌ Error reading file: ${error.message}`;
        statusDiv.className = 'status-message error';
        fileNameSpan.textContent = '';
    }
};

// Execute SQL
window.executeSQL = async function() {
    const editor = document.getElementById('sqlEditor');
    const resultsDiv = document.getElementById('results');
    const sql = editor.value.trim();
    
    if (!sql) {
        resultsDiv.innerHTML = '<div class="result-message result-error">⚠️ Please enter a SQL query.</div>';
        return;
    }
    
    // Show loading indicator
    resultsDiv.innerHTML = '<div class="result-message result-info">⏳ Executing query... <span class="loading"></span></div>';
    
    try {
        // Split SQL into individual statements
        const statements = sql.split(';').filter(s => s.trim());
        let allResults = [];
        
        for (let statement of statements) {
            statement = statement.trim();
            if (!statement) continue;
            
            try {
                const result = await db.query(statement);
                allResults.push({
                    statement: statement,
                    result: result,
                    success: true
                });
            } catch (error) {
                allResults.push({
                    statement: statement,
                    error: error.message,
                    success: false
                });
            }
        }
        
        // Display results
        displayResults(allResults);
    } catch (error) {
        resultsDiv.innerHTML = `<div class="result-message result-error">❌ Error: ${escapeHtml(error.message)}</div>`;
    }
};

// Display results
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    let html = '';
    
    for (let i = 0; i < results.length; i++) {
        const item = results[i];
        
        if (!item.success) {
            html += `
                <div class="result-message result-error">
                    <strong>❌ Error in statement ${i + 1}:</strong><br>
                    <code>${escapeHtml(item.statement)}</code><br>
                    <strong>Error:</strong> ${escapeHtml(item.error)}
                </div>
            `;
            continue;
        }
        
        const result = item.result;
        
        // For SELECT queries, show the data
        if (result.rows && result.rows.length > 0) {
            html += `
                <div class="result-message result-success">
                    <strong>✅ Statement ${i + 1} executed successfully:</strong><br>
                    <code>${escapeHtml(item.statement)}</code><br>
                    <strong>Rows returned:</strong> ${result.rows.length}
                </div>
            `;
            html += createTable(result.rows, result.fields);
        } else if (result.affectedRows !== undefined) {
            // For INSERT, UPDATE, DELETE
            html += `
                <div class="result-message result-success">
                    <strong>✅ Statement ${i + 1} executed successfully:</strong><br>
                    <code>${escapeHtml(item.statement)}</code><br>
                    <strong>Rows affected:</strong> ${result.affectedRows}
                </div>
            `;
        } else {
            // For CREATE, DROP, ALTER, etc.
            html += `
                <div class="result-message result-success">
                    <strong>✅ Statement ${i + 1} executed successfully:</strong><br>
                    <code>${escapeHtml(item.statement)}</code>
                </div>
            `;
        }
    }
    
    resultsDiv.innerHTML = html;
}

// Create HTML table from results
function createTable(rows, fields) {
    if (rows.length === 0) {
        return '<p>No rows returned.</p>';
    }
    
    const columns = fields.map(f => f.name);
    
    let html = '<table><thead><tr>';
    columns.forEach(col => {
        html += `<th>${escapeHtml(col)}</th>`;
    });
    html += '</tr></thead><tbody>';
    
    rows.forEach(row => {
        html += '<tr>';
        columns.forEach(col => {
            const value = row[col];
            html += `<td>${value === null ? '<em>NULL</em>' : escapeHtml(String(value))}</td>`;
        });
        html += '</tr>';
    });
    
    html += '</tbody></table>';
    return html;
}

// Clear editor
window.clearEditor = function() {
    const editor = document.getElementById('sqlEditor');
    if (confirm('Are you sure you want to clear the editor?')) {
        editor.value = '';
        editor.focus();
    }
};

// Reset database
window.resetDatabase = async function() {
    if (confirm('Are you sure you want to reset the database? All data will be lost!')) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '<div class="result-message result-info">⏳ Resetting database... <span class="loading"></span></div>';
        
        try {
            // Close and reinitialize database
            await db.close();
            await initDatabase();
            resultsDiv.innerHTML = '<div class="result-message result-success">✅ Database reset successfully!</div>';
        } catch (error) {
            resultsDiv.innerHTML = `<div class="result-message result-error">❌ Error resetting database: ${escapeHtml(error.message)}</div>`;
        }
    }
};

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Helper function to show messages
function showMessage(message, type) {
    const resultsDiv = document.getElementById('results');
    const className = type === 'success' ? 'result-success' : type === 'error' ? 'result-error' : 'result-info';
    resultsDiv.innerHTML = `<div class="result-message ${className}">${escapeHtml(message)}</div>`;
}

// Initialize database when page loads
initDatabase();
