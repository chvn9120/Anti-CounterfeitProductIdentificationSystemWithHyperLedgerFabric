export default {
    multipleMongoose2Obj: (mongooses) => mongooses.map((mongoose) => mongoose.toObject({ getters: true })),
    mongoose2Obj: (mongoose) => (mongoose ? mongoose : mongoose.toObject({ getters: true })),
};
