var paper, path, pathArray, style, updatePath;

paper = Snap(800, 800);

style = {
  fill: '#FF7474',
  stroke: "#fff",
  strokeWidth: 5
};

path = paper.path("").attr({
  stroke: "#FF7474",
  fill: "transparent",
  strokeWidth: 3
});

pathArray = [];

updatePath = function() {
  var first, node, pathString, _i, _len, _ref;
  first = pathArray[0];
  pathString = "M " + first.x + "," + first.y;
  _ref = pathArray.slice(1);
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    node = _ref[_i];
    pathString += "T " + node.x + "," + node.y;
  }
  return path.attr({
    d: pathString
  });
};

paper.click(function(e) {
  if (e.target.tagName === 'svg') {
    paper.circle(e.offsetX, e.offsetY, 15).attr(style).data('i', pathArray.length).mouseover(function() {
      return this.stop().animate({
        r: 25
      }, 1000, mina.elastic);
    }).mouseout(function() {
      return this.stop().animate({
        r: 15
      }, 300, mina.easeinout);
    }).drag((function(dx, dy, x, y) {
      var currentNode;
      this.attr({
        cx: x,
        cy: y
      });
      currentNode = pathArray[this.data('i')];
      currentNode.x = x;
      currentNode.y = y;
      return updatePath();
    }), function() {
      return path.stop().animate({
        opacity: 0.10
      }, 200, mina.easeinout);
    }, function() {
      return path.stop().animate({
        opacity: 1
      }, 1000, mina.easeinout);
    });
    pathArray.push({
      x: e.offsetX,
      y: e.offsetY
    });
    return updatePath();
  }
});
