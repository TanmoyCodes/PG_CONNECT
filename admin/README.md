# 🛠️ PGHunter Admin (pgAdmin)

**pgAdmin** is the **admin dashboard** for [PGHunter.in](https://pghunter.in).  
It allows authenticated admins to manage PG listings, add new properties, and maintain data efficiently.  

---

## 🚀 Features

- 🔐 **Admin Authentication**
  - Secure login & signup
  - JWT + cookies auth with backend validation
  - Protected routes using `PrivateRoute`

- 🏠 **PG Management**
  - Add new PG listings with all details
  - Upload multiple property images
  - Mark PGs as featured, sold out, or unpublished
  - Manage amenities, included facilities, and house rules

- 📋 **Advanced Form Handling**
  - Organized sections: Basic Info, Images, Amenities, Room Details, Contact, House Rules
  - File uploads using **FormData** + Axios
  - Nested object handling (amenities, house rules, etc.)
  - Real-time validation & UI feedback

- 🎨 **Modern UI**
  - Built with **React + TailwindCSS**
  - **Lucide Icons** for consistent UX
  - Responsive layout for desktop & mobile
  - Upload preview with loading states

---

## 🛠️ Tech Stack

- **Frontend Framework:** React.js (Vite)
- **State Management:** React Hooks + Context API (`AuthContext`)
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **UI:** Tailwind CSS + Lucide Icons
- **Backend API:** [PGHunter Backend](../pghunter-backend) (Node.js, Express, MongoDB)

---

## 📂 Folder Structure

```
pgAdmin/
│── src/
│   ├── components/
│   │   ├── PrivateRoute.jsx
│   │   ├── HomeRedirect.jsx
│   │   └── TakeImage.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── AddPG.jsx
│   │   ├── LoginPage.jsx
│   │   └── Signup.jsx
│   ├── App.jsx
│   ├── main.jsx
│
├── public/
│   └── index.html
│
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/pgAdmin.git
   cd pgAdmin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** → Create `.env` file
   ```env
   VITE_API_BASE_URL=http://localhost:4000
   ```

   Replace with your deployed backend URL when in production.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open in browser → [http://localhost:5173](http://localhost:5173)

---

## 🔑 Authentication Flow

- `App.jsx` runs `checkAuth()` on load  
- Calls backend `/api/v1/auth/checkAdmin` with cookies  
- If **valid**, `isAuthenticated=true` → Dashboard & AddPG unlocked  
- If **invalid**, user is redirected to Login  

---

## 📸 Screenshots (Add later)

- 🔑 Login Page  
- 📊 Dashboard  
- 🏠 Add PG Form with image uploads  

---

## 🌐 Deployment

- **Frontend:** Vercel / Netlify  
- **Backend:** Render / Railway / AWS / DigitalOcean  

Example:
```bash
npm run build
```
Then deploy the `dist/` folder.

---

## 👨‍💻 Author

Developed by **Rohit Kumar** ✨  
📧 Email: [your-email@example.com]  
🔗 LinkedIn: [Your Profile]  

---

## 📜 License

This project is licensed under the **MIT License**.  
