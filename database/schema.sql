CREATE TABLE price_plan(
    id serial PRIMARY KEY,
    price_name VARCHAR(10),
    sms_price float,
    call_price float
);

CREATE TABLE users(
    username VARCHAR(20) ,
    plan_id int, 
    FOREIGN KEY (plan_id) REFERENCES price_plan(id)
);