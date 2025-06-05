/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.group(() => {
  router.get('/api', async () => {
    return {
      hello: 'group world',
    }
  })
}).use(middleware.tokenAuth)