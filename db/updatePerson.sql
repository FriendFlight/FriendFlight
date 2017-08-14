UPDATE Person
SET phone_number = $2, email = $3
WHERE person_id = $1;