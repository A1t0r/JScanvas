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
	
	include("extend/imageReader")
	include("extend/viewport")
	
	var usercode = $("#usercode")
	$(usercode)[0].value = 
		'var in1 = ViewportManager.create("in01")//создание холста'+'\n'+
		'in1.setCanvasSize(255, 255)//задаём размер холста'+'\n'+
		'in1.clear([0, 0, 0, 255])//очистка холста чёрным цветом'+'\n'+
		'for (var j = 0; j < 255; j++)//пробегаем по строкам холста'+'\n'+
		'for (var i = 0; i < 255; i++){//пробегаем по столбцам холста'+'\n'+
		'in1.setPixel(i, j, [i%255, j%255, 0, 255])//записываем пиксель на холст'+'\n'+
		'}'+'\n'+
		'in1.putImageData() //обновляем холст'


	$("#exec").click(function()
		{
			eval(usercode[0].value)
		})
})