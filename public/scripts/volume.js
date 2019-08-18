var slider = document.getElementById("volume");
var player = document.getElementById("player");
slider.oninput = function() {
  player.volume = slider.value;
  console.log(player.volume);
}
