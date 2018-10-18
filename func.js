'use strict';

const func = function(){};

//degree to radian
func.toRadian = function(degree){
  return degree*Math.PI/180;
};

//return distance between 2 coordinates in KM
func.getDist = function (lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = func.toRadian(lat2-lat1);
  var dLon = func.toRadian(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(func.toRadian(lat1)) * Math.cos(func.toRadian(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

module.exports = func;
