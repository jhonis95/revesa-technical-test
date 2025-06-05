import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class TokenAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const authHeader = ctx.request.header('authorization')
    const validToken = 'Bearer 1234567890abcdef'

    if (!authHeader || authHeader !== validToken) {
      return ctx.response.unauthorized({ message: 'Invalid or missing token' })
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}