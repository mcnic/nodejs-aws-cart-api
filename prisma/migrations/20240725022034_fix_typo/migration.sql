/*
  Warnings:

  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrderStatuses" AS ENUM ('CREATED', 'SHIPPED');

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatuses" NOT NULL DEFAULT 'CREATED';

-- DropEnum
DROP TYPE "OederStatuses";
