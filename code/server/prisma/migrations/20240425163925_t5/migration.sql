-- CreateTable
CREATE TABLE `treinoRealizado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `musculo_treinado` ENUM('Peito', 'Costas', 'Perna', 'Ombro', 'Abdomem', 'Biceps', 'Triceps', 'Panturrilha') NOT NULL,
    `dia_semana` ENUM('Segunda_feira', 'Terca_feira', 'Quarta_feira', 'Quinta_feira', 'Sexta_feira', 'Sabado', 'Domingo') NOT NULL,
    `treino_iniciado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `treino_finalizado` DATETIME(3) NOT NULL,
    `treinoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `treinoRealizado` ADD CONSTRAINT `treinoRealizado_treinoId_fkey` FOREIGN KEY (`treinoId`) REFERENCES `treino`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
