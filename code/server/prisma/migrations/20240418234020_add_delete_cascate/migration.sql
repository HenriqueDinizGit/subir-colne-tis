-- DropForeignKey
ALTER TABLE `treinoCompartilhado` DROP FOREIGN KEY `treinoCompartilhado_enviadoPorId_fkey`;

-- DropForeignKey
ALTER TABLE `treinoCompartilhado` DROP FOREIGN KEY `treinoCompartilhado_recebidoPorId_fkey`;

-- DropForeignKey
ALTER TABLE `treinoCompartilhado` DROP FOREIGN KEY `treinoCompartilhado_treinoId_fkey`;

-- AddForeignKey
ALTER TABLE `treinoCompartilhado` ADD CONSTRAINT `treinoCompartilhado_treinoId_fkey` FOREIGN KEY (`treinoId`) REFERENCES `treino`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `treinoCompartilhado` ADD CONSTRAINT `treinoCompartilhado_enviadoPorId_fkey` FOREIGN KEY (`enviadoPorId`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `treinoCompartilhado` ADD CONSTRAINT `treinoCompartilhado_recebidoPorId_fkey` FOREIGN KEY (`recebidoPorId`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
