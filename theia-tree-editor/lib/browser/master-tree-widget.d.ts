/********************************************************************************
 * Copyright (c) 2019-2020 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0, or the MIT License which is
 * available at https://opensource.org/licenses/MIT.
 *
 * SPDX-License-Identifier: EPL-2.0 OR MIT
 *******************************************************************************/
import { Emitter, MenuPath } from '@theia/core';
import { ExpandableTreeNode, TreeModel } from '@theia/core/lib/browser';
import { ContextMenuRenderer } from '@theia/core/lib/browser/context-menu-renderer';
import { TreeNode } from '@theia/core/lib/browser/tree/tree';
import { NodeProps, TreeProps, TreeWidget } from '@theia/core/lib/browser/tree/tree-widget';
import React from 'react';
import { TreeEditor } from './interfaces';
export interface AddCommandProperty {
    /** The node to add a new child to. */
    node: TreeEditor.Node;
    /** The property to add a new child to. */
    property: string;
    /** The type identifier of the new child to create. */
    type: string;
}
export interface TreeAnchor {
    x: number;
    y: number;
    node: TreeEditor.Node;
    onClick: (property: string, type: string) => void;
}
export declare namespace TreeContextMenu {
    const CONTEXT_MENU: MenuPath;
    const ADD_MENU: MenuPath;
}
export declare class MasterTreeWidget extends TreeWidget {
    readonly props: TreeProps;
    readonly model: TreeModel;
    readonly contextMenuRenderer: ContextMenuRenderer;
    protected readonly nodeFactory: TreeEditor.NodeFactory;
    protected onTreeWidgetSelectionEmitter: Emitter<readonly Readonly<TreeEditor.Node>[]>;
    protected onDeleteEmitter: Emitter<Readonly<TreeEditor.Node>>;
    protected onAddEmitter: Emitter<Readonly<AddCommandProperty>>;
    protected data: TreeEditor.TreeData;
    constructor(props: TreeProps, model: TreeModel, contextMenuRenderer: ContextMenuRenderer, nodeFactory: TreeEditor.NodeFactory);
    protected init(): void;
    /** Overrides method in TreeWidget */
    protected handleClickEvent(node: TreeNode | undefined, event: React.MouseEvent<HTMLElement>): void;
    protected renderTailDecorations(node: TreeNode, props: NodeProps): React.ReactNode;
    /**
     * Creates a handler for the delete button of a tree node.
     * @param node The tree node to create a remove handler for
     */
    private createRemoveHandler;
    private createAddHandler;
    setData(data: TreeEditor.TreeData): Promise<void>;
    selectFirst(): void;
    findNode(propIndexPaths: {
        property: string;
        index?: string;
    }[]): TreeEditor.Node;
    select(paths: string[]): void;
    get onSelectionChange(): import('@theia/core').Event<readonly Readonly<TreeEditor.Node>[]>;
    get onDelete(): import('@theia/core').Event<Readonly<TreeEditor.Node>>;
    get onAdd(): import('@theia/core').Event<Readonly<AddCommandProperty>>;
    protected refreshModelChildren(): Promise<void>;
    protected defaultNode(): Pick<TreeEditor.Node, 'id' | 'expanded' | 'selected' | 'parent' | 'decorationData' | 'children'>;
    protected isExpandable(node: TreeNode): node is ExpandableTreeNode;
    protected renderIcon(node: TreeNode): React.ReactNode;
    /**
     * Overrides super method because there are no context menus on nodes of the tree editor.
     * Without this, the editor tab flashes when right clicking a tree node
     * because an empty context menu is opened and immediately closed again.
     * This causes unfocus and refocus of the editor tab leading to a 'flash'.
     *
     * Override this in case you need a context menu on nodes or somewhere else in the tree.
     *
     * ---
     *
     * Handle the context menu click event.
     * - The context menu click event is triggered by the right-click.
     * @param node the tree node if available.
     * @param event the right-click mouse event.
     */
    protected handleContextMenuEvent(node: TreeNode | undefined, event: React.MouseEvent<HTMLElement>): void;
    /**
     * Updates the data of the given node with the new data. Refreshes the tree if necessary.
     * Note that this method will only work properly if only data relevant for this node was changed.
     * If data of the subtree was changed, too, please call updateDataForSubtree instead.
     */
    updateDataForNode(node: TreeEditor.Node, data: any): void;
    /**
     * Updates the data of the given node and recreates its whole subtree. Refreshes the tree.
     */
    updateDataForSubtree(node: TreeEditor.Node, data: any): Promise<void>;
    /**
     * Creates new tree nodes for the given data and adds them to the given node.
     *
     * @param node The node to add children to
     * @param data The data array to generate the new tree nodes from
     * @param property The property of the parent data which will contain the new nodes.
     */
    addChildren(node: TreeEditor.Node, data: any[], property: string): Promise<void>;
    removeChildren(node: TreeEditor.Node, indices: number[], property: string): void;
    private updateIndex;
}
export declare namespace MasterTreeWidget {
    const WIDGET_ID = "theia-tree-editor-tree";
    const WIDGET_LABEL = "Theia Tree Editor - Tree";
}
//# sourceMappingURL=master-tree-widget.d.ts.map