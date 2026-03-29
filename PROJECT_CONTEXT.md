\# Lumina AI — Project Context



\## Project Overview



Lumina AI is a local-first AI chat application designed to work similarly to ChatGPT but running locally using Ollama.



The project is structured with a professional full-stack architecture:



Frontend:

React + Vite + TypeScript + Tailwind



Backend:

FastAPI (Python)



LLM:

Ollama running locally



The project is intended to be portfolio-quality and may later evolve into a hosted SaaS AI platform.



---



\# Repository



Root folder:



G:\\Github\\lumina-ia



GitHub repository is used for version control and portfolio.



---



\# Architecture

# Lumina AI — Project Context

## Project Overview

Lumina AI is a local-first AI chat application designed to work similarly to ChatGPT but running locally using Ollama.

The project is structured with a professional full-stack architecture:

Frontend:
React + Vite + TypeScript + Tailwind

Backend:
FastAPI (Python)

LLM:
Ollama running locally

The project is intended to be portfolio-quality and may later evolve into a hosted SaaS AI platform.

---

# Repository

Root folder:

G:\Github\lumina-ia

GitHub repository is used for version control and portfolio.

---

# Architecture

lumina-ia
│
├── frontend
│ ├── src
│ │ ├── components
│ │ │ └── layout
│ │ │ Sidebar.tsx
│ │ │
│ │ ├── hooks
│ │ │ useChat.ts
│ │ │
│ │ ├── pages
│ │ │ ChatPage.tsx
│ │ │
│ │ ├── services
│ │ │ api.ts
│ │ │
│ │ └── main.tsx
│ │
│ └── package.json
│
├── backend
│ ├── app
│ │ ├── api
│ │ │ chat.py
│ │ │
│ │ ├── services
│ │ │ chat_service.py
│ │ │ storage_service.py
│ │ │
│ │ ├── models
│ │ │ chat_models.py
│ │ │
│ │ └── main.py
│ │
│ └── venv
│
└── PROJECT_CONTEXT.md

lumina-ia
│
├── frontend
│ ├── src
│ │ ├── components
│ │ │ └── layout
│ │ │ Sidebar.tsx
│ │ │
│ │ ├── hooks
│ │ │ useChat.ts
│ │ │
│ │ ├── pages
│ │ │ ChatPage.tsx
│ │ │
│ │ ├── services
│ │ │ api.ts
│ │ │
│ │ └── main.tsx
│ │
│ └── package.json
│
├── backend
│ ├── app
│ │ ├── api
│ │ │ chat.py
│ │ │
│ │ ├── services
│ │ │ chat_service.py
│ │ │ storage_service.py
│ │ │
│ │ ├── models
│ │ │ chat_models.py
│ │ │
│ │ └── main.py
│ │
│ └── venv
│
└── PROJECT_CONTEXT.md

uvicorn app.main:app --reload


Default address:


http://localhost:8000


Swagger:


http://localhost:8000/docs


---

# Frontend Stack

- React
- Vite
- TypeScript
- Tailwind
- Axios

Frontend runs with:


npm run dev


Default address:


http://localhost:5173


---

# Chat Architecture

The frontend communicates with the backend API.

Flow:

User → React Frontend → FastAPI → Ollama → Response → Frontend

---

# Conversations System

Conversations are stored locally on disk.

Each conversation is saved in a separate folder.

Structure example:


conversations/

conv_20260304_074925_5c8268/
messages.json


Each conversation contains:

- id
- title
- messages history

Title is generated from the first user message.

---

# Backend Endpoints

### Send message

POST


/api/chat


Body:


{
"message": "text",
"conversation_id": "id or null"
}


If `conversation_id` is null → new conversation is created.

---

### Get all conversations

GET


/api/conversations


Returns list of:


id
title


---

### Load conversation messages

GET


/api/conversations/{id}


Returns full message history.

---

# Frontend Chat Logic

Chat logic is implemented in:


hooks/useChat.ts


Responsibilities:

- store messages
- track conversation_id
- send messages
- load conversations
- create new conversation

---

# Sidebar Features

Sidebar displays:

- conversation list
- new conversation button
- user profile section
- collapsible menu

File:


components/layout/Sidebar.tsx


---

# Current State of the Project

Working features:

✓ Frontend chat interface  
✓ Sidebar with conversations list  
✓ New conversation creation  
✓ Loading existing conversations  
✓ Conversation persistence on disk  
✓ Backend API working  
✓ Ollama integration working  
✓ Messages stored locally

---

# Future Planned Features

- Streaming responses
- Conversation renaming
- Delete conversation
- Model selector
- Settings page
- User authentication
- Database storage (future)
- Multi-user support
- Online deployment
- Plugin/tool system
