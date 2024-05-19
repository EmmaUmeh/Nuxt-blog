<template>
  <div class="relative flex">
    <div class="lg:w-1/3 w-full m-auto p-8 bg-white rounded-lg mt-10">
      <div>
        <h4 class="text-2xl mb-10 text-center py-3 font-semibold">{{ 'Next Auth' }}</h4>
      </div>
      <h4 class="text-2xl text-center py-3 font-semibold">{{ 'Log in' }}</h4>

      <div class="mt-4">
        <form @submit.prevent="loginUser">
          <div class="mb-3">
            <h5>Email</h5>
            <input
              class="py-2 px-2 w-full border border-[#E1DDDD]"
              v-model="email"
              placeholder="Enter your email address"
              required
            />
          </div>
          <div class="relative mb-5">
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
          <div class="mb-5">
            <span
              class="text-[#5670F9] text-[12px] cursor-pointer"
              @click="forgot = !forgot"
            >
              Forget Password
            </span>
          </div>
          <div class="mb-3">
            <button
              type="submit"
              class="text-sm border bg-primary rounded-md text-white font-semibold border-blur w-full py-3"
            >
              {{ loading ? 'Loading...' : 'Log in' }}
            </button>
          </div>
          <div class="flex justify-center mb-1">
            <span>or</span>
          </div>
          <div class="flex justify-center">
            <p class="text-xs">
              Are you new on Nuxt Blog?
              <router-link to="/signup">
                <span class="text-[#5670F9] text-xs hover:underline cursor-pointer">
                  Sign up
                </span>
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      loading: false,
    };
  },
  methods: {
    ...mapActions(['login']),
    async loginUser() {
      this.loading = true;

      const credentials = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.login(credentials);
        this.$router.push('/blog');
      } catch (error) {
        console.error('Login error:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
