FROM python:3-slim


RUN python -m pip install pipenv

WORKDIR /app
COPY Pipfile ./
COPY Pipfile.lock ./

RUN pipenv install --deploy

COPY main.py ./



EXPOSE 8000

CMD ["pipenv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--reload"]

