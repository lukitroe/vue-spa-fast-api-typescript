from typing import Optional
from tortoise import Tortoise
import os


def register_tortoise(
    app,
    configOrm: Optional[dict] = None,
    generate_schemas: bool = False,
) -> None:
    @app.on_event("startup")
    async def init_orm():
        print(os.environ)
        print("config: ", configOrm)
        await Tortoise.init(config=configOrm)
        if generate_schemas:
            await Tortoise.generate_schemas()

    @app.on_event("shutdown")
    async def close_orm():
        await Tortoise.close_connections()