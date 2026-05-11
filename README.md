
Создание виртуального окружения
bash
# Создание виртуального окружения
python -m venv venv

# Активация (Windows)
venv\Scripts\activate

# Активация (Linux/macOS)
source venv/bin/activate



Запуск проекта
Полная последовательность запуска:
bash
# 1. Клонирование проекта
git clone <url-репозитория>
cd fastapi-project

# 2. Создание виртуального окружения
python -m venv venv
source venv/bin/activate  # или venv\Scripts\activate на Windows

# 3. Установка зависимостей
pip install -r requirements.txt

# 4. Настройка переменных окружения
cp .env.example .env
# Отредактируйте .env при необходимости

# 5. Запуск PostgreSQL
docker-compose up -d

# 6. Создание и применение миграций
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head

# 7. Запуск приложения
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000




ПОЛЕЗНЫЕ КОМАНДЫ

Команды Alembic:
bash
# Инициализация Alembic (выполняется один раз)
alembic init alembic

# Создание новой миграции
alembic revision --autogenerate -m "описание изменений"

# Применение всех миграций
alembic upgrade head

# Откат на одну миграцию назад
alembic downgrade -1

# Просмотр истории миграций
alembic history

# Создание пустой миграции (для ручного SQL)
alembic revision -m "ручные изменения"





 Git стратегия с ветками
Начальная настройка
bash
# Клонирование репозитория
git clone <url-репозитория>
cd fastapi-project

# Создание .gitignore
echo "__pycache__/" >> .gitignore
echo "*.pyc" >> .gitignore
echo ".env" >> .gitignore
echo "venv/" >> .gitignore
echo ".vscode/" >> .gitignore
echo "*.egg-info/" >> .gitignore
echo "dist/" >> .gitignore
echo "build/" >> .gitignore

# Первый коммит
git add .
git commit -m "Initial commit: project structure"

# Настройка основной ветки
git branch -M main
git push -u origin main



Создание веток
bash
# Создание ветки разработки
git checkout -b dev
git push -u origin dev

# Создание feature-ветки
git checkout dev
git pull origin dev
git checkout -b feature/user-auth
git push -u origin feature/user-auth


# Ежедневная работа
git checkout dev
git pull origin dev          # Получаем последние изменения
git checkout -b feature/xxx  # Создаем ветку для задачи

# После завершения работы
git add .
git commit -m "feat: add user authentication"
git push origin feature/xxx

# Создаем Pull Request на GitHub:
# feature/xxx -> dev



Стратегия ветвления
text
main (production)
  └── dev (development)
       ├── feature/user-auth
       ├── feature/payment
       └── fix/login-bug
Объяснение:

main - только стабильный, протестированный код

dev - интеграционная ветка для разработки

feature/* - отдельные фичи

fix/* - исправления багов

release/* - подготовка к релизу


