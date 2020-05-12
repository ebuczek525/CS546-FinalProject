<script>
 export let goal;
 
 function openSettingsMenu() {
     document.getElementById('settings-menu').style.display = 'block';
     document.getElementById('settings').style.display = 'none';
 }

 function closeFileMenu() {
     document.getElementById('settings-menu').style.display = 'none';
     document.getElementById('settings').style.display = 'inline';
 }

 function setGoal() {
     var convertedGoal = NaN;
     do {
	 const newGoal = prompt('Enter a new word count goal:\n');
	 convertedGoal = parseInt(newGoal, 10);
	 if(isNaN(convertedGoal)) alert('That is not a valid word count.\nPlease try again.');
     } while(isNaN(convertedGoal));
     goal = convertedGoal;
 }
</script>

<style lang="sass">
span
 opacity: 50%
 &:hover
     opacity: 100%
#settings-menu
 display: none
</style>

<span id="settings" on:click={openSettingsMenu}>Settings</span>
<div id="settings-menu" >
    <span id="customize-theme">Change Theme</span>
    <span id="change-language">Change Language</span>
    <span id="define-goal" on:click={setGoal}>Set Goal</span>
    <span id="settings-back" on:click={closeFileMenu}>Back</span>
</div>
