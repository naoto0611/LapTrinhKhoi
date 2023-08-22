
function openPage(pageName,element,color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  element.style.backgroundColor = color;
}

function openForm() {
  document.getElementById("sign-up-form").style.display = "block";
}

function closeForm() {
  document.getElementById("sign-up-form").style.display = "none";
}

function chooseLevel() {
  location.replace("/level");
}

function startGame() {
  location.replace("/block");
}