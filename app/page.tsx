'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      // TODO: Replace with your fal.ai or Replicate API call
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.image) {
        setImage(data.image);
        setHistory(prev => [data.image, ...prev].slice(0, 10));
      }
    } catch (error) {
      alert('Error al generar imagen: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          PLUS IMAGE
        </h1>
        <p className="text-center text-xl mb-12 text-gray-400">Generador de imágenes +18 con IA</p>

        <div className="bg-zinc-900 rounded-3xl p-8 mb-12">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe la imagen +18 que quieres generar... (mujer curvy, pose sensual, etc.)"
            className="w-full h-32 bg-zinc-800 text-white p-6 rounded-2xl border border-zinc-700 focus:border-pink-500 outline-none resize-y"
          />
          <button
            onClick={generateImage}
            disabled={loading || !prompt.trim()}
            className="mt-6 w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:opacity-50 py-5 rounded-2xl text-xl font-semibold transition-all"
          >
            {loading ? 'Generando...' : '🚀 Generar Imagen +18'}
          </button>
        </div>

        {image && (
          <div className="mb-12">
            <h2 className="text-2xl mb-6">Resultado</h2>
            <img src={image} alt="Generated" className="rounded-3xl shadow-2xl mx-auto max-w-full" />
            <a href={image} download className="block mt-6 text-center text-pink-400 hover:text-pink-300">⬇️ Descargar</a>
          </div>
        )}

        {history.length > 0 && (
          <div>
            <h2 className="text-2xl mb-6">Historial reciente</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {history.map((img, i) => (
                <img key={i} src={img} className="rounded-xl cursor-pointer hover:scale-105 transition" onClick={() => setImage(img)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}