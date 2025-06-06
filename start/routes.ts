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
const VehiclesController=()=>import('#controllers/vehicles_controller')

router.group(() => {
  router.post('/create',[VehiclesController,'create'])
  router.get('/all',[VehiclesController,'showAll'])
  router.get('/:id',[VehiclesController,'show'])
  router.patch('/:id',[VehiclesController,'update'])
  router.delete('/:id',[VehiclesController,'destroy'])
}).prefix('/api/vehicles').use(middleware.tokenAuth())