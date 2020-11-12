<template>
  <section class="main-container">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.global.cachedViews
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-container {
    padding: 20px;
  }
</style>
