FROM python:3.10-slim


RUN python -m pip install pipenv

WORKDIR /backend
COPY Pipfile ./
COPY Pipfile.lock ./

RUN pipenv install --deploy --system --ignore-pipfile


EXPOSE 8000

WORKDIR /backend/src


CMD ["pipenv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--reload"]

