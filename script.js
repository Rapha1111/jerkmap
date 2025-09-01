var map = L.map('map')

api="https://projetx.koyeb.app"

if (localStorage.getItem("name")!=undefined){
    document.getElementById("cpseudo").value=localStorage.getItem("name");
    document.getElementById("cpassword").value=localStorage.getItem("pswd");
}

function connect(){
    var xhr = new XMLHttpRequest();
xhr.open('GET', api+'/get_jerk?name='+document.getElementById("cpseudo").value+'&password='+document.getElementById("cpassword").value, true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        if (xhr.responseText=="non"){
			alert("nom ou mot de passe incorrect")
    } else {
		localStorage.setItem("name", document.getElementById("cpseudo").value)
		localStorage.setItem("pswd", document.getElementById("cpassword").value)
		connected(JSON.parse(xhr.responseText))
	}
}
}
xhr.send();
};

var BrIcon = L.icon({
    iconUrl: 'map.png',
    iconSize: [70, 70],
    iconAnchor: [35,65],
    popupAnchor: [0, -65],
    
});
var KissIcon = L.icon({
    iconUrl: 'kiss.png',
    iconSize: [70, 70],
    iconAnchor: [35,65],
    popupAnchor: [0, -65],
    
});
var PreliIcon = L.icon({
    iconUrl: 'preli.png',
    iconSize: [70, 70],
    iconAnchor: [35,65],
    popupAnchor: [0, -65],
    
});
var BzIcon = L.icon({
    iconUrl: 'bz.png',
    iconSize: [70, 70],
    iconAnchor: [35,65],
    popupAnchor: [0, -65],
    
});

acticon=[NaN, BrIcon, KissIcon, PreliIcon, BzIcon]
actemoji=[NaN, "🍌","💋", "💦","🍑"]

var PersoIcon=L.icon({
    iconUrl: 'stats.png',
    iconSize: [70, 70],
    iconAnchor: [35,35],
    popupAnchor: [0, -35],
    
});

function connected(jerks){
    document.getElementById("connect").hidden=true
    document.getElementById("map-screen").hidden=false
    document.getElementById("tabbar").style.display="flex"
    getPos().then((coords) => {
    map.setView(coords, 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
    var marker = L.marker(coords, {icon: PersoIcon}).addTo(map);
        marker.bindPopup("Vous")
    jerks.forEach(function(a) {
        var marker = L.marker([a[2], a[3]], {icon: acticon[a[4]]}).addTo(map);
        marker.bindPopup("<b>"+actemoji[a[4]]+" "+a[1]+"</b><br>"+a[5])
});
    })
}

function getPos() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("La géolocalisation n'est pas supportée par ce navigateur."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const co = [pos.coords.latitude, pos.coords.longitude];
        resolve(co);
      },
      (err) => {
        reject(new Error("Impossible de récupérer la position : " + err.message));
      }
    );
  });
}

// Exemple d’utilisation :

function inscrire(){
    if (document.getElementById("ipassword").value!=document.getElementById("ipassword2").value){
        alert("les deux mot de passe sont différents")
        return;
    }
    var xhr = new XMLHttpRequest();
xhr.open('GET', api+'/inscription?name='+document.getElementById("ipseudo").value+'&password='+document.getElementById("ipassword").value, true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        if (xhr.responseText=="non"){
			alert("ce pseudo est déjà pris")
    } else {
		localStorage.setItem("name", document.getElementById("ipseudo").value)
		localStorage.setItem("pswd", document.getElementById("ipassword").value)
        document.getElementById("cpseudo").value=document.getElementById("ipseudo").value
        document.getElementById("cpassword").value=document.getElementById("ipassword").value
		connect()
	}
}
}
xhr.send();
}


function goconnect(){
    document.getElementById("inscrire").hidden=true
    document.getElementById("connect").hidden=false
}


function goinscrire(){
    document.getElementById("inscrire").hidden=false
    document.getElementById("connect").hidden=true
}