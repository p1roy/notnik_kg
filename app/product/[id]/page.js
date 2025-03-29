'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import Image from 'next/image'

export default function ProductPage() {
  const [product, setProduct] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error) console.error(error)
      else setProduct(data)
    }

    if (id) fetchProduct()
  }, [id])

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cart.push(product)
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Товар добавлен в корзину!')
  }

  if (!product) return <div className="text-center p-10">Загрузка...</div>

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <Image
        src={product.image}
        alt={product.title}
        width={800}
        height={400}
        className="rounded-xl mb-6"
      />
      <p className="text-xl font-semibold mb-4">${product.price}</p>
      <p className="text-gray-700">{product.description}</p>

      <button
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        onClick={addToCart}
      >
        Добавить в корзину
      </button>
    </div>
  )
}