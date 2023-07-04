import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { articleRouter } from "./articleRouter" //文章管理
import { chapterRouter } from "./chapterRouter" //three.js练习demo
import { threeModalRouter } from "./threeModalRouter" //three.js应用


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'App',
        redirect: '/layout',
    },
    {
        path: '/layout',
        name: 'Layout',
        component: () => import("@/components/layout/Layout.vue"),
        redirect: '/index',
        children: [
          {
            path: "/index",
            component: () => import("@/views/home/index.vue"),
            name: "index",
            meta: { title: "首页", icon: "dashboard", affix: true },
          },
          ...articleRouter,
          ...chapterRouter,
          ...threeModalRouter,
        ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/error/404.vue"),
      meta: {
        hidden: true,
      },
    },
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

//   router.beforeEach((to, from, next) => {
//     const token = sessionStorage.getItem('token') || null;
//     if (to.path === "/login") {
//       if (token) {
//         next({
//           path: from.path
//         })
//       } else {
//         next();
//       }
//     } else {
//       if (!token) {
//         next({
//           path: "/login"
//         })
//       } else {
//         next()
//       }
//     }
//   })
  
  export default router