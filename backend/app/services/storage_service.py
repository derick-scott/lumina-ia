import json
import uuid
from datetime import datetime
from pathlib import Path
from app.core.config import PROJECTS_DIR


def create_conversation(first_message: str):
    conv_id = f"conv_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{uuid.uuid4().hex[:6]}"
    conv_path = PROJECTS_DIR / conv_id
    conv_path.mkdir()

    title = first_message[:50]

    metadata = {
        "id": conv_id,
        "title": title,
        "created_at": datetime.now().isoformat(),
    }

    with open(conv_path / "metadata.json", "w") as f:
        json.dump(metadata, f, indent=2)

    with open(conv_path / "messages.json", "w") as f:
        json.dump([], f)

    return conv_id, title


def save_message(conv_id: str, role: str, content: str):
    conv_path = PROJECTS_DIR / conv_id
    messages_file = conv_path / "messages.json"

    with open(messages_file, "r") as f:
        messages = json.load(f)

    messages.append({
        "role": role,
        "content": content,
    })

    with open(messages_file, "w") as f:
        json.dump(messages, f, indent=2)


def list_conversations():
    conversations = []

    for folder in PROJECTS_DIR.iterdir():
        metadata_file = folder / "metadata.json"
        if metadata_file.exists():
            with open(metadata_file) as f:
                conversations.append(json.load(f))

    return sorted(conversations, key=lambda x: x["created_at"], reverse=True)

def load_messages(conv_id: str):
    conv_path = PROJECTS_DIR / conv_id
    messages_file = conv_path / "messages.json"

    with open(messages_file, "r") as f:
        return json.load(f)