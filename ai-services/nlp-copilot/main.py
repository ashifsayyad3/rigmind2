"""
RigMind AI™ — NLP Copilot Service
RAG (Retrieval-Augmented Generation) over lessons learned, RCM reports, and failure history.
Uses sentence embeddings + cosine similarity for context retrieval.
"""

from __future__ import annotations

import os
import numpy as np
import structlog
import uvicorn
from contextlib import asynccontextmanager
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import httpx

logger = structlog.get_logger()

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
ANTHROPIC_URL = "https://api.anthropic.com/v1/messages"


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("NLP Copilot Service starting")
    yield


app = FastAPI(
    title="RigMind AI™ — NLP Copilot",
    version="1.0.0",
    lifespan=lifespan,
)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


# ── Schemas ──────────────────────────────────────────────────────────────────

class ChatMessage(BaseModel):
    role: str  # user | assistant
    content: str


class CopilotRequest(BaseModel):
    question: str
    conversation_history: list[ChatMessage] = Field(default_factory=list)
    context_documents: list[str] = Field(default_factory=list)  # RAG context
    rig_id: Optional[int] = None
    mode: str = "general"  # general | root_cause | maintenance | report


class RootCauseRequest(BaseModel):
    failure_id: int
    failure_description: str
    component: Optional[str] = None
    symptoms: Optional[str] = None
    similar_failures: list[str] = Field(default_factory=list)


class ReportRequest(BaseModel):
    rig_id: int
    report_type: str = "daily"   # daily | weekly | monthly | incident
    data_summary: dict


class EmbeddingRequest(BaseModel):
    texts: list[str]


# ── Simple in-memory vector store ─────────────────────────────────────────────

_vector_store: list[dict] = []   # [{text, embedding, metadata}]


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-9))


def simple_embed(text: str) -> np.ndarray:
    """
    Lightweight TF-IDF-like embedding for retrieval without an external service.
    Replace with Azure OpenAI embeddings in production.
    """
    vocab = set(text.lower().split())
    vec = np.array([hash(w) % 512 for w in sorted(vocab)], dtype=float)
    if len(vec) == 0:
        return np.zeros(512)
    # Pad or truncate to fixed size
    out = np.zeros(512)
    n = min(len(vec), 512)
    out[:n] = vec[:n]
    out /= (np.linalg.norm(out) + 1e-9)
    return out


async def call_claude(messages: list[dict], system: str, max_tokens: int = 800) -> str:
    """Call Claude API for text generation."""
    if not ANTHROPIC_API_KEY:
        return "[Anthropic API key not configured]"
    async with httpx.AsyncClient(timeout=30.0) as client:
        res = await client.post(
            ANTHROPIC_URL,
            headers={
                "x-api-key": ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",
            },
            json={
                "model": "claude-sonnet-4-20250514",
                "max_tokens": max_tokens,
                "system": system,
                "messages": messages,
            },
        )
        res.raise_for_status()
        return res.json()["content"][0]["text"]


def retrieve_context(query: str, top_k: int = 3) -> list[str]:
    """Retrieve most relevant documents from vector store."""
    if not _vector_store:
        return []
    q_emb = simple_embed(query)
    scored = [
        (cosine_similarity(q_emb, doc["embedding"]), doc["text"])
        for doc in _vector_store
    ]
    scored.sort(reverse=True)
    return [text for _, text in scored[:top_k]]


# ── Endpoints ────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "nlp-copilot",
        "vector_store_size": len(_vector_store),
        "api_key_set": bool(ANTHROPIC_API_KEY),
    }


@app.post("/chat")
async def chat(request: CopilotRequest) -> dict:
    """General-purpose copilot with RAG context retrieval."""
    # Retrieve relevant context
    rag_context = retrieve_context(request.question)
    all_context = request.context_documents + rag_context

    system = f"""You are an expert offshore drilling AI assistant for Aquila Engineering's RigMind platform.
You have deep knowledge of BOP systems, failure modes, NPT, RCM methodology, and offshore operations.
Be specific, concise, and action-oriented. Use engineering terminology.
Mode: {request.mode}
{f"Rig context: Rig ID {request.rig_id}" if request.rig_id else ""}
{"Relevant knowledge base context:" + chr(10) + chr(10).join(all_context) if all_context else ""}"""

    messages = [
        *[{"role": m.role, "content": m.content} for m in request.conversation_history[-8:]],
        {"role": "user", "content": request.question},
    ]

    answer = await call_claude(messages, system, max_tokens=600)
    return {"answer": answer, "context_retrieved": len(rag_context)}


@app.post("/root-cause")
async def analyze_root_cause(request: RootCauseRequest) -> dict:
    """AI-powered root cause analysis for a specific failure."""
    context = "\n".join(request.similar_failures[:3]) if request.similar_failures else "No similar failures available."

    system = """You are a senior RCM (Reliability-Centered Maintenance) engineer specializing in offshore drilling equipment failure analysis.
Provide a structured root cause analysis following the 5-Why methodology.
Format your response as:
1. Probable Root Cause
2. Contributing Factors
3. Failure Mechanism
4. Recommended Corrective Actions (prioritized)
5. Preventive Measures
Be specific and technical."""

    prompt = f"""Analyze root cause for this failure:

Component: {request.component or "Unknown"}
Description: {request.failure_description}
Symptoms: {request.symptoms or "Not provided"}

Similar past failures for context:
{context}"""

    analysis = await call_claude([{"role": "user", "content": prompt}], system, max_tokens=1000)

    return {
        "failure_id": request.failure_id,
        "root_cause_analysis": analysis,
        "similar_failures_used": len(request.similar_failures),
    }


@app.post("/generate-report")
async def generate_report(request: ReportRequest) -> dict:
    """Generate an AI executive report from structured data."""
    system = f"""You are a senior drilling engineer writing a {request.report_type} operational report.
Be precise, professional, and action-oriented. Highlight risks and required actions first.
Use standard offshore drilling terminology."""

    prompt = f"""Generate a {request.report_type} report for Rig {request.rig_id}.

Data summary:
{chr(10).join(f"- {k}: {v}" for k, v in request.data_summary.items())}

Structure: Executive Summary, KPI Performance, Key Issues, Recommended Actions, Outlook."""

    report = await call_claude([{"role": "user", "content": prompt}], system, max_tokens=1200)

    return {
        "rig_id": request.rig_id,
        "report_type": request.report_type,
        "report": report,
    }


@app.post("/index")
async def index_documents(payload: dict) -> dict:
    """Add documents to the vector store for RAG retrieval."""
    documents = payload.get("documents", [])
    added = 0
    for doc in documents:
        text = doc.get("text", "")
        if text:
            _vector_store.append({
                "text": text,
                "embedding": simple_embed(text),
                "metadata": doc.get("metadata", {}),
            })
            added += 1
    return {"indexed": added, "total_documents": len(_vector_store)}


@app.delete("/index")
async def clear_index() -> dict:
    """Clear the vector store."""
    _vector_store.clear()
    return {"message": "Vector store cleared", "total_documents": 0}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8004, reload=False)
