import { useQueryClient, useMutation } from "@tanstack/react-query";
import comparisonPortalService, {
  Configuration,
} from "../services/comparisonPortal";

const useMutateConfig = () => {
  const queryClient = useQueryClient();

  const mutateConfig = useMutation({
    mutationFn: (configuration: Configuration) =>
      comparisonPortalService.addNewConfig(configuration),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["configsQuery"] });
    },
  });

  return mutateConfig;
};

export default useMutateConfig;
