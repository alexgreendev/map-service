from fastapi import FastAPI

from libs.database import database

app = FastAPI(
    name='Map Service',
)


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
