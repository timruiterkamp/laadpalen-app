const authResolver = require("./auth");
const issueResolver = require("./issues");
const loadingstationsResolver = require("./loadingstations");
const stakeholderResolver = require("./stakeholders");
const categoryResolver = require("./categories");
const messageResolver = require("./messages");
const userResolver = require("./users");

const rootResolver = {
  ...authResolver,
  ...issueResolver,
  ...loadingstationsResolver,
  ...stakeholderResolver,
  ...categoryResolver,
  ...messageResolver,
  ...userResolver
};
module.exports = rootResolver;
