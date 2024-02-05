<script>
  import { onMount } from "svelte";
  import PageLayout from "../components/PageLayout.svelte";

  // login coding
  import { initializeApp } from "firebase/app";
  import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    getAuth,
    signOut,
    createUserWithEmailAndPassword,
    sendEmailVerification,
  } from "firebase/auth";
  const firebaseConfig = {
    apiKey: "AIzaSyD2TXO-mrUqFvjwmcc-a2HU6SKoNDdp_00",
    authDomain: "acs-2023-02.firebaseapp.com",
  };

  const fbApp = initializeApp(firebaseConfig);
  const fbAuth = getAuth(fbApp);
  // input data from the form
  let email = "";
  let password = "";
  // the result from the login
  let user = null;
  let profile = null;
  const handleLogin = async () => {
    // check if success
    console.log("handleLogin");
    try {
      const loginResult = await signInWithEmailAndPassword(
        fbAuth,
        email,
        password,
      );
      user = loginResult.user;
      console.log(`User with email ${user.email} logged in`);
    } catch (err) {
      console.log("error occured");
      alert("Login failed");
    }
  };
  const handleReset = () => {
    email = "";
    password = "";
  };

  const logout = async () => {
    try {
      await signOut(getAuth(fbApp));
      user = null;
    } catch (err) {
      console.log("error occured");
      alert("Logout failed");
    }
  };

  onAuthStateChanged(getAuth(), (fbUser) => {
    if (fbUser) {
      user = fbUser;
    } else {
      user = null;
    }
  })

  const readProfileDataFromServer = async () => {
    const response = await fetch('/api/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
    // set the profile data
    profile = await response.json()
    console.log('profile', profile)

  }
</script>

<div>
  <PageLayout title="Soccer - Profile" route="profile">
    {#if user}
      <div class="container">
        <h1>Welcome {user.email}</h1>
        {#if profile}
          <p>Name: {profile.name}</p>
          <p>Mail: {profile.mail}</p>
          <p>City: {profile.location}</p>
        {:else}
          <p><button class="btn" on:click={readProfileDataFromServer}>Load Profile</button></p>
        {/if}
        <p><button class="btn" on:click={logout}>Logout</button></p>
      </div>
    {:else}
      <div>
        <h2>Login</h2>
        <form>
          <div class="mb-6">
            <label class="label" for="email">Email</label>
            <input
              class="input input-bordered w-full"
              type="email"
              id="email"
              bind:value={email}
              placeholder="example@email.com"
              on:keydown={(e) => e.keyCode === 13 && handleLogin()}
            />
          </div>
          <div class="mb-4">
            <label class="label" for="password">Password</label>
            <input
              class="input input-bordered w-full"
              type="password"
              id="password"
              bind:value={password}
              on:keydown={(e) => e.keyCode === 13 && handleLogin()}
            />
          </div>
          <div class="flex justify-between items-center">
            <button class="btn btn-primary" on:click={handleLogin}>Login</button>
            <button class="btn" on:click={handleReset}>Reset</button>
          </div>
        </form>
      </div>
    {/if}
  </PageLayout>
</div>

<style>
</style>
