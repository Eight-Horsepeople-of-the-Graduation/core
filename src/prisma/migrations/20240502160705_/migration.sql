/*
  Warnings:

  - You are about to drop the column `created_on` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `created_on` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "pdfLink" TEXT;

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "created_on",
ADD COLUMN     "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "created_on",
ADD COLUMN     "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
