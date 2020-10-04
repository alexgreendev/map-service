import os


class Config:
    CWD_PATH = os.environ['CWD_PATH']
    DB_HOST = os.environ['DB_HOST']
    DB_NAME = os.environ['DB_NAME']
    DB_USER = os.environ['DB_USER']
    DB_PASSWORD = os.environ['DB_PASSWORD']
    JWT_SALT = os.environ['JWT_SALT']
    JWT_EXPIRE = os.environ['JWT_EXPIRE']

    @property
    def DB_URI(self):
        return f"postgres://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}/{self.DB_NAME}"


config = Config()
