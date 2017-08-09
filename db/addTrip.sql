INSERT INTO Trip (flight_number, arrival_date, person_id, is_tracked, morning_of)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;