var GUI, RadialNav, describeArc, gui, polarToCartesian;

polarToCartesian = function(cx, cy, r, angle) {
  angle = (angle - 90) * Math.PI / 180;
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle)
  };
};

describeArc = function(x, y, r, startAngle, endAngle) {
  var end, large, start;
  start = polarToCartesian(x, y, r, startAngle %= 360);
  end = polarToCartesian(x, y, r, endAngle %= 360);
  large = Math.abs(endAngle - startAngle) >= 180;
  return "M" + start.x + ", " + start.y + " A" + r + ", " + r + ", 0, " + (large ? 1 : 0) + ", 1," + end.x + "," + end.y;
};

GUI = (function() {
  function GUI(buttons) {
    this.paper = Snap(window.innerWidth, window.innerHeight);
    this.nav = new RadialNav(this.paper, buttons);
    this._bindEvents();
  }

  GUI.prototype._bindEvents = function() {
    return window.addEventListener('resize', (function(_this) {
      return function() {
        return _this.paper.attr({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
    })(this));
  };

  return GUI;

})();

RadialNav = (function() {
  function RadialNav(paper, buttons) {
    var updateButtons;
    this.area = paper.svg(0, 0, this.size = 500, this.size).addClass('radialNav');
    this.c = this.size / 2;
    this.r = this.size * .25;
    this.r2 = this.r * .35;
    this.angle = 360 / buttons.lenght;
    this.container = this.area.g();
    this.updateButtons(buttons);
    ({
      _sector: function() {
        return this.area.path.addClass('radialnav-sector');
      }
    });
    updateButtons = function(buttons) {
      return this.container.clear();
    };
  }

  return RadialNav;

})();

gui = new GUI([
  {
    icon: 'pin',
    action: function() {
      return console.log('Pinning...');
    }
  }, {
    icon: 'search',
    action: function() {
      return console.log('Openining search...');
    }
  }, {
    icon: 'cloud',
    action: function() {
      return console.log('Connecting to Cloud');
    }
  }, {
    icon: 'settings',
    action: function() {
      return console.log('Opening Settings...');
    }
  }, {
    icon: 'rewind',
    action: function() {
      return console.log('Rewinding...');
    }
  }, {
    icon: 'preview',
    action: function() {
      return console.log('Preview Activated...');
    }
  }, {
    icon: 'delete',
    action: function() {
      return console.log('Deleting...');
    }
  }
]);

gui.paper.path(describeArc(200, 200, 120, 0, 45)).attr({
  fill: '#333',
  stroke: '#000',
  strokeWidth: 4
});
