import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '🚀 Giới thiệu',
    },
    {
      type: 'doc',
      id: 'GettingStarted',
      label: '📝 Tổng quan',
    },
    {
      type: 'doc',
      id: 'Architecture',
      label: '🏗️ Kiến trúc hệ thống',
    },
    {
      type: 'doc',
      id: 'Installation',
      label: '🔧 Hướng dẫn cài đặt',
    },
    {
      type: 'category',
      label: '⚙️ Services',
      link: {
        type: 'doc',
        id: 'Services/README',
      },
      items: [
        'Services/APIGatewayService/Readme',
        'Services/AuthService/Readme',
        'Services/EducationService/Readme',
        'Services/EnvironmentService/Readme',
        'Services/ResourceService/Readme',
        'Services/OpenDataService/Readme',
        'Services/AIService/Readme',
      ],
    },
    {
      type: 'doc',
      id: 'License',
      label: '📜 License',
    },
  ],
};

export default sidebars;
