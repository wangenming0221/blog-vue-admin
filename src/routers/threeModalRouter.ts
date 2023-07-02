import { RouteRecordRaw } from 'vue-router'

export const threeModalRouter: Array<RouteRecordRaw> = [
    {
      path: "/threeModal/VRViewing",
      name: "VRViewing",
      component:() => import("@/views/threeModal/VRViewing.vue")
    },
    {
      path: "/threeModal/VRViewingOther",
      name: "VRViewingOther",
      component:() => import("@/views/threeModal/VRViewingOther.vue")
    },
    {
      path: "/threeModal/IsLand",
      name: "IsLand",
      component:() => import("@/views/threeModal/IsLand.vue")
    },
    {
      path: "/threeModal/CarAutoShow",
      name: "CarAutoShow",
      component:() => import("@/views/threeModal/CarAutoShow.vue")
    },
];