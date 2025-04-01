'use client'
import { useEffect, useState } from 'react'

export default function CheckoutPage() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'))
  }, [])

  const totalPrice = cart.reduce((total, product) => total + Number(product.price), 0)

  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">Оформление заказа</h1>

      {cart.map((product) => (
        <div key={product.id} className="flex justify-between border-b py-4">
          <span>{product.title}</span>
          <p className="font-bold">{product.price} сом</p>
        </div>
      ))}

      <div className="flex justify-between font-bold text-xl py-6">
        <span>Итого:</span>
        <span>${totalPrice}</span>
      </div>

      <button
        onClick={() => alert('Заказ успешно оформлен!')}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Подтвердить заказ
      </button>
    </div>
  )
}
