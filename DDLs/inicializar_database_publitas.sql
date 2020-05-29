-- entra no container
docker exec -it docker_postgres_1 bash

-- connecta via terminal
psql -U publitas


-- COMMANDOS SQLs
--create USER aldata with PASSWORD 'Prudencia@2019' CREATEDB;
create user publitas with PASSWORD 'Prudencia@2020';

create DATABASE publitas
    with OWNER publitas;

grant ALL PRIVILEGES  on database publitas to publitas;

exit

-- CRIA SCHEMAS
-- use raw
--CREATE SCHEMA IF NOT EXISTS raw AUTHORIZATION publitas;

