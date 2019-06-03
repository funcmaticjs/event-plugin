const normalize = require("header-case-normalizer")

class EventPlugin {

  constructor() {
  }

  async env(ctx, next) {
    updateEvent(ctx.event)
    return await next()
  }

  async request(ctx, next) {
    updateEvent(ctx.event)
    return await next()
  }
}

function updateEvent(event) {
  setEmptyPathParameters(event)
  setEmptyQueryStringParameters(event)
  normalizeHeaders(event)
}

function setEmptyPathParameters(event) {
  if (!event.pathParameters) {
    event.pathParameters = { }
  }
}

function setEmptyQueryStringParameters(event) {
  if (!event.queryStringParameters) {
    event.queryStringParameters = { }
  }
}

function setEmptyProxyPathParameters(event) {

}

function normalizeHeaders(event) {
  let normalized = { }
  if (!event.headers) {
    event.headers = { }
  }
  for (let name in event.headers) {
    console.log(name, normalize(name), event.headers[name])
    normalized[normalize(name)] = event.headers[name]
  }
  event.headers = normalized
}


module.exports = EventPlugin



