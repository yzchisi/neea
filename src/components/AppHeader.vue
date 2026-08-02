<script setup>
// 页面头部公共组件 - 包含 logo、搜索、导航栏

// 导航栏链接配置（数据驱动，便于维护）
const navLinks = [
  { text: '首页', href: 'https://www.neea.edu.cn/html1/folder/1508/113-1.htm' },
  { text: '考试资讯', href: 'https://www.neea.edu.cn/html1/category/16093/615-1.htm' },
  { text: '公示公告', href: 'https://www.neea.edu.cn/html1/category/1508/151-1.htm' },
  { text: '考试项目', href: 'https://www.neea.edu.cn/html1/folder/16103/1271-1.htm' },
  { text: '考试报名', href: 'https://www.neea.edu.cn/html1/folder/1607/298-1.htm' },
  { text: '成绩查询', href: 'https://cjcx.neea.edu.cn/html1/folder/20051/1151-1.htm' },
  { text: '证书查询', href: 'https://zscx.neea.edu.cn/html1/folder/21051/9446-1.htm', active: true },
  { text: '考试研究', href: 'https://research.neea.edu.cn/' },
  { text: '关于我们', href: 'https://www.neea.edu.cn/html1/folder/1510/793-1.htm' },
]
</script>

<template>
  <header class="page-header">
    <!-- 头部第一行 -->
    <div class="dt-header-top">
      <div class="header-top">
        <a class="header-top-logo" href="https://www.neea.edu.cn/html1/folder/1508/113-1.htm">
          <img src="/img/logo.png" alt="中国教育考试院">
        </a>
        <div class="header-top-action">
          <i class="header-top-action-search"></i>
          <i class="header-top-action-more"></i>
        </div>
      </div>
      <div class="header-about">
        <span class="header-about-container">
          <a href="#">关于我们</a>
          |
          <a href="#">ENGLISH</a>
        </span>
      </div>
    </div>

    <!-- 电脑端搜索框 -->
    <div class="header-search">
      <form action="">
        <input type="submit" value="">
        <input type="text" placeholder="请输入关键字">
      </form>
    </div>

    <!-- 导航栏 -->
    <div class="header-nav">
      <div class="header-nav-icon">
        <a href="https://www.neea.edu.cn/">
          <img src="/img/nav-home-dt.jpg" alt="">
        </a>
      </div>
      <ul class="header-nav-list">
        <li v-for="(link, index) in navLinks" :key="index">
          <a :class="{ active: link.active }" :href="link.href">{{ link.text }}</a>
        </li>
      </ul>
      <i>></i>
    </div>
  </header>
</template>
