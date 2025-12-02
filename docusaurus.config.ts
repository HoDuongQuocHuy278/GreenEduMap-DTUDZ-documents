import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'GreenEduMap',
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
              label: 'Lê Tuấn Minh',
              href: 'mailto:llttminh@gmail.com',
            },
            {
              label: 'Hồ Dương Quốc Huy',
              href: 'mailto:huyho2782005@gmail.com',
            },
            {
              label: 'Trần Xuân Trường',
              href: 'mailto:xuantruong081205@gmail.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} GreenEduMap. Built with ❤️ by DTU-DZ-02 Team.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
