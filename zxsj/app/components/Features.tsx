export default function Features() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: '全球限量发行',
      description: '每件作品全球限量发行，独家编号认证，收藏级稀缺价值',
      badge: 'LIMITED',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '预约抢购机制',
      description: '会员专享提前48小时预约通道，限时限量发售，先到先得',
      badge: 'PRE-ORDER',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '全球同步首发',
      description: '北京·上海·纽约·巴黎·东京，50+城市同步发行，全球联动',
      badge: 'WORLDWIDE',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: '专属定制服务',
      description: '一对一定制顾问，从设计到交付全程跟踪，专属VIP服务体验',
      badge: 'EXCLUSIVE',
    },
  ];

  return (
    <section className="py-24 bg-muted relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-silver rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-accent-limited text-sm font-semibold tracking-widest uppercase mb-4 block flex items-center justify-center space-x-2">
            <span className="w-2 h-2 bg-accent-limited rounded-full animate-pulse" />
            <span>LIMITED EDITION PLATFORM</span>
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            全球<span className="text-gradient-gold">限量定制</span>发行平台
          </h2>
          <p className="text-lg text-foreground/70">
            独家编号认证 · 限量发行机制 · 全球同步首发 · 收藏级价值
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-background rounded-2xl border border-border hover:border-accent-limited transition-all duration-500 hover:shadow-xl hover:shadow-accent-limited/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-accent-limited/10 border border-accent-limited/30 rounded-full">
                <span className="text-accent-limited text-xs font-bold tracking-wider">
                  {feature.badge}
                </span>
              </div>

              {/* Icon */}
              <div className="mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br from-accent-limited/10 to-accent-gold/10 text-accent-limited group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-accent-gold transition-colors">
                {feature.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed text-sm">
                {feature.description}
              </p>

              {/* Decorative Corner */}
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-accent-limited/0 group-hover:border-accent-limited/50 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
