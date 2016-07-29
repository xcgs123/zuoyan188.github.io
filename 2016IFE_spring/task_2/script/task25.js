/*事件绑定*/
var btns = document.getElementsByTagName("button");
var root = new TreeNode({
    parent: null,
    child: [],
    data: "前端工程师"，
    selfElement: document.getElementsByClassName("nodebody-visible")[0]
})

root.search = function(text) {
    var resultList = [];
    var queue = [];
    var me = this;
    queue.push(me);
    while (queue.length > 0) {
        me = queue.shift();
        current.render(false, false, false, true);
        if (me.data == text)
            resultList.push(me);
        for (var i = 0; i < me.childs.length; i++) {
            queue.push(me.childs[i]);
        }
    }
    return resultList;
}

addEventHandler(root.selfElement, "click", function(e) {
    var target = e.target || e.srcElement;
    while (domNode.className.indexOf("nodebody") == -1)
        domNode = domNode.parentNode; // 找到类名含有nodebody前缀的DOM结点
    selectedNode = domNode.TreeNode; // 获取DOM对象对应的TreeNode对象
    // 点击节点文字或方向icon触发toggle操作
    if (target.className.indexOf("node-title") != -1 || target.className.indexOf("arrow") != -1) {
        selectedNode.toggleFold();
    } else if (target.className == "addIcon") {
        selectedNode.addChild(prompt("请输入子节点的内容："));
    } else if (target.className == "deleteIcon") {
        selectedNode.deleteNode();
    }
});

addEventHandler(btns[0], "click", function() {
    var text = document.getElementById("searchText").value.trim();
    if (text == "") {
        document.getElementById("result").innerHTML = "请输入查询内容！";
        return;
    }
    var resultList = root.search(text);
    if (resultList.length == 0) {
        document.getElementById("result").innerHTML = "没有查询到符合条件的结点！";
    } else {
        document.getElementById("result").innerHTML = "查询到" + resultList.length + "个符合条件的结点";
    }
})
