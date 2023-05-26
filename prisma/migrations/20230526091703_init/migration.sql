/*
  Warnings:

  - You are about to drop the `_plantosubscriptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_plantosubscriptions` DROP FOREIGN KEY `_PlanToSubscriptions_A_fkey`;

-- DropForeignKey
ALTER TABLE `_plantosubscriptions` DROP FOREIGN KEY `_PlanToSubscriptions_B_fkey`;

-- DropTable
DROP TABLE `_plantosubscriptions`;
