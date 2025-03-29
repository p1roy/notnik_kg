import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "Магазин ноутбуков",
  description: "Магазин ноутбуков и аксессуаров",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="https://nabppwewtdxybjsmnfpn.supabase.co/storage/v1/object/public/products-images//logo1.png"
                alt="Логотип магазина"
                width={40}
                height={40}
                className="rounded object-contain"
              />
              <span className="text-xl font-semibold text-gray-800">Магазин ноутбуков</span>
            </Link>
            <Link href="/cart" className="font-semibold text-blue-600 hover:text-blue-800 transition">
              Корзина 🛒
            </Link>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
