var map = L.map('map').setView([40.6756336193902, -3.713507617355068], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

var startPoint = L.latLng(40.658009008271584, -3.7664719171884222);
var endPoint = L.latLng(40.6839090453442, -3.650114432529451);

var route = L.Routing.control({
  waypoints: [
    startPoint,
    endPoint
  ]
}).addTo(map);

map.fitBounds([startPoint, endPoint]);