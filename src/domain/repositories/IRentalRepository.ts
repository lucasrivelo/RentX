import { Rental } from "../entities/Rental.js";

export interface IRentalRepo{
    criar(rental: Rental): Promise<void>;
    buscaId(id: string): Promise<Rental | null>;
    buscaCarId(Car_id: string): Promise<Rental[]>;
    listarPorUser(User_id: string): Promise<Rental[]>;
    listarPorData(DataI: Date, DataF: Date): Promise<Rental[]>;
    listarAluguelDisponivel(User_id: string): Promise<Rental | null>;
}