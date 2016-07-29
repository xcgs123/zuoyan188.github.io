var traverse = []; //存放遍历结果
var search = []; //存放搜索结果
var timer;
var lock = false;

//遍历树
function preOrder(tree, nodeList) {
	if (tree !== null) {
		nodeList.push(tree);
		for (var i = 0; i < tree.children.length; i++) {
			preOrder(tree.children[i], nodeList);
		}
	}
}

window.onload = function() {
	var domTree = document.getElementById('top-level');

	document.getElementById('preorder').onclick = function() {
		var Nodelist = [];
		if (lock === true) {
			alert("正在遍历中!");
		} else {
			clearResult();
			preOrder(domTree, Nodelist);
			setTimeout(animate(Nodelist), 500);
		}
	};

	document.getElementById('search-btn').onclick = function() {
		var content = document.getElementById('search-txt').value;
		var Nodelist = [];
		if (content === '') {
			alert('请填写要搜索的内容');
		} else {
			if (lock === true) {
				alert("正在遍历中!");
			} else {
				clearResult();
				preOrder(domTree, Nodelist);
				setTimeout(animate(Nodelist, content), 500);
			}
		}
	};

	//点击相应的box背景变色
	var selectDiv; //记录选中的box
	var levels = document.getElementById('top-level').getElementsByTagName('div');
	for (var i = 0; i < levels.length; i++) {
		levels[i].onclick = function(e) {
			clearResult();
			this.className = 'active';
			e.stopPropagation(); //阻止事件冒泡
			selectDiv = this;
		};
	}

	//删除选中box及其子节点
	document.getElementById('delete-btn').onclick = function() {
		if (selectDiv === undefined) {
			alert('请先选中要删除的节点');
		} else {
			var parent = selectDiv.parentNode;
			parent.removeChild(selectDiv);
		}
	};

	//在选中节点下增加子节点
	document.getElementById('insert-btn').onclick = function() {
		var content = document.getElementById('insert-txt').value;

		if (content === '') {
			alert('请填写新增节点的内容');
		} else if (selectDiv === undefined) {
			alert('请先选中要操作的节点');
		} else {

			var newDiv = document.createElement('div');
			newDiv.innerHTML = content;
			selectDiv.appendChild(newDiv);
			window.onload();
		}
	}

}

//将遍历或搜索结果用动画展示
function animate(nodeList, foundText) {
	var i = 0;
	var len = nodeList.length;
	timer = setInterval(function() {
		if (i < len) {
			lock = true;
			if (i > 0 && nodeList[i - 1].className != "found") {
				nodeList[i - 1].className = "";
			}
			if (nodeList[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") == foundText) {
				nodeList[i].className = "found";
				i++;
			} else {
				nodeList[i++].className = "active";
			}
		} else {
			if (nodeList[i - 1].className != "found") {
				nodeList[i - 1].className = "";
			}
			lock = false;
			clearInterval(timer);
		}
	}, 500);

}

//清理前一个遍历或搜索
function clearResult() {
	var allDiv = document.getElementsByTagName('div');
	for (var i = 0; i < allDiv.length; i++) {
		allDiv[i].className = "default";
	}
}
