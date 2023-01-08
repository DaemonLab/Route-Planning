import services
from fastapi import FastAPI
from settings import settings
from router import UserRouter

services.create_database()


tags_metadata = [
    {"name": "Users", "description": "User Authentication"},
]

app = FastAPI(
    title=settings.TITLE,
    version=settings.VERSION,
    description=settings.DESCRIPTION,
    license_info={
        "name": settings.LICENSE_NAME,
    },
    openapi_tags=tags_metadata,
)

app.include_router(UserRouter)

@app.get("/")
def read_root():
    return {"Hello": "World!"}
