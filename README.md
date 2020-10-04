# map-service
A small example of microservice architecture

## Services
* front_server - nginx
* user_service - Authentication by JWT. python, fastapi, sqlalchemy core, [databases](https://github.com/encode/databases/)

## Quick start
1. Build docker images
> docker-compose build
2. Start services
> docker-compose up
3. Init db
> make init.db
4. Create seed
> make db.seed
5. Open in your browser http://127.0.0.1:7000/

## DB Migration (user_service for example)
1. Create migration [using autogenerate](https://alembic.sqlalchemy.org/en/latest/autogenerate.html)
> make us.db.create name="Your migration name"
2. Alembic upgrade
> make us.db.upgrade
3. Alembic downgrade
> make us.db.downgrade
