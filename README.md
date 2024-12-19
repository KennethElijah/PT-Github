# Chat Application

## Objective
The Chat Application is designed to facilitate real-time communication between users in a simple and intuitive interface. The project aims to provide an easy-to-use platform for messaging, focusing on essential features to enhance user interaction.

## Scope
This application is ideal for:
- Small groups or individuals needing a lightweight chat tool.
- Beginners exploring web development and real-time communication technologies.
- Collaborative environments requiring a simple messaging platform.

---

## Features

### 1. **Real-Time Messaging**
- Users can send and receive messages instantly.
- Messages are displayed in chronological order.

### 2. **User Authentication**
- Basic login system to identify users.
- Unique usernames for each participant.

### 3. **Chat Room Functionality**
- Single chat room for organized conversations.

---

## Project Structure
```
ChatApp/
├── index.html          # Entry point of the application
├── homepage.html       # Main chat interface
├── styles/             # Directory for CSS files
│   └── style.css       # Styling for the application
├── scripts/            # Directory for JavaScript files
│   └── app.js          # Handles application logic
├── server/             # (Optional) Backend server files
│   └── server.js       # Server logic for real-time communication
└── assets/             # Images, icons, and other assets
```

---

## Installation and Usage

### 1. **Clone the Repository**
```bash
git clone https://github.com/KennethElijah/PT-Github.git
cd ChatApp
```

### 2. **Run the Application**
- Open `index.html` in a browser.
- For real-time messaging, set up the server (if applicable):
  ```bash
  cd server
  node server.js
  ```

### 3. **Access the Chat App**
- Navigate to https://pt-101chatapp.web.app/.

---

## Documentation

### Challenges Faced
- Ensuring real-time communication worked seamlessly.
- Managing user sessions and preventing duplicate usernames.

### Solutions Implemented
- Firebase for real-time data transmission.
- Unique usernames on both client and server sides.

---

## Credits
This project was collaboratively developed by a team of developers to practice GitHub workflows and teamwork.

---

## License
[MIT License](LICENSE)
