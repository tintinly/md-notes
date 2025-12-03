[TOC]

# 笔记介绍

笔记基本参考RedSpider社区内[《深入浅出Java多线程》](https://redspider.gitbook.io/concurrent/)

# 基础部分

## 1 进程与线程基本概念

### 1.1  进程产生的背景

**最初**

最初的计算机只能接受一些特定的指令，用户输入一个指令，计算机就做出一个操作。大部分时间，计算机都在等待状态。

**批处理操作系统**

用户将多个需要执行的程序写在磁带上，然后交由计算机去读取并逐个执行这些程序，并将输出结果写在另一个磁带上。批处理操作系统的指令运行方式仍然是串行的，内存中始终只有一个程序在运行。

**进程**

进程就是应用程序在内存中分配的空间，也就是正在运行的程序，各个进程之间互不干扰。

CPU采用时间片轮转的方式运行进程：CPU为每个进程分配一个时间段，称 作它的时间片。如果在时间片结束时进程还在运行，则暂停这个进程的运行，并且CPU分配给另一个进程（这个过程叫做上下文切换）。

进程+CPU时间片轮转的操作系统，宏观上看起来同一时间段执行。事实上，任意具体时刻都只有一个任务在占用一个CPU核心资源。

**线程**

为了一个进程可以处理多个子任务。一个进程就包含了多个线程，每个线程负责一个单独的子任 务，同理任意具体时刻都只有一个线程在占用一个CPU核心资源。

**为什么使用多线程并发而不是多进程并发**

* 进程间的通信比较复杂。线程间的通信比较简单，而且线程在同一进程中可以共享资源。
* 进程是重量级的，多线程方式的系统开销更小。

**进程和线程的区别**

进程是操作系统进行资源分配的基本单位。进程独占一定内存空间，进程间内存隔离。

线程是操作系统进行调度的基本单位，即CPU分配时间的单位 。线程共享所属进程中占有的内存地址空间和资源。

### 1.2 上下文切换

上下文切换是指 CPU 从一个进程（或线程） 切换到另一个进程（或线程）。上下文是指某一时间点 CPU寄存器和程序计数器的内容。

CPU通过时间片分配算法来循环执行任务，当前任务的时间片结束后会切换到下一个任务，在切换前会保存上一个任务的状态，以便下次切换回这个任务时，可以再加载这个任务的状态。保存上一个任务和加载下一个任务的过程就是上下文切换。

## 2 Java 多线程入门类和接口

### 2.1 Thread类和Runnable接口

JDK提供了`Thread`类来实现Java的“线程”类。而`Thread`类是一个`Runnable`接口的实现类。

线程的具体工作内容可以以继承`Thread`类和实现`Runnable`接口两种方式进行定义。

#### 2.1.1 继承Thread类

```java
public class Demo {
    public static class MyThread extends Thread {
        @Override
        public void run() {
            System.out.println("MyThread");
        }
    }

    public static void main(String[] args) {
        Thread myThread = new MyThread();
        myThread.start(); // start()方法后，虚拟机会先为我们创建一个线程，然后等到这个线程第一次得到时间片时再调用run()方法
    }
}
```

#### 2.1.2 实现Runnable接口

```java
public class Demo {
    public static class MyThread implements Runnable {
        @Override
        public void run() {
            System.out.println("MyThread");
        }
    }

    public static void main(String[] args) {
        new Thread(new MyThread()).start();

        // Java 8 函数式编程，可以省略MyThread类
        new Thread(() -> {
            System.out.println("Java 8 匿名内部类");
        }).start();
    }
}
```

#### 2.1.3 Thread类构造方法

实际情况下，我们大多是直接调用下面两个构造方法：

```java
Thread(Runnable target)
Thread(Runnable target, String name)
```

#### 2.1.4 Thread类的常见方法

```java
public static void main(String[] args) {
        Thread thread = new Thread();
    
        Thread.currentThread(); // 返回当前正在执行的线程对象（引用）；
        Thread.sleep(1l); // 使当前线程睡眠一段时间；
        Thread.yield(); // 声明当前线程愿意让出对当前处理器的占用
    
        thread.join(); // 当前线程等待另一个线程执行完毕之后再继续执行，内部调用的是Object类的wait方法实现的；
        thread.start(); // 开始执行线程的方法，java虚拟机会调用线程内的run()方法
    }
```

### 2.2 Callable、Future与FutureTask

`Thread`来创建一个新的线程有一个弊端，就是`run`方法是没有返回值的。JDK提供了`Callable`接口与`Future`类，让开启的线程执行完成后有一个返回值，这也是所谓的“异步”模型。

#### 2.2.1 Callable

`Callable`与`Runnable`类似，同样是只有一个抽象方法的函数式接口。不同的是，`Callable`提供的方法是**有返回值**的，而且支持**泛型**。`Callable`一般是配合线程池工具`ExecutorService`来使用的。

```java
public class CallableDemo  {

    // 自定义Callable
    static class Task implements Callable<Integer> {
        @Override
        public Integer call() throws Exception {
            // 模拟计算需要一秒
            Thread.sleep(1000);
            return 2;
        }

    }

    public static void main(String args[]){
        // 使用
        ExecutorService executor = Executors.newCachedThreadPool();
        Task task = new Task();
        Future<Integer> result = executor.submit(task);

        // 函数式编程
        /*Future<Integer> result = executor.submit(() -> {
            // 模拟计算需要一秒
            Thread.sleep(1000);
            return 2;
        });*/

        // 注意调用get方法会阻塞当前线程，直到得到结果。
        // 所以实际编码中建议使用可以设置超时时间的重载get方法。
        try {
            System.out.println(result.get());
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```

这里只介绍`ExecutorService`可以使用`submit`方法来让一个`Callable`接口执行。它会返回一个`Future`，我们后续的程序可以通过这个`Future`的`get`方法得到结果。

#### 2.2.2 Future接口

`Future`接口只有几个比较简单的方法：

```java
public abstract interface Future<V> {
    public abstract boolean cancel(boolean paramBoolean); // 试图取消一个线程的执行 paramBoolean表示是否采用中断的方式取消线程执行
    public abstract boolean isCancelled(); // 判断任务是否被取消
    public abstract boolean isDone(); // 判断任务是否完成
    public abstract V get() throws InterruptedException, ExecutionException; // 等待任务完成，获取执行结果，如果任务取消会抛出异常
    public abstract V get(long paramLong, TimeUnit paramTimeUnit) 
            throws InterruptedException, ExecutionException, TimeoutException; // 同get()，如果任务取消或等待超时会抛出异常
}
```

有时候，为了让任务有能够取消的功能，也用`Callable`来代替`Runnable`。声明 `Future<?>`形式类型也可以返回 `null`作为底层任务的结果。

#### 2.2.3 FutureTask类

`FutureTask`是实现的`RunnableFuture`接口的，而`RunnableFuture`接口同时继承了`Runnable`接口和`Future`接口。

![image-20251120165411604](assets/image-20251120165411604.png)

`FutureTask`类帮助程序员实现了较为复杂的`Future`接口。

```java
public class FutureTaskDemo {

    public static void main(String[] args) {
        // 使用
        ExecutorService executor = Executors.newCachedThreadPool();

        // 函数式编程
        FutureTask<Integer> futureTask = new FutureTask<Integer>(() -> {
            // 模拟计算需要一秒
            Thread.sleep(1000);
            return 2;
        });

        executor.submit(futureTask);

        // 注意调用get方法会阻塞当前线程，直到得到结果。
        // 所以实际编码中建议使用可以设置超时时间的重载get方法。
        try {
            System.out.println(futureTask.get());
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        };
    }
}
```

使用`FutureTask`直接取`get`取值，而上面的Demo是通过`submit`方法返回的`Future`去取值。

`FutureTask`的几个状态

```java
/**
  *
  * state可能的状态转变路径如下：
  * NEW -> COMPLETING -> NORMAL
  * NEW -> COMPLETING -> EXCEPTIONAL
  * NEW -> CANCELLED
  * NEW -> INTERRUPTING -> INTERRUPTED
  */
private volatile int state;
private static final int NEW          = 0;
private static final int COMPLETING   = 1;
private static final int NORMAL       = 2;
private static final int EXCEPTIONAL  = 3;
private static final int CANCELLED    = 4;
private static final int INTERRUPTING = 5;
private static final int INTERRUPTED  = 6;
```

## 3 线程组和线程优先级

### 3.1 线程组(ThreadGroup)

每个Thread必然存在于一个ThreadGroup中，Thread不能独立于ThreadGroup存在。

执行main() 方法线程和线程组的名字都是main。

如果在new Thread时没有显式指定，那么默认将父线程 （当前执行new Thread的线程）线程组设置为自己的线程组。这样形成了一个标准的**向下引用**的树状结构，不会产生相互引用的问题，导致GC回收相互引用的线程失效，

### 3.2  线程的优先级

线程的优先级会在线程被调用之前设定。Java中线程优先级范围是1~10，默认的线程优先级为5。Java只是给操作系统一个优先级的参考值，线程最终在操作系统的**优先级是多少还是由操作系统决定**。

通常情况下，高优先级的线程将会比低优先级的线程有更高的几率得到执行。

某个线程优先级大于线程所在线程组的优先级，那么该线程的优先级将会失效，取而代之的是**线程组的优先级**。

### 3.3  线程组的常用方法及数据结构

常用方法

```java
public static void main(String[] args) {
        ThreadGroup threadGroup = Thread.currentThread().getThreadGroup();

        // 获取当前的线程组名字
        System.out.println(threadGroup.getName());

        // 复制线程数组到线程组
        Thread[] threads = new Thread[2];
        threadGroup.enumerate(threads);

        // 线程组统一异常处理
        ThreadGroup threadGroup1 = new ThreadGroup("group1") {
            // 继承ThreadGroup并重新定义以下方法
            // 在线程成员抛出unchecked exception
            // 会执行此方法
            public void uncaughtException(Thread t, Throwable e) {
                System.out.println(t.getName() + ": " + e.getMessage());
            }
        };

        new Thread(threadGroup1, ()->{
            throw new RuntimeException("测试异常");
        }).start();
    }

// 输出结果
// main
// Thread-0: 测试异常
```

数据结构

```java
public class ThreadGroup implements Thread.UncaughtExceptionHandler { 
	private final ThreadGroup parent; // 父亲ThreadGroup 
    String name; // ThreadGroupr 的名称 
    int maxPriority; // 线程最大优先级 
    boolean destroyed; // 是否被销毁 
    boolean daemon; // 是否守护线程 
    boolean vmAllowSuspension; // 是否可以中断 
    int nUnstartedThreads = 0; // 还未启动的线程 
    int nthreads; // ThreadGroup中线程数目 
    Thread threads[]; // ThreadGroup中的线程 
    int ngroups; // 线程组数目 
    ThreadGroup groups[]; // 线程组数组 
}
```

总结来说，线程组是一个树状的结构，每个线程组下面可以有多个线程或者线程组。线程组可以起到统一控制线程的优先级和检查线程的权限的作用。

## 4 Java 线程的状态及主要转化方法

### 4.1  操作系统中的线程状态转换

操作系统线程主要有以下三个状态： 

* 就绪状态(ready)：线程正在等待使用CPU，经调度程序调用之后可进入 running状态。
* 执行状态(running)：线程正在使用CPU。 
* 等待状态(waiting): 线程经过等待事件的调用或者正在等待其他资源（如 I/O）。

![image-20251129121120091](assets/image-20251129121120091.png)

### 4.2 Java 线程的6 个状态

```java
// Thread.State 源码
public enum State { 
    NEW, // 创建了线程而并没有调用start()方法，重复调用start()抛出异常
    RUNNABLE, // 当前线程正在运行中。处于RUNNABLE状态的线程在Java虚拟机中运行，也有可能在等待CPU分配资源。
    BLOCKED, // 阻塞状态。处于BLOCKED状态的线程正等待锁的释放以进入同步区。
    WAITING, // 等待状态。处于等待状态的线程变成RUNNABLE状态需要其他线程唤醒。
    TIMED_WAITING, // 超时等待状态。线程等待一个具体的时间，时间到后会被自动唤醒。
    TERMINATED; // 终止状态。此时线程已执行完毕。
} 
```

#### 4.3 线程状态的转换

![image-20251129123039057](assets/image-20251129123039057.png)

`Thread.sleep(long)`：使当前线程睡眠指定时间。需要注意这里的“睡眠”只是暂时使线程停止执行，并不会释放锁。时间到后，线程会重新进入RUNNABLE状态。

`Object.wait()`/`Object.wait(long)`：调用wait()方法前线程必须持有对象的锁。调用wait()方法时，会释放当前的锁，直到有其他线程调用 notify()/notifyAll()方法唤醒等待锁的线程。

`Thread.join()`/`Thread.join(long)`：调用join()方法，会一直等待这个线程执行完毕。

#### 4.3.4 线程中断

线程中断机制是一种协作机制。需要注意，通过中断操作并不能直接终止一 个线程，而是通知需要被中断的线程自行处理。

* Thread.interrupt()：中断线程。这里的中断线程并不会立即停止线程，而是设 置线程的中断状态为true（默认是flase）
* Thread.currentThread().isInterrupted()：测试当前线程是否被中断。线程的中 断状态受这个方法的影响，意思是调用一次使线程中断状态设置为true，连续 调用两次会使得这个线程的中断状态重新转为false；
* Thread.isInterrupted()：测试当前线程是否被中断。与上面方法不同的是调用 这个方法并不会影响线程的中断状态。

# 原理部分

# JDK工具部分