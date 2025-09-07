# 🔒 FeedbackVault  

An anonymous messaging platform built with **Next.js** that allows users to receive honest feedback without revealing identities. Send and receive messages completely anonymously!  

![FeedbackVault Banner](https://thefeedbackvault.vercel.app/og-image.png)  

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://thefeedbackvault.vercel.app/)  
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/m-rayan-hassan/feedbackvault)  

---

## 🌟 Features  

- 💬 **100% Anonymous Messaging** – Send messages without registration or identification  
- 🤖 **AI-Powered Suggestions** – Gemini API generates thoughtful message suggestions  
- 🔐 **Secure Authentication** – NextAuth with credential-based login system  
- ⚡ **Real-time Management** – Easy message management dashboard  
- 🎨 **Modern UI/UX** – Beautiful dark/light interface built with Tailwind CSS and Shadcn/UI  
- 📧 **Email Verification** – Resend integration for secure account verification  

---

## 🛠️ Tech Stack  

- **Framework**: Next.js 14 (Full-stack)  
- **Language**: TypeScript  
- **Database**: MongoDB with Mongoose ODM  
- **Authentication**: NextAuth.js  
- **Styling**: Tailwind CSS + Shadcn/UI  
- **Validation**: Zod  
- **AI**: Google Gemini API  
- **Emails**: Resend  
- **Deployment**: Vercel  

---

## 🚀 Getting Started  

### ✅ Prerequisites  

- Node.js **18+**  
- MongoDB Atlas account (or local MongoDB instance)  
- Google Gemini API key  
- Resend API key (for email functionality)  

### 📦 Installation  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/m-rayan-hassan/feedbackvault.git
   cd feedbackvault

Install dependencies

npm install


Set up environment variables
Create a .env.local file in the root directory:

MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key
RESEND_API_KEY=your_resend_api_key


👉 You can generate a secret with:

openssl rand -base64 32


Run the development server

npm run dev


Open your browser
Navigate to http://localhost:3000

📖 Usage
👤 For Receivers

Create an account on FeedbackVault

Share your unique profile link (e.g., feedbackvault.com/u/yourusername)

Receive anonymous messages from anyone with your link

📨 For Senders

Visit any user’s FeedbackVault link

Type your anonymous message (no registration needed)

Use AI suggestions for message ideas

Send your message – it’s completely untraceable!

🏗️ Project Structure
📦 src
 ┣ 📂 app
 ┃ ┣ 📂 (app)          # Protected routes
 ┃ ┃ ┣ 📂 dashboard
 ┃ ┃ ┣ 📜 layout.tsx
 ┃ ┃ ┗ 📜 page.tsx
 ┃ ┣ 📂 (auth)         # Authentication routes
 ┃ ┃ ┣ 📂 sign-in
 ┃ ┃ ┣ 📂 sign-up
 ┃ ┃ ┗ 📂 verify/[username]
 ┃ ┣ 📂 api            # API endpoints
 ┃ ┃ ┣ 📂 auth/[...nextauth]
 ┃ ┃ ┣ 📂 accept-messages
 ┃ ┃ ┣ 📂 check-username-unique
 ┃ ┃ ┣ 📂 delete-message/[messageid]
 ┃ ┃ ┣ 📂 get-messages
 ┃ ┃ ┣ 📂 get-users
 ┃ ┃ ┣ 📂 send-message
 ┃ ┃ ┣ 📂 sign-up
 ┃ ┃ ┣ 📂 suggest-messages
 ┃ ┃ ┗ 📂 verify-code
 ┃ ┣ 📂 u/[username]   # Public user profiles
 ┃ ┣ 📜 globals.css
 ┃ ┗ 📜 layout.tsx
 ┣ 📂 components
 ┃ ┣ 📂 ui            # Shadcn/UI components
 ┃ ┃ ┣ 📜 alert-dialog.tsx
 ┃ ┃ ┣ 📜 button.tsx
 ┃ ┃ ┣ 📜 card.tsx
 ┃ ┃ ┣ 📜 carousel.tsx
 ┃ ┃ ┣ 📜 form.tsx
 ┃ ┃ ┗ 📜 ... (other UI components)
 ┃ ┣ 📜 MessageCard.tsx
 ┃ ┣ 📜 Navbar.tsx
 ┃ ┗ 📜 background.tsx
 ┣ 📂 lib
 ┃ ┣ 📜 dbConnect.ts
 ┃ ┣ 📜 resend.ts
 ┃ ┗ 📜 utils.ts
 ┣ 📂 models
 ┃ ┗ 📜 User.ts
 ┣ 📂 schemas         # Zod validation schemas
 ┃ ┣ 📜 acceptMessageSchema.ts
 ┃ ┣ 📜 signInSchema.ts
 ┃ ┣ 📜 signUpSchema.ts
 ┃ ┗ 📜 verifySchema.ts
 ┣ 📂 types           # TypeScript definitions
 ┃ ┣ 📜 ApiResponse.ts
 ┃ ┗ 📜 next-auth.d.ts
 ┣ 📜 messages.json   # Sample messages
 ┗ 📜 middleware.ts   # Next.js middleware

🔧 API Endpoints
Method	Endpoint	Description
POST	/api/sign-up	User registration
POST	/api/verify-code	Email verification
POST	/api/send-message	Send anonymous messages
GET	/api/get-messages	Retrieve user messages
POST	/api/suggest-messages	AI message suggestions
DELETE	/api/delete-message	Delete messages