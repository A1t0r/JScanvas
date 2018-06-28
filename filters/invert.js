console.log("***********************")
console.log("Фильтр invert подключён.")
console.log("выходной_цвет invert(входной_цвет)")
console.log("вход:  4-хкомпонентный массив цвета")
console.log("выход: 4-хкомпонентный массив цвета")
console.log("***********************")
function invert(pixel)
{
	return [255 - pixel[0], 255 - pixel[1], 255 - pixel[2], pixel[3]]
}