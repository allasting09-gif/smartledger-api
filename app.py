import streamlit as st
import requests
import pandas as pd

st.set_page_config(page_title="SmartLedger API SaaS", layout="wide", page_icon="📄")

st.title("📄 SmartLedger API — Панель автоматизации")
st.subheader("Загрузите документ, ИИ мгновенно извлечет коммерческие данные для CRM/ERP")

# Инициализируем локальную сессию-БД
if "database_records" not in st.session_state:
    st.session_state.database_records = []

uploaded_file = st.file_uploader("Перетащите файл счета сюда (формат .txt)", type=["txt"])

if uploaded_file is not None:
    if st.button("🚀 Распознать через SmartLedger AI", type="primary"):
        with st.spinner("Искусственный интеллект анализирует структуру документа..."):
            files = {"file": (uploaded_file.name, uploaded_file.getvalue(), "text/plain")}
            try:
                # Адрес изменен с 127.0.0.1 на localhost для обхода блокировок Windows
                response = requests.post("http://localhost:8000/api/extract-document", files=files)
                
                if response.status_code == 200:
                    extracted_json = response.json()
                    st.success("Документ успешно обработан и валидирован!")
                    st.session_state.database_records.append(extracted_json)
                else:
                    st.error(f"Ошибка бэкенда: {response.json().get('detail', response.text)}")
            except Exception as e:
                st.error(f"Не удалось подключиться к бэкенду FastAPI (проверьте первый терминал): {e}")

st.write("---")
st.subheader("🗂 Реестр распознанных документов (Имитация выгрузки в ERP)")

if st.session_state.database_records:
    df = pd.DataFrame(st.session_state.database_records)
    df.columns = ["Компания-Продавец", "ИНН", "Дата документа", "Сумма", "Валюта"]
    st.dataframe(df, use_container_width=True)
else:
    st.info("Реестр пуст. Загрузите первый документ для автоматического разбора.")
