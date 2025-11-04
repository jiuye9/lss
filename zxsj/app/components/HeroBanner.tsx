import Image from 'next/image';

export default function HeroBanner() {
  const bannerData = {
    title: '全球限量定制发行',
    subtitle: '专属预约制 · 限量发行',
    description: 'VIP会员提前48小时预约通道 · 全球仅此一件',
    badge: 'LIMITED EDITION',
    image: '/images/banner-2.jpg',
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={bannerData.image}
          alt={bannerData.title}
          fill
          className="object-cover brightness-75"
          priority
          quality={95}
        />
      </div>

      {/* Overlay - 深色渐变增强对比 */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/30 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container-custom">
          <div className="max-w-3xl space-y-6">
            {/* Limited Badge */}
            <div className="overflow-hidden">
              <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-accent-limited/20 border-2 border-accent-limited rounded-full backdrop-blur-md shadow-lg animate-fade-in-up">
                <span className="w-2.5 h-2.5 bg-accent-limited rounded-full animate-pulse" />
                <span className="text-accent-limited text-sm font-bold tracking-wider">
                  {bannerData.badge}
                </span>
              </div>
            </div>

            <div className="overflow-hidden">
              <h1
                className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight animate-fade-in-up drop-shadow-2xl"
                style={{ animationDelay: '0.1s' }}
              >
                <span className="text-gradient-gold">{bannerData.title}</span>
              </h1>
            </div>

            <div className="overflow-hidden">
              <p
                className="text-2xl md:text-3xl text-white font-medium animate-fade-in-up drop-shadow-lg"
                style={{ animationDelay: '0.2s' }}
              >
                {bannerData.subtitle}
              </p>
            </div>

            <div className="overflow-hidden">
              <p
                className="text-lg md:text-xl text-white/90 max-w-xl animate-fade-in-up drop-shadow-lg"
                style={{ animationDelay: '0.3s' }}
              >
                {bannerData.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <button className="px-8 py-4 bg-gradient-to-r from-accent-limited to-accent-gold text-white font-bold rounded-full hover:shadow-2xl hover:shadow-accent-limited/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span>立即预约</span>
              </button>
              <button className="px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-accent-gold text-foreground font-bold rounded-full hover:bg-accent-gold hover:text-white transition-all duration-300 hover:scale-105">
                查看发行
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-center space-y-2 animate-bounce">
        <span className="text-sm text-white/80 tracking-widest rotate-90 origin-center mb-8 drop-shadow-lg">
          SCROLL
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-accent-gold to-transparent drop-shadow-lg" />
      </div>
    </section>
  );
}
