import { TreeProps } from "react-d3-tree";

export const treeProps = (treeData: any): TreeProps => {
  return {
    data: treeData,
    orientation: "vertical",
    translate: { x: 180, y: 60 },
    pathFunc: "elbow",
    nodeSize: { x: 80, y: 80 },
    separation: { siblings: 1, nonSiblings: 1.5 },
    styles: {
      nodes: {
        node: {
          circle: { fill: "#fff", stroke: "#222", strokeWidth: 2 },
          name: { fontSize: "18px", fill: "#222" },
        },
        leafNode: {
          circle: { fill: "#fff", stroke: "#008000", strokeWidth: 2 },
          name: { fontSize: "18px", fill: "#008000" },
        },
      },
      links: {
        stroke: "#222",
        strokeWidth: 2,
      },
    },
  };
};
