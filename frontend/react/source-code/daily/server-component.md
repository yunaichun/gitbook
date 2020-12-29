## 简介

> React Server Component 学习笔记。

## 项目启动

#### package.json

```json
{
    "scripts": {
        "start": "concurrently \"npm run server:dev\" \"npm run bundler:dev\"",
        "server:dev": "cross-env NODE_ENV=development nodemon -- --conditions=react-server server",
        "bundler:dev": "cross-env NODE_ENV=development nodemon -- scripts/build.js"
    },
}
```

#### 启动命令

```text
1、前端构建: npm run bundler:dev
执行的文件是 scripts/build.js

2、后端服务: npm run server:dev
执行的文件是 server/api.server.js
```

#### 前端构建

```js
webpack(
  {
    entry: [path.resolve(__dirname, '../src/index.client.js')],
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: 'main.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, '../public/index.html'),
      }),
      new ReactServerWebpackPlugin({isServer: false}),
    ],
  }
);
```

```
右上可知
1、前端入口文件: src/index.client.js

2、输出的文件目录为: build

3、 根据文件的名称中是否带有 client , 在构建目录会生成 react-client-manifest.json 文件
```

#### 后端服务

```js
app.get(
  '/',
  handleErrors(async function(_req, res) {
    await waitForWebpack();
    const html = readFileSync(
      path.resolve(__dirname, '../build/index.html'),
      'utf8'
    );
    console.log(3333333, html)
    res.send(html);
  })
);
```

```
右上可知
/ 跟路径访问的是前端构建输出的页面
```

## 渲染逻辑

#### 前端初始调用 /react 接口

```js
// == src/index.client.js

function Content() {
  const [location, setLocation] = useState({
    selectedId: null,
    isEditing: false,
    searchText: '',
  });

  const response = createFromFetch(
    fetch('/react?location=' + encodeURIComponent(location))
  );

  return (
    <LocationContext.Provider value={[location, setLocation]}>
      {response.readRoot()}
    </LocationContext.Provider>
  );
}
```

#### 后端 /react 接口处理请求

```js
// == server/api.server.js

app.get('/react', function(req, res) {
  await waitForWebpack();
  // == 根据文件的名称中是否带有 client , 在构建目录会生成 react-client-manifest.json 文件
  const manifest = readFileSync(
    path.resolve(__dirname, '../build/react-client-manifest.json'),
    'utf8'
  );
  const moduleMap = JSON.parse(manifest);

  // == 服务端入口文件 ReactApp，同时传入 eact-client-manifest.json 文件内容
  pipeToNodeWritable(React.createElement(ReactApp, props), res, moduleMap);
});
```

#### /react 输出文件 ReactApp

```js
// == src/App.server

import {Suspense} from 'react';
import Note from './Note.server';
import NoteList from './NoteList.server';
import EditButton from './EditButton.client';
import SearchField from './SearchField.client';
import NoteSkeleton from './NoteSkeleton';
import NoteListSkeleton from './NoteListSkeleton';
// == 相当于容器组件在服务端输出的
export default function App({selectedId, isEditing, searchText}) {
  return (
    <div className="main">
      <section className="col sidebar">
        <section className="sidebar-menu" role="menubar">
          <SearchField />
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <NoteList searchText={searchText} />
          </Suspense>
        </nav>
      </section>
      <section key={selectedId} className="col note-viewer">
        <Suspense fallback={<NoteSkeleton isEditing={isEditing} />}>
          <Note selectedId={selectedId} isEditing={isEditing} />
        </Suspense>
      </section>
    </div>
  );
}
```

#### ReactApp 中 NoteList 组件

```js
// == src/NoteList.server.JS

export default function NoteList({searchText}) {
  // const notes = fetch('http://localhost:4000/notes').json();
  const notes = db.query(
    `select * from notes where title ilike $1 order by id desc`,
    ['%' + searchText + '%']
  ).rows;

  return notes.length > 0 ? (
    <ul className="notes-list">
      {notes.map((note) => (
        <li key={note.id}>
          <SidebarNote note={note} />
        </li>
      ))}
    </ul>
  ) : (
    <div className="notes-empty">
      {searchText
        ? `Couldn't find any notes titled "${searchText}".`
        : 'No notes created yet!'}{' '}
    </div>
  );
}
```

## 流程总结

```
1、由上面可以看到， Server Component 是写在服务端的 React 组件

2、然后通过 pipeToNodeWritable 方法响应给客户端

3、客户端拿到请求响应后，通过 response.readRoot() 方法拿到可以直接渲染的 React 组件
```

## 优点

```
1、Cheap maintenance
由上面可以看到， Server Component 是写在服务端的 React 组件，可以进行任何 io 操作。
现在的一个组件是自带数据的组件。解耦便于维护。

2、Good user experience
前端拿到响应后直接可以渲染。不需要再经过 diff 了，给用户的感觉就是无等待。

3、Fast performance
其次可以看到 Server Component 不会被 download 到客户端。这样将会大大减少 bundle 的大小。
```

## 示例 demo

http://www.answera.top:5000

## 参考资料

- [如何看待 React Server Components？](https://www.zhihu.com/question/435921124)
- [React 官方团队分享视频](https://reactjs.org/server-components)
- [React Server Components Demo](https://github.com/yunaichun/server-components-demo)
- [PostgreSQL Ubuntu 安装](https://www.stuartellis.name/articles/postgresql-setup)
- [PostgreSQL 阿里云配置修改后可连接](https://www.geek-share.com/detail/2774889717.html)
