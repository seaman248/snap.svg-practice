# ===================
# Util
# ===================

polarToCartesian = (cx, cy, r, angle) ->
	angle = (angle - 90) * Math.PI / 180
	x: cx + r * Math.cos angle
	y: cy + r * Math.sin angle

describeArc = (x, y, r, startAngle, endAngle) ->
	start = polarToCartesian x, y, r, startAngle %= 360
	end = polarToCartesian x, y, r, endAngle %= 360
	large = Math.abs(endAngle - startAngle) >= 180
	"M#{start.x}, #{start.y}
	A#{r}, #{r}, 0,
	#{if large then 1 else 0},
	1,#{end.x},#{end.y}"


# ===================
# GUI
# ===================
class GUI
	constructor: (buttons) ->
		@paper = Snap window.innerWidth, window.innerHeight
		@nav = new RadialNav @paper, buttons
		do @_bindEvents
	# ===================
	# Private
	# ===================

	_bindEvents: ->
		window.addEventListener 'resize', =>
			@paper.attr
				width: window.innerWidth
				height: window.innerHeight

# ===================
# RadialNav
# ===================
class RadialNav
	constructor: (paper, buttons) ->
		@area = paper
			.svg 0, 0, @size = 500, @size
			.addClass 'radialNav'
		@c = @size / 2
		@r = @size * .25
		@r2 = @r * .35
		@angle = 360 / buttons.lenght # Угол одного радиуса

		@container = do @area.g

		@updateButtons buttons
		# ===================
		# Private
		# ===================
		_sector: -> 
			@area
				.path #describeSector @c, @c, @r, @r2, 0, @angle
				.addClass 'radialnav-sector'
		# ===================
		# Public
		# ===================
		updateButtons = (buttons) ->
			do @container.clear
			# for btn if buttons
				# Create button
# ===================
# Test
# ===================

gui = new GUI [
	{
		icon: 'pin'
		action: -> console.log 'Pinning...'
	}
	{
		icon: 'search'
		action: -> console.log 'Openining search...'
	}
	{
		icon: 'cloud'
		action: -> console.log 'Connecting to Cloud'
	}
	{
		icon: 'settings'
		action: -> console.log 'Opening Settings...'
	}
	{
		icon: 'rewind'
		action: -> console.log 'Rewinding...'
	}
	{
		icon: 'preview'
		action: -> console.log 'Preview Activated...'
	}
	{
		icon: 'delete'
		action: -> console.log 'Deleting...'
	}
]


gui.paper
	.path describeArc 200, 200, 120, 0, 45
	.attr
		fill: '#333'
		stroke: '#000'
		strokeWidth: 4