<template>
    <div class="mb-7">
      <div v-if="postDetails" class="flex justify-center items-center flex-col">
        <h2 class="text-5xl w-[70%] mb-9">{{ postDetails.title }}</h2>
        <p class="w-[80%]">{{ postDetails.content }}</p>
        <!-- Add a comment section or other relevant content here -->

        <section class="w-full bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased mt-10">
            <div class="px-4">
            
              <form @submit.prevent="postComment" class="mb-10">
                <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label for="comment" class="sr-only">Your comment</label>
                  <textarea
                    v-model="newComment"
                    id="comment"
                    rows="6"
                    class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                </div>
                <button type="submit"
            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Post comment
        </button>
              </form>
        
              <article v-for="comment in comments" :key="comment.id" class="p-6 text-base bg-white rounded-lg dark:bg-gray-900 mb-3">
                <footer class="flex justify-between items-center mb-2">
                  <div class="flex items-center">
                    <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                      <img class="mr-2 w-6 h-6 rounded-full" :src="comment.userImage" :alt="comment.userName" />{{ comment.userName }}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      <time :datetime="comment.datetime">{{ comment.formattedDate }}</time>
                    </p>
                  </div>
                  <button
                    @click="toggleDropdown(comment.id)"
                    class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  >
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                    <span class="sr-only">Comment settings</span>
                  </button>
                  <div v-if="comment.showDropdown" class="z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                      <li>
                        <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                      </li>
                      <li>
                        <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                      </li>
                      <li>
                        <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                      </li>
                    </ul>
                  </div>
                </footer>
                <p class="text-gray-500 dark:text-gray-400">{{ comment.text }}</p>
                <div class="flex items-center mt-4 space-x-4">
                  <button type="button" class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                    <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                    </svg>
                    Reply
                  </button>
                </div>
              </article>
            </div>
          </section>
        
      </div>
      <div v-else>
        Loading post details...
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        postDetails: null,
      };
    },
    async mounted() {
      // Initialize auth state
      await this.$store.dispatch('initAuthState');
  
      const postId = this.$route.params.id;
  
      // Fetch post details
      await this.$store.dispatch('fetchPostDetails', postId);
  
      this.postDetails = this.$store.getters.postDetails; // Directly access the getter
    },
  };
  </script>
  