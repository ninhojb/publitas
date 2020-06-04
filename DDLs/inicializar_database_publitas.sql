-- entra no container
docker exec -it docker_postgres_1 bash

-- connecta via terminal
psql -U publitas


-- COMMANDOS SQLs
--create USER aldata with PASSWORD 'Prudencia@2019' CREATEDB;
create user ninhojb with PASSWORD 'Prudencia@2020';

create DATABASE publitas with OWNER ninhojb;

grant ALL PRIVILEGES  on database publitas to ninhojb;

exit

-- CRIA SCHEMAS
-- use raw
--CREATE SCHEMA IF NOT EXISTS raw AUTHORIZATION publitas;

