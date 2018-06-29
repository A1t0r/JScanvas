console.log("Фильтр invert подключён.")
function invert(pixel)
{
	return [255 - pixel[0], 255 - pixel[1], 255 - pixel[2], pixel[3]]
}