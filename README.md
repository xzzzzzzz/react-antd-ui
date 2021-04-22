<h1 align="center">yh-web-ui</h1>

<p align="center">React UI组件库</p>

### 安装

```
npm install yh-web-ui
```

### 引入样式

```
import "yh-web-ui/lib/index.css"
```

### 打包发布

```
npm run lib

npm login

npm publish
```

### 引用示例

```
import React, { Component } from 'react';
import { Btn } from "yh-web-ui";
import "yh-web-ui/lib/index.css";

class App extends Component {
  render(){
    return (
      <div className="main">
        <Btn> Hi, Boy! </Btn>
      </div>
    );
  }
}

export default App;
```




