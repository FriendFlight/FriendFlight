DROP TABLE IF EXISTS Person;

CREATE TABLE Person
(person_id text PRIMARY KEY,
first_name text,
last_name text,
phone_number text,
email text,
picture text);

INSERT INTO Person (person_id, first_name, last_name, phone_number, email, picture)
VALUES ('1', 'Smitty', 'Werbenjagermanjensen', '8014445555', 'smittyapples@gmail.com', null);

DROP TABLE IF EXISTS Trip;

CREATE TABLE Trip
(trip_id serial PRIMARY KEY,
flight_number text,
arrival_date date,
person_id text,
is_tracked boolean,
morning_of boolean,
airport_address text,
arrival_time text,
utc_offset_hours text);

INSERT INTO Trip (flight_number, arrival_date, person_id, is_tracked, morning_of, airport_address, arrival_time, utc_offset_hours)
VALUES ('A123', '2017-08-08', '1', true, true, null, null, null);

DROP TABLE IF EXISTS Driver;

CREATE TABLE Driver
(driver_id serial PRIMARY KEY,
person_id text,
latitude float,
longitude float);

INSERT INTO Driver (person_id, latitude, longitude)
VALUES ('1', 40.741895, -73.989308);