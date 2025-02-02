CREATE DATABASE IF NOT EXISTS wordmasterdb;
USE wordmasterdb;

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET collation_connection = 'utf8mb4_unicode_ci';

-- Veritabanı karakter seti ayarı
ALTER DATABASE wordmasterdb CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users_roles (
    user_id BIGINT,
    role_id BIGINT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS words (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    word VARCHAR(255) NOT NULL,
    mean VARCHAR(255) NOT NULL,
    word_type VARCHAR(255) NOT NULL,
    sentence VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; 

CREATE TABLE IF NOT EXISTS user_words (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    word_id BIGINT,
    status VARCHAR(255) NOT NULL,
    last_reviewed TIMESTAMP,
    review_count INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (word_id) REFERENCES words(id)
);

CREATE TABLE IF NOT EXISTS lessons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS lesson_words (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lesson_id BIGINT,
    word_id BIGINT,
    user_id BIGINT,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id),
    FOREIGN KEY (word_id) REFERENCES words(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);