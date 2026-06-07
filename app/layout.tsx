import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Plus Image - Generador +18',
  description: 'Genera imágenes adultas con IA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}