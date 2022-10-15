import fastapi as fapi

app = fapi.FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "Woooooorld"}