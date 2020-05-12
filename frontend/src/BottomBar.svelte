<script>
 export let char;
 export let word;
 export let para;
 export let page;
 export let goal;

 $: goalPercent = +((word / goal) * 100).toFixed(1)
 $: goalColor = goalPercent >= 100? 'green' : 'inherit';
</script>

<style lang="sass">
span
     padding: 15px
     opacity: 50%
     &:hover
          opacity: 100%
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
	<span>Characters: {char}</span>
	<span>Words: {word}</span>
	<span>Paragraphs: {para}</span>
	<span>Pages: {+(page).toFixed(1)}</span>
	<span style="color: {goalColor}">{goalPercent}% of goal</span>
    </div>
</div>
