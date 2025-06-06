import Vehicle from "#models/vehicle";
import { DateTime } from 'luxon';
import { VehicleUpdatableField,VehicleCreatePayload } from "../dto/vehicle.js";

export class VehicleService {
  //RF01: A API deve permitir criar um novo veículo.
  async createVehicle(data:VehicleCreatePayload){//add the data type of create Vehicle
    return await Vehicle.create(data)
  }
  //RF02: A API deve permitir listar todos os veículos.
  async allVehicle(){
    return await Vehicle.all()
  }
  //RF03: A API deve permitir buscar um veículo por ID.
  async getVehicle(id:number){
    return await Vehicle.find(id)
  }
  //RF04: A API deve permitir atualizar os dados de um veículo.
  async updateVehicle(id:number,toChange:VehicleUpdatableField,value:string|DateTime){ //take out all any and add the right DTO
    const vehicle = await Vehicle.find(id)
    let updated = false
    if (!vehicle) {
      throw new Error(`Vehicle com o  id ${id} não encontrado`);
    }
    switch(toChange){
      case 'placa':
        vehicle.placa = typeof value === 'string' ? value : value.toString()
        await vehicle.save()
        updated = true
      break;
      case 'modelo':
        vehicle.modelo = typeof value === 'string' ? value : value.toString()
        await vehicle.save()
        updated = true
      break;
      case 'data_entrega':
        if(typeof value === 'string') {
          vehicle.dataEntrega = DateTime.fromISO(value);
        }
        await vehicle.save()
        updated = true
      break;
      case 'data_fabricacao':
        if(typeof value === 'string') {
          vehicle.dataFabricacao = DateTime.fromISO(value);
        }
        await vehicle.save()
        updated = true
      break;
      case 'data_venda':
        if (typeof value === 'string') {
          vehicle.dataVenda = DateTime.fromISO(value);
        }
        await vehicle.save()
        updated = true
      break;
      case 'pais_operacao':
        vehicle.paisOperacao = typeof value === 'string' ? value : value.toString()
        await vehicle.save()
        updated = true
      break;
      case 'concessionaria_venda':
        vehicle.concessionariaVenda = typeof value === 'string' ? value : value.toString()
        await vehicle.save()
        updated = true
      break;
      case 'data_ultimo_reparo':
        if (typeof value === 'string') {
          vehicle.dataUltimoReparo = DateTime.fromISO(value);
        }
        await vehicle.save()
        updated = true
      break;
      case 'documento_proprietario':
        vehicle.documentoProprietario = typeof value === 'string' ? value : value.toString()
        await vehicle.save()
        updated = true
      break;
    }
    if (updated) { //
      vehicle.ultimaAtualizacao = DateTime.now()
      await vehicle.save()
    }
  }
  //RF05: A API deve permitir deletar um veículo.
  async deleteVehicle(id:number){
    const vehicle = await Vehicle.find(id)
    if (!vehicle) {
      throw new Error(`veículo com id:${id} não encontrado`);
    }
    await vehicle.delete()
    return true
  }
}