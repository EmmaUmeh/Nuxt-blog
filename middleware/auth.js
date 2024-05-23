// // middleware/auth.js
// export default function ({ store, redirect, route }) {
//   console.log('Current route:', route.name); // Debuggin
//   if (!store.state.auth.loggedIn && route.name !== 'login' && route.name !== 'signup') {
//     return redirect('/');
//   }

//   if (store.state.isJustRegistered) {
//     store.commit('resetIsJustRegistered');
//     return redirect('/blog');
//   }

//   return true;
// }

// Temporarily disable middleware
// export default function ({ store, redirect, route }) {
//   console.log('Disabled middleware');
//   return true;
// }

// export default function ({ store, redirect }) {
//   if (store.state.auth.loggedIn) {
//     return redirect('/')
//   }
// }




// middleware/auth.js
export default function ({ store, redirect, route }) {
  // Check if the user is trying to access the blog page and is not logged in
  if (route.path === '/blog' &&!store.state.auth.loggedIn) {
    // Redirect to the login page
    return redirect('/login');
  }

  // If the user is just registered, reset the flag and redirect to the blog page
  if (store.state.isJustRegistered) {
    store.commit('resetIsJustRegistered');
    return redirect('/blog');
  }

  // Allow access to other routes
  return true;
}

