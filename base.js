function include(url) 
{
	if (!$("#script_container>script").is("[src='"+url+".js']")){
		$("#script_container").append($('<script type="text/javascript" src="' + url + '.js"></script>'))
	}
}

function dofile(url) 
{
	if (!$("#script_container>script").is("[src='"+url+".js']")){
		$("#script_container").append($('<script type="text/javascript" src="' + url + '.js"></script>'))
	}else{
		$("#script_container>script[src='" + url + ".js']").remove()
		$("#script_container").append($('<script type="text/javascript" src="' + url + '.js"></script>'))
	}
}

$(document).ready(function()
{
	var usercon = $("#usercon")
	var superconsole = console.log
	console.log = function(t)
		{	
			$(usercon)[0].value = $(usercon)[0].value + t + "\n"
			superconsole(t)
		}
	$(usercon)[0].value = ""
	
	include("extend/viewport")
	
	var usercode = $("#usercode")
	$(usercode)[0].value = 
		'var in1 = ViewportManager.create("in01")//создание холста in1' + '\n' + 
		'var in2 = ViewportManager.create("in02")//создание холста in2' + '\n' + 
		'in1.bindImage(image[0])//привязка картинки к холсту in1' + '\n' + 
		'var iCS = in1.getCanvasSize()//получение размера холста in1' + '\n' + 
		'in2.setCanvasSize(iCS[0], iCS[1])//задание размера холста in2' + '\n' + 
		'in2.clear()//очистка холста in2' + '\n' + 
		'for (var j = 0; j < iCS[1]; j++)//пробегаем по строкам холста' + '\n' + 
		' for (var i = 0; i < iCS[0]; i++){//пробегаем по столбцам холста' + '\n' + 
		'  var pixel = in1.getPixel(i, j)//получаем пиксель холста 1' + '\n' + 
		'  in2.setPixel(i, j, pixel)//записываем пиксель в холст 2' + '\n' + 
		'}' + '\n' + 
		'in2.putImageData()//обновляем холст 2'

	$("#exec").click(function()
		{
			eval(usercode[0].value)
		})
})