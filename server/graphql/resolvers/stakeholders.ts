export {};
const StakeholderModel = require("../../models/stakeholder");
const { transformStakeholder } = require("./merge");

module.exports = {
  stakeholders: () => {
    console.log("wordt aangevraagd");
    return StakeholderModel.find()
      .then((stakeholders: any) => {
        return stakeholders.map((stakeholder: any) => {
          console.log(transformStakeholder(stakeholder));
          return transformStakeholder(stakeholder);
        });
      })
      .catch((err: string) => {
        throw err;
      });
  },
  createStakeholder: (args: any, req: any) => {
    return StakeholderModel.findOne({ title: args.stakeholderInput.title })
      .then((stakeholder: any) => {
        if (stakeholder) {
          throw new Error("Stakeholder already exists.");
        }
        return stakeholder;
      })
      .then((result: any) => {
        const stakeholder = new StakeholderModel({
          title: args.stakeholderInput.title
        });

        return stakeholder
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
