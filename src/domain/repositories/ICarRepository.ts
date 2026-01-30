import { Car } from "../entities/Car";

export interface ICarRepo{
    criar(car: Car): Promise<void>;
    buscaId(id: string): Promise<Car>;
    listarDisponivel(): Promise<Car[]>;
    updateDisponivel(id: string, avaiable: boolean): Promise<void>;
}
