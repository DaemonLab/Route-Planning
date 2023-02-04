from fastapi import FastAPI
from router import RidersRouter , ItemsRouter , NavigationRouter , ClockRouter
from fastapi.middleware.cors import CORSMiddleware
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

origins = [
    "http://localhost:3000",
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
app.include_router(ClockRouter)
