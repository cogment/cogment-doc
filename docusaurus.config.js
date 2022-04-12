// Copyright 2021 AI Redefined Inc. <dev+cogment@ai-r.com>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// @ts-check

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Cogment",
  tagline:
    "Innovative open source AI platform developed by AI Redefined, designed to leverage the advent of AI to benefit humankind through human-AI collaboration.",
  url: "https://cogment.ai",
  baseUrl: "/",
  trailingSlash: false,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",
  // Used for github pages deployment
  organizationName: "cogment",
  projectName: "cogment-doc",
  deploymentBranch: "gh-pages",

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: [require.resolve("./src/css/custom.css")],
        },
        pages: {
          path: "src/pages",
        },
        sitemap: {},
        googleAnalytics: {
          trackingID: "UA-146998765-2",
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/cogment_logo_meta.png",
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        logo: {
          alt: "Cogment",
          src: "img/cogment_logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "index",
            position: "right",
            label: "Documentation",
          },
          {
            href: "https://github.com/cogment",
            label: "GitHub",
            position: "right",
          },
          {
            type: "doc",
            docId: "community-channels",
            label: "Community",
            position: "right",
          },
        ],
      },
      footer: {
        links: [
          {
            title: "Documentation",
            items: [
              {
                label: "Overview",
                to: "/docs",
              },
              {
                label: "Core concepts",
                to: "/docs/concepts/core-concepts",
              },
              {
                label: "Cogment installation & usage",
                to: "/docs/cogment/installation",
              },
              {
                label: "Development guide",
                to: "/docs/guide/development-guide",
              },
              {
                label: "Python SDK reference",
                to: "/docs/reference/python",
              },
              {
                label: "Javascript SDK reference",
                to: "/docs/reference/javascript",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Github",
                href: "https://github.com/cogment",
              },
              {
                label: "Discord",
                href: "https://discord.com/invite/QDxb9Fweqr",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/AI_Redefined",
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/ai-r",
              },
              {
                label: "Facebook",
                href: "https://www.facebook.com/AIRedefined/",
              },
            ],
          },
          {
            title: "AI Redefined",
            items: [
              {
                label: "Homepage",
                href: "https://ai-r.com/",
              },
              {
                label: "Solutions",
                href: "https://ai-r.com/solutions/",
              },
              {
                label: "About AIR",
                href: "https://ai-r.com/about-air/",
              },
              {
                label: "News",
                href: "https://ai-r.com/news/",
              },
              {
                label: "Contact",
                href: "https://ai-r.com/contact/",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} AI Redefined Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
