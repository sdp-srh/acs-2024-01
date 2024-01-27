<script>
  export let rankings = []
</script>


<div>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th><b>#</b></th>
          <th><b></b></th>
          <th><b>Team</b></th>
          <th><b>Sp.</b></th>
          <th><b>S</b></th>
          <th><b>U</b></th>
          <th><b>N</b></th>
          <th><b>Tore</b></th>
          <th><b>Diff</b></th>
          <th><b>Punkte</b></th>
        </tr>
      </thead>
      <!-- body -->
      <tbody>
        {#each rankings as r}
          <tr>
            <td><b>{r.rank}</b></td>
            <td><div><img src={r.teamIconUrl} class="img-text" alt={r.shortName}/></div></td>
            <td><b>{r.teamName}</b></td>
            <td>{r.matches}</td>
            <td>{r.won}</td>
            <td>{r.draw}</td>
            <td>{r.lost}</td>
            <td>{r.goals}:{r.opponentGoals}</td>
            <td>{r.goalDiff}</td>
            <td><b>{r.points}</b></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .img-text {
    height: 1.1em; /* Sets the icon height to match the font size of the text */
    width: 1.1em; /* Sets the icon width to match the font size of the text */
    vertical-align: middle;
    margin-top:0em;
    margin-bottom:0em;
  }
</style>
