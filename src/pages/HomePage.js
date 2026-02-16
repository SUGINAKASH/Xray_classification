// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Brain, ArrowRight, Shield, Zap, BarChart2 } from 'lucide-react';

export default function HomePage() {
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
            <div style={{
              padding: '0.75rem',
              background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
              borderRadius: '1rem',
              boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
            }}>
              <Shield size={28} color="white" />
            </div>
            <div>
              <h1 style={{
                fontSize: '1.5rem', fontWeight: 800,
                background: 'linear-gradient(to right, #2563eb, #4f46e5)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                MedAI Diagnostics
              </h1>
              <p style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '0.1rem' }}>
                AI-Powered Medical Analysis Platform
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(37,99,235,0.1)',
            border: '1px solid rgba(37,99,235,0.2)',
            borderRadius: '9999px',
            padding: '0.4rem 1.2rem',
            marginBottom: '1.5rem'
          }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2563eb', letterSpacing: '0.05em' }}>
              ● POWERED BY DEEP LEARNING
            </span>
          </div>
          <h2 style={{
            fontSize: '3rem', fontWeight: 900, color: '#111827',
            lineHeight: 1.15, marginBottom: '1.25rem'
          }}>
            Advanced Medical<br />
            <span style={{
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              AI Diagnostics
            </span>
          </h2>
          <p style={{
            fontSize: '1.1rem', color: '#6b7280',
            maxWidth: '36rem', margin: '0 auto', lineHeight: 1.7
          }}>
            Choose a diagnostic tool below. Our AI models deliver real-time,
            explainable medical insights to support clinical decision-making.
          </p>
        </div>

        {/* Tool Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>

          {/* Card 1 - X-Ray */}
          <div
            onClick={() => navigate('/xray')}
            style={{
              background: 'rgba(255,255,255,0.92)',
              borderRadius: '1.5rem',
              boxShadow: '0 20px 25px rgba(0,0,0,0.08)',
              border: '1px solid rgba(229,231,235,0.5)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 32px 48px rgba(37,99,235,0.18)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 20px 25px rgba(0,0,0,0.08)';
            }}
          >
            {/* Card Top Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                width: '120px', height: '120px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '50%'
              }} />
              <div style={{
                position: 'absolute', bottom: '-30px', right: '40px',
                width: '80px', height: '80px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '50%'
              }} />
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '1rem',
                width: '56px', height: '56px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Activity size={30} color="white" />
              </div>
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white', fontSize: '0.7rem', fontWeight: 700,
                padding: '0.25rem 0.75rem', borderRadius: '9999px',
                letterSpacing: '0.08em'
              }}>
                IMAGING ANALYSIS
              </span>
            </div>

            {/* Card Body */}
            <div style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827', marginBottom: '0.6rem' }}>
                Chest X-Ray Disease Detection
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                Upload a chest X-ray image and detect up to <strong>15 thoracic diseases</strong> using
                a ResNet deep learning model, with Grad-CAM heatmap visualization.
              </p>

              {/* Feature Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
                {['15 Diseases', 'Grad-CAM', 'ResNet Model', '93% Accuracy'].map(tag => (
                  <span key={tag} style={{
                    background: '#eff6ff', color: '#2563eb',
                    fontSize: '0.75rem', fontWeight: 600,
                    padding: '0.3rem 0.75rem', borderRadius: '9999px',
                    border: '1px solid #bfdbfe'
                  }}>{tag}</span>
                ))}
              </div>

              {/* CTA */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'linear-gradient(135deg, #eff6ff, #eef2ff)',
                borderRadius: '0.875rem', padding: '1rem 1.25rem',
                border: '1px solid #bfdbfe'
              }}>
                <span style={{ fontWeight: 700, color: '#2563eb', fontSize: '0.95rem' }}>
                  Launch X-Ray Analysis
                </span>
                <div style={{
                  background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                  borderRadius: '50%', width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(37,99,235,0.4)'
                }}>
                  <ArrowRight size={18} color="white" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Drowsiness */}
          <div
            onClick={() => navigate('/drowsiness')}
            style={{
              background: 'rgba(255,255,255,0.92)',
              borderRadius: '1.5rem',
              boxShadow: '0 20px 25px rgba(0,0,0,0.08)',
              border: '1px solid rgba(229,231,235,0.5)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 32px 48px rgba(124,58,237,0.18)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 20px 25px rgba(0,0,0,0.08)';
            }}
          >
            {/* Card Top Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                width: '120px', height: '120px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '50%'
              }} />
              <div style={{
                position: 'absolute', bottom: '-30px', right: '40px',
                width: '80px', height: '80px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '50%'
              }} />
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '1rem',
                width: '56px', height: '56px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Brain size={30} color="white" />
              </div>
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white', fontSize: '0.7rem', fontWeight: 700,
                padding: '0.25rem 0.75rem', borderRadius: '9999px',
                letterSpacing: '0.08em'
              }}>
                REAL-TIME MONITORING
              </span>
            </div>

            {/* Card Body */}
            <div style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827', marginBottom: '0.6rem' }}>
                Fatigue & Drowsiness Detection
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                Real-time webcam-based patient fatigue monitoring using <strong>facial landmark detection</strong>,
                tracking EAR, MAR, blink rate and generating PDF session reports.
              </p>

              {/* Feature Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
                {['Real-Time', 'EAR / MAR', 'PDF Report', 'Blink Tracking'].map(tag => (
                  <span key={tag} style={{
                    background: '#faf5ff', color: '#7c3aed',
                    fontSize: '0.75rem', fontWeight: 600,
                    padding: '0.3rem 0.75rem', borderRadius: '9999px',
                    border: '1px solid #e9d5ff'
                  }}>{tag}</span>
                ))}
              </div>

              {/* CTA */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'linear-gradient(135deg, #faf5ff, #fdf2f8)',
                borderRadius: '0.875rem', padding: '1rem 1.25rem',
                border: '1px solid #e9d5ff'
              }}>
                <span style={{ fontWeight: 700, color: '#7c3aed', fontSize: '0.95rem' }}>
                  Launch Fatigue Monitor
                </span>
                <div style={{
                  background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                  borderRadius: '50%', width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(124,58,237,0.4)'
                }}>
                  <ArrowRight size={18} color="white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          borderRadius: '1.5rem',
          border: '1px solid rgba(229,231,235,0.5)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
          padding: '1.75rem 2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem'
        }}>
          {[
            { icon: <Activity size={22} color="#2563eb" />, value: '15', label: 'Diseases Detected', bg: '#eff6ff' },
            { icon: <Zap size={22} color="#7c3aed" />, value: '93%', label: 'Model Accuracy', bg: '#faf5ff' },
            { icon: <BarChart2 size={22} color="#059669" />, value: '2', label: 'AI Tools Available', bg: '#f0fdf4' },
            { icon: <Shield size={22} color="#d97706" />, value: '100%', label: 'Research Purpose', bg: '#fffbeb' },
          ].map((stat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <div style={{
                background: stat.bg, borderRadius: '0.75rem',
                width: '44px', height: '44px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                {stat.icon}
              </div>
              <div>
                <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', lineHeight: 1 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '0.15rem' }}>
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p style={{
          textAlign: 'center', marginTop: '2rem',
          fontSize: '0.78rem', color: '#9ca3af', lineHeight: 1.6
        }}>
          ⚠️ For educational and research purposes only. Not a substitute for professional medical diagnosis.
        </p>
      </div>
    </div>
  );
}