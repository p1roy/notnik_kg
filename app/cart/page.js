'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(items)
  }, [])

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCartItems(updatedCart)
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Корзина товаров</h1>
      {cartItems.length === 0 && (
        <p className="text-gray-600">Корзина пуста</p>
      )}
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b py-4"
        >
          <div className="flex items-center gap-4">
            <Image
              src={item.image}
              alt={item.title}
              width={80}
              height={80}
              className="rounded"
            />
            <div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="font-bold">${item.price}</p>
            </div>
          </div>
          <button
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
            onClick={() => removeFromCart(item.id)}
          >
            Удалить
          </button>
        </div>
      ))}
      
      {cartItems.length > 0 && (
        <div className="mt-6">
          <Link href="/checkout">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Перейти к оформлению
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
