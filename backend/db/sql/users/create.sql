CREATE TABLE users
(
  id serial PRIMARY KEY,
  fullname VARCHAR(30),
  email VARCHAR(30),
  login VARCHAR(30),
  phone VARCHAR(30),
  picture VARCHAR(60),
  address VARCHAR(60),
  password VARCHAR(30),
  age INTEGER,
  rating INTEGER
)
