import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { VehicleService } from '#services/vehicle_service'
import { updateVehicleValidator, vehicleValidator } from '#validators/vehicle'
import vine from '@vinejs/vine'
import { validateCpfOrCnpj } from '#validators/rule/cpf_or_cnpj'
import { DateTime } from 'luxon'


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
        try {
            return await this.vehicleService.createVehicle(vehiclePros)
        } catch (error) {
            return response.badRequest({
              message: 'Erro ao criar veículo',
              details: error.message,
            })
        }
    }
    async showAll({response}: HttpContext){
        try {
          const allVehicle= await this.vehicleService.allVehicle()
          if(allVehicle.length === 0){
            return response.ok({
              messages:'não tem veículo registrados',
              data: [],
            })
          }
          return response.ok({
            message: 'Veículos encontrados com sucesso',
            data: allVehicle,
          })
        } catch (error) {
            return response.badRequest({
              message: 'Erro ao tentar pegar todos os veículo',
              details: error.message,
            })
        }
    }
    async show({params, response}: HttpContext){
        try {
            const id = Number(params.id)
            if (isNaN(id)) {
              return response.badRequest({
                message: 'ID inválido fornecido',
              })
            }
            return this.vehicleService.getVehicle(id)
        } catch (error) {
            return response.badRequest({
              message: 'Erro ao tentar pegar o veículo',
              details: error.message,
            })
        }
        
    }
    async update({request,params, response}: HttpContext){
        const payload=await request.validateUsing(updateVehicleValidator)
  
        const id = Number(params.id)
        if (isNaN(id)) {
          return response.badRequest({ message: 'ID inválido fornecido' })
        }
      
        // Buscar veículo atual
        const vehicle = await this.vehicleService.getVehicle(id)
        if (!vehicle) {
          return response.notFound({ message: `Veículo com ID ${id} não encontrado` })
        }
        // Transforma para DateTime se for campo de data
        const parseIfDate = (field: string, value: any) => {
          return ['data_fabricacao', 'data_entrega', 'data_venda', 'data_ultimo_reparo'].includes(field)
            ? DateTime.fromISO(value)
            : value
        }

        // Validações específicas de acordo com `toChange`
        try {
          const validatorMap = {
            placa: vine.string().regex(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/),
            documento_proprietario: vine.string().use(validateCpfOrCnpj()),
            data_entrega: vine.date({ formats: ['yyyy-MM-dd'] }),
            data_fabricacao: vine.date({ formats: ['yyyy-MM-dd'] }),
            data_venda: vine.date({ formats: ['yyyy-MM-dd'] }),
            data_ultimo_reparo: vine.date({ formats: ['yyyy-MM-dd'] }),
            modelo: vine.string().minLength(1),
            pais_operacao: vine.string().minLength(1),
            concessionaria_venda: vine.string().minLength(1),
          }
        
          const rule = validatorMap[payload.toChange]
          if (!rule) {
            return response.badRequest({ message: 'Campo inválido para alteração' })
          }
        
          const dynamicValidator = vine.compile(rule)
          const payloadValueValidaded= await dynamicValidator.validate(payload.value)

          if (payload.toChange === 'data_entrega'||payload.toChange === 'data_venda'){
              const value=parseIfDate(payload.toChange,payloadValueValidaded)
              //RN03: A data_fabricacao não pode ser posterior à data_entrega ou data_venda.
              if(value>vehicle.dataEntrega||value>vehicle.dataVenda){
                return response.badRequest({ error: 'Data de fabricação não pode ser posterior à entrega ou venda.' })
              }
          }
          //RN03: A data_fabricacao não pode ser posterior à data_entrega ou data_venda.
          if (payload.toChange === 'data_entrega' || payload.toChange === 'data_venda') {
            const value = parseIfDate(payload.toChange, payloadValueValidaded)
                    
            if (vehicle.dataFabricacao && vehicle.dataFabricacao > value) {
              return response.badRequest({
                error: 'Data de fabricação está posterior à entrega ou venda.',
              })
            }
          }
          if (payload.toChange === 'data_fabricacao') {
            const value = parseIfDate(payload.toChange, payloadValueValidaded)

            if (
              (vehicle.dataEntrega && value > vehicle.dataEntrega) ||
              (vehicle.dataVenda && value > vehicle.dataVenda)
            ) {
              return response.badRequest({
                error: 'Data de fabricação não pode ser posterior à entrega ou venda.',
              })
            }
          }
          if (payload.toChange === 'data_ultimo_reparo') {
            const value = parseIfDate(payload.toChange, payloadValueValidaded)
            //RN04: A data_ultimo_reparo não pode ser anterior à data_fabricacao.
            if (vehicle.dataFabricacao && value < vehicle.dataFabricacao) {
              return response.badRequest({
                error: 'Último reparo não pode ser anterior à fabricação.',
              })
            }
          }

          // Chamar service
          try {
              return await this.vehicleService.updateVehicle(id,payload.toChange,payloadValueValidaded)
          } catch (error) {
              return response.badRequest({
                message: 'Erro ao atualizar o veículo',
                details: error.message,
              })
          }

        } catch (error) {
          return response.badRequest({
            message: 'Valor inválido para o campo',
            details: error.messages ?? error.message,
          })
        }
        
    }
    async destroy({params, response}: HttpContext){
        try {
            const id = Number(params.id)
            if (isNaN(id)) {
              return response.badRequest({
                message: 'ID inválido fornecido',
              })
            }
            return await this.vehicleService.deleteVehicle(id)
        } catch (error) {
            return response.badRequest({
              message: 'Erro ao atualizar o veículo',
              details: error.message,
            })
        }
        
    }
}