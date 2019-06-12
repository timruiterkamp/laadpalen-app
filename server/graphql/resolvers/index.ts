const authResolver = require("./auth");
const issueResolver = require("./issues");
const stakeholderResolver = require("./stakeholders");
const categoryResolver = require("./categories");
const messageResolver = require("./messages");

const rootResolver = {
  ...authResolver,
  ...issueResolver,
  ...stakeholderResolver,
  ...categoryResolver,
  ...messageResolver
};
module.exports = rootResolver;
