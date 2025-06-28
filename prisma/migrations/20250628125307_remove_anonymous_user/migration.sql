/*
  Warnings:

  - You are about to drop the column `anonUserId` on the `ShortUrl` table. All the data in the column will be lost.
  - You are about to drop the `AnonymousUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShortUrl" DROP CONSTRAINT "ShortUrl_anonUserId_fkey";

-- DropIndex
DROP INDEX "ShortUrl_anonUserId_idx";

-- AlterTable
ALTER TABLE "ShortUrl" DROP COLUMN "anonUserId";

-- DropTable
DROP TABLE "AnonymousUser";
