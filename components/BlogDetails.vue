<!-- src/components/BlogDetail.vue -->
<template>
    <div>
      <h2>{{ blogPost.title }}</h2>
      <p>{{ blogPost.content }}</p>
      <!-- <CommentSection :postId="blogPost.id" /> -->
    </div>
  </template>
  
  <script>
// Adjust the import path according to your project structure
  
  export default {
    components: {
    //   CommentSection,
    },
    props: ['blogPost'],
  };
  </script>
  