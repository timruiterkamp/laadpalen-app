const authResolver = require("./auth");
const issueResolver = require("./issues");
const stakeholderResolver = require("./stakeholder");

const rootResolver = {
  ...authResolver,
  ...issueResolver,
  ...stakeholderResolver
};
module.exports = rootResolver;
