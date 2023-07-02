import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";

export interface TagView extends Partial<RouteLocationNormalized> {
    title?: string;
}
/**
 * 用户
 */
export interface UserState {
    /**
     * 用户id
     */
    id: number | null;
}

/**
 * 权限
 */
export interface PermissionState {
    /**
     * 路由
     */
    routes: RouteRecordRaw[];
}
/**
 * 系统配置
 */
export interface settingsState {
    /**
     * 表格边框
     */
    tableBordered: Boolean | null;
}