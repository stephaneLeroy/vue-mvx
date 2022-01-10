<template>
    <div id="app">
        <nav class="menu">
          <div class="menu__title">
            <router-link class="menu__title-link" exact-active-class="menu__title--active" to="/">Vue-ERD-JS</router-link>
          </div>
          <div class="menu__items">
            <router-link class="menu__items-link" active-class="menu__items-link--active" to="/pingpong">Ping Pong</router-link>
            <router-link class="menu__items-link" to="/authenticate">
                {{$erd.walletAddress ? $erd.obfuscatedWalletAddress : 'Authenticated' }}
                <span v-if="$erd.token" class="menu__items-token">Token : {{$erd.token}}</span>
            </router-link>
          </div>
        </nav>
        <div class="main__content">
          <router-view ></router-view>
        </div>
    </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
    @import "./sass/example";
</style>
