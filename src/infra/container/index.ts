import { Container } from "inversify";
import { TYPES } from "./types.js";
import type { ICarRepo } from "../../domain/repositories/ICarRepository.js";
import type { IRentalRepo } from "../../domain/repositories/IRentalRepository.js";
import { PrismaCarRepository } from "../database/prisma/PrismaCarRepository.js";
import { PrismaRentalRepository } from "../database/prisma/PrismaRentalRepository.js";

const container = new Container();

container.bind<ICarRepo>(TYPES.ICarRepo).to(PrismaCarRepository);
container.bind<IRentalRepo>(TYPES.IRentalRepo).to(PrismaRentalRepository);

export { container };