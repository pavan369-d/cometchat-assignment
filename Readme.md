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
cd cometchat-integration
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

### Login with Redirection Delay
```javascript
CometChat.login(uid, apiKey).then(user => {
    localStorage.setItem("user", JSON.stringify(user.getUid()));
    dispatch({ type: "LOGIN", payload: user.getUid() });
    toast.success("Login Success");
    setTimeout(() => navigate("/"), 1500);
}).catch(handleError);
```

### Protected Route Example
```javascript
const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();
  return user ? children : <Navigate to="/login" replace />;
};
```

---

## ⚠️ Issues Faced During CometChat Integration

### 1️⃣ UIKit CSS Variables & Styling Conflicts
- **Issue:** CometChat UIKit depends on CSS variables defined in their `uikit.css`. 
- **Problem Faced:** In setups using Vite, Next.js, or TailwindCSS, these variables were either not applied or overridden.
- **Impact:** Resulted in broken UI styles, incorrect colors, and layout issues.
- **Solution:** 
  - Imported UIKit CSS globally:
    ```javascript
    import '@cometchat/uikit-react/resources/uikit.css';
    ```
  - Scoped styles and adjusted Tailwind `preflight` settings to avoid conflicts.

---

### 2️⃣ React Version Compatibility Issues
- **Issue:** CometChat UIKit v3 had compatibility problems with React 18.
- **Problem Faced:** Usage of deprecated methods like `ReactDOM.render()` caused errors:


## Feedback on CometChat Documentation 📄

### Pros:
- The basic documentation is clear for setup.
- Sample codes are useful for quick testing.


### UI/UX Feedback (Website):
- Navigation is smooth.
---

## Live Link / Repository 🔗
[GitHub Repository](https://github.com/pavan369-d/cometchat-assignment.git)

---

## Conclusion 🌟
Successfully integrated CometChat SDK with user authentication, one-to-one chat, route protection, and backend communication. The integration is complete with API configuration targeting the IN region and responsive UI adjustments.

---



