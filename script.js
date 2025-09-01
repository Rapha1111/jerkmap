function connect(){

    document.getElementById("connect").hidden=true
    document.getElementById("map-screen").hidden=false
    document.getElementById("tabbar").style.display="flex"
    getPos().then((coords) => {
    var map = L.map('map').setView(coords, 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
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



function goconnect(){
    document.getElementById("inscrire").hidden=true
    document.getElementById("connect").hidden=false
    
}


function goinscrire(){
    document.getElementById("inscrire").hidden=false
    document.getElementById("connect").hidden=true
    
}