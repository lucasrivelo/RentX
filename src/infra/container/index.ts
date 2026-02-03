import { Container } from "inversify";
import { TYPES } from "./types.js";
import type { ICarRepo } from "../../domain/repositories/ICarRepository.js";
import type { IRentalRepo } from "../../domain/repositories/IRentalRepository.js";
import { PrismaCarRepository } from "../database/prisma/PrismaCarRepository.js";
import { PrismaRentalRepository } from "../database/prisma/PrismaRentalRepository.js";
import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase.js";
import { PrismaClient } from "@prisma/client";

const container = new Container();
const prisma = new PrismaClient();

container.bind<ICarRepo>(TYPES.ICarRepo).to(PrismaCarRepository);
container.bind<IRentalRepo>(TYPES.IRentalRepo).to(PrismaRentalRepository);
container.bind<CreateRentalUseCase>(CreateRentalUseCase).toSelf();
container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(prisma);

export { container };