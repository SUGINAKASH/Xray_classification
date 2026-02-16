import React, { useState } from 'react';
import { Upload, Activity, AlertCircle, CheckCircle, Loader, Heart, TrendingUp, Eye, AlertTriangle } from 'lucide-react';
import './App.css';

export default function XRayDashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setResults(null);
      setError(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setResults(null);
      setError(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to analyze X-ray. Make sure the Flask server is running on port 5000.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = (prob) => {
    if (prob >= 0.7) return { text: 'High Risk', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    if (prob >= 0.5) return { text: 'Moderate Risk', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
    if (prob >= 0.3) return { text: 'Low Risk', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    return { text: 'Minimal Risk', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
  };

  const getProbabilityColor = (prob) => {
    if (prob >= 0.7) return 'from-red-500 to-red-600';
    if (prob >= 0.5) return 'from-orange-500 to-orange-600';
    if (prob >= 0.3) return 'from-yellow-500 to-yellow-600';
    return 'from-green-500 to-green-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  X-Ray Disease Detection
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">AI-Powered Medical Image Analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                <span className="text-xs font-semibold text-green-700">● System Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Upload Section - Modern Card Design */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8 mb-8 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Upload className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Upload X-Ray Image</h2>
          </div>
          
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="relative border-2 border-dashed border-gray-300 rounded-2xl p-16 text-center hover:border-blue-500 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer group"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-blue-500/5 rounded-2xl"></div>
              </div>
              <Upload className="w-20 h-20 text-gray-400 mx-auto mb-4 group-hover:text-blue-500 transition-colors" />
              <p className="text-xl font-semibold text-gray-700 mb-2">
                Drop your X-ray image here
              </p>
              <p className="text-sm text-gray-500 mb-6">PNG, JPG up to 10MB</p>
              <button
                type="button"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Upload className="w-5 h-5" />
                Browse Files
              </button>
            </label>
          </div>

          {preview && (
            <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-gray-600" />
                  <p className="font-semibold text-gray-700">Image Preview</p>
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Activity className="w-5 h-5" />
                      Start Analysis
                    </>
                  )}
                </button>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-inner">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-80 mx-auto rounded-lg"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-2xl p-5 flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900 mb-1">Analysis Failed</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-8 animate-fadeIn">
            {/* Stats Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 opacity-80" />
                  <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">PRIMARY</span>
                </div>
                <p className="text-sm opacity-90 mb-1">Top Detection</p>
                <p className="text-2xl font-bold">{results.top_prediction.disease}</p>
                <p className="text-3xl font-bold mt-2">{(results.top_prediction.probability * 100).toFixed(1)}%</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <AlertTriangle className="w-8 h-8 text-orange-600" />
                  <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">DETECTED</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">Conditions Found</p>
                <p className="text-4xl font-bold text-gray-900">
                  {results.predictions.filter(p => p.detected).length}
                </p>
                <p className="text-sm text-gray-500 mt-2">Above 50% threshold</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <Heart className="w-8 h-8 text-pink-600" />
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">ANALYZED</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">Total Conditions</p>
                <p className="text-4xl font-bold text-gray-900">15</p>
                <p className="text-sm text-gray-500 mt-2">Diseases screened</p>
              </div>
            </div>

            {/* Grad-CAM Visualization */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Grad-CAM Visualization</h2>
                  <p className="text-sm text-gray-600">Neural network attention mapping for {results.top_prediction.disease}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="group">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
                    <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Original Image
                    </p>
                    <div className="bg-white rounded-xl p-2 shadow-inner">
                      <img
                        src={results.images.original}
                        alt="Original"
                        className="w-full rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200 hover:shadow-lg transition-all duration-300">
                    <p className="text-sm font-semibold text-purple-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                      Attention Heatmap
                    </p>
                    <div className="bg-white rounded-xl p-2 shadow-inner">
                      <img
                        src={results.images.heatmap}
                        alt="Heatmap"
                        className="w-full rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200 hover:shadow-lg transition-all duration-300">
                    <p className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                      Combined Overlay
                    </p>
                    <div className="bg-white rounded-xl p-2 shadow-inner">
                      <img
                        src={results.images.overlay}
                        alt="Overlay"
                        className="w-full rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                <p className="text-sm text-gray-700 text-center">
                  <span className="font-semibold text-purple-700">Red/Hot zones</span> indicate regions that most strongly influenced the AI's prediction
                </p>
              </div>
            </div>

            {/* Detected Conditions - Priority Alert */}
            {results.predictions.filter(p => p.detected).length > 0 && (
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl shadow-xl border-2 border-red-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-red-900">Detected Conditions</h2>
                    <p className="text-sm text-red-700">Conditions with confidence ≥50%</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.predictions
                    .filter(p => p.detected)
                    .map((pred, idx) => {
                      const risk = getRiskLevel(pred.probability);
                      return (
                        <div
                          key={idx}
                          className={`${risk.bg} ${risk.border} border-2 rounded-2xl p-5 hover:shadow-lg transition-all duration-300`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 text-lg mb-1">{pred.disease}</h3>
                              <span className={`text-xs font-semibold ${risk.color} bg-white px-2 py-1 rounded-full`}>
                                {risk.text}
                              </span>
                            </div>
                            <div className="text-right">
                              <p className={`text-3xl font-bold ${risk.color}`}>
                                {(pred.probability * 100).toFixed(1)}%
                              </p>
                            </div>
                          </div>
                          <div className="relative w-full bg-white rounded-full h-3 overflow-hidden shadow-inner">
                            <div
                              className={`h-3 bg-gradient-to-r ${getProbabilityColor(pred.probability)} rounded-full transition-all duration-1000 shadow-lg`}
                              style={{ width: `${pred.probability * 100}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* All Disease Probabilities */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Complete Disease Probability Report</h2>
                  <p className="text-sm text-gray-600">Comprehensive analysis of all 15 conditions</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.predictions.map((pred, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">{pred.disease}</span>
                      {pred.detected && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {(pred.probability * 100).toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-500 pb-1">%</span>
                    </div>
                    <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 bg-gradient-to-r ${getProbabilityColor(pred.probability)} rounded-full transition-all duration-1000`}
                        style={{ width: `${pred.probability * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl shadow-xl border-2 border-amber-200 p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-xl flex-shrink-0">
                  <AlertCircle className="w-7 h-7 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-900 mb-3">Important Medical Disclaimer</h3>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    This AI-powered tool is designed for <span className="font-semibold">educational and research purposes only</span>. 
                    The predictions are generated by a deep learning model and should <span className="font-semibold">never be used as a 
                    substitute for professional medical diagnosis</span>. Always consult with qualified healthcare professionals for 
                    medical advice, diagnosis, and treatment. This system does not replace clinical judgment or medical expertise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}