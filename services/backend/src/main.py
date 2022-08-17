from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # NEW
from tortoise import Tortoise

from src.database.register import register_tortoise  # NEW
from src.database.config import TORTOISE_ORM         # NEW

# enable schemas to read relationship between models
Tortoise.init_models(["src.database.models"], "models")

"""
import 'from src.routes import users, notes' must be after 'Tortoise.init_models'
why?
https://stackoverflow.com/questions/65531387/tortoise-orm-for-python-no-returns-relations-of-entities-pyndantic-fastapi
"""
from src.routes import users, notes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(users.router)
app.include_router(notes.router)

register_tortoise(app, configOrm=TORTOISE_ORM, generate_schemas=False)

@app.get("/")
def home():
    return "Hello, World!"