import os


TORTOISE_ORM = {
    'connections': {
        #         # Dict format for connection
        'default': {
            'engine': 'tortoise.backends.asyncpg',
            'credentials': {
                'host': 'db',
                'port': '5432',
                'user': 'hello_fastapi',
                'password': 'hello_fastapi',
                'database': 'hello_fastapi_dev',
            }
        }
    },
    "apps": {
        "models": {
            "models": ["src.database.models", "aerich.models"],
            "default_connection": "default"
        }
    }
}

# postgres://hello_fastapi:hello_fastapi@localhost:5432/hello_fastapi_dev
# TORTOISE_ORM_REFERENCE = {
#     'connections': {
#         # Dict format for connection
#         'default': {
#             'engine': 'tortoise.backends.asyncpg',
#             'credentials': {
#                 'host': 'localhost',
#                 'port': '5432',
#                 'user': 'hello_fastapi',
#                 'password': 'hello_fastapi',
#                 'database': 'hello_fastapi_dev',
#             }
#         },
#         # Using a DB_URL string
#         'default': 'postgres://postgres:qwerty123@localhost:5432/test'
#     },
#     'apps': {
#         'my_app': {
#             'models': ['__main__'],
#             # If no default_connection specified, defaults to 'default'
#             'default_connection': 'default',
#         }
#     },
#     'routers': ['path.router1', 'path.router2'],
#     'use_tz': False,
#     'timezone': 'UTC'
# }
