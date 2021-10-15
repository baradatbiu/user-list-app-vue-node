<template>
  <div class="container mx-auto px-4 antialiase">
    <div class="text-xl font-bold py-5 text-center">
      <router-link class="transition-colors hover:text-green-500" to="/"
        >Home
      </router-link>
      |
      <router-link class="transition-colors hover:text-green-500" to="/users"
        >Users</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<style scoped>
a.router-link-exact-active {
  color: #42b983;
}
</style>
