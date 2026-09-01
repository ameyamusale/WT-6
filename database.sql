CREATE DATABASE IF NOT EXISTS bookstore;
USE bookstore;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO books (title, author, category, price, description, image_url) VALUES
('The Alchemist', 'Paulo Coelho', 'Fiction', 399.00, 'A classic inspirational story about following your dreams.', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600'),
('Atomic Habits', 'James Clear', 'Self Help', 499.00, 'A practical guide to building good habits and breaking bad ones.', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600'),
('Clean Code', 'Robert C. Martin', 'Technology', 699.00, 'A handbook of agile software craftsmanship.', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600'),
('The Psychology of Money', 'Morgan Housel', 'Finance', 449.00, 'Timeless lessons on wealth, greed and happiness.', 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600'),
('Ikigai', 'Hector Garcia', 'Self Help', 349.00, 'A Japanese-inspired guide to finding purpose in life.', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600'),
('Rich Dad Poor Dad', 'Robert Kiyosaki', 'Finance', 399.00, 'Lessons about money, investing and financial education.', 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600')
ON DUPLICATE KEY UPDATE title = VALUES(title);