(function () {
"use strict";
const element=document.getElementById("retreat-map");
if(!element||!window.L)return;
const places=[
{name:"Juan Dolio",coords:[18.4260,-69.4060],type:"coast",detail:"Days 1–2 · Club Hemingway, welcome and coastal activities."},
{name:"Boca Chica",coords:[18.4530,-69.6060],type:"coast",detail:"Day 2 · Deep Green Foundation experience and dinner."},
{name:"Socoa Waterfall",coords:[18.8792,-69.7250],type:"nature",detail:"Day 3 · Socoa Waterfall; confirm exact meeting point."},
{name:"Las Terrenas",coords:[19.3110,-69.5420],type:"coast",detail:"Days 3–6 · Sample villa base, beaches and shared meals."},
{name:"El Limón Waterfall",coords:[19.2550,-69.4330],type:"nature",detail:"Day 5 · El Limón Waterfall; confirm trailhead and transfer."}
];
const map=L.map(element,{scrollWheelZoom:false}).setView([19,-69.55],8);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'}).addTo(map);
const route=places.map(p=>p.coords);
L.polyline(route,{color:"#7d8f49",weight:3,opacity:.9,dashArray:"7 8",interactive:false}).addTo(map);
places.forEach(p=>{const marker=L.circleMarker(p.coords,{radius:8,color:"#fffdf8",weight:2,fillColor:p.type==="nature"?"#526f35":"#bc7d37",fillOpacity:1}).addTo(map);marker.bindPopup("<strong>"+p.name+"</strong><br>"+p.detail);marker.bindTooltip(p.name,{direction:"top",offset:[0,-8]});});
map.fitBounds(L.latLngBounds(route).pad(.16));
document.querySelectorAll('.bottom-nav a[href="#map-section"],.top-nav a[href="#map-section"]').forEach(a=>a.addEventListener("click",()=>setTimeout(()=>map.invalidateSize(),180)));
window.addEventListener("resize",()=>map.invalidateSize());
})();