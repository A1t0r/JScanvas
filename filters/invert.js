log("Фильтр invert подключён.")
function invert(pixel)
{
	return [255 - pixel[0], 255 - pixel[1], 255 - pixel[2], pixel[3]]
}

function invertView(view, toView, align)
{
	toView = toView || view
	var cs = view.getCanvasSize()
	if (align === true){
		toView.setCanvasSize(cs[0], cs[1])
		toView.clear()
	}
	for (var j = 0; j < cs[1]; j++)
		for (var i = 0; i < cs[0]; i++){
			toView.setPixel(i, j, invert(view.getPixel(i, j)))
	}
	toView.putImageData()
}