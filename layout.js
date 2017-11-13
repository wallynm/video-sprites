var layout = require('layout');

module.exports = {
  sort: function (items) {
    // `bin-pack` automatically sorts. Make this a noop.
    return items;
  },
  
  placeItems: function (items) {
    // Iterate over each of the items
    var col = 0;
    var row = 0;
    var y = 0;
    var x = 0;
    var itemsForCol = 5;
    items.forEach(function (item) {
      if(col !== 0 && (col % itemsForCol) === 0){
        col=0;
        row++;
      }

      // Update the y to the current height
      item.x = col * item.width;
      item.y = row * item.height;
      col++;
    });
    
    // Return the items
    return items;
  }
}