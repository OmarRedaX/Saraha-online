# 📬 Saraha Online Backend

Saraha Online is a backend application built with **Node.js** and **Express.js** that powers an anonymous messaging platform.  
It includes user authentication, profile management, secure message handling, and essential backend features to support a complete anonymous chat experience.

---

## 🚀 Features
- User registration and login
- Authentication and authorization (JWT)
- Profile management
- Secure message handling
- Email confirmation & password security
- Input validation and robust error handling
- Modular and scalable project structure

---

## 🛠️ Built With
- Node.js
- Express.js
- MongoDB (or your preferred database)
- Mongoose
- JSON Web Token (JWT)
- dotenv
- bcrypt

---

## ⚙️ Installation & Setup
1. Clone the repository  
   ```bash
   git clone https://github.com/OmarRedaX/Saraha-online.git
   ```

2. Go into the project directory  
   ```bash
   cd Saraha-online
   ```

3. Install dependencies  
   ```bash
   npm install
   ```

4. Create a `.env` file in the root folder and add:
   ```env
   PORT=5000
   DB_URI=your_database_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the server  
   ```bash
   npm start
   ```

---

## 📌 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/users/:id` | Get user profile |
| PUT | `/api/users/:id` | Update user profile |
| DELETE | `/api/users/:id` | Delete user |
| POST | `/api/messages` | Send a message |
| GET | `/api/messages/:userId` | Get messages for a user |

*(Adjust the table based on your actual routes)*

---

## 🧪 Testing
You can test the APIs using Postman, Insomnia, or Thunder Client.  
Make sure to include the **JWT token** in the Authorization header when calling protected routes.

---

## 🤝 Contributing
Contributions are welcome!  
1. Fork the project  
2. Create your feature branch (`git checkout -b feature/YourFeature`)  
3. Commit your changes (`git commit -m "Add feature"`)  
4. Push to the branch (`git push origin feature/YourFeature`)  
5. Open a Pull Request


---

## 👤 Author
**Omar Reda**  
GitHub: https://github.com/OmarRedaX


# run 
npm run dev
