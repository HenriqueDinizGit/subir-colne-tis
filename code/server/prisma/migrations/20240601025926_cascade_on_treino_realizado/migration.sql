-- DropForeignKey
ALTER TABLE `treinoRealizado` DROP FOREIGN KEY `treinoRealizado_treinoId_fkey`;

-- AddForeignKey
ALTER TABLE `treinoRealizado` ADD CONSTRAINT `treinoRealizado_treinoId_fkey` FOREIGN KEY (`treinoId`) REFERENCES `treino`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
