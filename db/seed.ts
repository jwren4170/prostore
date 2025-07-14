import prisma from "@/db/prisma";
import { sampleData } from "./sample-data";

async function main() {
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();

  const users = await prisma.user.createMany({ data: sampleData.users });

  const products = await prisma.product.createMany({
    data: sampleData.products,
  });

  console.log(products, users, "Database seeded successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
