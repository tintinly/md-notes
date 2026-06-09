# 常用 JS 片段

```javascript
/**
* 复制内容到剪贴板
* content: 需要复制的内容
*/
function copyToClip(content) {
    var aux = document.createElement("input");
    aux.setAttribute("value", content);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    alert("复制成功");
}
```

