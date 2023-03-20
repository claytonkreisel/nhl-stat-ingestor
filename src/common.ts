import { PrismaClient } from '@prisma/client';

export const NhlApiBaseUrl = 'https://statsapi.web.nhl.com/api/v1';

export const prisma = new PrismaClient();
