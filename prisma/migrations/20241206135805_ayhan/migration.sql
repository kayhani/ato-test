/*
  Warnings:

  - You are about to drop the column `fullness` on the `containers` table. All the data in the column will be lost.
  - You are about to drop the column `lastPick` on the `containers` table. All the data in the column will be lost.
  - You are about to drop the `_MessageToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `municips` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tickets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trucks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MessageToUser" DROP CONSTRAINT "_MessageToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MessageToUser" DROP CONSTRAINT "_MessageToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_containerId_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_senderId_fkey";

-- AlterTable
ALTER TABLE "containers" DROP COLUMN "fullness",
DROP COLUMN "lastPick";

-- DropTable
DROP TABLE "_MessageToUser";

-- DropTable
DROP TABLE "groups";

-- DropTable
DROP TABLE "messages";

-- DropTable
DROP TABLE "municips";

-- DropTable
DROP TABLE "tickets";

-- DropTable
DROP TABLE "trucks";
