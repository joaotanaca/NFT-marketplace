import Grid from "./Grid";
import Leaf from "./Leaf";

const icons = {
    leaf: Leaf,
    grid: Grid,
};

export type IconsName = keyof typeof icons;

export default icons;
