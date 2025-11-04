'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  status: string;
  remaining: number;
}

export default function ProductShowcase() {
  const products: Product[] = [
    {
      id: 1,
      title: '超跑限量版',
      category: '全球仅99台',
      description: '独家编号 #001-099 | 预约抢购中 | 已售67台',
      image: '/images/car-1.jpg',
      status: '限量热售',
      remaining: 32,
    },
    {
      id: 2,
      title: '奢华定制版',
      category: '限量发行50台',
      description: '独家编号 #001-050 | VIP预约制 | 已售49台',
      image: '/images/car-2.jpg',
      status: '仅剩1台',
      remaining: 1,
    },
    {
      id: 3,
      title: '珍藏特别版',
      category: '全球限定30台',
      description: '独家编号 #001-030 | 收藏级臻品 | 全部售罄',
      image: '/images/car-3.jpg',
      status: '已售罄',
      remaining: 0,
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent-limited text-sm font-semibold tracking-widest uppercase mb-4 block flex items-center justify-center space-x-2">
            <span className="w-2 h-2 bg-accent-limited rounded-full animate-pulse" />
            <span>LIMITED RELEASE COLLECTION</span>
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            限量<span className="text-gradient-gold">发行</span>臻选
          </h2>
          <p className="text-lg text-foreground/70">
            全球限量发行 · 独家编号认证 · 收藏级稀缺价值 · 预约抢购制
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group relative overflow-hidden rounded-2xl bg-muted hover:shadow-2xl transition-all duration-500"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Status Badge */}
              <div className={`absolute top-6 right-6 z-20 px-4 py-2 rounded-full backdrop-blur-md font-bold text-sm ${
                product.remaining === 0
                  ? 'bg-foreground/90 text-background border border-foreground'
                  : product.remaining < 5
                  ? 'bg-accent-limited/90 text-white border border-accent-limited animate-pulse'
                  : 'bg-accent-gold/90 text-background border border-accent-gold'
              }`}>
                {product.status}
              </div>

              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Hover Effect */}
                <div className={`absolute inset-0 ${
                  product.remaining === 0 ? 'bg-foreground/20' : 'bg-accent-limited/10'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 group-hover:translate-y-0">
                <span className="text-accent-limited text-xs font-semibold tracking-widest uppercase mb-2 block flex items-center space-x-2">
                  <span className="w-2 h-2 bg-accent-limited rounded-full animate-pulse" />
                  <span>{product.category}</span>
                </span>
                <h3 className="text-3xl font-bold mb-3 group-hover:text-accent-gold transition-colors">
                  {product.title}
                </h3>
                <p className="text-foreground/70 mb-4 text-sm">
                  {product.description}
                </p>

                {/* Remaining Counter */}
                {product.remaining > 0 && (
                  <div className="mb-4 flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          product.remaining < 5 ? 'bg-accent-limited' : 'bg-accent-gold'
                        } transition-all duration-500`}
                        style={{ width: `${(product.remaining / (product.remaining + (product.id === 1 ? 67 : product.id === 2 ? 49 : 30))) * 100}%` }}
                      />
                    </div>
                    <span className="text-accent-limited text-xs font-bold">
                      剩余{product.remaining}台
                    </span>
                  </div>
                )}

                {/* View More Button */}
                <div className={`flex items-center space-x-2 ${
                  product.remaining === 0 ? 'text-foreground/50' : 'text-accent-limited'
                } opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500`}>
                  <span className="text-sm font-semibold">
                    {product.remaining === 0 ? '查看收藏详情' : '立即预约'}
                  </span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-2 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>

              {/* Corner Accent */}
              <div className={`absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 ${
                product.remaining === 0 ? 'border-foreground/30' : 'border-accent-limited/50'
              } transition-opacity duration-500`} />
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            href="/products"
            className="inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-accent-limited to-accent-gold text-white font-bold rounded-full hover:shadow-2xl hover:shadow-accent-limited/50 transition-all duration-300 group hover:scale-105"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>查看更多限量发行</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-2 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
