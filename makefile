.DEFAULT_GOAL := default

default:
	docker-compose build

nginx.restart:
	docker exec -ti maps_front_server /bin/bash -c \
	'nginx -s reload'

init.db:
	docker exec -ti maps_database /bin/bash -c \
	'psql -a -f /database/init_db.sql'
	make us.db.upgrade
	make mp.db.upgrade

us.db.seed:
	docker exec -ti maps_user_service /bin/bash -c \
	'python ./db/seed.py'

us.db.create:
	docker exec -ti maps_user_service /bin/bash -c \
	'cd ./db/alembic && alembic revision --autogenerate -m "$(name)"'
us.db.upgrade:
	docker exec -ti maps_user_service /bin/bash -c \
	'cd ./db/alembic && alembic upgrade head'
us.db.downgrade:
	docker exec -ti maps_user_service /bin/bash -c \
	'cd ./db/alembic && alembic downgrade -1'
us.db.editable:
	docker exec -ti maps_user_service /bin/bash -c \
	'chmod 777 ./db/alembic/versions/*'

mp.db.create:
	docker exec -ti maps_map_service /bin/bash -c \
	'cd ./db/alembic && alembic revision --autogenerate -m "$(name)"'
mp.db.upgrade:
	docker exec -ti maps_map_service /bin/bash -c \
	'cd ./db/alembic && alembic upgrade head'
mp.db.downgrade:
	docker exec -ti maps_map_service /bin/bash -c \
	'cd ./db/alembic && alembic downgrade -1'
mp.db.editable:
	docker exec -ti maps_map_service /bin/bash -c \
	'chmod 777 ./db/alembic/versions/*'
