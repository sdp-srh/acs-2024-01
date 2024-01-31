<script>
  import { onMount } from 'svelte';
  import PageLayout from '../components/PageLayout.svelte'
  let matches = []
  let allMatches = []
  let matchDays = []
  let selectedMatchDay = {}
  let olStatus = {}
  
  onMount(async () => {
    const res = await fetch('/api/match')
    allMatches = await res.json()
    matchDays = createMatchDays()
    selectedMatchDay = matchDays[0].day
    matches = matches = getMatchesForDay(selectedMatchDay)
    // get the status and the current matchday
    const olStatusResponse = await fetch('/api/status')
    olStatus = await olStatusResponse.json()
    console.log(olStatus);
    selectedMatchDay = matchDays.find(d => d.day == olStatus.groupOrderID).day
    matches = getMatchesForDay(selectedMatchDay)
  })

  const createMatchDays = () => {
    for (let i = 1; i <= 34; i++) {
      const filler = i < 10 ? ' ' : '';
      matchDays.push({
        day: ''+i,
        name: `${filler}${i} Spieltag`
      })
    }
    console.log(matchDays);
    return matchDays
  }

  const getMatchesForDay = (number) => {
    const matchesPerDay = allMatches.filter(m => m.group.groupOrderID == number)
    matchesPerDay.sort((a, b) => {
      if (a.matchDateTimeUTC > b.matchDateTimeUTC) return 1
      return -1
    })
    return matchesPerDay
  }

  const getCurrentResult = (match) => {
    const results = match.matchResults;
    // get latest result (end of the array)
    const result = results[results.length - 1];
    return result
  }

  const formatUtcDate = (utcDate) => {
    const date = new Date(utcDate);
    return date.toLocaleDateString('de-DE', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
  }

  const onMatchdayChange = () => {
    console.log(selectedMatchDay)
    matches = getMatchesForDay(selectedMatchDay)
  }
</script>

<PageLayout title="Soccer - Matches"  route="matches">
  <div>
    <div>
      <b>Spieltag</b>
      <select class="select select-bordered w-full max-w-xs select-type select-xs" bind:value={selectedMatchDay} on:change={onMatchdayChange}>
        {#each matchDays as d}
          <option value={d.day}>{d.name}</option>
        {/each}
      </select>
    </div>
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th><b>Heim</b></th>
            <th></th>
            <th><b>:</b></th>
            <th></th>
            <th><b>Gast</b></th>
            <th></th>
            <th><b>Datum</b></th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          {#each matches as m}
          <tr>
            <td><img src={m.team1.teamIconUrl} class="img-text" alt={m.team1.shortName}/></td>
            <td>{m.team1.teamName}</td>
            <td>{getCurrentResult(m)?.pointsTeam1 ?? ''}</td>
            <td>:</td>
            <td>{getCurrentResult(m)?.pointsTeam2 ?? ''}</td>
            <td>{m.team2.teamName}</td>
            <td><img src={m.team2.teamIconUrl} class="img-text" alt={m.team2.shortName}/></td>
            <td>{formatUtcDate(m.matchDateTimeUTC)}</td>
          </tr>
          <!-- row 2 -->
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</PageLayout>
<style>
  .select-type {
    margin-left: 1rem;
  }
  .img-text {
    height: 1.1em; /* Sets the icon height to match the font size of the text */
    width: 1.1em; /* Sets the icon width to match the font size of the text */
    vertical-align: middle;
    margin-top:0em;
    margin-bottom:0em;
  }
</style>