# marquee
    曾经一段很长的时间里，我认为跑马灯是一种很low的设计，只有那种很老的网站里才用的，对于marquee这个标签也是很反感。
	
    可是，有一句话叫做：存在的即是合理的。所有事物的出现肯定它特定的使用场景。
	
    最近，我就碰到了必须使用（或者使用跑马灯也是一种不错的解决方案）的场景，就是做一些展示性的页面时，通常不需要用户去操作，让页面自动轮播信息的时候，跑马灯就是一种很好的解决方案。

    但是我发现原生的marquee并不能满足我的需求，所以就自己造了一个轮子....
  
  
  ***开始使用***
  
    首先引入marquee.js
    
    html代码
    ```
    	<table  id="container" cellspacing="0" cellspadding="0">
		<tbody id="content">
			<tr class="item"><td>1111111111111111111111111111111111</td></tr>
			<tr class="item"><td>2222222222222222222222222222222222</td></tr>
			<tr class="item"><td>3333333333333333333333333333333333</td></tr>
			<tr class="item"><td>4444444444444444444444444444444444</td></tr>
			<tr class="item"><td>5555555555555555555555555555555555</td></tr>
			<tr class="item"><td>6666666666666666666666666666666666</td></tr>
			<tr class="item"><td>7777777777777777777777777777777777</td></tr>
			<tr class="item"><td>8888888888888888888888888888888888</td></tr>
			<tr class="item"><td>9999999999999999999999999999999999</td></tr>
			<tr class="item"><td>0000000000000000000000000000000000</td></tr>
			<tr class="item"><td>1111111111111111111111111111111111</td></tr>
		</tbody>
	</table>
    ```
    css 代码
    ```
    	#container{
		height:300px;
		overflow:hidden;
		position:relative;
		display:block !important;
	}
	tr{
		line-height:30px;
	}

	tbody{
		border:0px;
	}
    ```
 js 代码
 ```
 var marquee = new Marquee({
	container : "container",
	content   : "content",
	itemHeight: 30,
	duration  : 1000,
	sleep	  : 3000,
	direction : "up"

})
  ```
