from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from router import RidersRouter, ItemsRouter, NavigationRouter
from fastapi.middleware.cors import CORSMiddleware
from settings import settings
from typing import List


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

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:5000",
    "http://localhost:5000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World!"}


app.include_router(RidersRouter)
app.include_router(ItemsRouter)
app.include_router(NavigationRouter)