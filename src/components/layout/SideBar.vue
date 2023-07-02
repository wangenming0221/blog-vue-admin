<template>
    
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <a-menu 
      v-model:selectedKeys="selectedKeys" 
      :open-keys="openKeys"
      @openChange="onOpenChange"
      @click="menuClick"
      theme="dark"
       mode="inline">
        <a-menu-item 
        key="/index">
          <span>
            首页
          </span>
        </a-menu-item>
        <a-sub-menu
        v-for="item of menus"
        :key="item.key">
        <template #title>{{ item.name }}</template>
          <a-menu-item 
          v-for="child of item.children"
          :key="child.key"
          >
            {{ child.name }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
</template>

<script setup lang="ts">
    
    import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue';
    import { ref, watch } from 'vue';
    import { useRouter } from 'vue-router'
    
    interface menusChildren {
        key: String,
        name: String,
        path: String
    };
    interface menusInterface {
        key: String,
        name: String,
        children: Array<menusChildren>,
    };

    const router = useRouter()
    const selectedKeys = ref<String[]>([]);
    const openKeys = ref<String[]>([]);
    const rootSubmenuKeys = ref<String[]>(['article', 'messages']);
    
    const menus = ref<menusInterface[]>([
      {
        key: 'article',
        name: '文章管理',
        children: [
          {
            key: '/article/list',
            name: '文章列表',
            path: '/article/list',
          },
          {
            key: '/article/release',
            name: '发布文章',
            path: '/article/release',
          }
        ]
      },
      {
        key: 'messages',
        name: '消息管理',
        children: [
          {
            key: '/messages/comment',
            name: '评论管理',
            path: '/messages/comment',
          },
        ]
      },
      {
        key: 'chapter',
        name: 'threejs模型',
        children: [
          {
            key: '/chapter/chapter1',
            name: '模型练习1',
            path: '/chapter/chapter1',
          },
          {
            key: '/chapter/chapter2',
            name: '材质和灯光',
            path: '/chapter/chapter2',
          },
          {
            key: '/chapter/chapter3',
            name: '光照和动画',
            path: '/chapter/chapter3',
          },
          {
            key: '/chapter/chapter4',
            name: '响应窗口变化',
            path: '/chapter/chapter4',
          },
          {
            key: '/chapter/chapter5',
            name: '雾化场景',
            path: '/chapter/chapter5',
          },
          {
            key: '/chapter/chapter6',
            name: '相机切换',
            path: '/chapter/chapter6',
          },
          {
            key: '/chapter/chapter7',
            name: '小车案例',
            path: '/chapter/chapter7',
          },
          {
            key: '/chapter/chapter8',
            name: '轨道控制',
            path: '/chapter/chapter8',
          },
          {
            key: '/chapter/chapter9',
            name: 'gsap动画',
            path: '/chapter/chapter9',
          },
          {
            key: '/chapter/chapter10',
            name: '材质和纹理',
            path: '/chapter/chapter10',
          },
          {
            key: '/chapter/chapter11',
            name: '几何体顶点',
            path: '/chapter/chapter11',
          },
          {
            key: '/chapter/chapter12',
            name: '纹理立体感',
            path: '/chapter/chapter12',
          },
          {
            key: '/chapter/chapter13',
            name: '环境纹理',
            path: '/chapter/chapter13',
          },
          {
            key: '/chapter/chapter14',
            name: '光源的使用',
            path: '/chapter/chapter14',
          },
        ]
      },
      {
        key: 'threeModal',
        name: '3D模型',
        children: [
          {
            key: '/threeModal/VRViewing',
            name: 'VR看房',
            path: '/threeModal/VRViewing',
          },
          {
            key: '/threeModal/VRViewingOther',
            name: 'VR看房第二版',
            path: '/threeModal/VRViewingOther',
          },
          {
            key: '/threeModal/IsLand',
            name: '小岛',
            path: '/threeModal/IsLand',
          },
          {
            key: '/threeModal/CarAutoShow',
            name: '车展',
            path: '/threeModal/CarAutoShow',
          },
        ]
      },
    ]);
  
    const onCollapse = (collapsed: boolean, type: string) => {
      console.log(collapsed, type);
    };

    const onBreakpoint = (broken: boolean) => {
      console.log(broken);
    };

    const onOpenChange = (openKey: string[]) => {
      const latestOpenKey = openKey.find(key => openKeys.value.indexOf(key) === -1);
      if (rootSubmenuKeys.value.indexOf(latestOpenKey!) === -1) {
        openKeys.value = openKey;
      } else {
        openKeys.value = latestOpenKey ? [latestOpenKey] : [];
      }
    };

    const menuClick = (item: any) => {
      router.push({ path:item.key });
    }

    watch(() => 
    router.currentRoute.value.path,
    (toPath) => {
      //要执行的方法
      selectedKeys.value = [];
      selectedKeys.value.push(toPath);
      if(toPath) {
        const arr = toPath.split('/');
        openKeys.value = [];
        openKeys.value.push(`${arr[1]}`);
      }
    },{immediate: true,deep: true})
</script>