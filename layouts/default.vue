<template>
  <div class="app-container">
    <header>
      <Navbar />
    </header>
    <main class="content">
      <nuxt />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  width: 100%;
 /* Ensures the container takes at least full viewport height */
}

.content {
  margin-top: 100px;
/* Allows the content to grow and push the footer to the bottom */
}
</style>
  
  <script setup>
  import Navbar from '@/components/Navbar.vue';
//   import Footer from '@/components/Footer.vue';
  </script>
  