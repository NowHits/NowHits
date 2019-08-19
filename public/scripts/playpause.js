function play() {
  document.getElementById('player').play()
  document.getElementById('play').style.display = "none";
  document.getElementById('pause').style.display = "initial";
}
function pause() {
  document.getElementById('player').pause()
  document.getElementById('pause').style.display = "none";
  document.getElementById('play').style.display = "initial";
}
