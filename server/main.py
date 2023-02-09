from fastapi import FastAPI, WebSocket
from router import RidersRouter, ItemsRouter, NavigationRouter
from fastapi.middleware.cors import CORSMiddleware
from settings import settings
from numpy import asarray
from PIL import Image
from numpy import asarray

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


@app.post("/volume")
def index():
    websocket: WebSocket = WebSocket
    print(websocket)
    websocket.send_text('dasxasxas')


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: djodnw")
