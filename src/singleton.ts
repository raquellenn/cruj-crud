import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { PrismaService } from './users/prisma.service';

jest.mock('PrismaService', () => ({
  __esModule: true,
  default: mockDeep<PrismaService>(),
}))

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock =
  PrismaService as unknown as DeepMockProxy<PrismaService>;
