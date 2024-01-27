<script>
  import { replace} from 'svelte-spa-router'

  export let title = 'Soccer App'
  export let route = 'home'
  let drawerOpen = true; // Start with the drawer closed by default
  let isDarkMode = false;
  // Toggle function
  function toggleDrawer() {
    drawerOpen = !drawerOpen;
  }
  const toggleTheme = () => {
    const theme = isDarkMode ? 'dark' : 'light'
    const html = document.querySelector('html')
    html.setAttribute('data-theme', theme)
  }
</script>

<div>
<!-- Navbar -->
<div class="navbar bg-base-100">
  <div class="flex-1">
    <button class="btn btn-square btn-ghost" on:click={toggleDrawer}>
      <!-- Burger Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>
  </div>
  <div class="flex-1">
    <span class="text-xl font-bold">{title}</span>
  </div>
  <div>
    <label class="label cursor-pointer">
      <span class="label-text text-xs">Darkmode&nbsp;</span> 
      <input type="checkbox" class="checkbox checkbox-xs" bind:checked={isDarkMode} on:change={toggleTheme}/>
    </label>
  </div>
</div>

<!-- Main content -->
  <div class="main-layout">
    {#if drawerOpen}
    <div class="drawer" class:drawer-open={drawerOpen}>
      <!-- Drawer content -->
      <div class="drawer-content">
        <button id="home" class="btn btn-outline nav-button" class:highlight={route === 'home'} on:click={() => replace('/')}>Home</button>
        <button id="teams" class="btn btn-outline nav-button" class:highlight={route === 'teams'} on:click={() => replace('/teams')}>Teams</button>
        <button id="matches" class="btn btn-outline nav-button" class:highlight={route === 'matches'} on:click={() => replace('/matches')}>Matches</button>
        <!-- More links -->
      </div>
    </div>
  {/if}
  <div class="main-content">
    <slot />
  </div>
</div>

<!-- Drawer -->

</div>
<style>
  .nav-button {
    width: 100%;
    margin-bottom: 3px;
  }
  .navbar {
    display: flex;
    align-items: center;
    padding: 0rem;
    margin:0rem;
    height: 3rem;
    background-color: #f3f4f6; /* Example background color */
  }
  .main-layout {
    display: flex;
    height: 100%;
  }
  .main-content {
    display: flex;
    margin: 2rem;
  }
  .drawer {
    transition: transform .3s ease;

    width: 250px;
    min-width: 250px;
    height: 100vh;
    transform: translateX(-100%);
    top: 0rem;
    left: 0;
    bottom: 0;
    background-color: #f3f4f6; /* Example background color */
    
  }
  .drawer-open {
    transform: translateX(0);
  }
  .drawer-content {
    padding: 1rem;
  }

  .highlight {
    font-weight: bold; /* Makes the text bold */
  }
</style>
