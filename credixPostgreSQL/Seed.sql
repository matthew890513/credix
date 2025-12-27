BEGIN;

-- Limpiar registros existentes
TRUNCATE TABLE user_accounts RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;
TRUNCATE TABLE credits RESTART IDENTITY CASCADE;
TRUNCATE TABLE customers RESTART IDENTITY CASCADE;

INSERT INTO users (first_name, last_name, middle_name, birth_date, hire_date)
VALUES 
('John', 'Doe', 'A', '1990-05-10', '2025-01-01'),
('Jane', 'Smith', 'B', '1985-11-20', '2024-06-15'),
('Alice', 'Johnson', 'C', '1992-03-05', '2025-03-01');

INSERT INTO user_accounts (user_id, email, password_hash, status)
VALUES
(1, 'john.doe@example.com', '$2a$10$CTvjTzByiu4C1y0s6n7vI.NMRj.jbG1Q77vK7WYdfs82/wqx.Ovt.', 'Active'),
(2, 'jane.smith@example.com', '$2a$10$CTvjTzByiu4C1y0s6n7vI.NMRj.jbG1Q77vK7WYdfs82/wqx.Ovt.', 'Active'),
(3, 'alice.johnson@example.com', '$2a$10$CTvjTzByiu4C1y0s6n7vI.NMRj.jbG1Q77vK7WYdfs82/wqx.Ovt.', 'Active');

-- Insertar clientes
INSERT INTO customers (first_name, last_name, middle_name, birth_date, monthly_income)
VALUES
('John', 'Doe', 'A', '1990-05-10', 3000.00),
('Jane', 'Smith', 'B', '1985-11-20', 4500.50),
('Alice', 'Johnson', 'C', '1992-03-05', 3800.75),
('Bob', 'Williams', 'D', '1988-07-15', 2500.00),
('Carol', 'Davis', 'E', '1995-12-22', 5000.00);

-- Insertar créditos
INSERT INTO credits (amount, delivery_date, payment_frequency, status, customer_id)
VALUES
(1200.00, '2025-01-10', 'monthly', 'Paid', 1),
(800.00,  '2025-02-15', 'monthly', 'Pending', 2),
(450.00,  '2025-03-05', 'weekly', 'Paid', 3),
(600.00,  '2025-04-01', 'biweekly', 'Pending', 4),
(700.00,  '2025-05-20', 'monthly', 'Paid', 5),
(900.00,  '2025-06-15', 'monthly', 'Pending', 1),
(300.00,  '2025-07-10', 'weekly', 'Paid', 2);

COMMIT;
