<script>
  import { onMount } from 'svelte';
  import PageLayout from '../components/PageLayout.svelte'
  import LeagueTable from '../components/LeagueTable.svelte'

  let rankings = []
  onMount(async () => {
    console.log('onMount')
    const rankingsResponse = await fetch('/api/ranking');
    rankings = await rankingsResponse.json();
  });

</script>

<div>
  <PageLayout title="Soccer - Home" route="home">
    <div>
      <LeagueTable rankings={rankings} />
    </div>
  </PageLayout>
</div>
<style>
</style>
