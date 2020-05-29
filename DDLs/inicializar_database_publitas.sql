-- entra no container
docker exec -it dev_postgres_1 bash

-- connecta via terminal
psql -U postgres


-- COMMANDOS SQLs
--create USER aldata with PASSWORD 'Prudencia@2019' CREATEDB;
create user publitas with PASSWORD 'Prudencia@2020';

create DATABASE publitas
    with OWNER publitas;

grant ALL PRIVILEGES  on database publitas to publitas;

exit

-- CRIA SCHEMAS
-- use raw
CREATE SCHEMA IF NOT EXISTS raw AUTHORIZATION publitas;

--Criar as tabelas
\i /home/ninhojb/git/particular/publitas/DDLs/criar_tabelas.sql