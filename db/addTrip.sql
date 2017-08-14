INSERT INTO Trip (flight_number, arrival_date, person_id, is_tracked, morning_of, airport_name, arrival_time, utc_offset_hours)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;