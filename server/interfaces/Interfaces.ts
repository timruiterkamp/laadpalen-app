import * as mongoose from "mongoose";

type issueObject = {
  title: string;
  location: string;
  status: string;
  createdAt: string;
  creator: string;
  image: string;
  stakeholders: string;
  loadingstation: string;
};

export default interface Stakeholder extends mongoose.Document {
  issues: Array<issueObject>;
  id: string;
  title: string;
}

export default interface IssueInterface {
  title: string;
  location: string;
  status: string;
  createdAt: string;
  creator: string;
  image: string;
  stakeholders: string;
  loadingstation: string;
}
