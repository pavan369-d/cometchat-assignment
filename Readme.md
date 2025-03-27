# CometChat Integration Assignment 🚀

## Objective
Integrate CometChat's chat feature into the project and ensure the following functionalities:

- User creation (Signup)
- User Authentication (Login)
- One-to-One chat functionality
- Correct API Region Configuration

---

## Features Implemented

- 🔺 **User Signup/Login**
- 🔺 **One-to-One Real-time Chat**
- 🔺 **API Region Configuration (IN)**
- 🔺 **Protected Routes (Authenticated Access)**
- 🔺 **LocalStorage User Persistence**


---

## Setup Instructions 📦

1. **Clone the Repository:**
```bash
git clone <your-repository-link>
cd my-app
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Environment Variables:**
Create a `.env` file and add:
```
VITE_API_KEY=your_cometchat_api_key
VITE_APP_ID=your_cometchat_app_id
VITE_REGION=in
VITE_BACKEND_URL=http://localhost:5000/  # Adjust according to your backend
```

4. **Run the App:**
```bash
npm run dev
```

---

## Project Structure 🌟
```
|-- src
    |-- components
    |-- pages
    |-- hooks
    |-- styles
    |-- cometchatinit
    |-- protectedroutes
```

---

## Core Code Snippets

### CometChat Initialization
```javascript
import { CometChat } from '@cometchat/chat-sdk-javascript';

const appID = import.meta.env.VITE_APP_ID;
const region = import.meta.env.VITE_REGION;
const apiKey = import.meta.env.VITE_API_KEY;

const initializer = () => {
    CometChat.init(appID, { region }).then(() => {
        console.log('CometChat Initialized');
    }).catch(console.error);
}
export default initializer;
```


```

```

---
## Conclusion 🌟
Successfully integrated CometChat SDK with user authentication, one-to-one chat, route protection, and backend communication. The integration is complete with API configuration targeting the IN region and responsive UI adjustments.

---



