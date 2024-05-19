<template>
    <div class="lg:px-10 border bg-white rounded relative">
      <section class="w-full">
        <div class="flex justify-around w-[97%] mx-auto">
          <div class="text-center border-b-4 w-1/2 hover:text-plug text-plug border-plug cursor-pointer py-4">
            <h1 class="font-bold relative">Blogs</h1>
          </div>
  
          <div class="text-center border-b-4 w-1/2 hover:text-plug text-plug border-plug cursor-pointer py-4">
            <h1 class="font-bold relative">Press Release</h1>
          </div>
        </div>
      </section>
  
      <section>
        <div class="flex justify-end mx-4 sm:mx-16 space-x-4 mt-8">
          <button class="custom-button border-2 rounded-md w-full sm:w-2/12 h-12 flex items-center justify-center md:text-sm">
            <md-filter-list class="icon w-5 h-5" />
            Filter
            <vsc-triangle-down class="icon w-5 h-5" />
          </button>
          <button class="custom-button border-2 bg-red-100 text-plug rounded-md w-full sm:w-2/12 h-12 flex items-center justify-center text-center md:text-sm">
            <io-md-add class="icon w-5 h-5" />
            Write an article
          </button>
        </div>
      </section>
  
      <section>
        <div class="mx-4 my-12">
          <div class="grid lg:grid-cols-2 gap-10 grid-cols-1 lg:h-[500px]">
            <!-- Example blog post -->
            <div class="gap-10 cursor-pointer">
              <div class="gap-x-5 p-5 max-w-[500px] lg:flex gap-10">
                <!-- <img
                  src="@/public/assests/Rectangle1.png"
                  alt="Blog Image"
                  class="rounded-md"
                /> -->
                <div class="flex flex-col space-y-2 w-full">
                  <h1 class="font-bold text-xl">Example Blog Title</h1>
                  <p class="w-[300px]">This is an example blog post content.</p>
                  <div class="flex gap-5 items-center">
                    <div class="flex items-center space-x-1">
                      <!-- <img
                        src="@/public/assests/Avater.png"
                        alt="Author Avatar"
                        class="rounded-full w-12 h-12"
                      /> -->
                      <p class="text-xs">John Doe</p>
                    </div>
                    <div>
                      <p class="text-xs">May 15th, 2024. 5 Min Read</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Modal -->
      <add-article-modal :is-open="false" @close="() => {}" />
    </div>
  </template>
  
  <script>
  import BlogModal from '@/components/BlogModal';
  
  export default {
    components: {
        BlogModal,
    },
  };
  </script>
  
  <style scoped>
  .icon {
    /* Icon styles */
  }
  .custom-button {
    /* Button styles */
  }
  </style>
  