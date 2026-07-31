from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List
import json
from datetime import datetime

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@router.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Expecting data to be a JSON string from frontend: {"user": "Name", "text": "Message"}
            msg_data = json.loads(data)
            
            # Add timestamp
            msg_data["timestamp"] = datetime.now().strftime("%I:%M %p")
            
            # Broadcast to all connected clients
            await manager.broadcast(json.dumps(msg_data))
    except WebSocketDisconnect:
        manager.disconnect(websocket)
