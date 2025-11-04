import Image from 'next/image'

export const metadata = {
  title: 'All Products - Senll Wooden Puzzles',
  description: 'Browse our complete collection of handcrafted wooden puzzles',
}

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: 'Animal Kingdom Puzzle',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&h=500&fit=crop',
      description: 'Educational 48-piece wooden puzzle featuring safari animals',
      category: 'kids',
      ageRange: '3-6 years',
      pieces: 48
    },
    {
      id: 2,
      name: 'World Map Puzzle',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&h=500&fit=crop',
      description: 'Learn geography with this beautiful 100-piece wooden map puzzle',
      category: 'educational',
      ageRange: '6-12 years',
      pieces: 100
    },
    {
      id: 3,
      name: 'Ocean Life Puzzle',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop',
      description: 'Discover marine life with 60 wooden pieces',
      category: 'kids',
      ageRange: '4-8 years',
      pieces: 60
    },
    {
      id: 4,
      name: 'Mechanical Gears Puzzle',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500&h=500&fit=crop',
      description: '3D wooden mechanical puzzle for adults - 200 pieces',
      category: 'adult',
      ageRange: '14+ years',
      pieces: 200
    },
    {
      id: 5,
      name: 'Dinosaur Adventure',
      price: 27.99,
      image: 'https://images.unsplash.com/photo-1551817958-d9d86fb29431?w=500&h=500&fit=crop',
      description: 'Explore prehistoric times with 36 colorful wooden pieces',
      category: 'kids',
      ageRange: '3-6 years',
      pieces: 36
    },
    {
      id: 6,
      name: 'Solar System Puzzle',
      price: 44.99,
      image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=500&h=500&fit=crop',
      description: 'Learn about planets with this 80-piece educational puzzle',
      category: 'educational',
      ageRange: '7-12 years',
      pieces: 80
    },
    {
      id: 7,
      name: 'Farm Animals Puzzle',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=500&h=500&fit=crop',
      description: 'Meet friendly farm animals in this 24-piece beginner puzzle',
      category: 'kids',
      ageRange: '2-4 years',
      pieces: 24
    },
    {
      id: 8,
      name: 'Wooden Clock Puzzle',
      price: 32.99,
      image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=500&h=500&fit=crop',
      description: 'Learn to tell time with this interactive wooden clock puzzle',
      category: 'educational',
      ageRange: '5-8 years',
      pieces: 12
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Puzzle Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handcrafted wooden puzzles designed for education, fun, and quality family time
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-2 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition">
              All Products
            </button>
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition">
              Kids (3-6)
            </button>
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition">
              Educational (6-12)
            </button>
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition">
              Adult (14+)
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-64 bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.pieces} pieces
                </div>
              </div>

              <div className="p-5">
                <div className="mb-2">
                  <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {product.ageRange}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary-600">
                    ${product.price}
                  </span>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition transform hover:scale-105 text-sm font-semibold">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose Senll Puzzles?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="font-semibold mb-2">Worldwide Shipping</h3>
              <p className="text-gray-600 text-sm">Free shipping on orders over $50</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎁</div>
              <h3 className="font-semibold mb-2">Gift Wrapping</h3>
              <p className="text-gray-600 text-sm">Beautiful packaging available</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm">Multiple payment options</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💯</div>
              <h3 className="font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600 text-sm">30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
