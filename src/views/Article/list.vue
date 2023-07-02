<template>
    <a-form
        :model="queryParams"
        layout="inline"
        autocomplete="off"
        class="ant-search-form"
    >
        <a-row :gutter="24">
            <a-col :span="span">
                <a-form-item label="标题">
                    <a-input v-model:value="queryParams.articleTitle" />
                </a-form-item>
            </a-col>
            <a-col :span="span">
                <a-form-item>
                    <a-button type="primary" @click="handlerInit">搜索</a-button>
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
    
    <a-table 
    :bordered="settings.tableBordered"
    :dataSource="dataSource" 
    :columns="columns">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'articleCover'">
                <a-image :width="150"  v-model:src="record.articleCover" />
            </template>
            <template v-if="column.key === 'articleType'">
                <a-tag color="green">{{ record.articleType }}</a-tag>
            </template>
            <template v-if="column.key === 'top'">
                <a-switch v-model:checked="record.top" />
            </template>
            <template v-if="column.key === 'recommend'">
                <a-switch v-model:checked="record.recommend" />
            </template>
        </template>   
    </a-table>

</template>

<script setup lang="ts">
    import { reactive, onMounted, ref } from "vue";
    import { getArticleList } from "@/api/passage";
    import useStore from "@/store";

    const { settings } = useStore();
    const span = ref<Number>(12);
    const queryParams = reactive({
        pageSize: 10,
        current: 1,
        articleTitle:''
    });

    const dataSource = ref<any>([]);
        
     const columns = [
        {
            title: '缩略图',
            dataIndex: 'articleCover',
            key: 'articleCover',
        },
        {
            title: '标题',
            dataIndex: 'articleTitle',
            key: 'articleTitle',
        },
        {
            title: '分类',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {   
            title: '类型',
            dataIndex: 'articleType',
            key: 'articleType',
        },
        {
            title: '置顶',
            dataIndex: 'top',
            key: 'top',
        },    
        {
            title: '推荐',
            dataIndex: 'recommend',
            key: 'recommend',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
    ];

    const handlerInit = () => {
        getArticleList(queryParams)
          .then(({data})=> {
            dataSource.value = (data as any).records
          });
    }

    onMounted(() => {
        handlerInit();
    });

</script>

<style>

</style>