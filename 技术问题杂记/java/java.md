# Java面试问题

* ArrayList 和 LinkedList 有什么区别？



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

# 多线程

## ThreadLocal

```java
public static void main(String[] args) {

    Thread thread1 = new Thread(() -  {
        ThreadLocal<Object  threadLocal = new ThreadLocal< ();
        threadLocal.set("localValue thread1");
        System.out.println(threadLocal.get());
        threadLocal.remove();
    });

    ThreadLocal threadLocal = new ThreadLocal();
    threadLocal.set("localValue main");
    System.out.println(threadLocal.get());
    threadLocal.remove();

    thread1.start();
}
```

ThreadLocal.set()方法

```java
public void set(T value) {
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t); //获取当前线程的 ThreadLocalMap变量
    if (map != null) {
        map.set(this, value);
    } else {
        createMap(t, value);
    }
}
```

Thread类的ThreadLocal.ThreadLocalMap成员变量

```java
/* ThreadLocal values pertaining to this thread. This map is maintained
 * by the ThreadLocal class. */
ThreadLocal.ThreadLocalMap threadLocals = null;

/*
 * InheritableThreadLocal values pertaining to this thread. This map is
 * maintained by the InheritableThreadLocal class.
 */
ThreadLocal.ThreadLocalMap inheritableThreadLocals = null;
```

ThreadLocalMap是类似于Map 的数据结构 。key 为当前对象 的 Thread 对象，值为 Object 对象。


# Spring

## 组件扫描时 use-default-filters="false"的正确理解

在spring配置中

```xml
<!--开启组件扫描-- 
    <!--此处可以不设置use-default-filters 默认为true
    即使用默认的 Filter 进行包扫描，而默认的 Filter 对标有 @Component、@Repository、@Service和@Controller 的注解的类进行扫描-- 
    <context:component-scan base-package="com.tintin" use-default-filters="true" 
        <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/ 
    </context:component-scan 
```

在springMVC配置中

```xml
<!--开启组件扫描 只扫描带有Controller注释的类-- 
	<!--此处设置use-default-filters="false" 搭配 include-filter 可以实现更加自由地指定哪些注解由扫描器扫描-- 
    <!--springmvc容器中的类可以引用spring ioc中的类反过来则不行-- 
    <context:component-scan base-package="com.tintin" use-default-filters="false" 
        <context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/ 
    </context:component-scan 
```

# SpringCloud

[Spring](https://so.csdn.net/so/search?q=Spring&spm=1001.2101.3001.7020) Cloud Alibaba 致力于提供分布式应用服务开发的一站式解决方案。项目包含开发分布式应用服务的必需组件，方便开发者通过 Spring Cloud 编程模型轻松使用这些组件来开发分布式应用服务。

Sentinel：把流量作为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性。

**Nacos：一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。**

RocketMQ：一款开源的分布式消息系统，基于高可用分布式集群技术，提供低延时的、高可靠的消息发布与订阅服务。

Dubbo：Apache Dubbo™ 是一款高性能 Java RPC 框架。

Seata：阿里巴巴开源产品，一个易于使用的高性能微服务分布式事务解决方案。

Alibaba Cloud ACM：一款在分布式架构环境中对应用配置进行集中管理和推送的应用配置中心产品。

Alibaba Cloud OSS: 阿里云对象存储服务（Object Storage Service，简称 OSS），是阿里云提供的海量、安全、低成本、高可靠的云存储服务。您可以在任何应用、任何时间、任何地点存储和访问任意类型的数据。

Alibaba Cloud SchedulerX: 阿里中间件团队开发的一款分布式任务调度产品，提供秒级、精准、高可靠、高可用的定时（基于 Cron 表达式）任务调度服务。

Alibaba Cloud SMS: 覆盖全球的短信服务，友好、高效、智能的互联化通讯能力，帮助企业迅速搭建客户触达通道。

阿里巴巴提供的方案跟Spring官方提供的方案有一些对应关系：

Nacos = Eureka/Consule + Config + Admin

Sentinel = Hystrix + Dashboard + Turbine

Dubbo = Ribbon + Feign

RocketMQ = RabbitMQ

Schedulerx = Quartz

## Nacos

**nacos支持MySQL8吗_nacos mysql8.0修改**

提示无法连接数据库，检查配置的数据库连接确认无误。

conf/application.proporties

spring.datasource.platform=mysql

db.num=1

db.url.0=jdbc:mysql://localhost:3306/nacos_config?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC

db.user=root

db.password=123456

在nacos安装目录下新建plugins/mysql文件夹，并放入8.0+版本的mysql-connector-java-8.0.xx.jar，重启nacos即可。

启动时会提示更换了mysql的driver-class类。

nacos mysql8.0修改

**nacos Unable to start web server; nested exception is org.springframework.boot.web.server.WebServerE      解决  ：set MODE="cluster" 改为 set MODE="standalone"  或 startup.cmd -m standalone 启动**


# SpringBoot

## springboot项目找不到对应控制器错误

对于springboot项目，新增的包文件需要放在启动类的同级包下。

![img](assets\watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxODE5MzI3,size_16,color_FFFFFF,t_70.png)