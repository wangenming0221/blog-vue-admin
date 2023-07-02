import { RouteRecordRaw } from 'vue-router'

export const articleRouter: Array<RouteRecordRaw> = [
    {
      path: "/article/list",
      name: "articleList",
      component:() => import("@/views/article/list.vue")
    },
];