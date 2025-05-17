# YSCAM - Scam Detection Application

A web application for detecting and analyzing potential scams in text messages and documents.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, TailwindCSS, Framer Motion
- **API Communication**: Axios
- **Form Handling**: Formspree, React Dropzone
- **Routing**: React Router Dom

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd project

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```
VITE_API_URL=https://yscam-api.onrender.com
```

## Deployment on Vercel

This project is configured for easy deployment on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the repository on Vercel
3. Set the following configurations:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: Add `VITE_API_URL` with your API endpoint

## Features

- Scam detection in text messages
- PDF document analysis
- Educational resources about common scams
- Result sharing and reporting
- Feedback system
