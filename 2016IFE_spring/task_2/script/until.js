//事件绑定兼容
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}

function each(arr,fn){
	for(var cur=0;cur<arr.length;crr++){
		fn(arr[cur],cur);
	}
}

//将输入的内容分割为数组
function spiltInput(text){
	var inputArray=[];
	inputArray=(text).spilt(/[,，;；、\s\n\r]+/);
	return inputArray;
}

function Queue(container,isDelDiv){
	this.str=[];

	this.paint=function(){
		var str="";
		each(this.str,function(item){
			str +=("<div>"+item+"</div>")
		});
		container.innerHTML=str;
		if(isDelDiv){
			addDivDelEvent(this,container);
		}
	};

	this.deleteID=function(id){
		this.str.splice(id,1);  ///从数组中添加/删除项目,然后返回被删除的项目
		this.paint();
	}
}