<template>
  <BlogSection />
</template>

<script>
import BlogSection from '@/components/BlogSection';
import Navbar from '../components/Navbar.vue';
// Import Navbar and Login components here if they are separate files

export default {
  name: 'IndexPage',
  components: {
    BlogSection,
  }
}
</script>
