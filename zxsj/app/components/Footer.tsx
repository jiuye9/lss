import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const footerLinks = {
    产品: [
      { name: '经典系列', href: '/products/classic' },
      { name: '现代系列', href: '/products/modern' },
      { name: '定制系列', href: '/products/custom' },
      { name: '限量系列', href: '/products/limited' },
    ],
    服务: [
      { name: '定制服务', href: '/custom' },
      { name: '售后服务', href: '/service' },
      { name: '产品保养', href: '/maintenance' },
      { name: '预约咨询', href: '/consultation' },
    ],
    公司: [
      { name: '关于我们', href: '/about' },
      { name: '品牌故事', href: '/story' },
      { name: '新闻资讯', href: '/news' },
      { name: '加入我们', href: '/careers' },
    ],
    法律: [
      { name: '隐私政策', href: '/privacy' },
      { name: '服务条款', href: '/terms' },
      { name: '退换政策', href: '/returns' },
      { name: '知识产权', href: '/ip' },
    ],
  };

  const socialLinks = [
    {
      name: '微信',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.405-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
        </svg>
      ),
    },
    {
      name: '微博',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.31 17.238c-2.91-.494-5.122-2.359-4.941-4.164.18-1.805 2.719-2.981 5.629-2.487 2.911.495 5.122 2.359 4.941 4.164-.18 1.805-2.719 2.982-5.629 2.487zm4.85-8.287c-.247-.073-.417-.124-.287-.447.282-.687.31-1.278.007-1.7-.565-.785-2.107-.743-3.87-.024 0 0-.553.239-.411-.197.27-.864.229-1.586-.217-2.005-1.009-.949-3.689.036-5.987 2.199-1.719 1.62-2.72 3.336-2.72 4.845 0 2.85 3.657 4.586 7.231 4.586 4.689 0 7.807-2.723 7.807-4.886 0-1.306-1.097-2.047-1.553-2.371zM23 4.834C21.77 2.179 19.237.67 16.253.293c-.637-.08-1.044.45-.901 1.053.127.562.691.943 1.316 1.025 2.411.315 4.45 1.608 5.407 3.842.387.906 1.253 1.444 1.873 1.173.65-.283.85-1.146.052-2.552zm-3.646-.908c-.608-.061-.997.371-.904.907.066.374.392.63.797.683 1.354.178 2.451.994 2.945 2.299.182.479.646.792 1.108.669.478-.127.685-.667.435-1.274-.669-1.622-2.061-2.898-4.381-3.284z" />
        </svg>
      ),
    },
    {
      name: '抖音',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
    },
    {
      name: '小红书',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.92 13.722c-.3.738-.78 1.398-1.416 1.902-.636.492-1.404.786-2.232.786-.396 0-.792-.06-1.176-.192l-1.248 3.228h-2.46l1.26-3.24c-.396-.132-.792-.3-1.164-.528-.636-.384-1.164-.924-1.536-1.572l1.98-1.188c.228.396.552.732.948.996.396.264.852.396 1.32.396.3 0 .588-.072.852-.192.264-.132.492-.312.66-.552.18-.24.276-.528.276-.828 0-.18-.036-.36-.096-.528-.072-.168-.168-.324-.3-.456-.144-.132-.3-.252-.48-.336l-1.236-.624c-.3-.156-.588-.336-.852-.552-.264-.216-.492-.468-.672-.756-.18-.288-.324-.612-.408-.96-.096-.348-.144-.72-.144-1.104 0-.672.168-1.296.492-1.836.324-.54.78-.972 1.332-1.272.552-.3 1.176-.444 1.848-.444.612 0 1.2.132 1.728.384.528.252.984.6 1.332 1.02l-1.536 1.452c-.216-.252-.48-.456-.78-.588-.3-.132-.612-.192-.936-.192-.408 0-.768.12-1.056.348-.288.228-.432.54-.432.924 0 .192.036.372.108.528.072.156.168.3.3.42.132.12.276.228.444.312l1.248.636c.408.204.78.456 1.104.744.324.288.588.624.78 1.008.192.384.288.816.288 1.284 0 .396-.06.78-.18 1.14z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container-custom py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="relative w-40 h-40">
                <Image
                  src="/images/logo-official.png"
                  alt="尊想世家 LUXE DREAM HOME - 全球限量定制发行网"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
            <p className="text-foreground/70 mb-6 max-w-sm leading-relaxed">
              <span className="text-accent-gold font-semibold">全球限量定制发行网</span> · 独家编号认证<br/>
              中国·杭州 - VIP会员预约制 · 收藏级稀缺价值
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground/60 hover:text-accent-gold hover:border-accent-gold transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-accent-gold mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-foreground/70 hover:text-accent-gold transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-foreground/60 text-sm">
              © 2024 尊想世家 LUXE DREAM HOME. 保留所有权利.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-foreground/60 hover:text-accent-gold transition-colors"
              >
                隐私政策
              </Link>
              <Link
                href="/terms"
                className="text-foreground/60 hover:text-accent-gold transition-colors"
              >
                服务条款
              </Link>
              <Link
                href="/sitemap"
                className="text-foreground/60 hover:text-accent-gold transition-colors"
              >
                网站地图
              </Link>
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-accent-gold transition-colors"
              >
                ICP备案号
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
