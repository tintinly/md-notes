## stream API

### flatMap

```java
List<Klass> result3 = groupList.stream()
        .flatMap(it -> it.getKlassList().stream())
        .collect(Collectors.toList());

stream api 的 flatMap方法接受一个lambda表达式函数， 函数的返回值必须也是一个stream类型，flatMap方法最终会把所有返回的stream合并，map方法做不到这一点，如果用map去实现，会变成这样一个东西

List<Stream<Klass>> result3 = groupList.stream()
        .map(it -> it.getKlassList().stream())
        .collect(Collectors.toList());
```

## 常用工具方法

### 合并数组

```java
    private String[] insertArr(String[] arr, int index, List<String> list) {
        String[] newArr = new String[arr.length + list.size()];
        for (int j = 0; j < newArr.length; j++) {
            if (j < index ) {
                newArr[j] = arr[j];
            } else if (j < list.size() + index) {
                newArr[j] = list.get(j - index);
            } else {
                newArr[j] = arr[j - list.size()];
            }
        }
        return newArr;
    }
```

### 数组分页

```java
    /**
    * 按指定大小，分隔集合，将集合按规定个数分为n个部分
    */
    public static <T> List<List<T>> splitList(List<T> list, int len) {
        if (list == null || list.isEmpty() || len < 1) {
            return Collections.emptyList();
        }
        List<List<T>> result = new ArrayList<>();
        int size = list.size();
        int count = (size + len - 1) / len;
        for (int i = 0; i < count; i++) {
            List<T> subList = list.subList(i * len, ((i + 1) * len > size ? size : len * (i + 1)));
            result.add(subList);
        }
        return result;
    }
```

### 下划线<->驼峰

```java
	/** 下划线转驼峰 */
	public static String lineToHump(String str) {
		str = str.toLowerCase();
		Matcher matcher = linePattern.matcher(str);
		StringBuffer sb = new StringBuffer();
		while (matcher.find()) {
			matcher.appendReplacement(sb, matcher.group(1).toUpperCase());
		}
		matcher.appendTail(sb);
		return sb.toString();
	}
	
	/** 驼峰转下划线,效率比上面高 */
	public static String humpToLine2(String str) {
		Matcher matcher = humpPattern.matcher(str);
		StringBuffer sb = new StringBuffer();
		while (matcher.find()) {
			matcher.appendReplacement(sb, "_" + matcher.group(0).toLowerCase());
		}
		matcher.appendTail(sb);
		return sb.toString();
	}
```



## SSL证书验证

在Java中进行网络请求时出现"sun.security.validator.ValidatorException: PKIX path building failed"错误通常是由于[SSL证书](https://so.csdn.net/so/search?q=SSL证书&spm=1001.2101.3001.7020)验证失败引起的。一般原因是：证书链不完整或证书不受信任

> Java对SSL证书的信任链有严格的要求。即使URL在浏览器中可访问，但如果SSL证书不在Java的信任库中，Java程序仍然可能会出现证书验证错误，导致无法建立安全连接。

解决：证书添加Java信任库

```shell
keytool -import -alias aliDatahub -file "C:\Users\12822\Desktop\sny.crt" -keystore "%JAVA_HOME%\jre\lib\security\cacerts" -storepass changeit
```
