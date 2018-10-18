'use strict';

var func = {};

func.toRadian = function(degree){
  return degree*Math.PI/180;
};

func.getDist = function(x1, y1, x2, y2){
  var radY1 = toRadian(y1);
  var radY2 = toRadian(y2);
  const R = 6371000; //radius of the earth

  var dRadY = toRadian(y2-y1);
  var dRadX = toRadian(x2-x1);

  var a = Math.sin(dRadY/2)*Math.sin(dRadY/2) +
          Math.cos(radY1)*Math.cos(radY2) *
          Math.sin(dRadX/2)*Math.sin(dRadX/2);

  var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R*c;
};

module.export = func;
