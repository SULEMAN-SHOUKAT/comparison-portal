import { useQuery } from "@tanstack/react-query";
import comparisonPorService, {
  ConfigQueryResponse,
  ConfigsQuery,
} from "../services/comparisonPortal";

const shouldMakeQuery = (query: ConfigsQuery) =>
  !!query.page && !!query.pageSize;

const useConfigs = (query: ConfigsQuery) =>
  useQuery<ConfigQueryResponse | null>({
    queryKey: [
      "configsQuery",
      { page: query?.page, pageSize: query?.pageSize },
    ],
    queryFn: () => comparisonPorService.getAllConfigs(query),
    enabled: shouldMakeQuery(query),
  });

export default useConfigs;
