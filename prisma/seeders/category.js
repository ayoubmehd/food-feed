const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();
main()
  .then(() => console.log("Seeded"))
  .catch((err) => console.log(err))
  .finally(process.exit);

async function main(count = 10) {
  const categoryTypeId = (
    await prisma.taxonomyType.findFirst({
      where: {
        label: "tag",
      },
    })
  ).id;

  try {
    return await prisma.taxonomy.createMany({
      data: [
        {
          label: faker.lorem.words(3),
          taxonomyTypeId: categoryTypeId,
        },
      ],
    });
  } catch (error) {
    return error;
  }
}
