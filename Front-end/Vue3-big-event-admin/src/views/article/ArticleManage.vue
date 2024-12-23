<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ArticleEdit from './components/ArticleEdit.vue'
import { articleDeleteService } from '@/api/article'
import { formatTime } from '@/utils/format.js'

const loading = ref(false) // loading状态
//文章分类数据模型
const categorys = ref([])

//用户搜索时选中的分类id
const categoryId = ref('')

//用户搜索时选中的发布状态
const state = ref('')

//文章列表数据模型
const articles = ref([])

const params = ref({
  pageNum: 1,
  pageSize: 5
})

//分页条数据模型
const total = ref() //总条数
//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  params.value.pageNum = 1
  params.value.pageSize = size
  articleList()
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  params.value.pageNum = num
  articleList()
}
import { artGetChannelsService, artGetListService } from '@/api/article.js'
// 回显文章分类
const articleCategoryList = async () => {
  let result = await artGetChannelsService()
  categorys.value = result.data

  //   for (let i = 0; i < categorys.value.data.length; i++) {
  //     let c = categorys.value.data[i]
  //     console.log(c) // 打印c的值
  //   }
}

// 获取文章列表数据
const articleList = async () => {
  loading.value = true
  let paramsData = {
    pageNum: params.value.pageNum,
    pageSize: params.value.pageSize,
    categoryId: categoryId.value ? categoryId.value : null,
    state: state.value ? state.value : null
  }
  let res = await artGetListService(paramsData)
  // 渲染视图
  total.value = res.data.data.total
  articles.value = res.data.data.items
  for (let i = 0; i < articles.value.length; i++) {
    let article = articles.value[i]

    for (let j = 0; j < categorys.value.data.length; j++) {
      if (article.categoryId == categorys.value.data[j].id) {
        article.categoryName = categorys.value.data[j].categoryName
      }
    }
  }
  loading.value = false
}
articleCategoryList()
articleList()

//重置逻辑
const onReset = () => {
  categoryId.value = ''
  state.value = ''
}

const articleEditRef = ref()
// 添加逻辑
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 编辑逻辑
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
  console.log(row)
}

// 删除逻辑
const deleteArticle = async (row) => {
  console.log(row)
  await articleDeleteService(row)
  articleList()
  ElMessage.success('删除成功')
}

const onSuccess = (type) => {
  //     if (type === 'add') {
  //     // 如果是添加，最好渲染最后一页
  //     const lastPage = Math.ceil((total.value + 1) / params.value.pageSize)
  //     // 更新成最大页码数，再渲染
  //     params.value.pageNum = lastPage
  //   }
  console.log(type)
  articleList()
}
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>文章管理</span>
        <div class="extra">
          <el-button type="primary" @click="onAddArticle">添加文章</el-button>
        </div>
      </div>
    </template>
    <!-- 搜索表单 -->
    <el-form inline>
      <el-form-item style="width: 250px" label="文章分类：">
        <el-select placeholder="请选择" v-model="categoryId">
          <el-option
            v-for="c in categorys.data"
            :key="c.id"
            :label="c.categoryName"
            :value="c.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发布状态：">
        <el-select placeholder="请选择" style="width: 150px" v-model="state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="articleList">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 文章列表 -->
    <el-table :data="articles" style="width: 100%" v-loading="loading">
      <el-table-column label="文章标题" width="400" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="categoryName"></el-table-column>
      <el-table-column label="发表时间" prop="createTime">
        <template #default="{ row }">
          {{ formatTime(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="deleteArticle(row.id)"
          ></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!-- 分页区 -->
    <el-pagination
      v-model:current-page="params.pageNum"
      v-model:page-size="params.pageSize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper,total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.editor {
  width: 100%;

  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
