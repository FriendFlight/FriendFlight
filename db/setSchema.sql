DROP TABLE IF EXISTS Person;

CREATE TABLE Person
(person_id text PRIMARY KEY,
first_name text,
last_name text,
phone_number text,
email text,
picture text);

INSERT INTO Person (person_id, first_name, last_name, phone_number, email, picture)
VALUES ('1', 'Smitty', 'Werbenjagermanjensen', '8014445555', 'smittyapples@gmail.com', '');

DROP TABLE IF EXISTS Trip;

CREATE TABLE Trip
(trip_id bigint PRIMARY KEY,
flight_number text,
person_id text,
is_tracked boolean,
get_notifications boolean,
morning_of boolean);

INSERT INTO Trip (trip_id, flight_number, person_id, is_tracked, get_notifications, morning_of)
VALUES (1, 'A123', '1', true, true, true);

DROP TABLE IF EXISTS Driver;

CREATE TABLE Driver
(driver_id bigint PRIMARY KEY,
person_id text,
latitude float,
longitude float);

INSERT INTO Driver (driver_id, person_id, latitude, longitude)
VALUES (1, '1', 40.741895, -73.989308);