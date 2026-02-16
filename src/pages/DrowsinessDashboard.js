// src/pages/DrowsinessDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowLeft, ExternalLink } from 'lucide-react';

export default function DrowsinessDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)' }}>

      {/* Header */}
      <div style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(229,231,235,0.5)',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => navigate('/')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: '#f3f4f6', border: 'none',
                borderRadius: '0.75rem', padding: '0.5rem 1rem',
                cursor: 'pointer', color: '#374151', fontWeight: 600,
                fontSize: '0.875rem'
              }}
            >
              <ArrowLeft size={16} /> Back to Home
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                padding: '0.65rem',
                background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                borderRadius: '0.875rem',
                boxShadow: '0 4px 12px rgba(124,58,237,0.3)'
              }}>
                <Brain size={22} color="white" />
              </div>
              <div>
                <h1 style={{
                  fontSize: '1.25rem', fontWeight: 800,
                  background: 'linear-gradient(to right, #7c3aed, #db2777)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>
                  Fatigue & Drowsiness Detection
                </h1>
                <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>Real-Time Patient Monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{
          background: 'rgba(255,255,255,0.92)',
          borderRadius: '1.5rem',
          boxShadow: '0 20px 25px rgba(0,0,0,0.08)',
          border: '1px solid rgba(229,231,235,0.5)',
          padding: '3rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #7c3aed, #db2777)',
            borderRadius: '1.25rem',
            width: '72px', height: '72px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <Brain size={38} color="white" />
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>
            Launch Fatigue Detection
          </h2>
          <p style={{ color: '#6b7280', lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.95rem' }}>
            The Fatigue Detection System runs as a <strong>Streamlit app</strong> (Python).
            Make sure it is running locally, then open it in your browser.
          </p>

          {/* Steps */}
          <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
            {[
              { step: '1', text: 'Open a terminal in your project folder' },
              { step: '2', text: 'Run: streamlit run drowsiness_app.py' },
              { step: '3', text: 'Click the button below to open it' },
            ].map(({ step, text }) => (
              <div key={step} style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '0.875rem 1rem',
                background: '#f9fafb', borderRadius: '0.875rem',
                marginBottom: '0.75rem', border: '1px solid #e5e7eb'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                  color: 'white', fontWeight: 800, fontSize: '0.85rem',
                  width: '30px', height: '30px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>{step}</div>
                <span style={{ color: '#374151', fontWeight: 500, fontSize: '0.9rem' }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Terminal Command */}
          <div style={{
            background: '#1e1b4b', borderRadius: '0.875rem',
            padding: '1rem 1.25rem', marginBottom: '2rem', textAlign: 'left'
          }}>
            <p style={{ color: '#a5b4fc', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              TERMINAL
            </p>
            <code style={{ color: '#e0e7ff', fontSize: '0.9rem', fontFamily: 'monospace' }}>
              streamlit run drowsiness_app.py
            </code>
          </div>

          {/* Open Button */}
          <a
            href="http://localhost:8501"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              background: 'linear-gradient(135deg, #7c3aed, #db2777)',
              color: 'white', fontWeight: 700, fontSize: '1rem',
              padding: '0.875rem 2rem', borderRadius: '0.875rem',
              textDecoration: 'none',
              boxShadow: '0 8px 20px rgba(124,58,237,0.35)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <ExternalLink size={20} />
            Open Fatigue Detection App
          </a>
        </div>
      </div>
    </div>
  );
}