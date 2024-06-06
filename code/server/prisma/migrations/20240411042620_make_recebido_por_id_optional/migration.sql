-- DropForeignKey
ALTER TABLE `treinoCompartilhado` DROP FOREIGN KEY `treinoCompartilhado_recebidoPorId_fkey`;

-- AlterTable
ALTER TABLE `treinoCompartilhado` MODIFY `recebidoPorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `treinoCompartilhado` ADD CONSTRAINT `treinoCompartilhado_recebidoPorId_fkey` FOREIGN KEY (`recebidoPorId`) REFERENCES `usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
