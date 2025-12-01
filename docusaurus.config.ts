import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'CityResQ360',
  tagline: 'Nền tảng phản ánh, cảnh báo & giám sát đô thị thông minh',
  favicon: 'logo.png',
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
          routeBasePath: '/',
          editUrl: 'https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ-documents/edit/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [{ name: 'keywords', content: 'smart city, urban monitoring, AI, IoT, city management' }],
    image: 'img/Banner.png',
    navbar: {
      title: 'CityResQ360',
      logo: {
        alt: 'CityResQ360 Logo',
        src: '/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
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
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/intro',
            },
            {
              label: 'Architecture',
              to: '/Architecture',
            },
            {
              label: 'Installation',
              to: '/Installation',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ-documents',
            },
            {
              label: 'Issues',
              href: 'https://github.com/HoDuongQuocHuy278/GreenEduMap-DTUDZ-documents/issues',
            },
          ],
        },
        {
          title: 'Team',
          items: [
            {
              label: 'Lê Thanh Trường',
              href: 'mailto:thanhtruong23111999@gmail.com',
            },
            {
              label: 'Nguyễn Văn Nhân',
              href: 'mailto:vannhan130504@gmail.com',
            },
            {
              label: 'Nguyễn Ngọc Duy Thái',
              href: 'mailto:kkdn011@gmail.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CityResQ360. Built with ❤️ by DTU-DZ Team.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
