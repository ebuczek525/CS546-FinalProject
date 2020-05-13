<script>
 export let goal;
 export let fg;
 export let bg;
 export let lang;
 
 function openSettingsMenu() {
     document.getElementById('settings-menu').style.display = 'block';
     document.getElementById('settings').style.display = 'none';
 }

 function closeFileMenu() {
     document.getElementById('settings-menu').style.display = 'none';
     document.getElementById('settings').style.display = 'inline';
 }

 function openThemeMenu() {
     ['customize-theme', 'change-language', 'define-goal', 'settings-back']
	 .forEach(n => document.getElementById(n).style.display = 'none');
     document.getElementById('theme-menu').style.display = 'inline';

     
     // set up event listener for FG/BG selectors
     document.getElementById('fg-selector').addEventListener('input', e => {
	 fg = e.target.value;
     }, false);
     
     document.getElementById('bg-selector').addEventListener('input', e => {
	 bg = e.target.value;
     }, false);
 }

 function closeThemeMenu() {
     ['customize-theme', 'change-language', 'define-goal', 'settings-back']
	 .forEach(n => document.getElementById(n).style.display = 'inline');
     document.getElementById('theme-menu').style.display = 'none';
 }

 function setLanguage() {
     const newLang = prompt('Enter new language:\n(Two-letter language code, eg "en")\n\n');
     if(newLang) {
	 lang = newLang;
     }
 }
 
 function setGoal() {
     var convertedGoal = NaN;
     do {
	 const newGoal = prompt('Enter a new word count goal:\n');
	 if(!newGoal) return; // If the user cancels, just stop
	 convertedGoal = parseInt(newGoal, 10);
	 if(isNaN(convertedGoal)) alert('That is not a valid word count.\nPlease try again.');
     } while(isNaN(convertedGoal));
     goal = convertedGoal;
 }

</script>

<style lang="sass">
span, label, input
 opacity: 50%
 &:hover
     opacity: 100%
#settings-menu, #theme-menu
 display: none
</style>

<span id="settings" on:click={openSettingsMenu}>Settings</span>
<div id="settings-menu">
    <div id="theme-menu">
	<label for="fg-selector">Foreground:</label>
	<input type="color" value="#000000" id="fg-selector">
	<label for="bg-selector">Background:</label>
	<input type="color" value="#FFFFFF" id="bg-selector">
	<span id="theme-back" on:click={closeThemeMenu}>Back</span>
    </div>
    <span id="customize-theme" on:click={openThemeMenu}>Change Theme</span>
    <span id="change-language" on:click={setLanguage}>Change Language</span>
    <span id="define-goal" on:click={setGoal}>Set Goal</span>
    <span id="settings-back" on:click={closeFileMenu}>Back</span>
</div>
