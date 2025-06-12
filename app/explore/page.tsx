import { NavBar } from "../components";
import ExploreCreators from "./components/ExploreCreators";
const ExplorePage = () => {
  return (
    <div className="flex flex-row gap-15">
      <NavBar />
      <ExploreCreators/>
    </div>
  );
};

export default ExplorePage;
