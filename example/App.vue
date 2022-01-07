<template>
    <div id="app">
        <div>
            <router-link to="/">Home</router-link>
            <router-link to="/pingpong">Ping Pong</router-link>
            <router-link to="/authenticate">Authenticate</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">

</style>
