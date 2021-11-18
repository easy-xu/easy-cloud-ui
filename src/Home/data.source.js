import React from 'react';
export const Nav00DataSource = {
  wrapper: { className: 'header0 home-page-wrapper' },
  page: { className: 'home-page' },
  logo: {
    className: 'header0-logo',
    children: '/assets/logo.png',
  },
  Menu: {
    className: 'header0-menu',
  },
  mobileMenu: { className: 'header0-mobile-menu' },
};
export const Banner50DataSource = {
  wrapper: { className: 'home-page-wrapper banner5' },
  page: { className: 'home-page banner5-page' },
  childWrapper: {
    className: 'banner5-title-wrapper',
    children: [
      { name: 'title', children: 'EasyCode', className: 'banner5-title' },
      {
        name: 'explain',
        className: 'banner5-explain',
        children: '(建设中)',
      },
      {
        name: 'content',
        className: 'banner5-content',
        children: '更快的开发，更快的交付',
      },
      {
        name: 'button',
        className: 'banner5-button-wrapper',
        children: {
          href: '/cms',
          className: 'banner5-button',
          type: 'primary',
          children: '开始使用',
        },
      },
    ],
  },
  image: {
    className: 'banner5-image',
    children:
      'https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*-wAhRYnWQscAAAAAAAAAAABkARQnAQ',
  },
};
export const Content00DataSource = {
  wrapper: { className: 'home-page-wrapper content0-wrapper' },
  page: { className: 'home-page content0' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [{ name: 'title', children: '内容与服务' }],
  },
  childWrapper: {
    className: 'content0-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon',
              children:
                'https://zos.alipayobjects.com/rmsportal/WBnVOjtIlGWbzyQivuyq.png',
            },
            {
              name: 'title',
              className: 'content0-block-title',
              children: '个人学习',
            },
            { name: 'content', children: '...' },
          ],
        },
      },
      {
        name: 'block1',
        className: 'content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon',
              children:
                'https://zos.alipayobjects.com/rmsportal/YPMsLQuCEXtuEkmXTTdk.png',
            },
            {
              name: 'title',
              className: 'content0-block-title',
              children: '知识分享',
            },
            {
              name: 'content',
              children: '...',
            },
          ],
        },
      },
      {
        name: 'block2',
        className: 'content0-block',
        md: 8,
        xs: 24,
        children: {
          className: 'content0-block-item',
          children: [
            {
              name: 'image',
              className: 'content0-block-icon',
              children:
                'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png',
            },
            {
              name: 'title',
              className: 'content0-block-title',
              children: '技术实践',
            },
            {
              name: 'content',
              children: '...',
            },
          ],
        },
      },
    ],
  },
};
export const Content30DataSource = {
  wrapper: { className: 'home-page-wrapper content3-wrapper' },
  page: { className: 'home-page content3' },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: '最新的技术',
        className: 'title-h1',
      },
      {
        name: 'content',
        className: 'title-content',
        children: '前后端分离、面向微服务',
      },
    ],
  },
  block: {
    className: 'content3-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png',
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: '后端' },
          content: {
            className: 'content3-content',
            children:
              '基于SpringBoot、Mybatis-plus、Maven构建的开箱即用的后端开发框架',
          },
        },
      },
      {
        name: 'block1',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png',
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: '前端' },
          content: {
            className: 'content3-content',
            children: '基于Umi、Antd等企业级前端应用框架',
          },
        },
      },
      {
        name: 'block2',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png',
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: '数据库' },
          content: {
            className: 'content3-content',
            children: '关系型数据库Mysql、文档型数据库MongoDB',
          },
        },
      },
      {
        name: 'block3',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png',
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: '中间件' },
          content: {
            className: 'content3-content',
            children: '缓存Redis、消息队列Mq',
          },
        },
      },
      {
        name: 'block4',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png',
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: '微服务' },
          content: {
            className: 'content3-content',
            children:
              'SpringCloud Alibaba阿里云为分布式应用开发提供了一站式解决方案',
          },
        },
      },
      {
        name: 'block5',
        className: 'content3-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'content3-icon',
            children:
              'https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png',
          },
          textWrapper: { className: 'content3-text' },
          title: { className: 'content3-title', children: '容器化' },
          content: {
            className: 'content3-content',
            children: 'Docker、Kubernetes、CODING一站式软件研发管理协作平台',
          },
        },
      },
    ],
  },
};
export const Footer10DataSource = {
  wrapper: { className: 'home-page-wrapper footer1-wrapper' },
  OverPack: { className: 'footer1', playScale: 0.2 },
  block: {
    className: 'home-page',
    gutter: 0,
    children: [
      {
        name: 'block0',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          className: 'logo',
          children: '/assets/logo.png',
        },
        childWrapper: {
          className: 'slogan',
          children: [
            {
              name: 'content0',
              children: '持续建设中',
            },
          ],
        },
      },
      {
        name: 'block1',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: '产品' },
        childWrapper: {
          children: [
            { name: 'link0', href: '#', children: '产品更新记录' },
            { name: 'link1', href: '#', children: 'API文档' },
            { name: 'link2', href: '#', children: '快速入门' },
            { name: 'link3', href: '#', children: '参考指南' },
          ],
        },
      },
      {
        name: 'block2',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: '关于' },
        childWrapper: {
          children: [
            { href: '#', name: 'link0', children: 'FAQ' },
            { href: '#', name: 'link1', children: '联系我们' },
          ],
        },
      },
      {
        name: 'block3',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: '资源' },
        childWrapper: {
          children: [
            { href: '#', name: 'link0', children: 'Ant Design' },
            { href: '#', name: 'link1', children: 'Ant Motion' },
          ],
        },
      },
    ],
  },
  copyrightWrapper: { className: 'copyright-wrapper' },
  copyrightPage: { className: 'home-page' },
  copyright: {
    className: 'copyright',
    children: <span>©2021 by 为了呆毛 All Rights Reserved</span>,
  },
};
