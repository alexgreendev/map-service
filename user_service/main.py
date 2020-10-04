from fastapi import FastAPI

from routers import auth, login

from libs.database import database

app = FastAPI(
    name='User Service',
)


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

app.include_router(auth.router, prefix='/api/v1', tags=['auth'])
app.include_router(login.router, prefix='/api/v1', tags=['auth'])
