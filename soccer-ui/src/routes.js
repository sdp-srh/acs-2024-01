import Home from './pages/Home.svelte'
import Teams from './pages/Teams.svelte'
import Matches from './pages/Matches.svelte'
import Profile from './pages/Profile.svelte'
import NotFound from './pages/NotFound.svelte'


export default {
  '/': Home,
  '/teams/': Teams,
  '/matches/': Matches,
  '/profile/': Profile,
  // The catch-all route must always be last
  '*': NotFound
} 