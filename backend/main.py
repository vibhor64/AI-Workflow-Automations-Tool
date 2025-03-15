import uvicorn
from public_api import public_app
from private_api import private_app
from fastapi import FastAPI

app = FastAPI(title="Unified API")

app.mount("/pipelines", public_app)  # Accessible via `/public/...`
app.mount("/private", private_app)  # Accessible via `/private/...`

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)