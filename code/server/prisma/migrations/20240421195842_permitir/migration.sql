/*
  Warnings:

  - You are about to drop the column `recebidoPorId` on the `treinoCompartilhado` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `treinoCompartilhado` DROP FOREIGN KEY `treinoCompartilhado_recebidoPorId_fkey`;

-- AlterTable
ALTER TABLE `treinoCompartilhado` DROP COLUMN `recebidoPorId`;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `foto` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE `_Recebimentos` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Recebimentos_AB_unique`(`A`, `B`),
    INDEX `_Recebimentos_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_Recebimentos` ADD CONSTRAINT `_Recebimentos_A_fkey` FOREIGN KEY (`A`) REFERENCES `treinoCompartilhado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Recebimentos` ADD CONSTRAINT `_Recebimentos_B_fkey` FOREIGN KEY (`B`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
