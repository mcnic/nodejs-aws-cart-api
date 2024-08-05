/*
  Warnings:

  - You are about to drop the column `productId` on the `cart_items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_productId_fkey";

-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "productId";

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
