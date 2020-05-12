<script>
 export let char;
 export let para;
 export let page;
 export let goal;
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
	<span>Paragraphs: {para}</span>
	<span>Pages: {page}</span>
	<span>{char / goal}% of daily goal</span>
    </div>
</div>
