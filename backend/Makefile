up:
	docker-compose up --build

makemigrations:
	docker-compose run django python manage.py makemigrations

migrate:
	docker-compose run django python manage.py migrate

reset_migrations:
	find . -path "*/migrations/*.py" -not -name "__init__.py" -not -path "./vrpair/contrib/*" -delete && make makemigrations

reset_data:
	docker-compose stop postgres && docker-compose rm -f postgres && docker volume remove backend_local_postgres_data && make migrate && docker-compose run django python manage.py load_initial && docker-compose run django python manage.py load_fixtures

reset:
	make reset_migrations && make reset_data

schema:
	docker-compose run django python manage.py spectacular --file schema.yml
