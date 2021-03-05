<template>
  <div class="editor">
    <p style="opacity: 0.8;">注：输入的内容会转化成html标签,</p>
    <quill-editor v-model="content"></quill-editor>
    <div class="editor-operations">
      <a-button class="editor-submit-btn" @click="handleSubmit">提交</a-button>
    </div>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: '',
  components: {
    quillEditor,
  },
  data() {
    return {
      content: '',
    }
  },
  methods: {
    handleSubmit() {
      console.log(this.content)
      this.$message.info(`提交的内容是：${this.content}`)
    },
  },
}
</script>
<style lang="scss">
.editor {
  height: 80%;
  .quill-editor {
    height: 100%;
    .ql-container {
      height: calc(100% - 66px); //减去编辑器菜单栏的高度
    }
  }
  .editor-operations {
    margin: 10px;
    text-align: right;
    .editor-submit-btn {
    }
  }
}
</style>
