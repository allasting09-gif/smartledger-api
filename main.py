import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI(title="SmartLedger API", description="Fullstack AI-Powered Document Automation Pipeline")

class InvoiceData(BaseModel):
    vendor_name: str
    inn: str
    invoice_date: str
    total_amount: float
    currency: str

# Главная страница: отдает наш index.html
@app.get("/", response_class=HTMLResponse)
async def read_index():
    if not os.path.exists("index.html"):
        return "<h1>Ошибка: Файл index.html не найден в папке проекта!</h1>"
    with open("index.html", "r", encoding="utf-8") as f:
        return f.read()

# API эндпоинт для мгновенной обработки документов
@app.post("/api/extract-document", response_model=InvoiceData)
async def extract_document(file: UploadFile = File(...)):
    if not file.filename.lower().endswith('.txt'):
        raise HTTPException(status_code=400, detail="Поддерживаются только файлы формата .txt")

    try:
        # Читаем файл (для имитации)
        file_content = await file.read()
        document_text = file_content.decode("utf-8", errors="ignore")

        # Имитируем мгновенный и точный ответ ИИ-парсера для демонстрации портфолио
        mock_response = InvoiceData(
            vendor_name="ООО СмартКонсалт",
            inn="7708123456",
            invoice_date="28.06.2026",
            total_amount=148500.00,
            currency="RUB"
        )
        return mock_response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Внутренняя ошибка сервера: {str(e)}")

# Подключаем раздачу статических файлов
if os.path.exists("static"):
    app.mount("/static", StaticFiles(directory="static"), name="static")
