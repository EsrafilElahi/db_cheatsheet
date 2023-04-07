CREATE DATABASE test; -- create db
DROP DATABASE test; -- delete db
ALTER DATABASE test -- modify db

-------------------------------------------------------------------
-- select
SELECT * FROM patients
SELECT first_name FROM patients
SELECT DISTINCT first_name FROM patients
SELECT COUNT(DISTINCT first_name) FROM patients

-------------------------------------------------------------------
-- where
SELECT * FROM patients 
WHERE first_name = 'Lois' AND last_name = 'Lane'

SELECT * FROM patients 
WHERE height BETWEEN 140 AND 150 AND price BETWEEN 10 AND 50

SELECT * FROM patients 
WHERE city IN ('Paris', 'London')

SELECT * FROM patients 
WHERE first_name LIKE 'Ma%'

SELECT * FROM patients 
WHERE NOT first_name = 'Max' AND (city = 'Berlin' OR city = 'Ajax')

SELECT * FROM patients 
WHERE national_id IS NULL

SELECT * FROM patients 
WHERE city IS NOT NULL

SELECT * FROM patients
WHERE city BETWEEN 'Ajax' AND 'London'
ORDER BY city

-------------------------------------------------------------------
-- order by
SELECT * FROM patients 
ORDER BY first_name

SELECT * FROM patients 
ORDER BY height DESC

SELECT * FROM patients 
ORDER BY height DESC, weight ASC

-------------------------------------------------------------------
-- insert into
INSERT INTO patients (patient_id, first_name, last_name, height)
VALUES (1, 'esrafil', 'elahi', 170 )

INSERT INTO patients (patient_id, city, province_id)
SELECT vendor_id, city, province_id FROM vendors
WHERE city = 'London' 

-------------------------------------------------------------------
-- update
UPDATE patients
SET city = 'gonbad'
WHERE patient_id = 12

UPDATE patients
SET city = 'Tehran'

-------------------------------------------------------------------
-- delete
DELETE FROM patients
WHERE allergies IS NULL

DELETE FROM patients
WHERE first_name = 'Max'

-------------------------------------------------------------------
-- limit
SELECT * FROM patients
LIMIT 3

SELECT * FROM patients
WHERE country = 'Germany' OR city = 'London' 
LIMIT 3

-------------------------------------------------------------------
-- min max count avg sum
SELECT MAX(height) FROM patients
SELECT MIN(price) AS smallestPrice FROM patients
SELECT COUNT(first_name) As allName FROM patients
SELECT AVG(height) FROM patients
SELECT SUM(price) FROM patients

-------------------------------------------------------------------
-- like
SELECT * FROM patients
WHERE first_name LIKE 'a%';
LIKE 'a%' -- starts with 'a'
LIKE '%a' -- ends with 'a'
LIKE '%man%' -- find any value with 'man'
LIKE 'a%e' -- starts with 'a' AND ends with 'e'

-------------------------------------------------------------------
-- in
SELECT * FROM patients
WHERE city IN (SELECT city FROM customers);

SELECT * FROM patients
WHERE city NOT IN ('London', "Paris", "Tehran")

-------------------------------------------------------------------
-- inner-join
SELECT patients.patient_id, vendors.vendor_name 
FROM patients
INNER JOIN vendors
ON patients.province_id = vendors.province_id

SELECT patients.allergies, vendors.vendor_name
FROM patients
INNER JOIN vendors

-- left-join
SELECT patients.patient_id, vendors.vendor_name
FROM patients
LEFT JOIN vendors
ON patients.province_id = vendors.province_id
ORDER BY vendors.vendor_name DESC

--right-join
SELECT patients.patient_id, vendors.vendor_name
FROM patients
RIGHT JOIN vendors
ON patients.province_id = vendors.province_id
ORDER BY vendors.vendor_name DESC

-- cross-join
SELECT patients.patient_id, vendors.vendor_name
FROM patients
CROSS JOIN vendors

SELECT patients.patient_id, vendors.vendor_name
FROM patients
CROSS JOIN vendors
WHERE patients.city = vendors.city


-------------------------------------------------------------------
-- union
SELECT city FROM patients
UNION -- without duplicate
UNION ALL -- with duplicate
select city from vendors
ORDER BY city DESC

SELECT city, province_id FROM patients
WHERE city = 'London'
UNION
SELECT city, province_id FROM vendors
WHERE city = 'London'

-------------------------------------------------------------------
-- group by
SELECT CustomerID, Country
FROM Customers
GROUP BY Country;
ORDER BY COUNT(CustomerID) DESC

SELECT COUNT(patient_id), city
FROM patients
GROUP BY city
ORDER BY count(patient_id) DESC

-------------------------------------------------------------------
-- having        
SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country
HAVING COUNT(CustomerID) > 5
ORDER BY COUNT(CustomerID) DESC

SELECT count(patient_id), city
from patients
group by city
HAVING COUNT(patient_id) > 100
order by count(patient_id) DESC

-------------------------------------------------------------------
-- exists
SELECT city FROM patients
WHERE EXISTS (SELECT vendor_name FROM vendors WHERE vendors.city = patients.city)

SELECT ProductName
FROM Products
WHERE ProductID = ANY (SELECT ProductID FROM OrderDetails WHERE Quantity > 99);

select ALL city FROM patients
WHERE TRUE

-------------------------------------------------------------------
-- case
SELECT patient_id, wight
CASE
  WHEN wight < 140 THEN 'height under 140'
  WHEN wight > 140 THEN 'height greater than 140'
  ELSE 'height is 140'
END AS height_detail
FROM patients;

-------------------------------------------------------------------
-- create table
CREATE TABLE test (
  id int NOT NULL AUTO_INCREMENT,
  names varchar(255) NOT NULL,
  age int NOT NULL,
  CHECK (age>=18),
  family varchar(255),
  city varchar(255) DEFAULT 'New York',
  birth_data date DEFAULT CURRENT_DATE(),
  UNIQUE(id),
  PRIMARY KEY(city_code),
  FOREIGN KEY (person_id) REFERENCES persons(person_id)
)

-- delete table
DROP TABLE test

-- change table
ALTER TABLE test
ADD email varchar(255)
ADD UNIQUE(country_id)
DROP family
MODIFY age varchar(255) NOT NULL

ALTER TABLE Persons
ALTER City DROP DEFAULT;