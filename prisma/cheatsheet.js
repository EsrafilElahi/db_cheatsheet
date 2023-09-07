const user = await prisma.user.findUnique({
  where: { id: 1 },
});

const users = await prisma.user.findMany();

const filteredUsers = await prisma.user.findMany({
  where: {
    age: { gt: 25 }, // Greater than 25
  },
});

const sortedUsers = await prisma.user.findMany({
  orderBy: {
    createdAt: 'desc', // or 'asc' for ascending
  },
});

const selectedFields = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
  },
});

const paginatedUsers = await prisma.user.findMany({
  skip: 10, // Skip the first 10 records
  take: 5,  // Return only 5 records
});

const userCount = await prisma.user.count();

const userWithPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: true,
  },
});

const usersWithComments = await prisma.user.findMany({
  where: {
    posts: {
      some: {
        comments: {
          some: {
            text: { contains: 'Prisma' },
          },
        },
      },
    },
  },
});

const totalUserAge = await prisma.user.aggregate({
  sum: {
    age: true,
  },
});

const firstUser = await prisma.user.findFirst();
const lastUser = await prisma.user.findLast();

const distinctAges = await prisma.user.aggregate({
  distinct: ['age'],
});

const newUser = await prisma.user.create({
  data: {
    name: 'John Doe',
    age: 30,
  },
});

const updatedUser = await prisma.user.update({
  where: { id: 1 },
  data: {
    age: 31,
  },
});

const deletedUser = await prisma.user.delete({
  where: { id: 1 },
});

const batchCreateUsers = await prisma.user.createMany({
  data: [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 28 },
  ],
});

const batchUpdateUsers = await prisma.user.updateMany({
  where: { age: { gt: 30 } },
  data: { status: 'inactive' },
});

const batchDeleteUsers = await prisma.user.deleteMany({
  where: { age: { lt: 18 } },
});

// aggregate
const averageAgeByCity = await prisma.user.aggregate({
  groupBy: {
    city: true, // Replace 'city' with the actual field name in your schema
  },
  avg: {
    age: true, // Calculate the average age within each city group
  },
});

const activeUserCount = await prisma.user.aggregate({
  count: {
    where: {
      status: 'active',
    },
  },
});

const totalOrderAmount = await prisma.order.aggregate({
  sum: {
    amount: true,
  },
});

const highestTemperature = await prisma.weatherRecord.aggregate({
  max: {
    temperature: true,
  },
});

const lowestTemperature = await prisma.weatherRecord.aggregate({
  min: {
    temperature: true,
  },
});

const orderStats = await prisma.order.aggregate({
  count: true, // Total order count
  sum: {
    amount: true, // Sum of order amounts
  },
  avg: {
    amount: true, // Average order amount
  },
});

const medianAge = await prisma.user.aggregate({
  _avg: {
    age: true,
  },
});

// groupby
const postsByYear = await prisma.post.aggregate({
  groupBy: {
    created: {
      _year: true, // Group by year
    },
  },
  count: true, // Count of posts in each year
});

const orderTotalsByCustomerAndProduct = await prisma.order.aggregate({
  groupBy: {
    customer: true,
    product: true,
  },
  sum: {
    amount: true, // Sum of order amounts
  },
});

const postsByAuthorCityAndCategory = await prisma.post.aggregate({
  groupBy: {
    author: {
      city: true,
    },
    category: true,
  },
  count: true, // Count of posts in each group
});

const activeUsersByCity = await prisma.user.aggregate({
  where: {
    status: 'active',
  },
  groupBy: {
    city: true,
  },
  count: true, // Count of active users in each city
});

const ordersByMonth = await prisma.order.aggregate({
  groupBy: {
    created: {
      _month: true, // Group by month
    },
  },
  count: true, // Count of orders in each month
  sum: {
    amount: true, // Sum of order amounts in each month
  },
});

const postsByCity = await prisma.post.aggregate({
  groupBy: {
    author: {
      city: {
        _alias: 'authorCity', // Alias the city field
      },
    },
  },
  count: true, // Count of posts in each city group
});

const avgOrderAmountByCategory = await prisma.order.aggregate({
  groupBy: {
    product: {
      category: true,
    },
  },
  avg: {
    amount: true, // Average order amount within each category
  },
});

const usersBySubscriptionStatus = await prisma.user.aggregate({
  groupBy: {
    subscriptionStatus: true,
  },
  count: true, // Count of users in each subscription status group
});

const postsByAuthorCountry = await prisma.post.aggregate({
  groupBy: {
    author: {
      residence: {
        country: true,
      },
    },
  },
  count: true, // Count of posts in each author's country
});

