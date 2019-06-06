export {};
const CategoryModel = require("../../models/category");

module.exports = {
  categories: () => {
    return CategoryModel.find()
      .then((categories: any) => {
        return categories.map((category: any) => {
          return {
            ...category._doc,
            _id: category.id
          };
        });
      })
      .catch((err: string) => {
        throw err;
      });
  },
  createCategory: (args: any, req: any) => {
    return CategoryModel.findOne({ title: args.categoryInput.title })
      .then((category: any) => {
        if (category) {
          throw new Error("category already exists.");
        }
        return category;
      })
      .then((result: any) => {
        const category = new CategoryModel({
          title: args.categoryInput.title
        });

        return category
          .save()
          .then((result: any) => {
            return { ...result._doc, _id: result.id };
          })
          .catch((err: any) => {
            throw err;
          });
      })
      .catch((err: any) => {
        throw err;
      });
  }
};
