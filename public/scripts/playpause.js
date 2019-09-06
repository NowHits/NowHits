function play() {
  document.getElementById("player").muted = false;
  document.getElementById('play').style.display = "none";
  document.getElementById('pause').style.display = "initial";
}
function pause() {
  document.getElementById("player").muted = true;
  document.getElementById('pause').style.display = "none";
  document.getElementById('play').style.display = "initial";
}
