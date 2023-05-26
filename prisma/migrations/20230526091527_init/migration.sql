/*
  Warnings:

  - You are about to drop the column `planId` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `subscriptions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `subscriptions` DROP FOREIGN KEY `Subscriptions_planId_fkey`;

-- DropForeignKey
ALTER TABLE `subscriptions` DROP FOREIGN KEY `Subscriptions_userId_fkey`;

-- AlterTable
ALTER TABLE `subscriptions` DROP COLUMN `planId`,
    DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `_SubscriptionsToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SubscriptionsToUser_AB_unique`(`A`, `B`),
    INDEX `_SubscriptionsToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PlanToSubscriptions` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PlanToSubscriptions_AB_unique`(`A`, `B`),
    INDEX `_PlanToSubscriptions_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Plan_name_key` ON `Plan`(`name`);

-- AddForeignKey
ALTER TABLE `_SubscriptionsToUser` ADD CONSTRAINT `_SubscriptionsToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Subscriptions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SubscriptionsToUser` ADD CONSTRAINT `_SubscriptionsToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlanToSubscriptions` ADD CONSTRAINT `_PlanToSubscriptions_A_fkey` FOREIGN KEY (`A`) REFERENCES `Plan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlanToSubscriptions` ADD CONSTRAINT `_PlanToSubscriptions_B_fkey` FOREIGN KEY (`B`) REFERENCES `Subscriptions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
