-- DropForeignKey
ALTER TABLE `exercicio` DROP FOREIGN KEY `exercicio_treinoId_fkey`;

-- DropForeignKey
ALTER TABLE `fotoTreino` DROP FOREIGN KEY `fotoTreino_treinoId_fkey`;

-- DropForeignKey
ALTER TABLE `serieExercicio` DROP FOREIGN KEY `serieExercicio_exercicioId_fkey`;

-- DropForeignKey
ALTER TABLE `treino` DROP FOREIGN KEY `treino_usuarioId_fkey`;

-- AddForeignKey
ALTER TABLE `treino` ADD CONSTRAINT `treino_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exercicio` ADD CONSTRAINT `exercicio_treinoId_fkey` FOREIGN KEY (`treinoId`) REFERENCES `treino`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `serieExercicio` ADD CONSTRAINT `serieExercicio_exercicioId_fkey` FOREIGN KEY (`exercicioId`) REFERENCES `exercicio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fotoTreino` ADD CONSTRAINT `fotoTreino_treinoId_fkey` FOREIGN KEY (`treinoId`) REFERENCES `treino`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
