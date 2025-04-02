'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('new')

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)

      if (error) {
        console.error(error)
      } else {
        setProducts(data)
      }
    }

    fetchProducts()
  }, [category])

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">

        <Image
          src="https://nabppwewtdxybjsmnfpn.supabase.co/storage/v1/object/public/products-images/logo2.jpeg"
          alt="Баннер магазина"
          width={1200}
          height={300}
          className="w-full h-auto rounded-lg shadow-md mb-10"
        />

        <div className="flex justify-center gap-4 mb-8">
          {['new', 'used', 'accessories'].map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-lg shadow transition font-semibold ${
                category === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat === 'new' && 'Новые'}
              {cat === 'used' && 'Б/У'}
              {cat === 'accessories' && 'Аксессуары'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={200}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">{product.title}</h3>
                <p className="text-gray-700 font-bold mb-3">{product.price} KGS</p>
                <Link href={`/product/{product.id} KGS`}>
                  <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Подробнее
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
