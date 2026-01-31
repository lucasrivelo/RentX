import { Car } from "../entities/Car.js";

export interface ICarRepo{
    criar(car: Car): Promise<void>;
    buscaId(id: string): Promise<Car | null>;
    listarDisponivel(): Promise<Car[]>;
    updateDisponivel(id: string, available: boolean): Promise<void>;
}
