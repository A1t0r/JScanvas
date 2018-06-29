console.log("Функция serpinsky_triangle подключена.")
function serpinsky_triangle(view, iter, p1, p2, p3)
{
 if (iter < 0)
  return;
 view.beginPath()
 view.moveTo(p1[0], p1[1])
 view.lineTo(p2[0], p2[1])
 view.lineTo(p3[0], p3[1])
 view.lineTo(p1[0], p1[1])
 view.stroke()
 var dp1 = [(p1[0]+p2[0])/2, (p1[1]+p2[1])/2]
 var dp2 = [(p2[0]+p3[0])/2, (p2[1]+p3[1])/2]
 var dp3 = [(p3[0]+p1[0])/2, (p3[1]+p1[1])/2]
 serpinsky_triangle(view, iter-1, p1, dp1, dp3)
 serpinsky_triangle(view, iter-1, dp1, p2, dp2)
 serpinsky_triangle(view, iter-1, p3, dp3, dp2)
}

