BEGIN;

-- Limpiar registros existentes
TRUNCATE TABLE user_accounts RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;

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

COMMIT;
