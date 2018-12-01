var btn_right = document.getElementsByClassName("btn_right")[0];
var btn_left = document.getElementsByClassName("btn_left")[0];
var list = document.getElementsByClassName("list")[0];
var box = document.getElementsByClassName("box")[0];
var dot_box = document.getElementById("dot_box").getElementsByTagName("li");
var timer = null;
var index=0;
//防止用户暴力点击造成轮播混乱
var userClicks = true;
//初始化图片的初始位置
list.style.left = "-1200px";
//设置向右翻页的点击事件
btn_right.onclick=function(){
	if(userClicks){
		animate(-1200);//动画的滑动函数
		del_attr();//关闭前一个点亮的原点
		if(index===4){
			index=-1
		}
		index+=1
		dot_box[index].className='dot_active';
	};
	
}
//设置向左翻页的点击事件
btn_left.onclick=function(){
	if(userClicks){
		animate(1200);

		del_attr();
		if(index===0){
			index=5
		}
		index-=1
		dot_box[index].className='dot_active';
	};
}

function animate(offset){
	userClicks=false;
	var time = 600;//原始值为300
	var interval = 10;
	//speed 为图片每个10ms要位移的量,要位移的总量
	var speed =offset/(time/interval);
	//当前图片的位置+要位移的新位置
	var newleft = parseInt(list.style.left)+offset;
	
	function move(){
		//speed为0时不执行
		if(parseInt(list.style.left)!== newleft && speed !== 0){
			list.style.left=parseInt(list.style.left)+speed+"px";	
			if(newleft===parseInt(list.style.left)){
				/*console.log(list.style.left)*/
					userClicks = true;
			}
				setTimeout(move,interval);
			}else if(parseInt(list.style.left)===-7200){
				list.style.left = -1200+"px";
			}else if(parseInt(list.style.left)=== 0){
				list.style.left = -6000+"px";
				}	
			}
			move();
		}
//小圆点的背景删除属性
function del_attr(){
	var len = dot_box.length;
	for(var i=0;i<len;i++){
		if(dot_box[i].className==="dot_active"){
			dot_box[i].className='';
				/*index=i;*/
		}
	}
}

function auto_move(){
	timer = setInterval("btn_right.onclick()",4000);
}

auto_move();

box.onmouseover=function(){
	clearInterval(timer);
}

box.onmouseout=function(){
	auto_move();
}

var len = dot_box.length;
for(var i=0;i<len;i++){
	dot_box[i].onclick=function(){
		var s = this.value-index;
		offset = -1200*s;
		if(s!==0){
			if(userClicks){
				animate(offset);
			}
		}
		index=this.value;
		del_attr();
		dot_box[this.value].className='dot_active';
	}
}


