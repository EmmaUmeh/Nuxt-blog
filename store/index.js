// store/index.js

export const state = () => ({
  auth: {
    loggedIn: false,
    user: null,
  },
  isJustRegistered: false,
  postDetails: null, // Add this line to initialize postDetails
});

export const mutations = {
  setAuthState(state, payload) {
    state.auth.loggedIn = payload.loggedIn;
    state.auth.user = payload.user;

    // Store auth state in local storage
    localStorage.setItem('auth', JSON.stringify(state.auth));
  },
  setJustRegistered(state, payload) {
    state.isJustRegistered = payload;

    // Store isJustRegistered state in local storage
    localStorage.setItem('isJustRegistered', state.isJustRegistered);
  },
  resetIsJustRegistered(state) {
    state.isJustRegistered = false;

    // Store isJustRegistered state in local storage
    localStorage.setItem('isJustRegistered', state.isJustRegistered);
  },

  setPostDetails(state, post) {
    state.postDetails = post;
  },
};

export const actions = {
  async register({ commit }, user) {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();

      commit('setAuthState', { loggedIn: true, user: data });
      commit('setJustRegistered', true);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  async login({ commit }, credentials) {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const users = await response.json();
      const user = users.find(user => user.email === credentials.email && user.password === credentials.password);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      commit('setAuthState', { loggedIn: true, user });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async createPost({ commit }, postData) {
    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      // Optionally, you can commit mutations or perform other actions if needed

      console.log('Post created successfully');
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },
  
  async fetchPostDetails({ commit }, postId) {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch post details');
      }
      const post = await response.json();
      commit('setPostDetails', post);
    } catch (error) {
      console.error('Error fetching post details:', error);
      throw error;
    }
  },

  initPostDetails({ commit }) {
    if (typeof window !== 'undefined') { // Check if running in a browser environment
      const postDetails = JSON.parse(window.localStorage.getItem('postDetails'));
      if (postDetails) {
        commit('setPostDetails', postDetails);
      }
    }
  },

  initAuthState({ commit }) {
    if (typeof window !== 'undefined') { // Check if running in a browser environment
      const auth = JSON.parse(window.localStorage.getItem('auth'));
      const isJustRegistered = JSON.parse(window.localStorage.getItem('isJustRegistered'));

      if (auth) {
        commit('setAuthState', auth);
      }
    }
  },
};

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },
  loggedInUser(state) {
    return state.auth.user;
  },
  postDetails(state) {
    return state.postDetails;
  }
};
