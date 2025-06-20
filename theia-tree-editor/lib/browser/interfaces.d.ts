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
import { JsonSchema, UISchemaElement } from '@jsonforms/core';
import { Command, MaybePromise } from '@theia/core';
import { CompositeTreeNode, DecoratedTreeNode, ExpandableTreeNode, SelectableTreeNode, TreeNode } from '@theia/core/lib/browser/tree';
export declare namespace TreeEditor {
    type RootNode = CompositeTreeNode;
    namespace RootNode {
        function is(node: TreeNode | undefined): node is RootNode;
    }
    interface Node extends CompositeTreeNode, ExpandableTreeNode, SelectableTreeNode, DecoratedTreeNode {
        editorId: string;
        children: TreeNode[];
        name: string;
        jsonforms: {
            type: string;
            property: string;
            index?: string;
            data: any;
        };
    }
    interface TreeData {
        error: boolean;
        data?: any;
    }
    namespace Node {
        function is(node: object | undefined): node is Node;
        function hasType(node: TreeNode | undefined, type: string): node is Node;
    }
    /**
     * Descriptor stating creatable child types for one property in the corresponding parent data.
     */
    interface ChildrenDescriptor {
        property: string;
        children: string[];
    }
    const ModelService: unique symbol;
    interface ModelService {
        /**
         * Returns the data associated with the given node.
         * This is the data which is usually rendered by the editor's detail view when its node is selected.
         *
         * @param node The tree node
         * @returns The data associated with the node
         */
        getDataForNode(node: Node): MaybePromise<any>;
        /**
         * Returns the JsonSchema describing how the node's data should be rendered.
         * Alternatively, return undefined to generate a schema in the detail view.
         * @param node The tree node
         * @returns the JsonSchema describing the node's data or undefined to generate a schema.
         */
        getSchemaForNode(node: Node): MaybePromise<JsonSchema | undefined>;
        /**
         * Returns the ui schema describing how the node's data should be rendered.
         * Might return undefined to automatically generate a ui schema in the detail view based on the node's json schema.
         *
         * @param node The tree node
         * @returns The ui schema for the node's data or undefined to generate a ui schema.
         */
        getUiSchemaForNode(node: Node): MaybePromise<UISchemaElement | undefined>;
        /**
         * This mapping describes which child nodes can be created for a given type.
         * Thereby, the map's keys are the types and the values the children descriptors.
         * There is one children descriptor for every property that can contain children.
         */
        getChildrenMapping(): Map<string, ChildrenDescriptor[]>;
        /**
         * Returns the name of the given type. This could also be the type itself if it is already properly readable by a user.
         * @param type The type to calculate the name for
         */
        getNameForType(type: string): string;
    }
    /**
     * Encapsulates logic to create the tree nodes from the tree's input data.
     */
    const NodeFactory: unique symbol;
    interface NodeFactory {
        /**
         * Recursively creates the tree's nodes from the given data.
         *
         * @param treeData The tree's data
         * @returns The tree's shown root nodes (not to confuse with the invisible RootNode)
         */
        mapDataToNodes(treeData: TreeData): MaybePromise<Node[]>;
        /**
         * Creates the corresponding TreeNode for the given data.
         *
         * @param data The instance data to map to a tree node
         * @param parent The created node's parent node
         * @param property The JSON property which this node's data is contained in
         * @param indexOrKey If the data is inserted in an array property, this is the index it is inserted at.
         *           If the data is inserted into an object, this is the key the data is associated with.
         */
        mapData(data: any, parent?: Node, property?: string, indexOrKey?: number | string): MaybePromise<Node>;
        /**
         * @param node The node to create a child for
         * @returns true if child nodes can be created
         */
        hasCreatableChildren(node: Node): boolean;
    }
    interface AddCommandDescription {
        parentType: string;
        property: string;
        type: string;
        command: Command;
    }
    /**
     * Information to get the icon of an add command from an editor's label provider contribution.
     */
    interface CommandIconInfo {
        _id: 'theia-tree-editor-command-icon-info';
        editorId: string;
        type: string;
    }
    namespace CommandIconInfo {
        function is(info: object | undefined): info is CommandIconInfo;
    }
}
//# sourceMappingURL=interfaces.d.ts.map