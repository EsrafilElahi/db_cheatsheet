// ======================= findUnique =======================
// where, select, include

const result = await prisma.user.findUnique({
  where: {
    id: 42,
  },
})

const result = await prisma.user.findUnique({
  where: {
    email: 'alice@prisma.io',
  },
})

const result = await prisma.user.findUnique({
  where: {
    fullname: {
      // name property of @@unique attribute - default is firstname_lastname
      firstName: 'Alice',
      lastName: 'Smith',
    },
  },
})

model User {
  firstName String
  lastName  String

  @@id([firstName, lastName])
}

const result = await prisma.user.findUnique({
  where: {
    firstName_lastName: {
      firstName: 'Alice',
      lastName: 'Smith',
    },
  },
})

// ======================= findFirst =======================
// distinct, where, cursor, orderBy, include, select, skip, take

const user = await prisma.user.findFirst({
  where: { name: 'Alice' },
})

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

async function main() {
  const a = await prisma.post.create({
    data: {
      title: 'A test 1',
    },
  })

  const b = await prisma.post.create({
    data: {
      title: 'A test 2',
    },
  })

  const c = await prisma.post.findFirst({
    where: {
      title: {
        startsWith: 'A test',
      },
    },
    orderBy: {
      title: 'asc',
    },
    take: -1, // Reverse the list
  })
}

main()

// ======================= findMany =======================
// select, include, where, orderBy, cursor, take, skip, distinct 

const user = await prisma.user.findMany({
  where: { name: 'Alice' },
})

// ======================= create =======================
// data, select, include 

const user = await prisma.user.create({
  data: { email: 'alice@prisma.io' },
})

import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query'] })

async function main() {
  let users: Prisma.UserCreateInput[] = [
    {
      email: 'ariana@prisma.io',
      name: 'Ari',
      profileViews: 20,
      coinflips: [true, false, false],
      role: 'ADMIN',
    },
    {
      email: 'elsa@prisma.io',
      name: 'Elsa',
      profileViews: 20,
      coinflips: [true, false, false],
      role: 'ADMIN',
    },
  ]

  await Promise.all(
    users.map(async (user) => {
      await prisma.user.create({
        data: user,
      })
    })
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

// ======================= update =======================
// data, where, select, include 

const user = await prisma.user.update({
  where: { id: 1 },
  data: { email: 'alice@prisma.io' },
})

// ======================= upsert =======================
// create, update, where, select, include 

const user = await prisma.user.upsert({
  where: { id: 1 },
  update: { email: 'alice@prisma.io' },
  create: { email: 'alice@prisma.io' },
})


model User {
  id           Int @id
  profileViews Int
  userName     String @unique
  email        String

  @@unique([id, profileViews])
}
prisma.user.upsert({
  where: {
    userName: 'Alice',
  },
  create: {
    id: 1,
    profileViews: 1,
    userName: 'Alice',
    email: 'alice@prisma.io',
  },
  update: {
    email: 'updated@example.com',
  },
})

prisma.User.upsert({
  where: {
    userName: 'Alice',
    profileViews: 1,
    id: 1,
  },
  create: {
    id: 1,
    profileViews: 1,
    userName: 'Alice',
    email: 'alice@prisma.io',
  },
  update: {
    email: 'updated@example.com',
  },
})

// ======================= delete =======================
// where, select, include

const user = await prisma.user.delete({
  where: { id: 1 },
})

const deleteUser = await prisma.user.delete({
  where: {
    email: 'elsa@prisma.io',
  },
  select: {
    email: true,
    name: true,
  },
})

// ======================= createMany =======================
// data, skipDuplicates

const users = await prisma.user.createMany({
  data: [
    { name: 'Sonali', email: 'sonali@prisma.io' },
    { name: 'Alex', email: 'alex@prisma.io' },
  ],
})


// ======================= updateMany =======================
// data, where

const updatedUserCount = await prisma.user.updateMany({
  where: { name: 'Alice' },
  data: { name: 'ALICE' },
})

const deleteUser = await prisma.user.updateMany({
  where: {
    email: {
      contains: 'prisma.io',
    },
    posts: {
      some: {
        likes: {
          gt: 10,
        },
      },
    },
  },
  data: {
    role: 'USER',
  },
})

// ======================= deleteMany =======================
// where

const deletedUserCount = await prisma.user.deleteMany({})

const deletedUserCount = await prisma.user.deleteMany({
  where: { name: 'Alice' },
})

// ======================= count =======================
// where, cursor, orderBy, select, skip, take

const result = await prisma.user.count()

const result = await prisma.user.count({
  where: {
    post: {
      some: {
        published: true,
      },
    },
  },
})

// A count of all records (_all)
// A count of all records with non - null name fields
// A count of all records with non - null city fields
const c = await prisma.user.count({
  select: {
    _all: true,
    city: true,
    name: true,
  },
})

// ======================= aggregate =======================
// where, orderBy, cursor, take, skip, distinct, _count, _avg, _sum, _min, _max

const minMaxAge = await prisma.user.aggregate({
  _count: {
    _all: true,
  },
  _max: {
    profileViews: true,
  },
  _min: {
    profileViews: true,
  },
})

const setValue = await prisma.user.aggregate({
  _sum: {
    profileViews: true,
  },
})

// ======================= groupBy =======================
//  where, orderBy , by, having , take , skip , _count, _avg , _sum , _min , _max 

const groupUsers = await prisma.user.groupBy({
  by: ['country', 'city'],
  _count: {
    _all: true,
    city: true,
  },
  _sum: {
    profileViews: true,
  },
  orderBy: {
    country: 'desc',
  },
  having: {
    profileViews: {
      _avg: {
        gt: 200,
      },
    },
  },
})


// ------------------------------------------------------------- Model query options -----------------------------------------------------------------
// select
const result = await prisma.user.findUnique({
  where: { id: 1 },
  select: {
    name: true,
    profileViews: true,
  },
})

// include
const users = await prisma.user.findMany({
  include: {
    posts: true, // Returns all fields for all posts
    profile: true, // Returns all Profile fields
  },
})

// where
const results = await prisma.user.findMany({
  where: {
    email: {
      endsWith: 'prisma.io',
    },
  },
})

// UserWhereInput
const whereNameIs = Prisma.validator < Prisma.UserWhereInput > ()({
  name: 'Rich',
})

// It can be combined with conditional operators too
const whereNameIs = Prisma.validator < Prisma.UserWhereInput > ()({
  name: 'Rich',
  AND: [
    {
      email: {
        contains: 'rich@boop.com',
      },
    },
  ],
})

// orderBy
const posts = await prisma.post.findMany({
  orderBy: {
    author: {
      name: 'asc',
    },
  },
})

const posts = await prisma.post.findMany({
  orderBy: {
    _relevance: {
      fields: ['title'],
      search: 'database',
      sort: 'asc'
    },
})

const users = await prisma.user.findMany({
  select: {
    email: true,
    role: true,
  },
  orderBy: [
    {
      email: 'desc',
    },
    {
      role: 'desc',
    },
  ],
})

const users = await prisma.user.findMany({
  select: {
    email: true,
    role: true,
  },
  orderBy: [
    {
      role: 'desc',
    },
    {
      email: 'desc',
    },
  ],
})

// distinct
const distinctCities = await prisma.user.findMany({
  select: {
    city: true,
    country: true,
  },
  distinct: ['city'],
})

const distinctCitiesAndCountries = await prisma.user.findMany({
  select: {
    city: true,
    country: true,
  },
  distinct: ['city', 'country'],
})

const distinctCitiesAndCountries = await prisma.user.findMany({
  where: {
    email: {
      contains: 'prisma.io',
    },
  },
  select: {
    city: true,
    country: true,
  },
  distinct: ['city', 'country'],
})


// --------------------------------------------------- Filter conditions and operators ----------------------------------------------------

// not
const result = await prisma.user.findMany({
  where: {
    name: {
      not: 'Eleanor',
    },
  },
})

// in
const getUser = await prisma.user.findMany({
  where: {
    id: { in: [22, 91, 14, 2, 5] },
  },
})

// lt, gt, lte, gte
const getPosts = await prisma.post.findMany({
  where: {
    likes: {
      lt: 9,
      gt: 5,
      lte: 7,
      gt3: 6
    },
  },
})

// contains
const result = await prisma.post.count({
  where: {
    content: {
      contains: 'databases',
    },
  },
})

// search
const result = await prisma.post.findMany({
  where: {
    title: {
      search: 'cat | dog',
      search: 'cat & dog',
    },
  },
})

// startsWith
const result = await prisma.user.findMany({
  where: {
    email: {
      endsWith: 'prisma.io',
    },
  },
})

// AND, OR
const result = await prisma.post.findMany({
  where: {
    (AND | OR): [
      {
        content: {
          contains: 'Prisma',
        },
      },
      {
        published: {
          equals: false,
        },
      },
    ],
  },
})

// NOT, OR
const result = await prisma.post.findMany({
  where: {
    OR: [
      {
        title: {
          contains: 'Prisma',
        },
      },
      {
        title: {
          contains: 'databases',
        },
      },
    ],
    NOT: {
      title: {
        contains: 'SQL',
      },
    },
  },
})


// ------------------------------------------------------------- Relation filters -----------------------------------------------------------------

// some
const result = await prisma.user.findMany({
  where: {
    post: {
      some: {
        content: {
          contains: "Prisma"
        }
      }
    }
  }
}

// every
const result = await prisma.user.findMany({
  where: {
    post: {
      every: {
        published: true
      },
    }
  }
}

// set --> Use set to overwrite the value of a scalar list field.
const setTags = await prisma.post.update({
  where: {
    id: 9,
  },
  data: {
    tags: {
      set: ['computing', 'books'],
    },
  },
})

// push
const addTag = await prisma.post.update({
  where: {
    id: 9,
  },
  data: {
    tags: {
      push: 'computing',
    },
  },
})