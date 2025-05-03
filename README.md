# 🚀 SaaS URL Shortener

> A sleek and modern SaaS application for shortening URLs — built with **Next.js**, **Prisma**, **Supabase**, and **Tailwind CSS**. This tool helps users create, manage, and track short links with ease, all inside a clean, scalable full-stack architecture.

---

## ✨ Key Highlights

* 🔐 **Secure Authentication** with Supabase (Email & Password)
* ✂️ **Robust Short URL Generation** with edge case & collision handling
* 📈 **Future-Proof Analytics** (clicks, timestamps, referrers)
* 🧾 **User Dashboard** for managing links in real-time
* 🌍 **Custom Domain Support** (planned enhancement)
* 💡 **Clean Code Architecture** with modular folder structure
* 🖼️ **Responsive UI** styled using Tailwind CSS
* ✅ **Easily Scalable** and developer-friendly setup

---

## 🛠 Tech Stack

| Layer       | Technologies                |
| ----------- | --------------------------- |
| 💻 Frontend | Next.js, Tailwind CSS       |
| 🔙 Backend  | Next.js API Routes          |
| 🗃 Database | PostgreSQL (via Supabase)   |
| 🔄 ORM      | Prisma                      |
| 🔐 Auth     | Supabase Auth               |
| ☁️ Hosting  | Vercel / Supabase           |
| 🧪 Testing  | Jest (optional integration) |

---

## 🧩 Project Structure

```bash
📦 url-shortener-saas
├── app/                 # App Router pages
├── components/          # Reusable UI components
├── lib/                 # Utility functions (e.g., ID generator)
├── services/            # Supabase, Prisma, API helpers
├── prisma/              # Prisma schema & migrations
├── styles/              # Tailwind + global styles
└── api/                 # Auth & URL API endpoints
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Uvais-Ahmad/cut-url
cd cut-url
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SHORT_CODE_LENGTH
NEXT_PUBLIC_ANON_COOKIE_NAME
NEXT_PUBLIC_BASE_URL
SESSION_SECRET
```

### 4. Setup Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run Locally

```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 🔐 Authentication

This app uses **Supabase Auth** to secure user sessions. Protected routes are handled via Next.js middleware for seamless access control.

---

## 📊 Analytics (Upcoming Feature)

Planned analytics to include:

* Total click count
* Timestamp of visits
* Browser & referrer data
* IP and location tracking (optional)

---

## 🧪 Testing (Optional)

```bash
npm run test
```

Tests can be written using **Jest** or **Playwright**.

---

## ☁️ Deployment

You can deploy easily using **Vercel** or **Supabase Edge Functions**. Don't forget to add the environment variables to your hosting dashboard.

---

## 🤝 Contribution

Contributions, suggestions, and forks are welcome! Open a pull request to suggest improvements or new features.

---

## 📄 License

MIT License — free to use and modify.

---

## 👨‍💻 Author

Built by Uvais Ahmad(https://github.com/Uvais-Ahmad)

* 📧 Email: uvss21@gmail.com(mailto:uvss21@gmail.com)
* 🌐 LinkedIn: [https://www.linkedin.com/in/uvais-ahmad/](https://www.linkedin.com/in/uvais-ahmad/)

---

> ⭐ If you like this project, don't forget to star it on GitHub!
