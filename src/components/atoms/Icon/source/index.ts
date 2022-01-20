import Circle from "./Circle";
import Grid from "./Grid";
import Leaf from "./Leaf";
import Search from "./Search";

const icons = {
    leaf: Leaf,
    grid: Grid,
    search: Search,
    circle: Circle,
};

export type IconsName = keyof typeof icons;

export default icons;
