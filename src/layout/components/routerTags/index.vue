<template>
  <div class="router-tags">
    <div class="tags-view">
      <div class="tags-box" :style="{ left: -leftValue + 'px' }">
        <router-link
          style="line-height:40px"
          class="tag-item"
          :class="$route.path === '/dashboard' ? 'tag-active' : ''"
          to="/dashboard"
        >
          {{ $t('routes.dashboard') }}
        </router-link>
        <button
          v-for="tag in keepLiveTags"
          :key="tag.title"
          class="tag-item"
          :class="isActiveTag(tag) ? 'tag-active' : ''"
          @click="handleGoRoute(tag)"
        >
          {{ $t(`routes.${tag.title}`) }}
          <a-icon
            @click.stop="handleCloseRoute(tag)"
            type="close"
            class="icon-tag-close"
          />
        </button>
      </div>
    </div>
    <div class="tag-control">
      <a-button
        :disabled="leftDisabled"
        icon="left"
        @click="handleLeftOffset"
        style="border-right:1px solid #ccc"
      ></a-button>
      <a-button
        :disabled="rightDisabled"
        icon="right"
        @click="handleRightOffset"
      />
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import { findIndex } from 'lodash'

export default {
  name: 'routerTags',
  data() {
    return {
      tagsBox: null,
      offset: 200,
      leftValue: 0,
      viewWidth: 0, //可见宽度
      realWidth: 0, //实际宽度
      leftDisabled: true,
      rightDisabled: true,
    }
  },
  computed: {
    ...mapGetters('routerTags', {
      keepLiveTags: 'getKeepLiveTags',
    }),
  },
  mounted() {
    this.tagsBox = document.querySelector('.tags-box')
    const tagsView = document.querySelector('.tags-view')
    setTimeout(() => {
      this.realWidth = this.tagsBox.clientWidth
      this.viewWidth = tagsView.clientWidth
    }, 1)
    // if (this.viewWidth >= this.realWidth) {
    //   this.leftDisabled = this.rightDisabled = true
    // }
    window.addEventListener('resize', () => {
      this.viewWidth = tagsView.clientWidth //可见宽度/
    })
  },
  methods: {
    ...mapMutations('routerTags', {
      setRouteTags: 'SET_ROUTER_TAGS',
      deleteRouteTags: 'DELETE_ROUTE_TAGS',
    }),
    isActiveTag(tag) {
      return tag.path === this.$route.path
    },
    handleGoRoute(tag) {
      const { fullPath, path } = tag
      if (fullPath === this.$route.fullPath) return false
      this.$router.push({ path })
    },
    handleCloseRoute(tag) {
      // console.log(overValue)
      const originTags = [...this.keepLiveTags]
      this.deleteRouteTags(tag)

      if (!this.isActiveTag(tag)) return false //是activetTag跳转到前一个路由
      const prevTagsIndex = findIndex(originTags, tag)

      if (prevTagsIndex - 1 < 0) {
        //关闭第一个

        if (this.keepLiveTags.length) {
          //还存在缓存路由
          const route = this.keepLiveTags[0]
          this.$router.replace({ path: route.path })
        } else {
          //不存在
          this.$router.replace({ path: '/dashboard' })
        }
      } else {
        const route = originTags[prevTagsIndex - 1]
        this.$router.replace({ path: route.path })
      }
    },
    handleLeftOffset() {
      this.rightDisabled = false
      const viewWidth = this.tagsBox.parentNode.offsetWidth //可见宽度
      const realWidth = this.tagsBox.scrollWidth //实际宽度
      const isMove =
        this.leftValue + this.offset + viewWidth < realWidth ? true : false
      if (isMove) {
        this.leftValue += this.offset
      } else {
        const finalOffset = realWidth - this.leftValue - viewWidth
        this.leftValue += finalOffset + 16
        this.leftDisabled = true
        // this.rightDisabled = false
      }
    },
    handleRightOffset() {
      this.leftDisabled = false
      if (this.leftValue >= this.offset) {
        this.leftValue -= this.offset
      } else {
        this.leftValue = 0
        this.rightDisabled = true
        // this.leftDisabled = false
      }
    },
  },
  watch: {
    viewWidth(newVal, oldVal) {
      if (oldVal) {
        if (newVal > oldVal) {
          //放大页面
          if (this.viewWidth < this.realWidth) {
            // const realWidth = this.tagsBox.scrollWidth
            // const overValue = this.leftValue + newVal - realWidth - 16
            // const realWidth = this.tagsBox.scrollWidth
            const overValue = this.leftValue + newVal - this.realWidth - 16
            if (overValue > 0) {
              this.leftValue -= overValue
            }
          } else {
            this.leftValue = 0
          }
        } else {
          //缩小页面
          // console.log(this.leftValue + this.viewWidth)
          this.leftDisabled = this.leftValue + this.viewWidth > this.realWidth
        }
      }
    },
    keepLiveTags() {
      this.$nextTick(() => {
        this.realWidth = this.tagsBox.clientWidth
        console.log(this.realWidth, this.viewWidth)
        this.leftDisabled = this.realWidth <= this.viewWidth
        if (this.realWidth > this.viewWidth) {
          const overValue = this.realWidth - this.viewWidth + 16
          this.leftValue = overValue
        } else {
          this.leftValue = 0
        }
      })
    },
  },
}
</script>
<style lang="scss">
.router-tags {
  // display: flex;
  // align-items: center;
  position: relative;
  padding-left: 16px;
  height: 40px;
  background: #fff;
  border-top: 1px solid #eee;
  // vertical-align: middle;
  .tag-control {
    // display: flex;
    position: absolute;
    top: 7px;
    right: 0;
    width: 60px;
    .ant-btn {
      width: 50%;
      height: 27px;
      outline: none;
      border: none;
      box-shadow: none;
      font-size: 12px;
      border-radius: 0;
    }
  }
  .tags-view {
    width: calc(100% - 60px);
    height: 100%;
    overflow: hidden;
    position: absolute;
  }
  .tags-box {
    display: inline-block;
    height: 100%;
    white-space: nowrap;
    position: absolute;
    transition: left 0.2s;
    .tag-item {
      // padding: 2px 3px;
      background: #f0f0f0;
      // flex-shrink: 0;
      margin: 7px 2px;
      color: #000;
      padding: 3px 12px;
      border: 1px solid #dadada;
      border-radius: 2px;
      outline: none;
      font-size: 12px;
    }
    .tag-active {
      background: #fff !important;
    }
    // .icon-tag-close {
    //   border-radius: 50%;
    // }
    .icon-tag-close {
      visibility: hidden;
      // font-size: 12px;
    }
    .tag-active .icon-tag-close {
      visibility: visible;
      background: #f0f0f0;
    }
    :not(.tag-active):hover .icon-tag-close {
      visibility: visible;
      background: #fff;
    }
  }
}
</style>
