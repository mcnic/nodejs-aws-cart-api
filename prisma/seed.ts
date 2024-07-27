import prisma from './db';

async function main() {
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const newProduct = await prisma.product.create({
    data: {
      title: 'prod 1',
      description: 'prod 1',
      price: 1.1,
      image: 'https:/1',
    },
  });
  console.log({ newProduct });

  const newUser = await prisma.user.create({
    data: {
      name: 'User',
      password: '123456',
    },
  });
  console.log({ newUser });

  const newCart = await prisma.cart.create({
    data: {
      user_id: newUser.id,
    },
  });
  console.log({ newCart });

  const cartItem = await prisma.cartItem.create({
    data: {
      cart_id: newCart.id,
      product_id: newProduct.id,
      count: 1,
    },
  });
  console.log({ cartItem });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
