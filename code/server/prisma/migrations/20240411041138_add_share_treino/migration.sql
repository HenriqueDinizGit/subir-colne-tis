-- CreateTable
CREATE TABLE `treinoCompartilhado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `treinoId` INTEGER NOT NULL,
    `enviadoPorId` INTEGER NOT NULL,
    `recebidoPorId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tokenCompartilhamento` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `treinoCompartilhado_tokenCompartilhamento_key`(`tokenCompartilhamento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `treinoCompartilhado` ADD CONSTRAINT `treinoCompartilhado_treinoId_fkey` FOREIGN KEY (`treinoId`) REFERENCES `treino`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `treinoCompartilhado` ADD CONSTRAINT `treinoCompartilhado_enviadoPorId_fkey` FOREIGN KEY (`enviadoPorId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `treinoCompartilhado` ADD CONSTRAINT `treinoCompartilhado_recebidoPorId_fkey` FOREIGN KEY (`recebidoPorId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
