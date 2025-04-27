import { useMemo, useState, useEffect, ChangeEvent, FormEvent } from "react";
import Tree from "react-d3-tree";
import { treeProps } from "../helpers/config";

interface TreeNode {
  name: string;
  children: TreeNode[];
}

function parentArrayToTreeData(parent: number[]): TreeNode[] {
  const n = parent.length;
  const nodes = Array.from({ length: n }, (_, i) => ({
    name: String(i),
    children: [] as TreeNode[],
  }));
  let root = null;
  for (let i = 0; i < n; i++) {
    if (parent[i] === -1) {
      root = nodes[i];
    } else if (parent[i] >= 0 && parent[i] < n) {
      nodes[parent[i]].children.push(nodes[i]);
    } else {
      console.warn(`Invalid parent index: ${parent[i]} for node ${i}`);
    }
  }
  return root ? [root] : [];
}

function getTreeHeightAndLeafCount(parent: number[]): {
  height: number;
  leaves: number;
} {
  const n = parent.length;

  const children: number[][] = Array.from({ length: n }, () => []);
  let root = -1;
  for (let i = 0; i < n; i++) {
    if (parent[i] === -1) {
      root = i;
    } else {
      children[parent[i]].push(i);
    }
  }

  function recursiveTreeStats(node: number): {
    height: number;
    leaves: number;
  } {
    if (children[node].length === 0) {
      return { height: 0, leaves: 1 };
    }
    let maxHeight = 0;
    let leafCount = 0;
    for (const child of children[node]) {
      const { height, leaves } = recursiveTreeStats(child);
      if (height > maxHeight) maxHeight = height;
      leafCount += leaves;
    }
    return { height: maxHeight + 1, leaves: leafCount };
  }

  if (root === -1) {
    return { height: 0, leaves: 0 };
  }

  const result = recursiveTreeStats(root);
  return result;
}

const TreeStructure = () => {
  const defaultParent = [5, 2, 5, 2, 1, -1, 5, 0];
  const [parent, setParent] = useState<number[]>(defaultParent);
  const [parentInput, setParentInput] = useState<string>(
    defaultParent.join(" ")
  );
  const [treeStats, setTreeStats] = useState<{
    height: number;
    leaves: number;
  }>({ height: 0, leaves: 0 });
  const [error, setError] = useState<string>("");

  const treeData = useMemo(() => parentArrayToTreeData(parent), [parent]);

  useEffect(() => {
    const stats = getTreeHeightAndLeafCount(parent);
    console.log("treeHeight:", stats.height);
    console.log("leafCount:", stats.leaves);
    setTreeStats(stats);
  }, [parent]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParentInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!parentInput.includes(" ") && parentInput.length > 1) {
        setError("Please add spaces between numbers in your input.");
        return;
      }

      const newParent = parentInput.trim().split(/\s+/).map(Number);

      if (newParent.some(isNaN)) {
        setError("Invalid input. Please enter valid numbers.");
        return;
      }

      if (newParent.some((num) => num >= 10 && num !== -1)) {
        setError("Please enter numbers less than 10 (except -1 for root).");
        return;
      }

      setError("");
      setParent(newParent);
    } catch {
      setError("Error parsing input. Please check your format.");
    }
  };

  return (
    <div className="tree-container">
      <h2>Tree Visualization </h2>

      <div className="parent-input-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="parentInput">Enter Array</label>
            <div className="input-with-button">
              <input
                type="text"
                id="parentInput"
                className="form-control"
                value={parentInput}
                onChange={handleInputChange}
                placeholder="e.g., 5 2 5 2 1 -1 5 0 (use spaces between numbers)"
              />
              <button type="submit" className="btn btn-primary">
                Update Tree
              </button>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="input-help">Enter numbers separated by spaces</div>
          </div>
        </form>
      </div>

      <div className="tree-stats">
        <p>
          <strong>Array:</strong> [{parent.join(", ")}]
        </p>
        <p>
          <strong>Tree Height:</strong> {treeStats.height}
        </p>
        <p>
          <strong>Leaf Count:</strong> {treeStats.leaves}
        </p>
      </div>

      <div className="tree-visualization">
        <Tree {...treeProps(treeData)} />
      </div>
    </div>
  );
};

export default TreeStructure;
