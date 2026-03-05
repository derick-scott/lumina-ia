from fastapi import APIRouter
from app.models.chat_models import ChatRequest, ChatResponse
from app.services.storage_service import (
    create_conversation,
    save_message,
    list_conversations,
    load_messages,
)
from app.services.chat_service import generate_reply

router = APIRouter()


@router.post("/chat")
def chat(req: ChatRequest):
    conv_id = req.conversation_id

    if not conv_id:
        conv_id, title = create_conversation(req.message)
    else:
        title = None

    # salva mensagem do usuário
    save_message(conv_id, "user", req.message)

    # carrega histórico completo
    messages = load_messages(conv_id)

    # gera resposta com contexto
    reply = generate_reply(messages)

    # salva resposta
    save_message(conv_id, "assistant", reply)

    return {
        "conversation_id": conv_id,
        "title": title,
        "reply": reply,
    }

@router.get("/conversations")
def get_conversations():
    return list_conversations()

@router.get("/conversations/{conversation_id}")
def get_conversation(conversation_id: str):
    messages = load_messages(conversation_id)

    return {
        "conversation_id": conversation_id,
        "messages": messages
    }