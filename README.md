# Xuechu Zhang — GitHub Pages website

This package contains the existing five-page research website, prepared for GitHub Pages. It requires no installation or build step.

## 发布步骤

1. 在自己的浏览器登录 GitHub。查看个人头像菜单中的用户名；仓库名使用的是用户名，不是邮箱。
2. 新建公开仓库，名称必须是 `YOUR-USERNAME.github.io`，将 `YOUR-USERNAME` 换成实际 GitHub 用户名。
3. 解压文件包，将其中所有文件和 `assets` 文件夹上传到仓库的根目录。根目录应能直接看到 `index.html`；不要只上传 ZIP，也不要再包在外层文件夹中。
4. 将这些文件提交到 `main` 分支。
5. 打开仓库的 **Settings → Pages → Build and deployment**。
6. Source 选择 **Deploy from a branch**，Branch 选择 **main**，目录选择 **/(root)**，然后点击 **Save**。
7. 等待 GitHub 的部署完成。最终网址由 Pages 页面给出，形式是 `https://YOUR-USERNAME.github.io/`。

`.nojekyll` 标记表示这是已准备好的静态文件。如果使用 GitHub 网页上传时未显示这个文件，现有页面仍采用普通 HTML/CSS/JS；通过 Git 上传可以完整保留该标记。

## Pages

- Home: `index.html`
- Research: `research.html`
- Publications: `publications.html`
- About: `about.html`
- CV: `cv.html`

The publication status labels and research-stage labels remain unchanged. The CV PDF and the research diagrams are included. This package contains only the website's linked static files; it does not contain hosting credentials, account credentials, repository history, or participant-level data.

## Updating the website

After Pages is enabled, a new commit to `main` republishes the static website. This package is a snapshot of the current website, not a live connection to its original hosting service. Updates should be copied to the GitHub repository as well.

Official setup reference: [GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
