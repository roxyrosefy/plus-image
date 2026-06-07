'use client';

import { useState } from 'react';

export default function PlusImage() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Por favor escribe un prompt detallado');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al generar la imagen');
      }

      const url = data.imageUrl;
      if (!url) throw new Error('No se recibió URL de imagen');

      setImageUrl(url);
      setHistory(prev => [url, ...prev].slice(0, 8));
    } catch (err: any) {
      setError(err.message || 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl">🔥</div>
            <h1 className="text-7xl font-bold tracking-tighter bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
              Plus Image
            </h1>
          </div>
          <p className="text-2xl text-zinc-400">Generador de imágenes +18 sin censura con IA</p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe con detalle la imagen +18 que quieres generar... (mujer curvy, lencería, pose, ambiente, etc.)"
            className="w-full h-40 p-8 bg-zinc-900 border border-zinc-700 rounded-3xl text-lg resize-y focus:outline-none focus:border-pink-500 placeholder-zinc-500"
          />
          
          <button
            onClick={generateImage}
            disabled={loading || !prompt.trim()}
            className="mt-6 w-full py-5 text-xl font-semibold rounded-3xl bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600 hover:brightness-110 transition-all disabled:opacity-60"
          >
            {loading ? 'Generando... (15-40 segundos)' : '🚀 Generar Imagen +18'}
          </button>
        </div>

        {error && <div className="max-w-3xl mx-auto mb-8 p-4 bg-red-950/50 border border-red-500/50 rounded-2xl text-red-400">{error}</div>}

        {imageUrl && (
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-center">Resultado</h2>
            <img src={imageUrl} alt="Generada" className="w-full rounded-3xl border border-zinc-800" />
            <div className="text-center mt-6">
              <a href={imageUrl} download className="px-10 py-4 bg-white text-black rounded-full font-semibold">⬇️ Descargar</a>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-center">Recientes</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {history.map((url, i) => (
                <img key={i} src={url} onClick={() => setImageUrl(url)} className="rounded-2xl cursor-pointer" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}