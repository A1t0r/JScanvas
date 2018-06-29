console.log("Расширение imageReader загружено.")

var image = []

$('#page').children().first().before('<input type="file" id="in_file" accept=".jpg, .jpeg, .bmp, .png, .gif" multiple="multiple" style="display:block"></input>')



var ImageReader = function(file)
{
	this.fileReader = new FileReader()

	var onloadend = function(ctx){
		return function(e){
			var picture = new Image()
			picture.src = e.target.result
			ctx.picture = picture
			console.log("Файл с изображением " + file.name + " загружен.")
		}
	}
	this.fileReader.onloadend = onloadend(this)
	
	this.fileReader.readAsDataURL(file)
}

$("#in_file").change(function(e)
		{
			image = []
			var files = $("#in_file")[0].files
			for (var i in files)
				image.push(new ImageReader(files[i]))
		})