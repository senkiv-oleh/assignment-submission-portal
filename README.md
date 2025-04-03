
# Assignment Submission Portal

##  Overview
This is a Next.js application that allows candidates to submit their assignments. The application uses React Hook Form for validation.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-installation)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Improvements ](#improvements)
- [Contribution](#contribution)

##  Features
- Dynamic form validation using Yup & React Hook Form.
- Fetching candidate levels dynamically.
- API request handling.
- Local storage management for storing submitted assignments.
- Client-side routing with Next.js.

## Tech Stack

- **Frontend**: `Next.js` (App Router), `React`
- **Styling**: `Tailwind CSS`
- **Form Handling**: `react-hook-form`, `Yup` for schema validation
- **Type Safety**: `TypeScript`
- **Routing**: `next/navigation` (useRouter, NextLink)
- **Local Storage Management**: Custom hook `useLocalStorage`
- **Version Control**: `Git`, `GitHub`
- **Deployment**: `Vercel`
- **Linting & Formatting**: `ESLint`, `Prettier`

##  Project Structure
```
/src
├── app           # Next.js App Router structure
│   ├── thank-you # Thank You page route
├── components    # Reusable UI components
├── constants     # Application-wide constants
├── hooks         # Custom React hooks (e.g., localStorage, API handlers)
├── images        # Static assets and images
├── models        # Data models and structures
├── services      # API service functions
├── styles        # Global SCSS styles
├── types         # TypeScript types/interfaces
```

## Setup Instructions

### 1️. Clone the Repository
```sh
git clone https://github.com/yourusername/assignment-portal.git
cd assignment-portal
```

### 2️. Install Dependencies
```sh
npm install
# or
yarn install
```

### 3️. Run the Development Server
```sh
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

##  Deployment
The application is deployed on Vercel.  
**Live URL:** [https://assignment-submission-portal-sable.vercel.app/](https://assignment-submission-portal-sable.vercel.app/)

## API Endpoints
- **Fetch Candidate Levels:**  
  `GET https://tools.qa.ale.ai/api/tools/candidates/levels`
- **Submit Assignment:**  
  `POST https://tools.qa.ale.ai/api/tools/candidates/assignments`

## Improvements
- Add a loading skeleton for better UX.
- Implement authentication for secure submission.
- Improve form UI with animations.

## Contribution
Feel free to fork this repository and open a PR with your improvements!

---

© 2025 | Oleh
