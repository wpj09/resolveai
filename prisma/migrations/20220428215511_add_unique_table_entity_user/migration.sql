/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `Entity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Entity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Entity_cnpj_key" ON "Entity"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Entity_email_key" ON "Entity"("email");
