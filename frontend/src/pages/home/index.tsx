import NavBar from "../../components/NavBar";
import ConfigurationForm from "./Form";
import useConfigs from "../../hooks/useConfigs";

const Home = () => {
  const { data: configs } = useConfigs({ page: 1, pageSize: 10 });
  console.log(configs);
  return (
    <div>
      <NavBar />
      <ConfigurationForm buttonTitle="New" />
    </div>
  );
};

export default Home;
