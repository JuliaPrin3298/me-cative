from fastapi import FastAPI

app = FastAPI(
    title="Me Cative API",
    version="0.1.0",
)


@app.get("/")
def root():
    return {
        "message": "Me Cative API funcionando!"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }