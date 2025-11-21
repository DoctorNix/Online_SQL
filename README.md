# 🐘 Online PostgreSQL Simulator

An interactive, beginner-friendly PostgreSQL simulator that runs entirely in your browser! Perfect for learning SQL, testing queries, and teaching children database concepts.

## ✨ Features

- **🌐 Browser-Based**: No installation required - runs completely in your browser using PostgreSQL WebAssembly (PGlite)
- **📁 File Upload**: Import SQL files up to 20MB in size
- **🔍 Full PostgreSQL Support**: 
  - CREATE, ALTER, DROP tables
  - INSERT, UPDATE, DELETE operations
  - SELECT queries with WHERE, JOIN, ORDER BY, GROUP BY
  - CREATE INDEX for performance optimization
  - Transactions and more
- **📚 Built-in Learning Guide**: 
  - Step-by-step getting started guide
  - Common SQL command examples
  - Click-to-insert command snippets
- **👶 Beginner-Friendly UI**:
  - Colorful, intuitive interface
  - Clear error messages
  - Example queries to get started
  - Visual results display

## 🚀 Getting Started

### Option 1: Open Locally

1. Clone or download this repository
2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge, Safari)
3. Start writing SQL queries!

### Option 2: Deploy to GitHub Pages

1. Fork this repository
2. Go to Settings → Pages
3. Select main branch as source
4. Your SQL simulator will be available at `https://yourusername.github.io/Online_SQL/`

## 📖 How to Use

### Basic Workflow

1. **Learn**: Click "Show/Hide Start Guide" to see tutorials and examples
2. **Write**: Type SQL queries in the editor or click example commands
3. **Upload** (Optional): Import existing SQL files (max 20MB)
4. **Run**: Click "▶️ Run Query" to execute your SQL
5. **View**: See results displayed in a formatted table

### Example Queries

```sql
-- Create a table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    age INTEGER,
    grade DECIMAL(3,2)
);

-- Insert data
INSERT INTO students (name, age, grade) VALUES 
    ('Alice', 15, 95.5),
    ('Bob', 14, 87.3),
    ('Charlie', 16, 92.1);

-- Query data
SELECT * FROM students WHERE grade > 90;

-- Create an index
CREATE INDEX idx_student_name ON students(name);

-- Update records
UPDATE students SET grade = 98.0 WHERE name = 'Alice';
```

## 🎯 Key Features Explained

### File Upload (20MB Limit)
- Click "Choose SQL File" to upload .sql or .txt files
- File size validation ensures files don't exceed 20MB
- Uploaded content appears in the editor for review before execution

### Index Support
```sql
-- Speed up queries with indexes
CREATE INDEX idx_name ON table_name(column_name);
CREATE UNIQUE INDEX idx_email ON users(email);
```

### PostgreSQL Features
This simulator supports standard PostgreSQL syntax including:
- Data types: INTEGER, VARCHAR, TEXT, DECIMAL, BOOLEAN, DATE, TIMESTAMP
- Constraints: PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK
- Indexes: CREATE INDEX, CREATE UNIQUE INDEX
- Joins: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN
- Aggregations: COUNT, SUM, AVG, MIN, MAX
- Grouping: GROUP BY, HAVING
- Sorting: ORDER BY
- And much more!

## 🛠️ Technical Details

- **Engine**: [PGlite](https://github.com/electric-sql/pglite) - PostgreSQL compiled to WebAssembly
- **No Backend Required**: Everything runs in the browser
- **Local Storage**: Data persists during your session (reset clears everything)
- **Modern Browsers**: Requires WebAssembly support (Chrome 57+, Firefox 52+, Safari 11+, Edge 16+)

## 👨‍👩‍👧‍👦 Perfect for Learning

This tool is designed with beginners and children in mind:
- 🎨 Colorful, engaging interface
- 📝 Clear instructions and examples
- 💡 Helpful tips and tricks
- ⚡ Instant feedback on queries
- 🎓 Progressive learning with examples

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Improve documentation
- Submit pull requests

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [PGlite](https://github.com/electric-sql/pglite) by ElectricSQL
- Inspired by the need for accessible SQL learning tools

---

**Made with ❤️ for SQL learners everywhere!**
