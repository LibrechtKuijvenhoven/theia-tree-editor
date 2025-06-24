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

import { CompositeTreeNode, ExpandableTreeNode, SelectableTreeNode, DecoratedTreeNode } from '@theia/core/lib/browser';

export type TreeEditorNode = EditorTreeLeaf | EditorTreeNode;

export interface EditorTreeNode extends CompositeTreeNode, ExpandableTreeNode, EditorTreeLeaf {}
export interface EditorTreeLeaf extends SelectableTreeNode, DecoratedTreeNode {
    data: any;
}
export namespace TreeEditorNode {
    export type Root = CompositeTreeNode;
    export function isRoot(node: unknown): node is Root {
        return CompositeTreeNode.is(node);
    }
    export function isNode(node: unknown): node is EditorTreeNode {
        return CompositeTreeNode.is(node) && SelectableTreeNode.is(node) && isLeaf(node);
    }
    export function isLeaf(node: unknown): node is EditorTreeLeaf {
        return SelectableTreeNode.is(node) && DecoratedTreeNode.is(node) && 'data' in node;
    }
}
