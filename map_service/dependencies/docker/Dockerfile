FROM python:3.8.6

WORKDIR /usr/map_service

RUN pip3 install psycopg2==2.8.6
RUN pip3 install alembic==1.4.3
RUN pip3 install uvicorn==0.11.8
RUN pip3 install fastapi==0.61.1
RUN pip3 install sqlalchemy==1.3.19
RUN pip3 install pyjwt==1.7.1
RUN pip3 install bcrypt==3.2.0
RUN pip3 install asyncpg==0.21.0
RUN pip3 install databases==0.3.2

ENTRYPOINT uvicorn main:app --host 0.0.0.0 --port 7002 --log-level debug --reload
