paper = Snap 800, 800



style = 
	fill: '#FF7474'
	stroke: "#fff",
	strokeWidth: 5

path = paper
	.path ""
	.attr
		stroke: "#FF7474"
		fill: "transparent"
		strokeWidth: 3

pathArray = []

updatePath = ->
	first = pathArray[0]
	pathString = "M #{first.x},#{first.y}"
	for node in pathArray.slice 1
		pathString += "T #{node.x},#{node.y}"
	path.attr d: pathString

paper.click (e) ->
	if e.target.tagName is 'svg'
		paper
			.circle e.offsetX, e.offsetY, 15
			.attr style
			.data 'i', pathArray.length
			.mouseover ->
				@stop().animate {r: 25}, 1000, mina.elastic
			.mouseout ->
				@stop().animate {r: 15}, 300, mina.easeinout
			.drag ((dx, dy, x, y) ->
				@attr
					cx: x
					cy: y
				currentNode = pathArray[@data 'i']
				currentNode.x = x
				currentNode.y = y
				do updatePath),
				-> path.stop().animate {opacity: 0.10}, 200, mina.easeinout
				-> path.stop().animate {opacity: 1}, 1000, mina.easeinout
			
			
		pathArray.push
			x: e.offsetX
			y: e.offsetY
		do updatePath
