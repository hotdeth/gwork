
# Simple Task Management App

A basic web application to manage tasks with **React frontend** and **Laravel backend**.  
It supports **user roles**: Admin and Member.


## Features

- **Login Page** – Users can log in.  
- **Register Page** – Users can register as Admin or Member.  
- **Tasks Page**:
  - **Member**: See only their tasks and general tasks.  
  - **Admin**: Assign tasks to members.  


## Setup

### 1. Clone the repository
```bash
git clone https://github.com/hotdeth/gwork/
cd gwork
````

### 2. Backend (Laravel) Setup

```bash
cd backend/laravelfiles
composer install
cp .env.example .env
php artisan key:generate
# Set database credentials in .env
php artisan migrate
php artisan serve
```

The backend will run at `http://127.0.0.1:8000`

---

### 3. Frontend (React) Setup

```bash
cd frontend/reactfiles
npm install
npm start
```

The frontend will run at `http://localhost:3000` and communicate with Laravel backend.

---

## Usage

1. Register as **Admin** or **Member**.
2. Admin can create tasks and assign them to members.
3. Members can view their tasks and general tasks.

---

## Folder Structure

```
frontend/reactfiles   # React frontend
backend/laravelfiles  # Laravel backend
```

---

## Notes

* Make sure both **backend** and **frontend** are running to use the app.
* Update `.env` files for database and API URLs if needed.

---

## License

MIT License

```

---

