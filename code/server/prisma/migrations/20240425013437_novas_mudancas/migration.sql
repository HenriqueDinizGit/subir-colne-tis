/*
  Warnings:

  - You are about to drop the column `treinoId` on the `treinoCompartilhado` table. All the data in the column will be lost.
  - Added the required column `treinoCompartilhadoId` to the `treinoCompartilhado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `treinosCriadosPeloCompartilhamento` to the `treinoCompartilhado` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `treinoCompartilhado` DROP FOREIGN KEY `treinoCompartilhado_treinoId_fkey`;

-- AlterTable
ALTER TABLE `treinoCompartilhado` DROP COLUMN `treinoId`,
    ADD COLUMN `treinoCompartilhadoId` INTEGER NOT NULL,
    ADD COLUMN `treinosCriadosPeloCompartilhamento` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `treinoCompartilhado` ADD CONSTRAINT `treinoCompartilhado_treinoCompartilhadoId_fkey` FOREIGN KEY (`treinoCompartilhadoId`) REFERENCES `treino`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
