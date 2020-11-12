<template>
  <div class="album-wrapper">
    <template v-if="['video', 'image'].includes(fileType)">
      <vue-draggable element="div" v-model="filesList" class="album-list">
        <div class="album-item" v-for="(item, index) in filesList" :key="index">
          <div class="item-content">
            <video class="item-thumbnail" v-if="fileType === 'video'" :src="item.fileUrl"></video>
            <img class="item-thumbnail" v-if="fileType === 'image'" :src="item.fileUrl" alt=""/>
            <div class="item-action">
              <span class="item-preview" @click="handlePreview(item, index)"><i class="el-icon-zoom-in"></i></span>
              <!-- <span class="item-delete" @click="handleDelete(item, index)"><i class="el-icon-delete"></i></span> -->
            </div>
          </div>
<!--          <div class="item-name" v-if="limit !== 1">{{ index === 0 ? '封面图' : ''}}</div>-->
        </div>
      </vue-draggable>
      <el-upload
        :ref="fileType"
        class="upload-card-file"
        v-if="filesList.length < limit"
        drag
        action="upload"
        multiple
        :http-request="uploadRequest"
        :show-file-list="false"
        :limit="limit"
        :before-upload="beforeUpload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将{{defaultConfig[fileType].desc}}拖到此处</div>
        <div class="el-upload__text">或<em>点击上传</em></div>
      </el-upload>
    </template>
    <div class="upload-area" v-if="fileType === 'file'">
      <el-upload
        class="upload-file"
        ref="file"
        action="upload"
        :show-file-list="false"
        :http-request="uploadRequest"
        :limit="limit"
        :before-upload="beforeUpload"
        :file-list="filesList"
      >
        <el-button :disabled="filesList.length >= limit" size="small" type="primary">点击上传</el-button>
      </el-upload>
      <ul class="el-upload-list el-upload-list--text" @start="isDragging=true">
        <li tabindex="0" class="el-upload-list__item is-success" v-for="(file, index) in filesList" :key="index">
          <a class="el-upload-list__item-name"><i class="el-icon-document"></i>{{file.fileUrl}}</a>
          <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-circle-check"></i></label>
          <!-- <i class="el-icon-close" @click="handleDelete(file, index)"></i> -->
        </li>
      </ul>
    </div>
    <template v-if="fileType === 'image' && isPreview">
      <image-viewer
        :initial_index="currentIndex"
        v-show="showViewer"
        :on-close="handleClosePreview"
        :url-list="previewSrcList"
      />
    </template>
    <template v-if="fileType === 'video' && isPreview">
      <video-viewer
        :initial_index="currentIndex"
        v-show="showViewer"
        :on-close="handleClosePreview"
        :url-list="previewSrcList"
      />
    </template>
  </div>
</template>
<script>
  import VueDraggable from 'vuedraggable'
  import ImageViewer from '../ImageViewer/index'
  import VideoViewer from '../VideoViewer/index'
  import { uploadImg } from '@/api/common'
  import { getTimestamp, randomInteger } from '@/utils/util'
  let prevOverflow = ''

  const defaultConfig = {
    image: {
      desc: '图片',
      accept: 'jpeg|jpg|png|gif'
    },
    video: {
      desc: '视频',
      accept: 'mp4|avi|mov|3gp|wmv|mkv|mpg|vob|flv'
    },
    file: {
      desc: '文件',
      accept: 'xlsx|xltx|xlsm|xls|csv|pdf|docx|dotx|dotm|docm|doc|wps-writer'
    }
  }

  export default {
    name: 'uploadFile',
    components: { VueDraggable, ImageViewer, VideoViewer },
    props: {
      params: {
        type: Object,
        default: () => {}
      },
      fileList: {
        type: Array,
        default: () => []
      },
      limit: { // 文件数量限制
        type: Number,
        default: 10
      },
      accept: {
        type: String,
        default: null
      },
      maxSize: {
        type: Number,
        default: 3
      },
      type: { // 文件类型
        type: String,
        default: 'IMAGE' // VIDEO | FILE
      },
      width: { // 图片宽度(为图片时需要)
        type: Number,
        default: null
      },
      height: { // 图片高度(为图片时需要)
        type: Number,
        default: null
      }
    },
    watch: {
      fileList: {
        handler(newList) {
          this.filesList = newList
        },
        deep: true
      },
      filesList: { // 内部数据
        handler(newList) {
          this.$emit('change', newList)
        },
        deep: true
      }
    },
    computed: {
      previewSrcList: function() {
        const results = []
        if (this.filesList.length) {
          (this.filesList || []).forEach(item => {
            results.push(item.fileUrl)
          })
        }
        return results
      },
      fileType: function() {
        return this.type.toLowerCase()
      }
    },
    data() {
      return {
        defaultConfig: defaultConfig,
        isDragging: false,
        isPreview: false,
        showViewer: false,
        currentIndex: 0,
        filesList: this.fileList
      }
    },
    methods: {
      // 打开预览
      handlePreview(file, index) {
        this.isPreview = true
        prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        this.currentIndex = index
        this.showViewer = true
      },
      // 关闭预览
      handleClosePreview() {
        this.isPreview = false
        document.body.style.overflow = prevOverflow
        this.currentIndex = 0
        this.showViewer = false
      },
      handleDelete(item, index) {
        // deleteFileRequest({
        //   filePath: this.filesList[index].fileUrl
        // }).then(res => {
        //   if (res.code === 200) {
        //     this.filesList.splice(index, 1)
        //     this.$message.success('删除成功')
        //   }
        // })
      },
      getImageMeasure(file) {
        return new Promise(function(resolve) {
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function(res) {
            let image = new Image()
            image.src = res.target.result
            image.onload = function() {
              resolve({ width: this.width, height: this.height })
            }
          }
        })
      },
      validate(file) {
        const regexp = new RegExp(`(${this.accept || defaultConfig[this.fileType].accept})$`)
        if (!regexp.test(file.type.toLowerCase())) {
          this.$message(`只允许上传${this.accept}格式的${defaultConfig[this.fileType].desc}`)
          return false
        }

        if (file.size / 1024 / 1024 > this.maxSize) {
          this.$message(`上传${defaultConfig[this.fileType].desc}大小不能超过${this.maxSize}MB`)
          return false
        }
        /* if (this.width && this.height) {
          // 限制图片尺寸
          try {
            const {width, height} = await this.getImageMeasure(file)
            if (width > this.width || height > this.height) {
              this.$message(`上传图片尺寸不能高于${this.width}*${this.height}`)
              return false
            }
          } catch (err) {
            this.$message('上传图片失败，请重新上传')
            return false
          }*/
        return true
      },
      beforeUpload(file) {
        return this.validate(file)
      },
      uploadRequest(data) {
        let reader = new FileReader()
        reader.readAsArrayBuffer(data.file)
        reader.onload = (res) => {
          let byte = new Uint8Array(res.currentTarget.result)
          let binary = []
          for (let i = 0; i < byte.length; i++) {
            binary.push(byte[i])
          }
          const loading = this.$loading({
            lock: true,
            text: `${defaultConfig[this.fileType].desc}上传中...`,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          const nameArray = data.file.name.split('.')

          uploadImg({
            date: binary,
            filePath: this.fileType.toLowerCase(),
            fileName: `${getTimestamp()}_${randomInteger(0, 1000)}/${nameArray[0]}`,
            fileType: data.file.type.split('/')[1] || nameArray[1]
          }).then(res => {
            if (res.code === 200) {
              this.filesList.push(res.result)
              this.$message.success('上传成功')
            } else {
              this.$refs[this.fileType].uploadFiles.pop()
            }
            loading.close()
          }).catch(() => {
            this.$message.error('上传失败')
            loading.close()
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .album-wrapper{
    .album-list{
      margin: 0;
      display: inline;
      vertical-align: top;

      .album-item {
        display: inline-block;
        vertical-align: top;
        margin-right: 20px;

        .item-content {
          position: relative;
          overflow: hidden;
          background-color: #fff;
          border: 1px solid #c0ccda;
          border-radius: 6px;
          box-sizing: border-box;
          width: 148px;
          height: 148px;
          display: inline-block;
          transition: all .5s cubic-bezier(.55, 0, .1, 1);
          font-size: 14px;
          color: #606266;
          line-height: 1.8;

          .item-thumbnail {
            width: 100%;
            height: 100%;
          }

          .item-action {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            cursor: default;
            text-align: center;
            color: #fff;
            opacity: 0;
            font-size: 20px;
            background-color: rgba(0, 0, 0, .5);
            transition: opacity .3s;
            line-height: 148px;

            .item-preview {
              display: none;
              cursor: pointer;
            }

            .item-delete {
              display: none;
              cursor: pointer;
            }

            &:hover {
              opacity: 1;

              .item-preview {
                display: inline-block;
              }

              .item-delete {
                display: inline-block;
              }
            }
          }
        }

        .item-name {
          color: #606266;
          font-size: 12px;
          text-align: center;
          padding-top: 10px;
        }
      }
    }
    .upload-card-file {
      width: 148px;
      height:148px;
      display: inline-block;
      vertical-align: top;

      /deep/ .el-upload {
        width: 100%;
        height: 100%;

        .el-upload-dragger {
          width: 100%;
          height: 100%;
        }

        .el-upload__text {
          line-height: 1.15;
        }
      }
    }
  }
</style>
