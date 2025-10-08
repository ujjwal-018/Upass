# 🛡️ Password Manager App

A secure and simple web application to store and manage your passwords safely. Built using **Next.js**, **MongoDB**, and **JWT Authentication**.

---

## 🚀 Features

- 🔐 User Authentication (Signup & Login with JWT)  
- 🧠 Add, View, Edit, and Delete Passwords  
- 🕵️ Search functionality (search vault items by any field)  
- 👁️ Password hide/show toggle  
- 💾 Secure storage using MongoDB  
- 🧩 Responsive and clean UI with CSS  

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React
- **Backend:** Next.js API Routes  
- **Database:** MongoDB (Mongoose ORM)  
- **Authentication:** JWT (JSON Web Token)  

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally 👇  

### 1. Clone the repository  
```bash
git clone https://github.com/<your-username>/password-manager.git
cd password-manager

2. Install dependencies

npm install

3. Create .env.local file

Add your environment variables inside .env.local in the root directory:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4. Run the development server

npm run dev

Now open your browser and go to http://localhost:3000
