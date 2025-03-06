/*
  Warnings:

  - You are about to drop the column `user_id` on the `role` table. All the data in the column will be lost.
  - Added the required column `role_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "role" DROP CONSTRAINT "role_user_id_fkey";

-- AlterTable
ALTER TABLE "role" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;
