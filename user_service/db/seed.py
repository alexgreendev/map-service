import os
import sys; sys.path.append(os.getcwd())
import asyncio

from models import users
from models.user import generate_hash

from libs.database import database


async def seed():
    await database.connect()
    try:
        async with database.transaction():
            query = users.insert().values(
                name="admin",
                hash_code=generate_hash(code='password'),
            )
            await database.execute(query)
    except Exception:
        await database.disconnect()
        raise


loop = asyncio.get_event_loop()
loop.run_until_complete(seed())
loop.close()
