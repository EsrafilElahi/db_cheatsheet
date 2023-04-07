//////////////////////////////////////////////////// middlware methode ////////////////////////////////////////////////////
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  date: {
    type: Date,
    immutable: true // can't change
  }
});

// method
userSchema.method.sayHi = function (name) {
  console.log(`hi my name is ${this.name}`)
}

// statics
userSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") })
}

// query
userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") })
}

// virtual
userSchema.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`
})
userSchema.virtual("namedEmail").set(function (val, virtual, doc) {
  const parts = val.split(' ')
  this.name.first = parts[0]
  this.name.last = parts[1]
})

userSchema.pre("save", (next) => {
  this.updatedAt = Date.now()
})
userSchema.post("save", (doc, next) => {
  doc.sayHi()
  next()
})

//////////////////////////////////////////////////// CRUD ////////////////////////////////////////////////////
const courseSchema = mongoose.Schema({
  name: String,
  email: String,
  price: Number,
  date: {
    type: Date,
    immutable: true // can't change
  }
});
const Course = mongoose.model("Course", courseSchema);

const page = 1 // came from front
const offset = 10 // came from front

const findCourse = async () => {
  const courses = await Course
    // .find({ price: { $in: [10, 20, 30] } })
    .find({ price: { $gte: 10, $lte: 30 } })
    .find({ tag: { $in: ["frontend", "backend"] } })
    .or([{ name: 'esrafil' }, { price: 10 }])
    .or([{ tag: 'backend' }, { tag: 'frontend' }])
    .and([{ name: 'esrafil' }, { price: 10 }])
    .limit(offset)
    .skip((page - 1) * offset)
    // .sort({ name: 1 })
    // .sort("-name")
    .sort("name")
    // .select({ name: 1, price: 1 })
    .select("name price")
  // .count()

  return courses
}

const updateCourseQuery = async (id) => {
  const course = await Course.findById(id)

  // query updating
  course.price = 1000;
  course.name = 'react'


  // directly updating
  course.set({
    price: 1000,
    name: 'react'
  })

  await course.save()
}

const updateCourseDirectly = async (id) => {
  const result = await Course.update({ _id: id }, {
    $set: {
      price: 1000,
      name: 'react',
      "user.name": "messi" // ===> { user: { name: 'messi' } }
    }
  })

  const course = await Course.findByIdAndUpdate(id, {
    $set: {
      price: 1000,
      name: 'react'
    }
  }, { new: true })

  console.log(result)
  console.log(course)
}

//////////////////////////////////////////////////// Validation ////////////////////////////////////////////////////
const coursesSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 255,
  },
  isPublished: Boolean,
  price: {
    type: Number,
    min: 10,
    max: 1000,
    required: function () { return this.isPublished } // isPublished === true && price required
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"]
  },
  date: {
    type: Date,
    immutable: true // can't change
  }
});
const Courses = mongoose.model("Courses", coursesSchema);

//////////////////////////////////////////////////// Relation Data ////////////////////////////////////////////////////
const coursSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 255,
  },
  author: {
    typr: mongoose.Schema.ObjectId,
    ref: 'Author'
  }

});
const Cours = mongoose.model("Cours", coursSchema);

// refrencing relation
const listCours = async () => {
  const listCourss = Cours
    .find()
    .populate("author", "name -_id") // include(name) && exclude(_id)
    .select("name author")
}

Story.
  find().
  populate({
    path: 'fans',
    match: { age: { $gte: 21 } },
    select: 'name -_id'
  }).
  exec();

await person.populate(['stories', 'fans']);

// embedding relation
const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
})

const kourseSchema = new mongoose.Schema({
  name: String,
  author: authorSchema
})

const Kourse = mongoose.model("Kourse", kourseSchema);

const updateAuthor = async (kourseID) => {
  const res = await Kourse.update({ _id: kourseID }, {
    $set: {
      'author.name': 'leo messi'
    },
    $unset: {
      'author': ''
    }

  })
}

// array sub-documents relation
const authorSchemas = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
})

const kourseSchemas = new mongoose.Schema({
  name: String,
  authors: [authorSchema]
})

const Kourses = mongoose.model("Kourse", kourseSchema);

const addAuthor = async (kourseID, author) => {
  const kourse = await Kourse.findById(kourseID)
  kourse.authors.push(autho)
  await kourse.save()
}

const removeAuthor = async (kourseID, authorID) => {
  const kourse = await Kourse.findById(kourseID)
  const author = kourse.authors.id(authorID)
  await author.remove()
  await kourse.save()
}


// dynamic refrence
const commentSchema = new Schema({
  body: { type: String, required: true },
  doc: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'docModel'
  },
  docModel: {
    type: String,
    required: true,
    enum: ['BlogPost', 'Product']
  }
});

const Product = mongoose.model('Product', new Schema({ name: String }));
const BlogPost = mongoose.model('BlogPost', new Schema({ title: String }));
const Comment = mongoose.model('Comment', commentSchema);
