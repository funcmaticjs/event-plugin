const EventPlugin = require('../lib/event')
const { ConsoleLogger } = require('@funcmaticjs/funcmatic')

describe('EventPlugin', () => {
  let ctx = { }
  let plugin = null
  let noop = () => { }
  beforeEach(async () => {
    ctx = {
      event: {
        headers: { }
      },
      context: { },
      state: { },
      logger: new ConsoleLogger({
        LOG_LEVEL: 'debug',
        LOG_PRETTY: true
      })
    }
    plugin = new EventPlugin()
  })
  it ('should set queryStringParameters if null', async () => {
    expect(ctx.event.queryStringParameters).toBeFalsy()
    await plugin.request(ctx, noop)
    expect(ctx.event.queryStringParameters).toEqual({})
  })
  it ('should set pathParameters if null', async () => {
    expect(ctx.event.pathParameters).toBeFalsy()
    await plugin.request(ctx, noop)
    expect(ctx.event.pathParameters).toEqual({})
  })
  it ('should normalize headers', async () => {
    ctx.event.headers['etag'] = "etagvalue"
    ctx.event.headers['content-type'] = "contenttypevalue"
    ctx.event.headers['x-my-custom-header'] = "customvalue"
    await plugin.request(ctx, noop)
    console.log(JSON.stringify(ctx.event.headers, null, 2))
    expect(ctx.event.headers).toMatchObject({
      "ETag": "etagvalue",
      "Content-Type": "contenttypevalue",
      "X-My-Custom-Header": "customvalue"
    })
  })
})