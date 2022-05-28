// Define all variables
let liTagCurr = "li-1", liTagCurrDura, liTagPrev = "li-1", music_dir, poster_dir, 
    img_dir, agent, ext, playbtn, nextbtn, prevbtn, forwbtn, backwbtn, mutebtn,
    seekslider, volumeslider, curtimetext, durtimetext, track_name, track_artist,
    repeat, seeking = false, seekto, audio, track_index, track_title_index, track_artist_index,
    track_source_index, track_poster_index, track_album_index, track_current_time = 0, norep = false,
     rendom_track_play = false, shuffle_index=0, liUniqueId;

// make a array size of music array store for array index
let music_index_arr=[];
// declaration the array using this function
toFillSumN(music_index_arr, 0, music.length-1);

// all directory path define
// music directory path variable
music_dir = "src/music/";
// song poster directory path variable
poster_dir = "src/poster/";
// player button and icons image directory path variable
img_dir = "src/img/";

// define api/2D areay index variable 
// song array index is most important variable
track_index = 0;

// music array elements indexes
// song title array index
track_title_index = 1;
// song artist array index
track_artist_index = 2;
// song poster array index
track_poster_index = 4;
// song source array index
track_source_index = 5;
// music album array index
track_album_index = 3;

// used to play this music on any browser
// extention default value define .mp3
ext = ".mp3";

// if your have a firefox or opera browser so your music extention is .ogg
agent = navigator.userAgent.toLowerCase();
if (agent.indexOf("firefox") != -1 || agent.indexOf("opera") != -1) {
  ext = ".ogg";
}

// set all object references
// play buttons object
playbtn = document.getElementById("playpusebtn");
// next button object
nextbtn = document.getElementById("nextbtn");
// previous button object
prevbtn = document.getElementById("prevbtn");
// forward button object
forwbtn = document.getElementById("forwbtn");
// backward button object
backwbtn = document.getElementById("bkwbtn");
// mute button object
mutebtn = document.getElementById("mutebtn");
// seekslider / input rage object
seekslider = document.getElementById("seekslider");
// volumeslider / input rage object
volumeslider = document.getElementById("volumeslider");
// track current time text object
curtimetext = document.getElementById("curtimetext");
// track duration time text object
durtimetext = document.getElementById("durtimetext");
// track title text object
track_name = document.getElementById("track_name");
// track artist nane text object
track_artist = document.getElementById("track_artist");
// track repeat buttons object
repeat = document.getElementById("repeat");
// rendom track play / shuffle button object
randomsong = document.getElementById("random");

// select ul tag to select playlist
ulTag = document.querySelector("ul");


// javascript audio object define
audio = new Audio();

// check api or 2D array is empty or not if it empty that sow all default track value or it not empty that sow frist track details according to the 2D arrays
if(music.length){
    // default audio source according to the track index
    audio.src = music_dir + music[track_index][track_source_index] + ext;
    // default track title according to the track index
    track_name.innerHTML = music[track_index][track_title_index];
    // default track artist according to the track index
    track_artist.innerHTML = music[track_index][track_artist_index];
    // default track poster according to the track index
    $("#poste_img").attr("src", poster_dir + music[track_index][track_poster_index]);

    // default track background image according to the track index
    $("#bgImge").attr("src", poster_dir + music[track_index][track_poster_index]);
   
    // default music player background image according to the track index
    document.getElementById('bg-imge-body').style.backgroundImage = "url('"+poster_dir + music[track_index][track_poster_index]+"')";
    // seek time update
    seektimeupdate();
    
    // update Music list
    updateMusicList();
    liTagCurrDura = document.querySelector("ul li#li-1 span.audio-duration").getAttribute("data-track-duration");
    
} else {
  // sow default track value because Array is empty
    audio.src = "";
    track_name.innerHTML = "Open Wed Audio";
    track_artist.innerHTML = "Developed by Our Community";
    $("#poste_img").attr("src", poster_dir + "default_icon.jpg");
    $("#bgImge").attr("src", poster_dir + "default_icon.jpg");
    curtimetext.innerHTML = "00"+":"+"00";
    durtimetext.innerHTML = "00"+":"+"00";
    document.getElementById('bg-imge-body').style.backgroundImage = "url('" + poster_dir + "default_icon.jpg" + "')";
}

// add event listener/handling
// play and pause button define
playbtn.addEventListener("click", playPause);
// next button event define
nextbtn.addEventListener("click", function(){ if(!rendom_track_play){ nextSong(); }else{ shuffle_next(); }});
// previous button event define
prevbtn.addEventListener("click", function(){ if(!rendom_track_play){ prevSong(); }else{ shuffle_prev(); }});
// forward button event define
forwbtn.addEventListener("click", forwSong);
// backward button event define
backwbtn.addEventListener("click", backwSong);
// mute button event define
mutebtn.addEventListener("click", mutedSong);
// seekslider input field mouse down event define
seekslider.addEventListener("mousedown", function(event){ seeking = true; seek(event, "mouse"); });
// seekslider input field mouse move event define
seekslider.addEventListener("mousemove", function(event){ seek(event, "mouse"); });
// seekslider input field mouse up event define
seekslider.addEventListener("mouseup", function(){ seeking = false; });

// seekslider onchange / change event define
seekslider.addEventListener("change", function(){ seeking = true; seek(); });

// volumeslider input field mouse move event define
volumeslider.addEventListener("mousemove", setvolume);

// volumeslider onchange / change event define
volumeslider.addEventListener("change", setvolume);
// track time update event define
 audio.addEventListener("timeupdate", function(){ seektimeupdate();});
// track end update event define
audio.addEventListener("ended", function(){ if(!norep){ if(!rendom_track_play) {switchTrack(); } else { shuffleSwitchTrack(); } } else {noSwitchTrack();} });
// track loop button event update
repeat.addEventListener("click", loop);
// track random song button event update
randomsong.addEventListener("click", random);

// All functions define and initiation
// loading track function define
function fatchMusicDetails() {
  // get current seek time and store this variable
  track_current_time = audio.currentTime;
  // fatch play puse button icon image
  $("#playpusebtn img").attr("src", img_dir + "pause-red.png");
  // fatch and update player background image
  $("#bgImge").attr("src", poster_dir + music[track_index][track_poster_index]);
  // fatch and update poster image
  $("#poste_img").attr("src", poster_dir + music[track_index][track_poster_index]);
  // fatch and update background photo
  document.getElementById('bg-imge-body').style.backgroundImage = "url('"+poster_dir + music[track_index][track_poster_index]+"')";
  // fatch and update background color of li tag

  // fatch and update music title
  track_name.innerHTML = music[track_index][track_title_index];
  // updated and fatch music artist
 track_artist.innerHTML = music[track_index][track_artist_index];
  
  // fatch and update audio source
   audio.src = music_dir + music[track_index][track_source_index] + ext;
  // fatch and update track current time
  audio.currentTime = track_current_time;
  
  // fatch and play this music track
  audio.play();
}

// music play afunction button function
function playPause(){
  if(audio.paused){
    PlaylistChange(track_index);
    audio.play();
    $("#playpusebtn img").attr("src", img_dir + "pause-red.png");
  } else {
    audio.pause();
    $("#playpusebtn img").attr("src", img_dir + "play-red.png");
  }
}

// play next song buttons function
function nextSong(){
  resetTrack();
  track_index++;
  if(track_index > music.length - 1){
    track_index = 0;
  }
  PlaylistChange(track_index);
  fatchMusicDetails();
}

// play previous music buttons function
function prevSong(){
  resetTrack();
  
  track_index --;
  if (track_index < 0){
     track_index = music.length - 1;
  }
  PlaylistChange(track_index);
  fatchMusicDetails();
}

// music forwards 30 second button function
function forwSong(){
  audio.currentTime += 30.0;
}

// music backwards 30 second button function
function backwSong(){
  audio.currentTime -= 30.0;
}

// muted the music button function
function mutedSong(){
  if(audio.muted){
    audio.muted = false;
    $("#mutebtn img").attr("src", img_dir + "speaker.png");
    } else {
     audio.muted = true;
     $("#mutebtn img").attr("src", img_dir + "mute.png");
    }
    if(!audio.paused){
      fatchMusicDetails();
    }
}

// seekslider input range function
function seek(event, eventType){
  if(audio.duration == 0){
    null
  } else {
    if(seeking){
      if(eventType == "mouse")
        seekslider.value = event.clientX -  seekslider.offsetLeft;
        
      seekto = audio.duration * (seekslider.value/100);
      //track_artist.innerHTML = seekto;
      audio.currentTime = seekto;
    }
  }
}

// music volume update
function setvolume(){
  audio.volume = volumeslider.value / 100;
}

// update seek time
function seektimeupdate(){
  if(audio.duration){
    let nt = audio.currentTime * (100 / audio.duration);
    seekslider.value = nt;
    var curmins = Math.floor(audio.currentTime/60);
    var cursecs = Math.floor(audio.currentTime - curmins * 60);
    var durmins = Math.floor(audio.duration / 60);
    var dursecs = Math.floor(audio.duration - durmins * 60);
    if(cursecs < 10){ cursecs = "0" + cursecs}
    if(dursecs < 10){ dursecs = "0" + dursecs}
    if(curmins < 10){ curmins = "0" + curmins}
    if(durmins < 10){ durmins = "0" + durmins}
    curtimetext.innerHTML = curmins+":"+cursecs;
    durtimetext.innerHTML = durmins+":"+dursecs;
  } else {
    curtimetext.innerHTML = "00"+":"+"00";
    durtimetext.innerHTML = "00"+":"+"00";
    
  }
}

// switchTrack before ending the track
function switchTrack(){
  resetTrack();
  if(track_index == (music.length - 1)){
    track_index = 0;
  } else {
    track_index++;
  }
  PlaylistChange(track_index);
  fatchMusicDetails();
}

// tracks play loop button function
function loop(){

  if((audio.loop == false) && (norep == false)) {
    audio.loop = true;
    norep = false;
    $("#repeat img").attr("src", img_dir + "rep1.png");
  } else if((audio.loop == true) && (norep == false)){
    audio.loop = false;
    norep = true;
    $("#repeat img").attr("src", img_dir + "no_rep.png");
  } else if((audio.loop == false) && (norep==true)) {
     audio.loop = false;
     norep = false;

    $("#repeat img").attr("src", img_dir + "rep.png");
  }
  
  fatchMusicDetails();
}

// random track play
function random(){
  if(rendom_track_play){
   rendom_track_play = false;
   $("#random img").attr("src", img_dir + "random.png");
   track_index = 0;
   document.querySelector("ul").innerHTML="";
    updateMusicList();
  } else{
    rendom_track_play = true;
    track_index = 0;
    shuffle(music_index_arr);
    $("#random img").attr("src", img_dir + "no-random.png");
    track_index = music_index_arr[track_index];
    document.querySelector("ul").innerHTML="";
    updateMusicList();
  }
  PlaylistChange(track_index);
  fatchMusicDetails();
}

// shuffle play next track function
function shuffle_next(){
  resetTrack();
  shuffle_index++;
  track_index = music_index_arr[shuffle_index];
  if(shuffle_index > music_index_arr.length - 1){
    shuffle_index = 0;
    track_index = music_index_arr[shuffle_index];
  }
  PlaylistChange(track_index);
  fatchMusicDetails();
}

// shuffle play next track function
function shuffle_prev(){
  resetTrack();
  shuffle_index--;
  track_index = music_index_arr[shuffle_index];
  if(shuffle_index < 0){
    shuffle_index = music_index_arr.length-1;
    track_index = music_index_arr[shuffle_index];
  }
  PlaylistChange(track_index);
  fatchMusicDetails();
}

// shuffleSwitchTrack before ending the track
function shuffleSwitchTrack(){
  resetTrack();
  if(shuffle_index == (music_index_arr.length - 1)){
    shuffle_index = 0;
    track_index = music_index_arr[shuffle_index];
  } else {
    shuffle_index++;
    track_index = music_index_arr[shuffle_index];
  }
  PlaylistChange(track_index);
  fatchMusicDetails();
}

// no switch / auto play track when track is end
function noSwitchTrack(){
  $("#playpusebtn img").attr("src", img_dir + "play-red.png");
  audio.pause();
}

// reset seek track function
function resetTrack(){
  audio.currentTime = 0;
  audio.volume = audio.volume;
  audio.src = "";
  track_name.innerHTML = "";
  track_artist.innerHTML = "";
  $("#poste_img").attr("src", "");
  $("#bgImge").attr("src", "");
  document.getElementById('bg-imge-body').style.backgroundImage = "url('')";
}

// search buttons click to focus search bar button function
function focus_search_bar(){
  document.getElementById("search_track").classList.toggle("show");
  document.getElementById("search_bar").focus();
}

// more track show section
// menu buttons object
let moreMenuBtn = document.getElementById("menuBtn");
// search and music track section selector
let moreMenu = document.getElementById("search_track");
let closemoreMusic = document.getElementById("closemoreMusic");

//show music playlist section
moreMenuBtn.addEventListener("click", ()=>{
  moreMenu.classList.toggle("show");
});

// close music playlist section 
closemoreMusic.addEventListener("click", ()=>{
  moreMenu.classList.remove("show");
  $("#search_bar").val("");
  track_search();
});

// update music playlist
function updateMusicList(){
  let ulTag = document.querySelector("ul");
  
  // let create li tags according to array length for list
  for (let j = 0; j < music.length; j++) {
  // shuffle mode array index
  let i;
  if(rendom_track_play)
    i = music_index_arr[j];
  else
    i = j;
  // genarate random music id
  let track_uid =("track"+"-"+(i+1)).toString();
  
  // li tag unique id genarate
  let liunique = "li-"+(j+1).toString();
  //let's pass the song name, artist from the array
  let liTag =`
            <li data-track-index="${i}" id="${liunique}" class=''>
              <div class="row">
                <span>${music[i][track_title_index]}</span>
                <p>${music[i][track_artist_index]}</p>
            </div>
            <span id="${track_uid}" class="audio-duration">playing..</span>
            <audio class="${track_uid}" src="${music_dir + music[i][track_source_index] + ext}"></audio>
          </li>
          `;
    ulTag.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tags
    
    let liAudioDuartionTag = ulTag.querySelector(`#${track_uid}`);
    let liAudioTag = ulTag.querySelector(`.${track_uid}`);
    liAudioTag.addEventListener("loadeddata", ()=>{
      let duration = liAudioTag.duration;
      let totalMin = Math.floor(duration / 60);
      let totalSec = Math.floor(duration % 60);
      if(totalSec < 10){ //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
      };
      // if li is the frist element of the lin tag so update liTagCurrDura of the data track duration
      if(liunique == "li-1"){
        liTagCurrDura = `${totalMin}:${totalSec}`;
      }
      liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`; //passing total duation of song
      liAudioDuartionTag.setAttribute("data-track-duration", `${totalMin}:${totalSec}`); //adding t-duration attribute with total duration value

    });
  }
  
  // play particular song from the list onclick of li tag
  const allLiTag = ulTag.querySelectorAll("li");
  for (let j = 0; j < allLiTag.length; j++) {
    allLiTag[j].setAttribute("onclick", "playWithIndex(this)");
  }
}


// track player using track index
function playWithIndex(index){
  let ulTag = document.querySelector("ul");
  liTagCurr = index.getAttribute("id");
  
  // if current li tag is the frist tag then do not update privious audio duration 
  // becous frist time liTagCurrDura valu is null

  ulTag.querySelector(`li#${liTagPrev}`).querySelector("span.audio-duration").innerHTML= liTagCurrDura;

  ulTag.querySelector(`li#${liTagPrev}`).classList.remove("show");
  liTagPrev = liTagCurr;
  ulTag.querySelector(`li#${liTagCurr}`).classList.toggle("show");
  track_index = index.getAttribute('data-track-index');
  index.querySelector("li span.audio-duration").innerHTML= 'Playing...';
  liTagCurrDura = index.querySelector(".audio-duration").getAttribute("data-track-duration");
  
  audio.currentTime = 0;
  fatchMusicDetails();
}


// playlist bsckground change function
function PlaylistChange(track_index){
   if(rendom_track_play)
   liTagCurr = ("li-"+(shuffle_index+1));
   else
    liTagCurr = ("li-"+(track_index+1));
    
 
   ulTag.querySelector(`li#${liTagPrev}`).querySelector("span.audio-duration").innerHTML= liTagCurrDura;


    // ulTag.querySelector(`li#${liTagPrev}`).querySelector("span.audio-duration").innerHTML= liTagCurrDura;
    ulTag.querySelector(`li#${liTagPrev}`).classList.remove("show");
    liTagPrev = liTagCurr;
    ulTag.querySelector(`li#${liTagCurr}`).classList.toggle("show");
    
    ulTag.querySelector(`li#${liTagCurr} span.audio-duration`).innerHTML= 'Playing...';
    liTagCurrDura = ulTag.querySelector(".audio-duration").getAttribute("data-track-duration");
}

// playlist search function
function track_search() {
  //alert("search");
  // Declare variables
  var input, filter, ul, li, div, i;
  input = document.getElementById("search_bar");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myMenu");
  li = ul.getElementsByTagName("li");
  
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    div = li[i].getElementsByTagName("div")[0];
    if (div.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
      li[i].style.color = "none";
    }
  }
}

// search bar clear button style
$(document).ready(function() {
  $("#clearButton").on("click", function() {
    $("#search_bar").val("");
    track_search();
  });
});
