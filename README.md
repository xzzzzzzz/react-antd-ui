<h1 align="center">react-ui</h1>

<p align="center">React UI组件库</p>

### 安装

```
npm install react-antd-ui
```

### 引入样式

```
import "react-antd-ui/lib/react-antd-ui.css"
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
import { Button } from "react-antd-ui";

class App extends Component {
  render(){
    return (
      <div className="main">
        <Button> Hi, Boy! </Button>
      </div>
    );
  }
}

export default App;
```




