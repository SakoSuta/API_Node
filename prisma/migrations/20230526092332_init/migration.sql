-- CreateTable
CREATE TABLE `_PlanToSubscriptions` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PlanToSubscriptions_AB_unique`(`A`, `B`),
    INDEX `_PlanToSubscriptions_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PlanToSubscriptions` ADD CONSTRAINT `_PlanToSubscriptions_A_fkey` FOREIGN KEY (`A`) REFERENCES `Plan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlanToSubscriptions` ADD CONSTRAINT `_PlanToSubscriptions_B_fkey` FOREIGN KEY (`B`) REFERENCES `Subscriptions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
