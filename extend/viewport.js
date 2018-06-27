console.log("Расширение viewport загружено.")

$('body').children().first().before('<div id="view_container"></div>')

$("#view_container").before('<input type="button" name="switch_view" id="switch_view" value="Switch view"></input>')

$("#switch_view").click(function()
	{
		$("canvas").each(function() { $(this).toggleClass("halfscreen")})
	})

var ViewportManager = new function()
{
	var _storage = {}
	var _countViewport = 0
	function construct(){
		this.create = function(name)
		{
			if (name === undefined)
				name = "Viewport" + _countViewport
			if (_storage[name] != undefined)
				return _storage[name]
			else{
				var view = new Viewport(name)
				if (view != undefined){
					_storage[name] = view
					_countViewport++
					return view
				}
				console.log("Создание провалено!")
				return
			}
		}
		
		this.remove = function(view)
		{
			if (view !== undefined){
				for (var i in _storage)
					if (_storage[i] === view) {
						_storage[i] = undefined
						_countViewport--
					}
			}
		}
		
		this.getViewport = function(name)
		{
			if (name != undefined && _storage[name] != undefined)
				return _storage[name]
			return
		}
		
		this.getCount = function()
		{
			return _countViewport
		}
	}
	return new construct()
}

var Viewport = function(name)
{
	var _canvas = {}
	var _ctx = {}
	var _imageData = {}
	var _data = {}
	var _name = name
	function construct()
	{	
		this.getName = function()
		{
			return _name
		}
		
		
		this.createCanvas = function(name)
		{
			$("#view_container").append(
				'<canvas id="' + name + '" width="300" height="300" style="display:inline"></canvas>')
			return $('canvas#' + name)[0]
		}
		
		
		this.setCanvasSize = function(width, height)
		{
			_canvas.width = width || 300;
			_canvas.height = height || 300;
		}
		
		
		this.getCanvasSize = function()
		{
			return [_canvas.width, _canvas.height]
		}
		
		
		this.setContext = function(type)
		{
			var ctx = _canvas.getContext(type || '2d')
			ctx.fillStyle = 'rgba(255,255,255,255)'
			ctx.fillRect(0, 0, _canvas.width, _canvas.height)
			return ctx
		}
		
		
		this.getPixel = function(x, y)
		{
			var offset = (_canvas.width * y + x) * 4
			return [_data[offset],
					_data[offset + 1],
					_data[offset + 2],
					_data[offset + 3]]
		}
		
		
		this.setPixel = function(x, y, color)
		{
			var offset = (_canvas.width * y + x) * 4
			_data[offset] = color[0]
			_data[offset + 1] = color[1]
			_data[offset + 2] = color[2]
			_data[offset + 3] = color[3]
		}
		
		
		this.getImageData = function()
		{
			return _imageData
		}
		
		
		this.refreshImageData = function(xa, ya, xb, yb)
		{
			_imageData = _ctx.getImageData(xa || 0, ya || 0, xb || _canvas.width, yb || _canvas.height)
			_data = _imageData.data
		}
		
		
		this.putImageData = function(imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)
		{
			_ctx.putImageData(
				imageData || _imageData,
				dx || 0,
				dy || 0,
				dirtyX || 0,
				dirtyY || 0,
				dirtyWidth || _canvas.width,
				dirtyHeight || _canvas.height
			)
			this.refreshImageData(0, 0, _canvas.width, _canvas.height)
		}

		
		this.clear = function(color)
		{
			this.fillRect(color ? 
				[color[0], color[1], color[2], color[3]] : 
				[255, 255, 255, 255], 
				0, 
				0, 
				_canvas.width, 
				_canvas.height)
			this.refreshImageData(0, 0, _canvas.width, _canvas.height)
		}
		
		
		this.fillRect = function(color, x, y, width, height)
		{
			_ctx.fillStyle = 'rgba(' + color + ')'
			_ctx.fillRect(x, y, width, height)
		}
		
		
		this.bindImage = function(img)
		{
			this.setCanvasSize(img.picture.width, img.picture.height)
			_ctx.drawImage(img.picture, 0, 0)
			this.refreshImageData(0, 0, _canvas.width, _canvas.height)
		}
		
		
		this.drawImage = function(img, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight)
		{
			_ctx.drawImage(img.picture, 
				sX || 0, 
				sY || 0, 
				sWidth || img.picture.width, 
				sHeight || img.picture.height, 
				dX || 0, 
				dY || 0, 
				dWidth || img.picture.width, 
				dHeight || img.picture.height)
			this.refreshImageData(0, 0, _canvas.width, _canvas.height)
		}
		
		this.beginPath = function()
		{
			_ctx.beginPath()
		}
		
		
		this.closePath = function()
		{
			_ctx.closePath()
			this.refreshImageData(0, 0, _canvas.width, _canvas.height)
		}
		
		
		this.moveTo = function(x, y)
		{
			_ctx.moveTo(x,y)
		}
		
		
		this.lineTo = function(x, y)
		{
			_ctx.lineTo(x,y)
		}
		
		
		this.line = function(xa, ya, xb, yb, col)
		{
			_ctx.strokeStyle = col || 'black'
			_ctx.moveTo(xa, ya)
			_ctx.lineTo(xb, yb)
		}
		
		
		this.setStrokeStyle = function(style)
		{
			_ctx.strokeStyle = style
		}
		
		
		this.stroke = function()
		{
			_ctx.stroke()
		}
		
		this.setLineWidth = function(width)
		{
			_ctx.lineWidth = width
		}
		
		this.drawText = function(text, x, y, color)
		{
			_ctx.fillStyle = "rgba(" + color + ")" || "#000000";
			_ctx.fillText(text, x, y);
		}
		
		this.drawStrokeText = function(text, x, y, maxWidth)
		{
			_ctx.strokeText(text, x, y, maxWidth || 0);
		}
		
		this.setFont = function(font)
		{
			_ctx.font = font
		}
		
		this.getFont = function()
		{
			return _ctx.font
		}
		
		this.setTextAlign = function(align)
		{
			_ctx.textAlign = align
		}
		
		this.getTextAlign = function()
		{
			return _ctx.textAlign
		}
		
		this.setTextBaseLine = function(baseLine)
		{
			_ctx.textBaseLine = baseLine
		}
		
		this.getTextBaseLine = function()
		{
			return _ctx.textBaseLine
		}
		
		this.setTextDirection = function(direction)
		{
			_ctx.direction = direction
		}
		
		this.getTextDirection = function()
		{
			return _ctx.direction
		}
		
		this.getImage = function()
		{
			return _canvas.toDataURL()
		}
		
		_canvas = this.createCanvas(name)
		this.setCanvasSize()
		_ctx = this.setContext()
		if (_ctx){
			this.clear()
			this.refreshImageData(0, 0, _canvas.width, _canvas.height)
		}
	}
	return new construct()
}