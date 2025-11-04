import Image from 'next/image';

export default function BrandStory() {
  const milestones = [
    { year: '2020', event: '平台创立', description: '开创全球限量定制发行新模式', badge: 'FOUNDED' },
    { year: '2021', event: '首批发行', description: '全球首发限量99台，48小时售罄', badge: 'FIRST RELEASE' },
    { year: '2022', event: '会员突破', description: 'VIP会员突破10000+，遍布50城市', badge: '10K MEMBERS' },
    { year: '2024', event: '全球认证', description: '获国际限量收藏品认证机构授权', badge: 'CERTIFIED' },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image Grid */}
          <div className="relative">
            {/* 2x2 Product Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden group">
                <Image
                  src="/images/product-1.jpg"
                  alt="限量定制产品1"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="relative aspect-square rounded-2xl overflow-hidden group">
                <Image
                  src="/images/product-2.jpg"
                  alt="限量定制产品2"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="relative aspect-square rounded-2xl overflow-hidden group">
                <Image
                  src="/images/product-3.jpg"
                  alt="限量定制产品3"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="relative aspect-square rounded-2xl overflow-hidden group">
                <Image
                  src="/images/product-4.jpg"
                  alt="限量定制产品4"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 p-6 bg-white backdrop-blur-md rounded-xl border-2 border-accent-limited shadow-2xl animate-fade-in z-10">
              <div className="flex items-baseline space-x-1 mb-2">
                <div className="text-5xl font-bold text-accent-limited">
                  300
                </div>
                <div className="text-2xl font-bold text-accent-gold">
                  +
                </div>
              </div>
              <div className="text-sm text-foreground/70 font-semibold">
                限量发行款
              </div>
              <div className="mt-3 pt-3 border-t border-accent-limited/30">
                <div className="text-xs text-accent-limited font-bold">
                  累计服务 10000+ VIP会员
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <span className="text-accent-limited text-sm font-semibold tracking-widest uppercase mb-4 block flex items-center space-x-2">
              <span className="w-2 h-2 bg-accent-limited rounded-full animate-pulse" />
              <span>LIMITED EDITION PLATFORM</span>
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              全球<span className="text-gradient-gold">限量</span>
              <br />
              定制发行先行者
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed mb-12">
              <p>
                <span className="text-accent-gold font-semibold">尊想世家</span>，中国首家全球限量定制发行平台。我们颠覆传统奢侈品销售模式，开创<span className="text-accent-limited font-semibold">「限量发行+预约抢购」</span>的全新商业生态。
              </p>
              <p>
                每件作品<span className="text-accent-gold font-semibold">全球限量发行</span>，配备独家编号认证书，由国际权威机构背书。采用<span className="text-accent-limited font-semibold">VIP会员预约制</span>，提前48小时开放抢购通道，确保稀缺性与收藏价值。
              </p>
              <p>
                我们在<span className="text-accent-gold font-semibold">北京·上海·纽约·巴黎·东京</span>等50+城市同步发行，全球联动，打造真正意义上的国际限量定制平台。目前已成功发行<span className="text-accent-limited font-semibold">300+款限量臻品</span>，VIP会员超<span className="text-accent-gold font-semibold">10000+</span>。
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex gap-6 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-limited to-accent-gold flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-accent-limited/30">
                      {milestone.year.slice(-2)}
                    </div>
                  </div>
                  <div className="flex-1 pb-6 border-b border-border/50 group-hover:border-accent-limited/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-accent-limited font-bold">
                        {milestone.year}
                      </div>
                      <div className="px-3 py-1 bg-accent-limited/10 border border-accent-limited/30 rounded-full">
                        <span className="text-accent-limited text-xs font-bold tracking-wider">
                          {milestone.badge}
                        </span>
                      </div>
                    </div>
                    <div className="text-xl font-bold mb-2 group-hover:text-accent-gold transition-colors">
                      {milestone.event}
                    </div>
                    <div className="text-foreground/70 text-sm">
                      {milestone.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
