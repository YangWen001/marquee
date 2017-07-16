function Marquee(options){
	var _this = this;
	//滚动的容器
	var container 	= null;
	//内容的容器
	var content	= null;
	//动画的持续时间
	var duration	= null;
	//动画的间隔时间
	var sleep	= null;
	//滚动的方向
	var direction = null;
	//每次滚动的个数
	var scrollNumber = null;
	//内容项目的高度
	var itemHeight = null;
	//内容项目的宽度
	var itemWidth = null;
	//动画的定时器
	var animateTimer = null;
	//container的高度
	var containerHeight = null;
	//container的宽度
	var containerWidth = null;
	//content内容的高度
	var contentHeight = null;
	//content内容的宽度
	var contentWidth = null;
	
	//动画的周期
	var cycle = null;
	//实际滚动的个数
	var realScrollNumber = null;
	//实际动画事件
	var realDuration 	 = null;
	
	if(!options.container){
		console.error("marqueen 未指定container");
		return null;
	}
	
	if(!options.content){
		console.error("marqueen 未指定content");
		return null;
	}
	
	container = document.querySelector("#"+options.container);
	content = document.querySelector("#"+options.content);
	duration = options.duration ? options.duration : 600;
	direction = options.direction ? options.direction : "up";
	sleep = (options.sleep ||options.sleep == 0) ? options.sleep : 5000;
	scrollNumber = options.scrollNumber ? options.scrollNumber : 3;
	itemHeight =  options.itemHeight ? options.itemHeight : 50;
	itemWidth =  options.itemWidth ? options.itemWidth : 50;
	
	
	
	//开始动画
	this.start = function(){
		define();
		this.animateTimer = setInterval(animate, circle);
	}
	
	//停止动画
	this.stop = function(){
		if(this.animateTimer){
			window.clearInterval(this.animateTimer);
		}
	}
	
	//重新定义动画
	this.update = function(){
		this.stop();
		this.start();
	}
	
	//计算marqueen的获得属性
	function define(){
		
		//修改content为绝对定位 需要保证container具有position属性
		content.style.position = "absolute";
		
		if(direction == "up" || direction == "down" ){
			containerHeight = container.offsetHeight;
			contentHeight = content.offsetHeight;
			
			//计算实际滚动数量和时间和实际滚动的动画时间以及周期
			if(contentHeight <= containerHeight){
				//如果content的高度没有超过container的高度 不需要滚动
				realScrollNumber = 0;
				realDuration 	 = 0;
			}else if(contentHeight >= (containerHeight + itemHeight*scrollNumber) ){
				//如果content的高度比container的高度高itemHeight*scrollNumber 实际滚动数量为scrollNumber
				realScrollNumber = scrollNumber;
				realDuration 	 = duration;
			}else{
				//如果content的高度超过container的高度 但是小于itemHeight*scrollNumber 计算算出超过了几个 则每次只滚动超过的个数的高度
				var diffHeight = contentHeight - containerHeight;
				realScrollNumber = diffHeight/itemHeight;
				realDuration = duration*(realScrollNumber/scrollNumber);
			}
		}else if(direction == "left" || direction == "right" ){
			containerWidth = container.offsetWidth;
			contentWidth = content.offsetWidth;
			
			//计算实际滚动数量和时间和实际滚动的动画时间以及周期
			if(contentWidth <= containerWidth){
				//如果content的宽度没有超过container的宽度 不需要滚动
				realScrollNumber = 0;
				realDuration 	 = 0;
			}else if(contentWidth >= (containerWidth + itemWidth*scrollNumber) ){
				//如果content的宽度比container的宽度宽itemWidth*scrollNumber 实际滚动数量为scrollNumber
				realScrollNumber = scrollNumber;
				realDuration 	 = duration;
			}else{
				//如果content的宽度超过container的宽度 但是小于itemWidth*scrollNumber 计算算出超过了几个 则每次只滚动超过的个数的宽度
				var diffWidth = contentWidth - containerWidth;
				realScrollNumber = diffWidth/itemWidth;
				realDuration = duration*(realScrollNumber/scrollNumber);
			}
		}
		
		circle = sleep + realDuration;
	}
	
	//动画方法
	function animate(){
		if(realScrollNumber == 0){
			return;
		}
		
		var scrollOffset = 0;
		var speed = 0;
		if(direction == "up" || direction == "down" ){
			scrollOffset = itemHeight*realScrollNumber;
			speed = (realScrollNumber*itemHeight)/realDuration;
		}else if(direction == "left" || direction == "right" ){
			scrollOffset = itemWidth*realScrollNumber;
			speed = (realScrollNumber*itemWidth)/realDuration;
		}
		
		var interval = 1; 	//时间间隔
		speed *= 5;		//速度变快
		interval *= 5; 	//时间间隔变慢
		var offset = 0;
		var timer = setInterval(function(){
			
			offset += speed;
			(offset >= scrollOffset) && (offset = scrollOffset);
			
			if(direction == "up"){
				content.style.top = (-offset)+"px"
			}else if(direction == "down"){
				content.style.bottom = (-offset)+"px"
			}else if(direction == "left"){
				content.style.left = (-offset)+"px"
			}else  if(direction == "right"){
				content.style.right = (-offset)+"px"
			}
			if(offset == scrollOffset){
				clearInterval(timer);
				//滚动完成 把遮住的items移到content的地步 同时恢复content的borderTopWidth
				var items = content.querySelectorAll(".item");
				var length = items.length;
				
				if(direction == "up" || direction == "left"){
					for(var i=0; i<realScrollNumber; i++){
						content.appendChild(items[i]);
					}
					if(direction == "up"){
						content.style.top = "0px"
					}else{
						content.style.left = "0px"
					}
					
				}else if(direction == "down"  || direction == "right"){
					
					var firstChild = null;
					for(var i=0; i<realScrollNumber; i++){
						firstChild = content.querySelector(".item");
						content.insertBefore( items[length-i-1], firstChild);
						firstChild = items[length-i-1];
					}
					
					if(direction == "down"){
						content.style.bottom = "0px";
					} else{
						content.style.right = "0px";
					}
				}
			
			}
		}, interval)
	}
	
}