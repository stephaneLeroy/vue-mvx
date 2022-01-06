<template>
  <div>
    <div>
      <router-link to="/authenticate/maiar">Maiar App</router-link>
      <router-link to="/authenticate/ledger">Ledger</router-link>
      <router-link to="/authenticate/webwallet">WebWallet</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'Authenticate'
}
</script>
