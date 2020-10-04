# map-service
A small example of microservice architecture

## Services
* front_server - nginx
* database - postgresql-12
* user_service - Authentication by JWT. python, fastapi, sqlalchemy core, [databases](https://github.com/encode/databases/)
* map_service

## Quick start
1. Build docker images
> docker-compose build
2. Start services
> docker-compose up
3. Init db
> make init.db
4. Create seed (user_service for example)
> make us.db.seed
5. Open in your browser http://127.0.0.1:7000/

## DB Migration (user_service for example)
1. Create migration [using autogenerate](https://alembic.sqlalchemy.org/en/latest/autogenerate.html)
> make us.db.create name="Your migration name"
2. Alembic upgrade
> make us.db.upgrade
3. Alembic downgrade
> make us.db.downgrade

see makefile for other cli commands
