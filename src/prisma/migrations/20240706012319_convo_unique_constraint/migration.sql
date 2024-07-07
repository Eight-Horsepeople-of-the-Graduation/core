/*
  Warnings:

  - A unique constraint covering the columns `[bookId,userId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Conversation_bookId_userId_key" ON "Conversation"("bookId", "userId");
