import Image from 'next/image'

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Animal Kingdom Puzzle',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&h=500&fit=crop',
      description: 'Educational 48-piece wooden puzzle featuring safari animals',
      category: 'kids'
    },
    {
      id: 2,
      name: 'World Map Puzzle',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&h=500&fit=crop',
      description: 'Learn geography with this beautiful 100-piece wooden map puzzle',
      category: 'educational'
    },
    {
      id: 3,
      name: 'Ocean Life Puzzle',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop',
      description: 'Discover marine life with 60 wooden pieces',
      category: 'kids'
    },
    {
      id: 4,
      name: 'Mechanical Gears Puzzle',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500&h=500&fit=crop',
      description: '3D wooden mechanical puzzle for adults - 200 pieces',
      category: 'adult'
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Handcrafted Wooden Puzzles
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover our collection of premium educational wooden puzzles.
              Perfect for kids and adults who love quality craftsmanship.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/products"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition transform hover:scale-105"
              >
                Shop Now
              </a>
              <a
                href="/about"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🌳</div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">Made from sustainable wood sources with non-toxic finishes</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">✋</div>
              <h3 className="text-xl font-semibold mb-2">Handcrafted</h3>
              <p className="text-gray-600">Each puzzle is carefully crafted by skilled artisans</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Educational</h3>
              <p className="text-gray-600">Designed to develop problem-solving and motor skills</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Puzzles</h2>
            <p className="text-gray-600">Explore our bestselling wooden puzzle collection</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary-600">${product.price}</span>
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition text-sm font-semibold">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">What Our Customers Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"Amazing quality! My kids love these puzzles and they're so well-made. Worth every penny."</p>
              <p className="font-semibold">- Sarah M., USA</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"The mechanical puzzle was challenging and fun. Great craftsmanship and fast shipping!"</p>
              <p className="font-semibold">- James L., UK</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"Beautiful educational toys. My daughter learned so much about geography with the world map puzzle."</p>
              <p className="font-semibold">- Emily R., Canada</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Puzzle Journey?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Join thousands of satisfied customers worldwide
          </p>
          <a
            href="/products"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 text-lg"
          >
            Shop Our Collection
          </a>
        </div>
      </section>
    </div>
  )
}
