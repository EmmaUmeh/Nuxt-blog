<template>
  <div class="flex flex-col mt-20">
    
    <div class="lg:flex justify-between px-20 ">
      <div class="lg:mb-0 mb-5">
        <input type="text" id="search-navbar" class="block p-2 lg:pr-[290px] w-full ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." @input="updateSearchQuery($event.target.value)">
      </div>

      <button class="bg-[#2962FF] flex justify-end text-white font-semibold py-2 px-6 rounded-md" @click="toggleModal">Create Blog</button>
    </div>
    <BlogModal :is-visible="showModal" :set-is-open="toggleModal" />
    <div class="mt-10 lg:flex gap-x-5 gap-y-10 justify-between p-5">
      <div
        class="flex flex-col py-20 bg-white justify-between lg:mb-0 mb-10 gap-y-5 lg:w-[60%] p-5 rounded-[20px] border-2 border-[#E2E8F0]"
        v-for="(post, index) in filteredPosts"
        :key="index"
      >
        <!-- <h2 class="font-semibold mb-3 text-[14px]">{{ post.name }}</h2> -->
        <h2 class="font-semibold text-[20px]">{{ post.userName }}</h2>
        <h2 class="font-semibold text-[20px]">{{ post.title }}</h2>
        <p>{{ post.content.substring(0, 100) }}...</p>
        <a :href="'/blog/' + post.id">Read More</a>
      </div>

      <div v-if="filteredPosts.length === 0">
        No results found for "{{ searchQuery }}".
      </div>
    </div>
  </div>
</template>

<script>
import BlogModal from './BlogModal';

export default {
  components: {
    BlogModal,
  },
  data() {
    return {
      showModal: false,
      posts: [],
      posts: [],
      users: [], // Array to hold user objects
      userNameToIdMap: {},
      searchQuery: '',
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },

    updateSearchQuery(query) {
      this.searchQuery = query;
    }
  },
  async created() {
    try {
      const responsePosts = await fetch('http://localhost:3000/posts');
      const dataPosts = await responsePosts.json();
      this.posts = dataPosts;

      const responseUsers = await fetch('http://localhost:3000/users');
      const dataUsers = await responseUsers.json();
      this.users = dataUsers; // Populate users array
      console.log(responseUsers,"kop")
      // Create a mapping of user names to IDs
      this.users.forEach(user => {
        this.userNameToIdMap[user.name] = user.id;
      });

      // Associate posts with users based on user names
      this.posts.forEach((post) => {
        const userName = post.userName; // Assuming posts have a userName field
        const userId = this.userNameToIdMap[userName];
        if (userId) {
          post.userId = userId; // Add userId to each post
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
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

};
</script>
