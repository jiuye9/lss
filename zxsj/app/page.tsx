import HeroBanner from './components/HeroBanner';
import ProductShowcase from './components/ProductShowcase';
import Features from './components/Features';
import BrandStory from './components/BrandStory';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <Features />
      <ProductShowcase />
      <BrandStory />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-muted via-background to-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.3),transparent_70%)]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              开启您的
              <span className="text-gradient-gold">专属定制</span>
              之旅
            </h2>
            <p className="text-xl text-foreground/70 mb-12 max-w-2xl mx-auto">
              预约专属设计顾问，让我们一起创造属于您的独特作品
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <button className="px-10 py-5 bg-gradient-to-r from-accent-gold to-accent-silver text-background text-lg font-semibold rounded-full hover:shadow-2xl hover:shadow-accent-gold/50 transition-all duration-300 hover:scale-105">
                立即预约咨询
              </button>
              <button className="px-10 py-5 bg-transparent border-2 border-accent-gold text-accent-gold text-lg font-semibold rounded-full hover:bg-accent-gold hover:text-background transition-all duration-300">
                查看更多案例
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-border">
              {[
                { value: '10000+', label: '满意客户' },
                { value: '50+', label: '全球城市' },
                { value: '130+', label: '年品牌历史' },
                { value: '98%', label: '好评率' },
              ].map((stat, index) => (
                <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-3xl md:text-4xl font-bold text-gradient-gold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground/60 tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
