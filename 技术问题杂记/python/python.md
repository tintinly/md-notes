## pip

检查pip版本

```shell
# 检查pip版本
pip --version
# 更新pip
python -m pip install --upgrade pip
# 临时设置镜像源
pip config set global.index-url [新的源地址]

```

## url编解码

urllib库里面有个urlencode函数和unquote函数

```python
from urllib.parse import urlencode
from urllib.parse import unquote
```

