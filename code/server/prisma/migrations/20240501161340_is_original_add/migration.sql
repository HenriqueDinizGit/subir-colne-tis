-- AlterTable
ALTER TABLE `treino` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isOriginal` BOOLEAN NOT NULL DEFAULT true;