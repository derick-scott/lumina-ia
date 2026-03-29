\# Lumina AI — System Architecture



\## Overview



Lumina AI is a local-first AI chat application that replicates the experience of modern AI chat platforms (like ChatGPT) while running entirely on the user's machine using Ollama.



The system follows a \*\*full-stack architecture\*\* with clear separation between frontend, backend, and AI inference layers.



---



\# High Level Architecture



User

│

▼

Frontend (React + Vite)

│

▼

Backend API (FastAPI)

│

▼

LLM Engine (Ollama)

│

▼

Local Storage (Conversations)





---



\# Frontend Layer



Location:





frontend/





Stack:



\- React

\- Vite

\- TypeScript

\- TailwindCSS

\- Axios



Responsibilities:



\- Render chat UI

\- Handle user input

\- Manage chat state

\- Fetch conversation list

\- Load conversation history

\- Send prompts to backend



Key files:





src/pages/ChatPage.tsx

src/components/layout/Sidebar.tsx

src/hooks/useChat.ts

src/services/api.ts





---



\# Backend Layer



Location:





backend/app





Stack:



\- Python 3.11

\- FastAPI

\- Uvicorn

\- Pydantic

\- Requests



Responsibilities:



\- Expose REST API

\- Manage conversations

\- Store messages

\- Communicate with Ollama

\- Generate responses



Entry point:





app/main.py





Server start:





uvicorn app.main:app --reload





---



\# AI Layer



AI inference is handled by \*\*Ollama\*\* running locally.



The backend sends requests to:





http://localhost:11434/api/generate





Example model:





llama3

mistral





The backend formats conversation history into a prompt and sends it to Ollama.



---



\# Storage System



Conversations are stored locally on disk.



Folder structure:





backend/conversations/



conv\_20260304\_074925\_5c8268/

messages.json





Each conversation contains:





{

id

title

messages\[]

}





Message structure:





{

id

role

content

timestamp

}





Roles:





user

assistant





---



\# Conversation Flow



\### 1 User sends message



Frontend calls:





POST /api/chat





---



\### 2 Backend receives request



Backend:



\- loads conversation history

\- formats prompt

\- sends request to Ollama



---



\### 3 Ollama generates reply



Ollama returns generated response.



---



\### 4 Backend saves conversation



Messages are appended to:





messages.json





---



\### 5 Frontend receives response



Frontend updates UI with:





assistant message





---



\# Frontend State



The main chat logic is implemented in:





hooks/useChat.ts





State managed:





messages\[]

conversationId

loading





Functions:





sendMessage()

loadConversation()

newConversation()





---



\# Sidebar System



Sidebar handles:



\- conversation list

\- new conversation

\- selecting conversation

\- collapsed menu



Component:





components/layout/Sidebar.tsx





---



\# Current Architecture Properties



Advantages:



\- modular

\- scalable

\- easy to replace storage

\- easy to replace AI model

\- frontend/backend separation



---



\# Future Architecture Evolution



Possible improvements:



\### Streaming responses



Use:





FastAPI StreamingResponse





For real-time token output.



---



\### Database storage



Replace local storage with:





PostgreSQL





---



\### User authentication



Add:





JWT authentication





---



\### Multi-user support



Each user gets isolated conversation storage.



---



\### Cloud deployment



Possible deployment stack:





Frontend → Vercel

Backend → Docker + VPS

Model → GPU server





---



\# Design Principles



The Lumina architecture follows:



\- Separation of concerns

\- API-first backend

\- Frontend as UI layer

\- Local-first AI execution

\- Replaceable infrastructure

