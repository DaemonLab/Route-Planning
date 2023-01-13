import services
from fastapi import FastAPI
from router import UserRouter
from settings import settings

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


@app.get("/")
def read_root():
    return {"Hello": "World!"}


@app.get("/hey")
def read_root():
    return {"Hello": "World!"}


app.include_router(UserRouter)
