<script>
 export let charNoWhiteSpace;
 export let char;
 export let word;
 export let para;
 export let page;
 export let goal;
 
 $: goalPercent = +((word / goal) * 100).toFixed(1)
 $: goalColor = goalPercent >= 100? 'green' : 'inherit';
</script>

<style lang="sass">
.stat
     opacity: 50%
     &:hover
          opacity: 100%
     .char
          display: inline
          opacity: 45%
          &:hover
               opacity: 55%
#bottom-menu-bar
     display: none
     font-family: sans-serif
#bottom-bar
     position: fixed
     bottom: 0
     height: 10%
     width: 100%
     &:hover
          #bottom-menu-bar
               height: 100%
               display: flex
               flex-direction: row
               justify-content: space-around
               align-items: center
</style>

<div id="bottom-bar">
    <div id="bottom-menu-bar">
	<span class="stat">Characters: {charNoWhiteSpace}<div class="char">/{char}</div></span>
	<span class="stat">Words: {word}</span>
	<span class="stat">Paragraphs: {para}</span>
	<span class="stat">Pages: {+(page).toFixed(1)}</span>
	<span class="stat" style="color: {goalColor}">{goalPercent}% of goal</span>
    </div>
</div>
