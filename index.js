var fs = require('fs');
var Thumbler = require('video-thumb');
var Spritesmith = require('spritesmith');
var Layout = require('layout');
var storyBoardLayout = require('./layout');


Layout.addAlgorithm('storyboard', storyBoardLayout);

const initArray = function(){
  var frames = new Array(25);
  return frames.fill('./fill.png');
}

var secondsPerFrame = 5;
var seconds = 217;
var total = Math.floor(seconds/secondsPerFrame) - 1;
var video = 'video.mp4';
var frames = initArray();
let paging = 0;
let framePos = 0;
let spritesmith = new Spritesmith();

for(var i = 0; i < total; i++){
  const sec = (i * secondsPerFrame) + 3;
  const time = ~~(sec / 60) + ":" + (sec % 60 < 10 ? "0" : "") + sec % 60;
  console.info(time)
  const snap = `snapshot-${sec}.png`;
  const folder = video.slice(0, -4);
  const path = `./frames/${folder}/${snap}`;
  
  frames[framePos] = path;
  Thumbler.extract(video, path, time, '160x90');
  framePos++;

  if((i % 24 === 0 && i !== 0) || i === total -2){
    src = frames;
    framePos = 0;
    frames = initArray();

    Spritesmith.run({src: src, algorithm: 'storyboard'}, function handleResult (err, result) {
      fs.writeFileSync(__dirname + `/sprites/FP${paging}.png`, result.image);
      result.coordinates, result.properties; // Coordinates and properties
      paging++;
    });
  }
}