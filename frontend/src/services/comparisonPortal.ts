import axios from "axios";

const BASE_URL = `${window.CONFIG.api.comparisonPortal}/configuration`;

export type Company = {
  name: string;
  websiteUrl: string;
};

export type Question = string;

export type DataSource = string;

export type Configuration = {
  _id?: string;
  companies: Company[];
  questions: Question[];
  dataSources: DataSource[];
};

export type ConfigsQuery = {
  page: number;
  pageSize: number;
};
export type ConfigQueryResponse = {
  data: Configuration[];
  totalDocuments: number;
  totalPages: number;
};
const getAllConfigs = async (query: ConfigsQuery) => {
  try {
    const response = await axios.get<ConfigQueryResponse>(BASE_URL, {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching configurations", error);
    return null;
  }
};

const addNewConfig = async (configuration: Configuration) => {
  try {
    const response = await axios.post<Configuration>(BASE_URL, configuration);
    return response.data;
  } catch (error) {
    console.error("Error adding new  configuration", error);
    return null;
  }
};

export default { getAllConfigs, addNewConfig };
