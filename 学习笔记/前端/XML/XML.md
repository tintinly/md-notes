# XML

## XML 简介

XML 指可扩展标记语言（Extensible Markup Language）。

XML 被设计用来传输和存储数据，不用于表现和展示数据，HTML 则用来表现数据。

XML 语言没有预定义的标签，而 HTML 的标签都是预定义的。XML 允许创作者定义自己的标签和自己的文档结构。

## XML 语法

**声明**

```xml
<?xml version="1.0" encoding="utf-8"?>
<!--可选，通常包括XML版本、字符编码-->
```

**根元素**

XML 必须包含根元素，它是所有其他元素的父元素

**属性**

元素可以包含属性，属性提供有关元素的附加信息。

```xml
<person age="30" gender="male">John Doe</person>
```

**单标签**

所有的 XML 元素一般都有一个关闭标签，但也允许单标签的使用的。

```xml
<elementName attribute="value" />
```

**大小写敏感**

标签 `<Letter>` 与标签 `<letter>` 是不同的。

**正确嵌套**

不能交叉嵌套，

```xml
<b><i>This text is bold and italic</b></i><!--错误-->
```

**字符实体**

在 XML 中，一些字符拥有特殊的意义。例如，把字符 "<" 放在 XML 元素，会发生解析错误，请用实体引用来代替 "<" 字符：

| 字符引用 | 字符实体 | 含义           |
| -------- | -------- | -------------- |
| `&lt;`   | <        | less than      |
| `&gt;`   | >        | greater than   |
| `&amp;`  | &        | ampersand      |
| `&apos;` | '        | apostrophe     |
| `&quot;` | "        | quotation mark |

**注释**

```xml
<!-- This is a comment -->
```

**空格保留**

HTML 会把多个连续的空格字符裁减（合并）为一个，而 XML 文档中的空格不会被删减。

```xml
<title>xx       xxx</title> <!--xx       xxx-->
```

```html
<h1>xx       xxx</h1> <!--xx xxx-->
```

## XML 约束/验证

拥有正确语法的 XML 只能被称为 "形式良好" 的 XML。而通过某种 XML 约束/验证的 XML，就可以称为 "合法" 的 XML。

在 XML 技术中可以编写一个文档来约束一个 XML 文档的书写规范，这就称之为 XML 约束。

**XML DTD**

通过 DTD（Document Type Definition） 验证的 XML 是 "合法" 的 XML。

 "note.xml" 引用 DTD

```xml
<?xml version="1.0"?>
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>
```

"note.dtd" 对上面那个 XML 文档（ "note.xml" ）的元素进行了定义：

```dtd
<!ELEMENT note (to, from, heading, body)>
<!ELEMENT to (#PCDATA)>
<!ELEMENT from (#PCDATA)>
<!ELEMENT heading (#PCDATA)>
<!ELEMENT body (#PCDATA)>
```

**XML Schema**

W3C 支持一种基于 XML 的 DTD 代替者，它名为 XML Schema。

 "note.xml" 引用 XML Schema 

```xml
<?xml version="1.0"?>
<note
xmlns="http://www.w3schools.com"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.w3schools.com note.xsd">
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>
```

"note.xsd" （XSD = XML Schema Definition）定义了上面那个 XML 文档（ "note.xml" ）的元素。

```xml
<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
targetNamespace="http://www.w3schools.com"
xmlns="http://www.w3schools.com"
elementFormDefault="qualified">

<xs:element name="note">
  <xs:complexType>
    <xs:sequence>
      <xs:element name="to" type="xs:string"/>
      <xs:element name="from" type="xs:string"/>
      <xs:element name="heading" type="xs:string"/>
      <xs:element name="body" type="xs:string"/>
    </xs:sequence>
  </xs:complexType>
</xs:element>

</xs:schema>
```

**XML 验证器**

大部分 IDE 都会内置 XML 验证器，根据指定约束对 XML 文档进行语法检查。

## 解析 XML

**使用 jar 包 DOM4J 解析**

```java
public class Dom4jDemo {
    public static void main(String[] args) throws FileNotFoundException, DocumentException {
        SAXReader saxReader = new SAXReader();
        // 通过类加载器获取资源
        InputStream resourceAsStream = Dom4jDemo.class.getClassLoader().getResourceAsStream("jdbc.xml");
        // 解析成DOM对象
        Document document = saxReader.read(resourceAsStream);
        // 获取根节点
        Element rootElement = document.getRootElement();
        System.out.println(rootElement.getName());
        // 获取子元素
        List<Element> elements = rootElement.elements();
        // ...
    }
}
```

**JS 中解析**

DOMParser API

```javascript
try {
    const response = await fetch('test.xml');
    const xmlString = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const name = xmlDoc.querySelector('name').textContent;
} catch (error) {
    console.error('Error loading XML:', error);
}
```

除此之外还有 xml2js库、 Streams、SAX 解析器等方式


# XML 的应用

## RSS

### RSS 与 XML 的关系

RSS订阅和XML的关系非常紧密，RSS（Really Simple Syndication，真正简易聚合）本质上就是一种基于XML的格式。

它利用XML的结构化特性来组织内容，使信息可以在不同平台之间轻松传递。

当你订阅一个RSS Feed时，你实际上是在获取一个符合特定XML规范的文件，这个文件包含了标题、链接、摘要、发布时间等内容条目。

### RSS Feed的XML格式标准

RSS Feed遵循一套标准化的XML结构。目前最常用的版本是RSS 2.0，其基本结构包括以下核心元素：

- `<rss>`：根元素，必须包含 version 属性（通常是2.0）
- `<channel>`：描述整个Feed的信息容器
- `<title>`：频道名称，比如网站或博客标题
- `<link>`：指向原始网站的URL
- `<description>`：频道的简要说明
- `<item>`：每个内容条目，可以有多个，代表一篇文章或一条更新
  - `<title>`：*文章名称
  - `<link>`：*文章超链接
  - `<description>`：文章描述
  - `<pubDate>`：文章发布日期
  - `<guid>`：文章唯一标识


### RSS 2.0示例

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
        <title>菜鸟教程首页</title>
        <link>http://www.runoob.com</link>
        <description>免费编程教程</description>
        <item>
            <title>RSS 教程</title>
            <link>http://www.runoob.com/rss</link>
            <description>菜鸟教程 Rss 教程</description>
        </item>
        <item>
            <title>XML 教程</title>
            <link>http://www.runoob.com/xml</link>
            <description>菜鸟教程 XML 教程</description>
        </item>
    </channel>
</rss>
```

### RSS 通过命名空间扩展

RSS虽然本身是一个简单标准，但支持通过XML命名空间进行功能扩展。例如：

- 使用 `media:content` 添加图片或视频
- 使用 `dc:creator`（来自Dublin Core）标注作者
- 支持Atom命名空间添加更新时间、ID等元数据