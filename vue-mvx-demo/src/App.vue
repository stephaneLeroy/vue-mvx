<script setup lang="ts">
</script>

<template>
    <div id="app">
        <nav class="menu">
            <div class="menu__title">
                <router-link class="menu__title-link" exact-active-class="menu__title--active" to="/">Vue-Mvx-JS</router-link>
            </div>
            <div class="menu__items">
                <router-link class="menu__items-link" active-class="menu__items-link--active" to="/">Transaction</router-link>
                <router-link class="menu__items-link" to="/authenticate">
                    {{$erdAccount.address ? $erdAccount.obfuscatedAddress() : 'Authenticated' }}
                    <span v-if="$erdAccount.token" class="menu__items-token">Token : {{$erdAccount.token}}</span>
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
