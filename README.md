# 🌍 AI Trip Planner

**AI Trip Planner** is an intelligent travel planning application that allows users to create personalized itineraries based on their preferences such as **budget, companions, restrictions, and travel goals**. The app leverages **AI** to craft optimized trip plans, making travel planning seamless and efficient.


---

## 🚀 Features

* ✅ **AI-Powered Itinerary Generation** – Create custom travel plans with Gemini AI.
* ✅ **Budget & Preference-Based** – Tailored suggestions based on budget and travel goals.
* ✅ **Companion & Restriction Support** – Account for travel companions and personal constraints.
* ✅ **Interactive Map** – Visualize trips using **Leaflet**.
* ✅ **Authentication & Security** – Integrated with **Clerk** and **Arcjet**.
* ✅ **Responsive UI** – Built with **TailwindCSS** and **shadcn/ui**.
* ✅ **Real-Time Data** – Fetches places and attractions using **Google Places API**.
* ✅ **Scalable Backend** – Powered by **Convex** for real-time state management.

---

## 🛠 Tech Stack

* **Frontend:** [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [TailwindCSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
* **Authentication:** [Clerk](https://clerk.com/)
* **AI Integration:** [Google Gemini](https://ai.google/), [Arcjet](https://arcjet.com/)
* **Database & State:** [Convex](https://www.convex.dev/)
* **Maps:** [Leaflet](https://leafletjs.com/)
* **External APIs:** [Google Places API](https://developers.google.com/places)

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory and configure the following variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
ARCJET_KEY=
GEMINI_API_KEY=
GOOGLE_PLACE_API_KEY=
```

---

## ▶️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/diegovilhalva/ai-trip-planner.git
cd ai-trip-planner
```

Install dependencies:

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:3000`.

---







## 📜 License

This project is licensed under the **MIT License**.


