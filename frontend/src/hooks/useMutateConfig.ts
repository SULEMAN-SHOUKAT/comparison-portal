import { useQueryClient, useMutation } from "@tanstack/react-query";
import comparisonPortalService, {
  Configuration,
} from "../services/comparisonPortal";

const useMutateConfig = () => {
  const queryClient = useQueryClient();

  const createConfig = useMutation({
    mutationFn: (configuration: Configuration) =>
      comparisonPortalService.addNewConfig(configuration),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["configsQuery"] });
    },
  });

  const editConfig = useMutation({
    mutationFn: (configuration: Configuration) =>
      comparisonPortalService.editConfig(configuration),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["configsQuery"] });
    },
  });

  const deleteConfig = useMutation({
    mutationFn: (_id: string) => comparisonPortalService.deleteConfig(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["configsQuery"] });
    },
  });

  return {
    createConfig,
    editConfig,
    deleteConfig,
  };
};

export default useMutateConfig;
