import databases
import sqlalchemy

from configs import config


metadata = sqlalchemy.MetaData()

database = databases.Database(config.DB_URI, min_size=4, max_size=8)
