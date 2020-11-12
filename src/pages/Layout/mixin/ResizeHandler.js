import store from '@/store'
import debounce from '@/utils/debounce'

const { body } = document
const WIDTH = 1000
const RATIO = 3

export default {
  watch: {
    $route() {
      if (this.device === 'mobile' && !this.sidebar.isCollapse) {
        store.dispatch('toggleMenuCollapse')
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', debounce(this.resizeHandler, 500))
  },
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('toggleDevice', 'mobile')
      store.dispatch('toggleMenuCollapse', { withoutAnimation: true })
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('toggleMenuCollapse', { withoutAnimation: true })
        }
      }
    }
  }
}
