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

      <div class="relative inline-block">
        <div class="flex justify-end">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 20C15 21.6569 13.6569 23 12 23C10.3431 23 9 21.6569 9 20C9 18.3431 10.3431 17 12 17C13.6569 17 15 18.3431 15 20ZM10.9719 20C10.9719 20.5678 11.4322 21.0281 12 21.0281C12.5678 21.0281 13.0281 20.5678 13.0281 20C13.0281 19.4322 12.5678 18.9719 12 18.9719C11.4322 18.9719 10.9719 19.4322 10.9719 20Z" fill="#0F0F0F"></path> <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12ZM10.9719 12C10.9719 12.5678 11.4322 13.0281 12 13.0281C12.5678 13.0281 13.0281 12.5678 13.0281 12C13.0281 11.4322 12.5678 10.9719 12 10.9719C11.4322 10.9719 10.9719 11.4322 10.9719 12Z" fill="#0F0F0F"></path> <path d="M15 4C15 5.65685 13.6569 7 12 7C10.3431 7 9 5.65685 9 4C9 2.34315 10.3431 1 12 1C13.6569 1 15 2.34315 15 4ZM10.9719 4C10.9719 4.56779 11.4322 5.02808 12 5.02808C12.5678 5.02808 13.0281 4.56779 13.0281 4C13.0281 3.43221 12.5678 2.97192 12 2.97192C11.4322 2.97192 10.9719 3.43221 10.9719 4Z" fill="#0F0F0F"></path> </g></svg>
        </div>

        <!-- Dropdown Menu -->
        <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Edit</a>
            
              <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem"  @click.prevent="deletePost(post.id)">Delete</button>

          </div>
        </div>
      </div>

  


        <!-- <h2 class="font-semibold mb-3 text-[14px]">{{ post.name }}</h2> -->
        <h2 class="font-semibold text-[20px]">{{ post.userName }}</h2>
        <h2 class="font-semibold text-[20px]">{{ post.title }}</h2>
        <p>{{ post.content.substring(0, 100) }}...</p>
        <a :href="'/blog/' + post.id">Readd More</a>
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
    },

    deletePost(postId) {
    this.$store.dispatch('confirmDelete', postId);
  },
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
