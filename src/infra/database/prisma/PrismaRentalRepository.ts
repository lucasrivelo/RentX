import { inject, injectable } from "inversify";
import { Prisma, PrismaClient } from "@prisma/client";
import { Rental } from "../../../domain/entities/Rental.js";
import type { IRentalRepo } from "../../../domain/repositories/IRentalRepository.js";
import { TYPES } from "../../container/types.js";

@injectable()
export class PrismaRentalRepository implements IRentalRepo {
  constructor( 
    @inject(TYPES.PrismaClient) private prisma: PrismaClient
  ) {}

  async criar(rental: Rental): Promise<void> {
    await this.prisma.rental.create({
      data: {
        id: rental.id,
        User_id: rental.User_id,
        Car_id: rental.Car_id,
        DataI: rental.DataI || new Date(),
        DataE: rental.DataE,
        DataF: rental.DataF ?? null,
      },
    });
  }

  async buscaId(id: string): Promise<Rental | null> {
    const rental = await this.prisma.rental.findUnique({ where: { id } });
    return rental as unknown as Rental | null;
  }

  async buscaCarId(Car_id: string): Promise<Rental[]> {
    const rentals = await this.prisma.rental.findMany({ 
      where: { Car_id },
      orderBy: {
        DataI: 'desc'
      }
    });

    return rentals as unknown as Rental[];
  }

  async listarAluguelDisponivel(User_id: string): Promise<Rental | null> {
    const abrirRental = await this.prisma.rental.findFirst({
      where: {
        User_id: User_id,
        DataF: null
      }
    });

    return abrirRental as any; 
  }
}
