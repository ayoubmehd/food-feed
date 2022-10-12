const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();
main()
  .then(() => console.log("Seeded"))
  .catch((err) => console.log(err))
  .finally(process.exit);

async function main(count = 10) {
  try {
    return await Promise.all(
      Array(count)
        .fill({})
        .map(async () => {
          return await prisma.user.create({
            data: {
              email: faker.internet.email(),
              password:
                "$2a$12$tp93RqjbScLp72A.3t0f/OwXa5yqB0ooE08vaUzYO71KLUNpcLH3y", // 123456789
            },
          });
        })
    );
  } catch (error) {
    return error;
  }
}
