"use strict";
/********************************************************************************
 * Copyright (c) 2024 Librecht Kuijvenhoven.
 * Copyright (c) 2019-2020 EclipseSource and others (original inspiration).
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0, or the MIT License which is
 * available at https://opensource.org/licenses/MIT.
 *
 * This component is a derivative work inspired by the 'DetailFormWidget'
 * from [Original Project Name or link to its repo, e.g., 'https://github.com/EclipseSource/theia-tree-editor-example'].
 *
 * SPDX-License-Identifier: EPL-2.0 OR MIT
 *******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeEditorNode = void 0;
const browser_1 = require("@theia/core/lib/browser");
var TreeEditorNode;
(function (TreeEditorNode) {
    function isRoot(node) {
        return browser_1.CompositeTreeNode.is(node);
    }
    TreeEditorNode.isRoot = isRoot;
    function isNode(node) {
        return browser_1.CompositeTreeNode.is(node) && browser_1.SelectableTreeNode.is(node) && isLeaf(node);
    }
    TreeEditorNode.isNode = isNode;
    function isLeaf(node) {
        return browser_1.SelectableTreeNode.is(node) && browser_1.DecoratedTreeNode.is(node) && 'data' in node;
    }
    TreeEditorNode.isLeaf = isLeaf;
})(TreeEditorNode = exports.TreeEditorNode || (exports.TreeEditorNode = {}));
//# sourceMappingURL=types.js.map