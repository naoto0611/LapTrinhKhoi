
// full page tabs
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

// pop-up form
function openForm() {
  document.getElementById("sign-up-form").style.display = "block";
}

function closeForm() {
  document.getElementById("sign-up-form").style.display = "none";
}

//choose level 
function chooseLevel() {
  //location.replace("/level");
  if (document.getElementById("inactive").style.display == "") 
    document.getElementById('active').click();
  else
    location.replace("/level");
  //alert(document.getElementById("inactive").style.display);
}

//ranking tabs
function openRankingTabs(levelRanking, element, color) {
  var i;
  var x = document.getElementsByClassName("level-ranking");
  
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablevel");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  document.getElementById(levelRanking).style.display = "block";
  element.style.backgroundColor = color;
}

function signOut() {
  location.replace('/');
}