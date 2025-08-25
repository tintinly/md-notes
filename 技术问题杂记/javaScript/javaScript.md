### 定时器

- setInterval() ：按照指定的周期（以毫秒计）来调用函数或计算表达式。方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。
- setTimeout() ：在指定的毫秒数后调用函数或计算表达式。

```javascript
var intervalID = setInterval(function() {
    var d=new Date();
    var t=d.toLocaleTimeString();
    document.getElementById("tipP").innerHTML="数据请求中，请等候..." + t;
}, 1000);
```

```javaScript
var intervalID = setTimeOut('clock()', 1000);
function clock() {
    var d=new Date();
    var t=d.toLocaleTimeString();
    document.getElementById("tipP").innerHTML="数据请求中，请等候..." + t;
}
```

