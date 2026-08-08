/*
  Warnings:

  - You are about to drop the column `url` on the `ProductMedia` table. All the data in the column will be lost.
  - Added the required column `key` to the `ProductMedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductMedia" DROP COLUMN "url",
ADD COLUMN     "key" TEXT NOT NULL;
