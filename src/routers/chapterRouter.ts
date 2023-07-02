import { RouteRecordRaw } from 'vue-router'

export const chapterRouter: Array<RouteRecordRaw> = [
    {
      path: "/chapter/chapter1",
      name: "chapter1",
      component:() => import("@/views/chapter/chapter1.vue")
    },
    {
      path: "/chapter/chapter2",
      name: "chapter2",
      component:() => import("@/views/chapter/chapter2.vue")
    },
    {
      path: "/chapter/chapter3",
      name: "chapter3",
      component:() => import("@/views/chapter/chapter3.vue")
    },
    {
      path: "/chapter/chapter4",
      name: "chapter4",
      component:() => import("@/views/chapter/chapter4.vue")
    },
    {
      path: "/chapter/chapter5",
      name: "chapter5",
      component:() => import("@/views/chapter/chapter5.vue")
    },
    {
      path: "/chapter/chapter6",
      name: "chapter6",
      component:() => import("@/views/chapter/chapter6.vue")
    },
    {
      path: "/chapter/chapter7",
      name: "chapter7",
      component:() => import("@/views/chapter/chapter7.vue")
    },
    {
      path: "/chapter/chapter8",
      name: "chapter8",
      component:() => import("@/views/chapter/chapter8.vue")
    },
    {
      path: "/chapter/chapter9",
      name: "chapter9",
      component:() => import("@/views/chapter/chapter9.vue")
    },
    {
      path: "/chapter/chapter10",
      name: "chapter10",
      component:() => import("@/views/chapter/chapter10.vue")
    },
    {
      path: "/chapter/chapter11",
      name: "chapter11",
      component:() => import("@/views/chapter/chapter11.vue")
    },
    {
      path: "/chapter/chapter12",
      name: "chapter12",
      component:() => import("@/views/chapter/chapter12.vue")
    },
    {
      path: "/chapter/chapter13",
      name: "chapter13",
      component:() => import("@/views/chapter/chapter13.vue")
    },
    {
      path: "/chapter/chapter14",
      name: "chapter14",
      component:() => import("@/views/chapter/chapter14.vue")
    },
];