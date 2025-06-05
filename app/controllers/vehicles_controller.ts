import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { VehicleService } from '#services/vehicle_service'
import { vehicleValidator } from '#validators/vehicle'

@inject()
export default class VehiclesController {
    constructor(
      private vehicleService: VehicleService
    ) {}

    async create({request, response}: HttpContext) {
        const vehiclePros=await request.validateUsing(vehicleValidator)

        // RN03 e RN04 (validação de datas)
        if (
          (vehiclePros.data_entrega && vehiclePros.data_fabricacao > vehiclePros.data_entrega) ||
          (vehiclePros.data_venda && vehiclePros.data_fabricacao > vehiclePros.data_venda)
        ) {
          return response.badRequest({ error: 'Data de fabricação não pode ser posterior à entrega ou venda.' })
        }

        if (vehiclePros.data_ultimo_reparo && vehiclePros.data_ultimo_reparo < vehiclePros.data_fabricacao) {
          return response.badRequest({ error: 'Último reparo não pode ser anterior à fabricação.' })
        }
        return this.vehicleService.createVehicle(vehiclePros)
    }
}