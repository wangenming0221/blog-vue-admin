<template>
    <section class="app-main">
        <router-view v-slot="{ Component, route }">
            <keep-alive>
                <component :is="Component" :key="route.fullPath" />
            </keep-alive>
        </router-view>
    </section>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.app-main {
    width: 100%;
    min-height: 100%;
    position: relative;
    padding: 20px;
}
</style>