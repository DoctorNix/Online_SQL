-- Sample SQL File for Testing the Online SQL Simulator
-- This file demonstrates various SQL features including tables, indexes, and queries

-- Create a database schema for a simple library system

-- Create Books table
CREATE TABLE books (
    book_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100) NOT NULL,
    isbn VARCHAR(13) UNIQUE,
    publication_year INTEGER,
    genre VARCHAR(50),
    price DECIMAL(10,2)
);

-- Create Members table
CREATE TABLE members (
    member_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    join_date DATE DEFAULT CURRENT_DATE,
    membership_type VARCHAR(20)
);

-- Create Loans table
CREATE TABLE loans (
    loan_id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER REFERENCES books(book_id),
    member_id INTEGER REFERENCES members(member_id),
    loan_date DATE DEFAULT CURRENT_DATE,
    due_date DATE,
    return_date DATE
);

-- Insert sample books
INSERT INTO books (title, author, isbn, publication_year, genre, price) VALUES
    ('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 1925, 'Fiction', 12.99),
    ('To Kill a Mockingbird', 'Harper Lee', '9780061120084', 1960, 'Fiction', 14.99),
    ('1984', 'George Orwell', '9780451524935', 1949, 'Science Fiction', 13.99),
    ('Pride and Prejudice', 'Jane Austen', '9780141439518', 1813, 'Romance', 11.99),
    ('The Hobbit', 'J.R.R. Tolkien', '9780547928227', 1937, 'Fantasy', 15.99),
    ('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', '9780590353427', 1997, 'Fantasy', 16.99),
    ('The Catcher in the Rye', 'J.D. Salinger', '9780316769174', 1951, 'Fiction', 12.99),
    ('Animal Farm', 'George Orwell', '9780452284241', 1945, 'Satire', 10.99);

-- Insert sample members
INSERT INTO members (first_name, last_name, email, membership_type) VALUES
    ('John', 'Doe', 'john.doe@email.com', 'Premium'),
    ('Jane', 'Smith', 'jane.smith@email.com', 'Standard'),
    ('Bob', 'Johnson', 'bob.johnson@email.com', 'Premium'),
    ('Alice', 'Williams', 'alice.williams@email.com', 'Standard'),
    ('Charlie', 'Brown', 'charlie.brown@email.com', 'Student');

-- Insert sample loans
INSERT INTO loans (book_id, member_id, loan_date, due_date, return_date) VALUES
    (1, 1, '2024-01-15', '2024-02-15', '2024-02-10'),
    (3, 2, '2024-01-20', '2024-02-20', NULL),
    (5, 3, '2024-02-01', '2024-03-01', NULL),
    (2, 1, '2024-02-05', '2024-03-05', NULL),
    (4, 4, '2024-01-10', '2024-02-10', '2024-02-08');

-- Create indexes for better query performance
CREATE INDEX idx_books_author ON books(author);
CREATE INDEX idx_books_genre ON books(genre);
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_loans_book_id ON loans(book_id);
CREATE INDEX idx_loans_member_id ON loans(member_id);

-- Sample queries to try:

-- 1. Find all books by a specific author
-- SELECT * FROM books WHERE author = 'George Orwell';

-- 2. Find all members with Premium membership
-- SELECT * FROM members WHERE membership_type = 'Premium';

-- 3. Find all currently loaned books (not yet returned)
-- SELECT b.title, m.first_name, m.last_name, l.loan_date, l.due_date
-- FROM loans l
-- JOIN books b ON l.book_id = b.book_id
-- JOIN members m ON l.member_id = m.member_id
-- WHERE l.return_date IS NULL;

-- 4. Count books by genre
-- SELECT genre, COUNT(*) as book_count
-- FROM books
-- GROUP BY genre
-- ORDER BY book_count DESC;

-- 5. Find overdue books (assuming today is 2024-03-01)
-- SELECT b.title, m.first_name, m.last_name, l.due_date
-- FROM loans l
-- JOIN books b ON l.book_id = b.book_id
-- JOIN members m ON l.member_id = m.member_id
-- WHERE l.return_date IS NULL AND l.due_date < '2024-03-01';

-- 6. Find members who have never borrowed a book
-- SELECT m.first_name, m.last_name, m.email
-- FROM members m
-- LEFT JOIN loans l ON m.member_id = l.member_id
-- WHERE l.loan_id IS NULL;

-- 7. Calculate average book price by genre
-- SELECT genre, AVG(price) as avg_price, COUNT(*) as book_count
-- FROM books
-- GROUP BY genre
-- ORDER BY avg_price DESC;
