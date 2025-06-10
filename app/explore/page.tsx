import { DashboardProfile, NavBar } from "../components";
import ExploreCreators from "./components/ExploreCreators";
const ExplorePage = () => {
  return (
    <div className="flex flex-row">
      <NavBar />
      <ExploreCreators/>
    </div>
  );
};

export default ExplorePage;
