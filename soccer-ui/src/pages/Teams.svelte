<script>
  import { onMount } from 'svelte';
  import PageLayout from '../components/PageLayout.svelte'
  import { formatUtcDate } from '../lib/formatter';
  let teams = []
  let allMatches = []
  onMount(async () => {
    console.log('onMount')
    const matchResponse = await fetch('/api/match');
    allMatches = await matchResponse.json();
    console.log('allMatches' + allMatches.length)
    const res = await fetch('/api/team');
    teams = await res.json();

  });

  const getNextMatchInfo = (team) => {
    const m = allMatches.find(m => (m.team1.teamId == team.teamId || m.team2.teamId == team.teamId) && m.matchIsFinished == false);
    let nextOpponent = m.team1.teamId == team.teamId ? m.team2.teamName : m.team1.teamName;
    let nextDate = `${formatUtcDate(m.matchDateTime)}`;
    return {nextOpponent, nextDate};
  }

  const getLastMatchInfo = (team) => {
    const allMatchesReversed = [...allMatches].reverse()
    const m = allMatchesReversed.find(m => (m.team1.teamId == team.teamId || m.team2.teamId == team.teamId) && m.matchIsFinished == true);
    const result = m.matchResults.find(r => r.resultTypeID == 2)
    const text = `${m.team1.shortName} ${result.pointsTeam1} : ${result.pointsTeam2} ${m.team2.shortName}`
    return text
  }

</script>

<PageLayout title="Soccer - Teams"  route="teams">
  <div>
    <div class="card-container">
      {#each teams as team}
        <div class="card w-96 bg-base-100 shadow-xl shadow-visible border border-main">
          <div>
            <figure><img src={team.teamIconUrl} alt="Icon" width="160px" height="160px"/></figure>
          </div>
          <div class="card-body">
            <h2 >{team.teamName}</h2>
            <h3>Last Game</h3>
            <p>{getLastMatchInfo(team)}</p>
            <h3>Next Game</h3>
            <p>Opponent: {getNextMatchInfo(team).nextOpponent}<br/> 
            Date: {getNextMatchInfo(team).nextDate}</p> 
          </div>
        </div>
      {/each}
    </div>


  </div>
</PageLayout>

<style>
    
      .card-container {
        display: flex;
        flex-wrap: wrap;
        gap:10px;
      }
  
</style>