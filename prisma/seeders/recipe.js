const { PrismaClient } = require("@prisma/client");
const { faker, FakerError } = require("@faker-js/faker");

const prisma = new PrismaClient();

main()
  .then((data) => console.log("Seeded", data))
  .catch((err) => console.log(err))
  .finally(process.exit);

async function main(count = 10) {
  try {
    const categoryTypeId = (
      await prisma.taxonomyType.findFirst({
        where: {
          label: "category",
        },
      })
    ).id;
    const tagTypeId = (
      await prisma.taxonomyType.findFirst({
        where: {
          label: "tag",
        },
      })
    ).id;

    return await Promise.all(
      Array(count)
        .fill({})
        .map(async () => {
          const title = faker.lorem.sentence(4);

          return await prisma.recipe.create({
            data: {
              title,
              description: fakeDescription(title),
              ingredients: {
                createMany: {
                  data: Array(6)
                    .fill({})
                    .map(() => ({
                      name: faker.lorem.words(2),
                    })),
                },
              },
              preparationInstrucations: {
                createMany: {
                  data: Array(8)
                    .fill({})
                    .map(() => ({
                      description: faker.lorem.word(1),
                    })),
                },
              },
              category: {
                create: {
                  label: faker.lorem.word(),
                  taxonomyType: {
                    connect: {
                      id: categoryTypeId,
                    },
                  },
                },
              },
              tags: {
                create: {
                  label: faker.lorem.word(),
                  taxonomyType: {
                    connect: {
                      id: tagTypeId,
                    },
                  },
                },
              },
            },
          });
        })
    );

    // return await prisma.recipe.createMany({
    //   data:
    // });
  } catch (error) {
    return error;
  }
}

function fakeDescription(title) {
  return `
  # ${title}
  _________________
  
  ## ${faker.lorem.sentence(7)}
  ${faker.lorem.paragraph()}

  ## ${faker.lorem.sentence(3)}
  ${faker.lorem.paragraph()}

  ## ${faker.lorem.sentence(3)}
  ${faker.lorem.paragraph()}

  ${faker.lorem.paragraph()}
`;
}
