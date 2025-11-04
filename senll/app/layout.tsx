import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Senll Wooden Puzzles - Premium Educational Toys',
  description: 'Discover handcrafted wooden puzzles for kids and adults. Educational, eco-friendly, and beautifully designed puzzles from Senll.',
  keywords: 'wooden puzzles, educational toys, kids puzzles, eco-friendly toys, handcrafted puzzles',
  authors: [{ name: 'Senll' }],
  openGraph: {
    title: 'Senll Wooden Puzzles',
    description: 'Premium handcrafted wooden puzzles for all ages',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>

          <footer className="bg-gray-900 text-white mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">🧩 Senll</h3>
                  <p className="text-gray-400">Premium handcrafted wooden puzzles for educational fun.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Products</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="/products" className="hover:text-white transition">All Puzzles</a></li>
                    <li><a href="/products?category=kids" className="hover:text-white transition">Kids Puzzles</a></li>
                    <li><a href="/products?category=adult" className="hover:text-white transition">Adult Puzzles</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Company</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                    <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                    <li><a href="/shipping" className="hover:text-white transition">Shipping Info</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
                    <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 Senll Wooden Puzzles. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}
