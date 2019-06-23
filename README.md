# event-plugin
Performs some helpful formatting and normalization of the an AWS API Gateway Lambda Proxy Integration HTTP event.


### Install

```
$> npm install --save @funcmaticjs/event-plugin
```

### Usage

```js


```

### Side Effects

#### `event.queryStringParameters`

If there are no query parameters AWS Lambda Proxy event will set this value to `null`. event-plugin will initilize this value to `{}`.

#### `event.pathParameters`

If there are no url path parameters, AWS Lambda Proxy event will set this value to `null`. event-plugin will initialize this value to `{}`

#### Normalize HTTP Headers

API Gateway HTTP header values are sent through as they are from the client. For example if the client sends `Content-Type` header. It's name will be `Content-Type`. If the client sends `content-type`, it's name will be `content-type`. 

event-plugin uses the **[header-case-normalizer](https://github.com/marten-de-vries/header-case-normalizer)** package to normalize all header values. So if the client sends `content-type`, it's name will be changed to `Content-Type`. 
