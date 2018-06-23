var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')

autoSetCanvasSize(yyy)
listenToUser(yyy)

var lineWidth = 5

thin.onclick = function () {
    lineWidth = 5
}
thick.onclick = function () {
    lineWidth = 10
}

var eraserEnabled = false
pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList .add('active')
    pen.classList.remove('active')
}
red.onclick= function () {
    context.fillStyle  = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    yellow.classList.remove('active')
    blue.classList.remove('active')
}
yellow.onclick= function () {
    context.fillStyle  = 'yellow'
    context.strokeStyle = 'yellow'
    yellow.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick= function () {
    context.fillStyle  = 'blue'
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    yellow.classList.remove('active')
    red.classList.remove('active')
}
//清空
clear.onclick = function (){
    context.clearRect(0, 0, yyy.width, yyy.height);
}
//保存下载
download.onclick = function () {
    var  url = yyy.toDataURL("image/png")
    console.log(url)
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画'
    a.target ='_blank'
    a.click()
}

/* 封装成函数*/
function drawCircle(x,y,radius){
    context.beginPath();
    context.arc(x , y, radius ,0, Math.PI * 2 );
    context.fill();
}
function drawLine(x1,y1,x2,y2) {
    context.beginPath();
    context.lineWidth = lineWidth
    context.moveTo( x1, y1)
    context.lineTo( x2,  y2)
    context.stroke()
    context.closePath()
}

//获取页面宽高
function autoSetCanvasSize(canvas){
    SetCanvasSize()
    window.onresize = function(){
        SetCanvasSize()
    }
    function SetCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

//监听用户
function listenToUser(canvas) {
    var using = false
    var lastPoint = {x: undefined, y: undefined}
//监听是PC还是手机
    if (document.body.ontouchstart  !== undefined) {
        //区分PC和手机
        canvas.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX
             var y = aaa.touches[0].clientY
            console.log(x,y)//打印坐标
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 20, 20)
            } else {
                lastPoint = {"x": x, "y": y}
            }
        }
        canvas.ontouchmove = function (aaa) {
             var x = aaa.touches[0].clientX
             var y = aaa.touches[0].clientY
            console.log('开始动了')
             if (!using) {
                 return
             }

             if (eraserEnabled) {
                 context.clearRect(x - 5, y - 5, 10, 10)
             } else {
                 var newPoint = {"x": x, "y": y}
                 drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                 lastPoint = newPoint
             }
        }
        canvas.ontouchend = function (aaa) {
            using = false
            console.log('结束了')
        }
    }else {//PC
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {"x": x, "y": y}
            }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY

            if (!using) {
                return
            }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {"x": x, "y": y}
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function (aaa) {
            using = false
        }
    }
}