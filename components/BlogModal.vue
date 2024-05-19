<template>
  <div v-if="isVisible" class="absolute top-10 w-8/12 h-8/12 md:h-[100%] left-0 right-16 items-start z-10 bg-white mx-4 md:mx-16 rounded-lg py-6">
    <div class="w-10/12 mx-auto space-y-6">
      <div class="text-center text-lg font-bold flex items-center justify-center">
        <h1 class="w-full">Create an Article</h1>
        <button @click="handleClose" class="text-[#121212]">X</button>
      </div>
      <div>
        <h1 class="border-t-2 border-b-2 border-gray-400 py-2 w-full flex">
          Title:
          <span>
            <input
              type="text"
              id="title"
              class="w-full text-[#121212] border-b-2 border-[#E1DDDD] py-2 rounded-lg text-sm font-normal"
              v-model="createData.title"
            />
          </span>
        </h1>
      </div>
      <div class="mx-4 md:mx-12 h-auto md:h-[50%] p-6 bg-white rounded-md">
        <textarea
          placeholder="What's on your mind?"
          id="body"
          name="textarea"
          class="resize-none border border-[#E1DDDD] bg-white pl-5 w-full rounded-md p-2 pb-[200px]"
          v-model="createData.body"
        ></textarea>
      </div>
      <div class="image-preview mt-4">
        <div
          v-for="(url, index) in createData.imageUrl"
          :key="index"
          style="position: relative; display: inline-block; margin-right: 10px;"
        >
          <img :src="url" alt="Uploaded" style="width: 100px; height: 100px;" />
        </div>
      </div>
      <button @click="handleSubmit" class="bg-[#2962FF] text-white font-semibold py-2 px-6 rounded-md">Submit</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { mapActions } from 'vuex';

export default {
  props: {
    setIsOpen: Function,
    isVisible: Boolean,
  },
  data() {
    return {
      createData: {
        title: '',
        body: '',
        imageUrl: [],
      },
      loading: false,
    };
  },
  methods: {
   ...mapActions(['createPost']),
    async handleSubmit() {
      this.loading = true;

      const postData = {
        title: this.createData.title,
        content: this.createData.body,
        // Include any additional fields needed for your post
      };

      try {
        await this.createPost(postData);
        this.$router.push('/blog'); // Redirect to blog page after successful post creation
      } catch (error) {
        console.error('Error creating post:', error);
      } finally {
        this.loading = false;
      }
    },
    handleClose() {
      this.setIsOpen(false);
    },
  },
};
</script>
