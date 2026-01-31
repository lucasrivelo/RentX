import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { Car } from "../../../domain/entities/Car.js";
import type { ICarRepo } from "../../../domain/repositories/ICarRepository.js";

@injectable()
export class PrismaCarRepository implements ICarRepo {
  private prisma = new PrismaClient();

  async criar(car: Car): Promise<void> {
    await this.prisma.car.create({
      data: {
        chassi: car.chassi,
        name: car.name,
        brand: car.brand,
        available: car.available,
      },
    });
  }

  async buscaId(id: string): Promise<Car | null> {
    const car = await this.prisma.car.findUnique({ where: { chassi:id } });
    return car as Car | null;
  }

  async listarDisponivel(): Promise<Car[]> {
    const cars = await this.prisma.car.findMany({ where: { available: true } });
    return cars as Car[];
  }

  async updateDisponivel(id: string, available: boolean): Promise<void> {
    await this.prisma.car.update({
      where: { chassi:id },
      data: { available },
    });
  }
}