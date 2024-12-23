<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  artPublishService,
  artGetDetailService,
  artEditService
} from '@/api/article'
// import { baseURL } from '@/utils/request'
// import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/index'

const emit = defineEmits(['success'])
// 控制抽屉显示隐藏
const visibleDrawer = ref(false)
//添加表单数据模型
const defaultarticleModel = ref({
  title: '',
  categoryId: '',
  coverImg: '',
  content: '',
  state: ''
})

const articleModel = ref({ ...defaultarticleModel.value })

const tokenStore = useUserStore()

const uploadSuccess = (result) => {
  articleModel.value.coverImg = result.data
}

//提交文章方法
const addArticle = async (clickState) => {
  //把发布状态赋值给数据模型
  console.log(defaultarticleModel.value)
  articleModel.value.state = clickState

  if (!articleModel.value.id) {
    //调用添加文章接口
    let result = await artPublishService(articleModel.value)

    ElMessage.success(result.msg ? result.msg : '添加成功')

    //让抽屉消失 I
    visibleDrawer.value = false
    emit('success', 'add')
  } else {
    //调用修改文章接口
    await artEditService(articleModel.value)
    ElMessage.success('修改成功')
    visibleDrawer.value = false
    emit('success')
  }
}

const editorRef = ref()
const open = async (row) => {
  console.log(row)
  visibleDrawer.value = true //显示抽屉

  if (row.id) {
    const res = await artGetDetailService(row.id)
    articleModel.value = res.data.data
  } else {
    articleModel.value = { ...defaultarticleModel.value }
    //清空富文本编辑器内容
    editorRef.value.setHTML('')
  }
}

defineExpose({
  open
})
</script>

<template>
  <!-- 抽屉 -->
  <el-drawer
    v-model="visibleDrawer"
    :title="articleModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 添加文章表单 -->
    <el-form :model="articleModel" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input
          v-model="articleModel.title"
          placeholder="请输入标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <channel-select
          v-model="articleModel.categoryId"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面">
        <el-upload
          class="avatar-uploader"
          :auto-upload="true"
          :show-file-list="false"
          action="/api/upload"
          name="file"
          :headers="{ Authorization: tokenStore.token }"
          :on-success="uploadSuccess"
        >
          <img
            v-if="articleModel.coverImg"
            :src="articleModel.coverImg"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            theme="snow"
            v-model:content="articleModel.content"
            contentType="html"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addArticle('已发布')">发布</el-button>
        <el-button type="info" @click="addArticle('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
