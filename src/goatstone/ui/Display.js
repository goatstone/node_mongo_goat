/* goatstoe/ui/Display.js */
function Display(){}
Display.prototype.list = function(items, res){
  var display = [];
  display = items.map(function(e, i){
    return '<p>' + i + ' : ' + e.message + '</p>';
  });
  if(res){
    console.log('http mode : ' );
    res.send(  display.join(' XX'));
  }
  else{
    console.log('non http mode..', display.join('') );
  }
};
module.exports = Display;