from pydantic import BaseSettings


class Settings(BaseSettings):
    TITLE: str = "Route Planning for Optimised on-time Delivery"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "This app is used to achieve Efficient On-Time Delivery and serve as a platform for warehouse managers and delivery personnels."
    LICENSE_NAME: str = "GNU Gneral Public License 3.0"
    ENVIRONMENT: str = "DEV"
    MONGO_URL: str = "mongodb+srv://grow_simplee:grow_simplee@cluster0.xeclo4y.mongodb.net/?retryWrites=true&w=majority"

    class Config:
        env_file = ".env"
        env_file_encoding = "UTF-8"

    def debug(self) -> bool:
        return self.ENVIRONMENT == "DEV"


settings = Settings()
