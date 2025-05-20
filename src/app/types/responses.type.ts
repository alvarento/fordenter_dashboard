import { IVehicleData } from "../interfaces/vehicleData.interface";
import { IVehicle } from "../interfaces/vehicle.interface";
import { IUser } from "../interfaces/user.interface";

export type VehiclesListReponse = IVehicle[];
export type VehiclesDataListReponse = IVehicleData[];
export type LoginResponse = {
   message: string,
   user: IUser
};