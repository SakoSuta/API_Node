/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Subscriptions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuid` to the `Subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `game` DROP FOREIGN KEY `Game_categoryId_fkey`;

-- AlterTable
ALTER TABLE `game` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `subscriptions` ADD COLUMN `uuid` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `_CategoryToPlan` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryToPlan_AB_unique`(`A`, `B`),
    INDEX `_CategoryToPlan_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryToGame` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryToGame_AB_unique`(`A`, `B`),
    INDEX `_CategoryToGame_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Game_name_key` ON `Game`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Game_slug_key` ON `Game`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `Subscriptions_uuid_key` ON `Subscriptions`(`uuid`);

-- AddForeignKey
ALTER TABLE `_CategoryToPlan` ADD CONSTRAINT `_CategoryToPlan_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToPlan` ADD CONSTRAINT `_CategoryToPlan_B_fkey` FOREIGN KEY (`B`) REFERENCES `Plan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToGame` ADD CONSTRAINT `_CategoryToGame_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToGame` ADD CONSTRAINT `_CategoryToGame_B_fkey` FOREIGN KEY (`B`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
