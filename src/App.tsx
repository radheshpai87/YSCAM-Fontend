import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { VerifyPage } from './pages/VerifyPage';
import { ResultsPage } from './pages/ResultsPage'; 
import { ResourcesPage } from './pages/ResourcesPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;