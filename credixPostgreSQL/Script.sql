DROP TABLE IF EXISTS user_accounts CASCADE;
DROP TABLE IF EXISTS credits CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS customers CASCADE;


-- ===========================
-- 1 Table: customers
-- ===========================
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    birth_date DATE NOT NULL,
    monthly_income NUMERIC(12,2) NOT NULL CHECK (monthly_income >= 0)
);

-- ===========================
-- 2 Table: users
-- ===========================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    birth_date DATE NOT NULL,
    hire_date DATE NOT NULL
);

-- ===========================
-- 3 Table: credits
-- ===========================
CREATE TABLE credits (
    id SERIAL PRIMARY KEY,
    amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    delivery_date DATE NOT NULL,
    payment_frequency VARCHAR(20) NOT NULL CHECK (payment_frequency IN ('weekly', 'biweekly', 'monthly')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('Paid', 'Pending')),
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- ===========================
-- 4 Table: user_accounts
-- ===========================
CREATE TABLE user_accounts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Blocked')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);