import React from 'react';

const cos_host = 'https://simple-cloud-1256275568.cos.ap-shanghai.myqcloud.com';

export const Nav30DataSource = {
  wrapper: { className: 'header3 home-page-wrapper' },
  page: { className: 'home-page' },
  logo: {
    className: 'header3-logo',
    children: '/assets/logo.png',
  },
  Menu: {
    className: 'header3-menu',
    children: [
      {
        name: 'item0',
        className: 'header3-item',
        children: {
          href: '/',
          children: [{ children: '首页', name: 'text' }],
        },
      },
      {
        name: 'item1',
        className: 'header3-item',
        children: {
          children: [{ children: '在线演示', name: 'text' }],
        },
        subItem: [
          {
            name: 'sub1-0',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              href: '/cms',
              children: [
                {
                  name: 'image0',
                  className: 'item-image',
                  children: cos_host + '/favicon.ico',
                },
                {
                  name: 'title',
                  className: 'item-title',
                  children: '后台管理系统',
                },
                {
                  name: 'content',
                  className: 'item-content',
                  children: '面向微服务、前后端分离',
                },
              ],
            },
          },
        ],
      },
      {
        name: 'item2',
        className: 'header3-item',
        children: {
          children: [{ children: '其他', name: 'text' }],
        },
        subItem: [
          {
            name: 'sub2-0',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              href: '/questionnaire/list',
              children: [
                {
                  name: 'image0',
                  className: 'item-image',
                  children: cos_host + '/favicon.ico',
                },
                {
                  name: 'title',
                  className: 'item-title',
                  children: '问卷测试',
                },
                {
                  name: 'content',
                  className: 'item-content',
                  children: '免费性格、职业测试',
                },
              ],
            },
          },
          {
            name: 'sub2-1',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              href: '/knowledge',
              children: [
                {
                  name: 'image0',
                  className: 'item-image',
                  children: cos_host + '/favicon.ico',
                },
                {
                  name: 'title',
                  className: 'item-title',
                  children: '知识图谱',
                },
                {
                  name: 'content',
                  className: 'item-content',
                  children: 'MarkDown整理工具, 知识点云图展示',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  mobileMenu: { className: 'header3-mobile-menu' },
};
export const Banner10DataSource = {
  wrapper: { className: 'banner1' },
  BannerAnim: {
    children: [
      {
        name: 'elem0',
        BannerElement: { className: 'banner-user-elem' },
        textWrapper: { className: 'banner1-text-wrapper' },
        bg: { className: 'bg bg0' },
        title: {
          className: 'banner1-title',
          children: <span>EasyCloud</span>,
        },
        content: {
          className: 'banner1-content',
          children: '面向微服务、前后端分离后台管理系统',
        },
        button: {
          className: 'banner1-button',
          children: 'GitHub',
          type: 'primary',
          href: 'https://github.com/easy-xu?tab=repositories',
          target: '_blank',
        },
      },
      // {
      //   name: 'elem1',
      //   BannerElement: { className: 'banner-user-elem' },
      //   textWrapper: { className: 'banner1-text-wrapper' },
      //   bg: { className: 'bg bg1' },
      //   title: {
      //     className: 'banner1-title',
      //     children:
      //       'https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png',
      //   },
      //   content: {
      //     className: 'banner1-content',
      //     children: '一个高效的页面动画解决方案',
      //   },
      //   button: { className: 'banner1-button', children: 'Learn More' },
      // },
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
        children: '面向微服务、前后端分离',
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
export const Footer00DataSource = {
  wrapper: { className: 'home-page-wrapper footer0-wrapper' },
  OverPack: { className: 'home-page footer0', playScale: 0.05 },
  copyright: {
    className: 'copyright',
    children: (
      <span>鲁ICP备2021040208号 ©2021 by 为了呆毛 All Rights Reserved</span>
    ),
  },
};
