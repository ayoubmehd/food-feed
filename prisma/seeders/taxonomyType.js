const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();
main()
  .then(() => console.log("Seeded"))
  .catch((err) => console.log(err))
  .finally(process.exit);

async function main(count = 10) {
  try {
    return await prisma.taxonomyType.createMany({
      data: [
        {
          label: "category",
        },
        {
          label: "tag",
        },
      ],
    });
  } catch (error) {
    return error;
  }
}
