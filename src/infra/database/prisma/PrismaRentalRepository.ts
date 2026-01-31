import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { Rental } from "../../../domain/entities/Rental.js";
import type { IRentalRepo } from "../../../domain/repositories/IRentalRepository.js";

@injectable()
export class PrismaRentalRepository implements IRentalRepo {
  private prisma = new PrismaClient();

  async criar(rental: Rental): Promise<void> {
    await this.prisma.rental.create({
      data: {
        User_id: rental.User_id,
        Car_id: rental.Car_id,
        DataI: rental.DataI || new Date(),
        DataE: null,
        DataF: rental.DataF ?? null,
      },
    });
  }

  async buscaId(id: string): Promise<Rental | null> {
    const rental = await this.prisma.rental.findUnique({ where: { id } });
    return rental as unknown as Rental | null;
  }
  async buscaCarId(Car_id: string): Promise<Rental | null> {
    const rental = await this.prisma.rental.findFirst({
      where: { Car_id },
    });
    return rental as unknown as Rental | null;
  }

  async listarPorUser(User_id: string): Promise<Rental[]> {
    const rentals = await this.prisma.rental.findMany({
      where: { User_id },
    });
    return rentals as unknown as Rental[];
  }

  async listarPorData(DataI: Date, DataF: Date): Promise<Rental[]> {
    const rentals = await this.prisma.rental.findMany({
      where: {
        DataI: { gte: DataI },
        DataF: { lte: DataF },
      },
    });
    return rentals as unknown as Rental[];
  }
}
