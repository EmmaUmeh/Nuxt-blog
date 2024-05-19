<template>
  <div class="relative flex">
    <div class="lg:w-1/3 w-full  m-auto p-8 bg-white rounded-lg mt-10">
      <div>
        <h4 class="text-2xl mb-10 text-center py-3 font-semibold">Next Auth</h4>
      </div>
      <h4 class="text-2xl text-center py-3 font-semibold">Welcome to Next Auth Blog</h4>
      <!-- form -->
      <div class="mt-4">
        <form @submit.prevent="registerUser">
          <div class="mb-3">
            <h5>Name</h5>
            <input
              class="py-2 px-2 w-full border border-[#E1DDDD]"
              v-model="name"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div class="mb-3">
            <h5>Email</h5>
            <input
              class="py-2 px-2 w-full border border-[#E1DDDD]"
              v-model="email"
              type="email"
              placeholder="Enter your email address"
              required
            />
          </div>
          <div class="relative mb-3">
            <h5>Password</h5>
            <input
              class="py-2 px-2 w-full border border-[#E1DDDD]"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              required
            />
            <button
              type="button"
              class="absolute top-1/2 transform -translate-y-1/2 right-1 pt-6 pr-3"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <div class="mb-3">
            <button
              type="submit"
              class="text-sm border bg-primary rounded-md text-white font-semibold border-blur w-full py-3"
            >
              {{ loading ? 'Loading...' : 'Sign Up' }}
            </button>
          </div>
          <div class="flex justify-center mb-1">
            <span>or</span>
          </div>
          <div class="flex justify-center">
            <p class="text-xs">
              Already have an account?
              <router-link to="/login">
                <span class="text-[#5670F9] text-xs hover:underline cursor-pointer">
                  Log in
                </span>
              </router-link>
            </p>
          </div>
        </form>
      </div>
      <!-- <div
        class="w-full h-full backdrop-blur-[1px] bg-white/25 pt-4 absolute top-0 left-0 -z-10"
        @click="closeModal"
      ></div> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      showPassword: false,
      loading: false
    };
  },
  methods: {
    ...mapActions(['register']),
    async registerUser() {
      this.loading = true;

      const user = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      try {
        await this.register(user);
        this.$router.push('/blog'); // Redirect to login page after successful registration
      } catch (error) {
        console.error('Registration error:', error);
      } finally {
        this.loading = false;
      }
    },
  }
};
</script>
