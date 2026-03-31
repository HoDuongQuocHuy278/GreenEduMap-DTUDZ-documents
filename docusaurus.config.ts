import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Hapas - Túi xách thời trang',
  tagline: 'Thương hiệu túi xách cao cấp, sang trọng và hiện đại',
  favicon: 'img/hapas-logo.png',
  url: 'https://hoduongquochuy278.github.io',
  baseUrl: '/GreenEduMap-DTUDZ-documents/',
  organizationName: 'HoDuongQuocHuy278',
  projectName: 'GreenEduMap-DTUDZ-documents',
  trailingSlash: true,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  deploymentBranch: 'gh-pages',
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/docs', // Moved docs to /docs to free up root for custom pages
          editUrl: 'https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ-documents/edit/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [{ name: 'keywords', content: 'túi xách, hapas, thời trang, cao cấp, luxury bags' }],
    image: 'img/hero-bg.jpg',
    navbar: {
      title: 'Hapas',
      logo: {
        alt: 'Hapas Logo',
        src: 'img/hapas-logo.png',
      },
      items: [
        { to: '/', label: 'Trang chủ', position: 'left' },
        { to: '/category', label: 'Danh mục sản phẩm', position: 'left' },
        { to: '/manufacturer', label: 'Thông tin nhà sản xuất', position: 'left' },
        { to: '/products', label: 'Sản phẩm chi tiết', position: 'left' },
        { to: '/contact', label: 'Liên hệ', position: 'left' },
        {
          href: 'https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ-documents',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Hapas',
          items: [
            { label: 'Trang chủ', to: '/' },
            { label: 'Sản phẩm', to: '/products' },
          ],
        },
        {
          title: 'Kết nối',
          items: [
            { label: 'GitHub', href: 'https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ-documents' },
          ],
        },
        {
          title: 'Liên hệ',
          items: [
            { label: 'Email', href: 'mailto:info@hapas.vn' },
            { label: 'Hotline', href: 'tel:0123456789' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Hapas. Built with ❤️ for Elegant Style.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
