import { Rental } from "../entities/Rental.js";

export interface IRentalRepo{
    criar(rental: Rental): Promise<void>;
    buscaId(id: string): Promise<Rental | null>;
    buscaCarId(Car_id: string): Promise<Rental[]>;
    listarAluguelDisponivel(User_id: string): Promise<Rental | null>;
}