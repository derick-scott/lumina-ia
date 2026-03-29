# Lumina AI — API Reference

Base URL:


http://localhost:8000/api


---

# Send Chat Message

## Endpoint


POST /chat


---

## Request Body


{
"message": "Hello",
"conversation_id": "conv_20260304_074925_5c8268"
}


### Fields

message


string


User prompt.

conversation_id


string | null


If null → new conversation is created.

---

## Response


{
"conversation_id": "conv_20260304_074925_5c8268",
"title": "Hello",
"reply": "Hello! How can I help you today?"
}


### Fields

conversation_id


string


Conversation identifier.

title


string


Generated conversation title.

reply


string


Assistant response.

---

# List Conversations

## Endpoint


GET /conversations


---

## Response


[
{
"id": "conv_20260304_074925_5c8268",
"title": "How to learn Python"
},
{
"id": "conv_20260304_081022_2f12b1",
"title": "Explain machine learning"
}
]


---

# Get Conversation Messages

## Endpoint


GET /conversations/{id}


Example:


GET /conversations/conv_20260304_074925_5c8268


---

## Response


{
"id": "conv_20260304_074925_5c8268",
"title": "How to learn Python",
"messages": [
{
"role": "user",
"content": "How do I start learning Python?"
},
{
"role": "assistant",
"content": "A good way to start learning Python is..."
}
]
}


---

# Error Responses

Example:


404 Not Found


Conversation does not exist.

---


422 Unprocessable Entity


Invalid request body.

---


500 Internal Server Error


Backend processing error.

---

# Future API Endpoints

### Rename conversation


PATCH /conversations/{id}


---

### Delete conversation


DELETE /conversations/{id}


---

### Stream responses


POST /chat/stream


---

### Model selection


GET /models


---

# API Design Notes

The API follows REST principles:

- resource-based endpoints
- stateless requests
- JSON responses
- clear HTTP methods

---

# Testing

API can be tested with Swagger UI:


http://localhost:8000/docs


Or with:

- Postman
- Insomnia
- curl