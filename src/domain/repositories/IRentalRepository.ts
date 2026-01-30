import { Rental } from "../entities/Rental";

export interface IRentalRepo{
    criar(rental: Rental): Promise<void>;
    buscaId(id: string): Promise<Rental>;
    buscaCarId(Car_id: string): Promise<Rental>;
    listarPorUser(User_id: string): Promise<Rental[]>;
    listarPorData(DataI: Date, DataF: Date): Promise<Rental[]>;
}