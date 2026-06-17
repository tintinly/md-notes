## LIMS开放接口

**需求**

对接智能分拣系统

**业务功能**

根据二维码编号获取LIMS系统中转码前的编号、样品名称、类型、检测因子、任务等级、样品瓶子尺寸

**请求地址**

```
http://58.215.200.126:8090/open/pf/module/bp/bp/orders/samplecontainer/{barcode}
```

```
https://lims.qiuhaotesting.com:8091/open/pf/module/bp/bp/orders/samplecontainer/{barcode}
```

**请求方式**

`GET`

**请求参数列表**

* 链接参数

| 名称   | 参数名  | 必填 | 参数类型 | 说明                                                       |
| ------ | ------- | ---- | -------- | ---------------------------------------------------------- |
| 条形码 | barcode | 是   | String   | 扫描二维码获取，形如WT2402473001004T040或2024081302006T040 |

* Query参数

​	无

* Body参数

​	无

**响应参数**

| 名称           | 参数名                | 参数类型 | 说明 |
| -------------- | --------------------- | -------- | ---- |
| 输入条形码     | barcode               | String   |      |
| 样品类型       | sampleCategory        | String   |      |
| 任务等级       | projectLevel          | String   |      |
| 任务名称       | projectName           | String   |      |
| 转码前样品编号 | orderNo               | String   |      |
| 转码后样品编号 | encryptNo             | String   |      |
| 检测因子       | testName              | String   |      |
| 容器名称       | containerCategoryName | String   |      |
| 容器组         | containerGroup        | String   |      |
| 固定剂         | fixative              | String   |      |
| 保存条件       | storeCondition        | String   |      |
| 容量           | capacity              | String   |      |
| 容器尺寸       | measure               | String   |      |

**请求示例**

```http
GET http://58.215.200.126:8090/open/pf/module/bp/bp/orders/samplecontainer/WT2402473001004T040
Accept: application/json
```

**返回结果格式**

```json
{
  "orderNo": "WT2402473001004",
  "projectLevel": "否",
  "fixative": "/",
  "storeCondition": "密封;0-4℃避光冷藏",
  "containerCategoryName": "3个棕色吹扫瓶+1棕色螺旋盖广口瓶",
  "capacity": "40ml*3+100ml",
  "containerGroup": "T040",
  "encryptNo": "2024081302006",
  "sampleCategory": "土壤",
  "projectName": "20243031   江苏云一建设有限公司（江阴临港工业区污水厂地块）",
  "barcode": "WT2402473001004T040",
  "testName": "挥发性有机物,"
}
```

