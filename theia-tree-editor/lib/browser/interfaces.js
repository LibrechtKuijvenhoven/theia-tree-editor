"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeEditor = void 0;
const tree_1 = require("@theia/core/lib/browser/tree");
var TreeEditor;
(function (TreeEditor) {
    let RootNode;
    (function (RootNode) {
        function is(node) {
            return !!node;
        }
        RootNode.is = is;
    })(RootNode = TreeEditor.RootNode || (TreeEditor.RootNode = {}));
    let Node;
    (function (Node) {
        function is(node) {
            return tree_1.TreeNode.is(node) && 'jsonforms' in node && !!node['jsonforms'];
        }
        Node.is = is;
        function hasType(node, type) {
            return is(node) && node.jsonforms.type === type;
        }
        Node.hasType = hasType;
    })(Node = TreeEditor.Node || (TreeEditor.Node = {}));
    TreeEditor.ModelService = Symbol('JsonFormsModelService');
    /**
     * Encapsulates logic to create the tree nodes from the tree's input data.
     */
    TreeEditor.NodeFactory = Symbol('NodeFactory');
    let CommandIconInfo;
    (function (CommandIconInfo) {
        function is(info) {
            return !!info && '_id' in info && 'theia-tree-editor-command-icon-info' === info['_id'];
        }
        CommandIconInfo.is = is;
    })(CommandIconInfo = TreeEditor.CommandIconInfo || (TreeEditor.CommandIconInfo = {}));
})(TreeEditor = exports.TreeEditor || (exports.TreeEditor = {}));
//# sourceMappingURL=interfaces.js.map