# 🏠 PGHunter.in - Backend API  

This is the **backend server** for **PGHunter.in**, built with **Node.js, Express.js, and MongoDB**.  
It provides secure APIs for user authentication, PG management, and contact form handling.  

---

## 🚀 Features  

- 👤 **Authentication APIs**  
  - Register users  
  - Login with JWT + cookies  
  - Role-based access (Admin & User)  

- 🏠 **PG Management APIs**  
  - Create new PG listings  
  - Get all PGs (public & admin-specific)  
  - Fetch PG details by ID  
  - Update PG details (Admin only)  
  - Upload PG images  

- 📩 **Contact Us API**  
  - Send queries/messages from the frontend  
  - Email notifications via **Nodemailer**  

- ⚡ **Other Features**  
  - Secure cookie & CORS handling  
  - File upload support  
  - Environment variable configuration with **dotenv**  

---

## 🛠️ Tech Stack  

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB (via Mongoose)  
- **Authentication:** JWT, Cookies  
- **Email Service:** Nodemailer  
- **File Uploads:** express-fileupload  
- **CORS & Security:** cookie-parser, cors  

---

## 📂 Folder Structure  

```
pghunter-backend/
│── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── auth-controller.js
│   │   ├── pg-controllers.js
│   ├── middlewares/
│   │   └── auth-middleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── pgRoutes.js
│   │   └── index.js
│   ├── utils/
│   │   └── emailHelpers.js
│   └── ...
│
├── server.js (entry point)
├── package.json
├── .env
└── README.md
```

---

## ⚙️ Installation & Setup  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/pghunter-backend.git
   cd pghunter-backend
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Configure environment variables** → Create a `.env` file in the root directory  

   ```env
   PORT=4000
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   PROD=production
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-email-password
   ```

4. **Run the server**  
   ```bash
   node server.js
   ```
   or (for development with nodemon)  
   ```bash
   npm run dev
   ```

5. Backend will be running on →  
   ```
   http://localhost:4000
   ```

---

## 📡 API Endpoints  

### 🔑 Auth Routes (`/api/v1/auth`)  
- `POST /register` → Register new user  
- `POST /login` → Login user & set cookie  
- `GET /checkAdmin` → Check if logged-in user is admin  

### 🏠 PG Routes (`/api/v1/pg`)  
- `POST /createpg` → Create new PG  
- `GET /allpg` → Get all PGs  
- `GET /admin/allpg` → Get all PGs (Admin only)  
- `GET /byid/:id` → Get PG by ID  
- `PATCH /update` → Update PG (Admin only)  
- `POST /upload/img` → Upload PG image  

### 📩 Contact Us Route  
- `POST /api/v1/contactus` → Send message (sends email notification)  

---

## 🌐 Deployment  

You can deploy this backend to:  
- **Render** → [Render Deployment Docs](https://render.com/docs/deploy-node-express-app)  
- **Vercel** (with serverless functions)  
- **AWS / Railway / Heroku**  

---

## 👨‍💻 Author  

Developed by **Rohit Kumar** ✨  
📧 Email: [your-email@example.com]  
🔗 LinkedIn: [Your Link]  

---

## 📜 License  

This project is licensed under the **MIT License**.  

