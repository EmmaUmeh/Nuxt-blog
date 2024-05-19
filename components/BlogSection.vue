<template>
  <div class="flex flex-col">
    <div class="flex justify-center">
      <input type="text" id="search-navbar" class="block w-[40%] p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." @input="updateSearchQuery($event.target.value)">
    </div>

    <div class="mt-10 lg:flex gap-x-4 gap-y-10 items-center justify-center p-5">
      <div
        class="flex flex-col py-20 bg-white justify-between lg:mb-0 mb-10 gap-y-5 lg:w-[40%] p-5 rounded-[20px] border-2 border-[#E2E8F0]"
        v-for="(post, index) in filteredPosts"
        :key="index"
      >
        <h2 class="font-semibold text-[20px]">{{ post.title }}</h2>
        <p>{{ post.content.substring(0, 100) }}...</p>
        <!-- <a href="/login">Read More</a> -->
        <nuxt-link :to="'/blog/' + post.id">Read More</nuxt-link>

      </div>
      <div v-if="filteredPosts.length === 0">
        No results found for "{{ searchQuery }}".
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      searchQuery: '',
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:3000/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.posts = data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  },
  computed: {
    filteredPosts() {
      if (!this.searchQuery) {
        return this.posts;
      }
      return this.posts.filter(post => 
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        post.content.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    updateSearchQuery(query) {
      this.searchQuery = query;
    }
  }
};
</script>
