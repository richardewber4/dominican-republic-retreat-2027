(function () {
  "use strict";
  const element = document.getElementById("retreat-map");
  if (!element || !window.L) return;
  const places = [
    {name:"Juan Dolio",coords:[18.4260,-69.4060],type:"coast",detail:"Day 1 · Arrival and welcome dinner at Embocadera."},
    {name:"Boca Chica",coords:[18.4530,-69.6060],type:"coast",detail:"Day 2 · Coastal time, Deep Green Foundation experience, and dinner at The Boat House."},
    {name:"Socoa Waterfall",coords:[18.7700,-69.8500],type:"nature",detail:"Day 3 · Nature stop en route north. Pin is approximate; confirm the meeting point."},
    {name:"Las Terrenas",coords:[19.3110,-69.5420],type:"coast",detail:"Days 3–6 · Sample villa base, beaches, shared meals, and open time."},
    {name:"El Limón",coords:[19.2550,-69.4330],type:"nature",detail:"Day 5 · El Limón Waterfall outing. Confirm trailhead and transfer details."}
  ];
  const map = L.map(element,{scrollWheelZoom:false}).setView([19,-69.55],8);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'}).addTo(map);
  const route = places.map(p=>p.coords);
  L.polyline(route,{color:"#738578",weight:3,opacity:.9,dashArray:"7 8",interactive:false}).addTo(map);
  places.forEach(p=>{
    const marker=L.circleMarker(p.coords,{radius:8,color:"#fbf9f4",weight:2,fillColor:p.type==="nature"?"#466e56":"#bd795d",fillOpacity:1}).addTo(map);
    marker.bindPopup("<strong>"+p.name+"</strong><br>"+p.detail);
    marker.bindTooltip(p.name,{direction:"top",offset:[0,-8]});
  });
  map.fitBounds(L.latLngBounds(route).pad(.16));
  document.querySelectorAll('.bottom-nav a[href="#map-section"]').forEach(a=>a.addEventListener("click",()=>setTimeout(()=>map.invalidateSize(),180)));
  window.addEventListener("resize",()=>map.invalidateSize());
})();