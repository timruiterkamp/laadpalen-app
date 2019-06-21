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

export default interface LoadingstationInterface {
  issues: Array<issueObject>;
  _id: string;
  longitude: number;
  latitude: number;
  city: string;
  region: string;
  regioncode: string;
  district: string;
  subdistrict: string;
  address: string;
  postalcode: string;
  provider: string;
  sockets: number;
  usedsockets: number;
  status: string;
}
