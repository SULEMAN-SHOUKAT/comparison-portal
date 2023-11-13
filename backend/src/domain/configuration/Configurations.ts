import { ObjectId } from "mongoose";

export type Company = {
  name: string;
  websiteUrl: string;
};

export type Question = string;

export type DataSource = string;

export type IPConfigurationPayload = {
  companies: Company[];
  questions: Question[];
  dataSources: DataSource[];
};

export type IPConfiguration = {
  _id: ObjectId;
  companies: Company[];
  questions: Question[];
  dataSources: DataSource[];
};

class Configuration implements IPConfiguration {
  _id: ObjectId;
  companies: Company[] = [];
  questions: Question[] = [];
  dataSources: DataSource[] = [];

  constructor(configuration: IPConfiguration) {
    this._id = configuration._id;
    this.companies = configuration.companies;
    this.questions = configuration.questions;
    this.dataSources = configuration.dataSources;
  }

  public getCompanies() {
    return this.companies;
  }

  public getQuestions() {
    return this.questions;
  }

  public getDataSources() {
    return this.dataSources;
  }

  public get() {
    return {
      _id: this._id,
      companies: this.companies,
      dataSources: this.dataSources,
      questions: this.questions,
    };
  }
}

export default Configuration;
