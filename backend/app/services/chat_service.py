import requests
from app.core.config import OLLAMA_URL, OLLAMA_MODEL


def build_prompt(messages: list):
    formatted = ""

    for msg in messages:
        role = msg["role"]
        content = msg["content"]

        if role == "user":
            formatted += f"User: {content}\n"
        elif role == "assistant":
            formatted += f"Assistant: {content}\n"

    formatted += "Assistant:"

    return formatted


def generate_reply(messages: list):
    prompt = build_prompt(messages)

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False
        }
    )

    data = response.json()
    return data.get("response", "")