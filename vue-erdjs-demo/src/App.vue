<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div id="app">
        <nav class="menu">
            <div class="menu__title">
                <router-link class="menu__title-link" exact-active-class="menu__title--active" to="/">Vue-ERD-JS</router-link>
            </div>
            <div class="menu__items">
                <router-link class="menu__items-link" active-class="menu__items-link--active" to="/pingpong">Ping Pong</router-link>
                <router-link class="menu__items-link" to="/authenticate">
                    {{$erdLogin.address ? $erdLogin.obfuscatedAddress() : 'Authenticated' }}
                    <span v-if="$erdLogin.token" class="menu__items-token">Token : {{$erdLogin.token}}</span>
                </router-link>
            </div>
        </nav>
        <div class="main__content">
            <router-view ></router-view>
        </div>
    </div>
</template>

<style lang="scss">
@import "./sass/example";
</style>
