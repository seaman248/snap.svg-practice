paper = Snap 800, 800



style = 
	fill: 'transparent'
	stroke: "#222",
	strokeWidth: 5

paper
	.rect 100, 100, 200, 200
	.attr style
	.drag (dx, dy) -> @transform "t#{dx}r#{dx}s.5"