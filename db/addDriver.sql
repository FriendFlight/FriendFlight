INSERT INTO Driver (person_id, latitude, longitude)
VALUES ($1, $2, $3)
RETURNING *;