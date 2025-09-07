# 🔒 FeedbackVault  

An anonymous messaging platform built with **Next.js** that allows users to receive honest feedback without revealing identities. Send and receive messages completely anonymously!  


## 🌟 Features  

- 💬 **100% Anonymous Messaging** – Send messages without registration or identification  
- 🤖 **AI-Powered Suggestions** – Gemini API generates thoughtful message suggestions  
- 🔐 **Secure Authentication** – NextAuth with credential-based login system  
- ⚡ **Real-time Management** – Easy message management dashboard  
- 🎨 **Modern UI/UX** – Beautiful dark/light interface built with Tailwind CSS and Shadcn/UI  
- 📧 **Email Verification** – Resend integration for secure account verification  

---

## 🛠️ Tech Stack  

- **Framework**: Next.js (Full-stack)  
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
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env.local` file in the root directory:  
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   GEMINI_API_KEY=your_gemini_api_key
   RESEND_API_KEY=your_resend_api_key
   ```

   👉 You can generate a secret with:  
   ```bash
   openssl rand -base64 32
   ```

4. **Run the development server**  
   ```bash
   npm run dev
   ```

5. **Open your browser**  
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📖 Usage  

### 👤 For Receivers  

1. Create an account on FeedbackVault  
2. Share your unique profile link (e.g., `feedbackvault.com/u/yourusername`)  
3. Receive anonymous messages from anyone with your link  

### 📨 For Senders  

1. Visit any user's FeedbackVault link  
2. Type your anonymous message (no registration needed)  
3. Use AI suggestions for message ideas  
4. Send your message - it's completely untraceable!  

---

## 🏗️ Project Structure  

```
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
```

---

⭐️ Star this repo if you found it helpful!