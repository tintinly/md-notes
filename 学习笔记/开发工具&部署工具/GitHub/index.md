# GitHub 指南

GitHub 是一个软件项目托管平台，仅支持 Git 作为唯一的版本库格式进行托管。

除了 Git 代码仓库托管及基本的 Web 管理界面以外，还提供了订阅、讨论组、文本渲染、在线文件编辑器、协作图谱（报表）、代码片段分享（Gist）、远端构建、HTTP 回调等功能。

官方文档：[GitHub Docs](https://docs.github.com/zh)

## GitHub Actions

GitHub Actions 是一种持续集成和持续交付 (CI/CD) 平台，支持自动化构建、测试和部署。它提供了高性能的虚拟服务器环境（包括 Linux、Windows 和 macOS 虚拟机），来运行工作流。

在 GitHub Actions 存储库中直接自动化、自定义并执行您的软件开发工作流。程序员可以创建和共享操作以执行任何作业（包括 CI/CD），并将操作合并到完全自定义的工作流程中。例如搭建的个人博客，使用了 GitHub Action，可以确保每次 commit 之后，都能自动编译、打包和部署到服务器上，省去很多操作。

官方文档：[GitHub Actions 文档 - GitHub 文档](https://docs.github.com/zh/actions)

### CI/CD

CI/CD 是一种通过在应用开发阶段引入自动化来频繁向客户交付应用的方法，核心概念是是 **持续集成（Continuous Integration）、持续交付（Continuous Delivery）和持续部署（Continuous Deployment）**。

持续集成（CI）是协同开发、合并代码时常常出现错误和冲突的解决方案，可以帮助开发者更加方便地将代码更改合并到主分支。当开发者提交了改动的代码，系统就会通过自动构建应用，并运行不同级别的自动化测试（通常是单元测试和集成测试）来验证这些更改，确保这些更改没有对应用造成破坏，最后合并到共享存储库中。它通常要求开发者频繁提交代码到共享仓库，以较早地检测到错误，减少在查找错误来源时开发者需要调试的代码量。

持续交付（CD）可以自动把 CI 已验证的代码发布到企业自己的存储库。持续交付旨在建立一个可随时将开发环境的功能部署到生产环境的代码库。

持续部署（CD）可以自动将应用发布部署到生产环境，这意味着开发人员对应用的改动，在开发完成后的短时间内就能及时生效，这更加便于运营团队持续接收和整合用户反馈。

### Actions 入门

在 GitHub 上的存储库中，`.github/workflows` 目录下创建 `demo.yml` 工作流文件。

```yaml
# 示例
name: GitHub Actions Demo
run-name: ${{ github.actor }} is testing out GitHub Actions 🚀
on: [push]
jobs:
  Explore-GitHub-Actions:
    runs-on: ubuntu-latest
    steps:
      - run: echo "🎉 The job was automatically triggered by a ${{ github.event_name }} event."
      - run: echo "🐧 This job is now running on a ${{ runner.os }} server hosted by GitHub!"
      - run: echo "🔎 The name of your branch is ${{ github.ref }} and your repository is ${{ github.repository }}."
      - name: Check out repository code
        uses: actions/checkout@v6
      - run: echo "💡 The ${{ github.repository }} repository has been cloned to the runner."
      - run: echo "🖥️ The workflow is now ready to test your code on the runner."
      - name: List files in the repository
        run: |
          ls ${{ github.workspace }}
      - run: echo "🍏 This job's status is ${{ job.status }}."
```

向存储库的分支提交工作流文件会触发 `push` 事件并运行工作流。

### 引用现成脚本

很多持续集成的操作在不同项目里面是类似的，可以共享的。Github 允许在自己的工作流文件中直接引用他人写好的 action 。

![image-20260622022124553](assets/image-20260622022124553.png)

### Actions 示例

将个人笔记 VitePress 项目通过工作流实现自动编译，构建静态页面，并通过 ssh 和 rsync 部署到服务器上。

```yaml
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: ssh deploy

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "mian" ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js Build
      uses: actions/setup-node@v3
      with:
        node-version: 24.15.0
        cache: 'npm'
    - run: npm install --legacy-peer-deps
    - run: npm run docs:build
    - run: ls -l
    - name: Deploy to Server
      uses: easingthemes/ssh-deploy@main
      with:
        REMOTE_HOST: ${{ secrets.YHY_SSH_HOST }}
        REMOTE_PORT : ${{ secrets.YHY_SSH_PORT }}
        REMOTE_USER: ${{ secrets.YHY_SSH_USER }}
        SSH_PRIVATE_KEY: ${{ secrets.YHY_SSH_KEY }}
        SOURCE: ./.vitepress/dist/
        TARGET:  ${{ secrets.YHY_MD_NOTES_PATH }}
        ARGS: "-rlgoDzvc -i --delete"
        SCRIPT_BEFORE: whoami
        SCRIPT_AFTER: whoami

```

## 参考资料

[什么是 CI/CD ？ - 知乎](https://zhuanlan.zhihu.com/p/422815048)
