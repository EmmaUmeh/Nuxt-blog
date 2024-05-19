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

export default function ({ store, redirect }) {
  if (store.state.auth.loggedIn) {
    return redirect('/')
  }
}
