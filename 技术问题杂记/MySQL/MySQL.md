## MySQL授予远程连接的权限

在我们使用mysql数据库时，有时我们的程序与数据库不在同一机器上，这时我们需要远程访问数据库。缺省状态下，mysql的用户没有远程访问的权限。

* 改表法

  ```sql
  USE mysql;
  SELECT HOST,USER FROM USER;
  UPDATE USER SET HOST = '%' WHERE USER = 'root';
  FLUSH PRIVILEGES; # 刷新权限
  ```

* 授权法

```shell
C:\Users\82129>mysql -u root -ptintin
mysql>GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'WITH GRANT OPTION
mysql>FLUSH PRIVILEGES
mysql>EXIT
```

场景，mysql8.0.17修改mysql用户权限，开启所有ip可访问
使用：`GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '密码' WITH GRANT OPTION;`
报错，原因是要先创建用户再进行赋权，不能同时进行，

解决：修正后的语句：分开三次执行

```sql
#创建账户
create user 'root'@'localhost' identified by  'password'

#赋予权限，with grant option这个选项表示该用户可以将自己拥有的权限授权给别人
grant all privileges on *.* to 'root'@'1ocalhost' with grant option

#改密码&授权超用户，flush privileges 命令本质上的作用是将当前user和privilige表中的用户信息/权限设置从mysql库(MySQL数据库的内置库)中提取到内存里
flush privileges;
```

## 修改密码

第一次修改密码

```
 ALTER USER USER() IDENTIFIED BY 'root';
```

5.7版本

```
set password for username @localhost = password(newpwd);
```