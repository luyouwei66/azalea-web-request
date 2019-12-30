# azalea-web-request

#### 项目介绍
网页请求库

#### 软件架构
软件架构说明


#### 安装教程

添加 "azalea-web-request": "git+https://github.com/luyouwei66/azalea-web-request.git#master" 到你的 package.json dependencies 里


npm install

#### 使用说明

##### 浏览器端
```JavaScript
import { configRequest } from 'azalea-web-request';
configRequest({
  hostName: 'your-host-name', // 域名
  hostName: () => 'your-host-name',
  extraHeaders: { Authorization: 'tokens'}, // 附加头
  extraHeaders: () => { Authorization: 'tokens' },
  extraParams: { companyId: '111' }, // 附件参数
  extraParams: () => { companyId: '111' },
  interceptor: () => { },
);
````
调用 configRequest 设置请求配置，目前支持*hostName*, *extraHeaders*, *extraParams*，均支持直接目标类型或者函数调用。
```Javascript
import { request } from 'azalea-web-request';
request('your-path', {});
```
第二个参数参与fetch参数即可，<br>
我们还提供一些额外的配置<br>
*avoidExtraHeader*接受一个字符串数组，会把你在configRequest里的对应的附件头过虑掉，<br>
*avoidExtraParams*接受一个字符串数组，会把你在configRequest里对应的附件参数过滤掉，<br>
这种情况就适合调用一些登录，注册时不需要传token时使用。

*contentType*接受一个字符串，值为'json'会把请求体改为json格式，并修改相应的请求头。默认为表单格式。<br>
*hostName*接受一个字符串或一个函数，用于覆盖配置好的hostName。用于某些特殊的，不经过网关转发请求。<br>
*interceptor*接受一个函数，在网络请求返回时调用。用于某些特殊返回的统一处理。<br>
