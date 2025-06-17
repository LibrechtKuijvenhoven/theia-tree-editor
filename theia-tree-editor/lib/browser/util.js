"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAddCommandDescriptions = exports.createBasicTreeContainer = exports.TREE_PROPS = void 0;
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
const tree_1 = require("@theia/core/lib/browser/tree");
const detail_form_widget_1 = require("./detail-form-widget");
const interfaces_1 = require("./interfaces");
const master_tree_widget_1 = require("./master-tree-widget");
exports.TREE_PROPS = Object.assign(Object.assign({}, tree_1.defaultTreeProps), { contextMenuPath: master_tree_widget_1.TreeContextMenu.CONTEXT_MENU, multiSelect: false, search: false });
function createTreeWidget(parent) {
    // eslint-disable-next-line import/no-deprecated
    const treeContainer = (0, tree_1.createTreeContainer)(parent);
    treeContainer.unbind(tree_1.TreeWidget);
    treeContainer.bind(master_tree_widget_1.MasterTreeWidget).toSelf();
    treeContainer.rebind(tree_1.TreeProps).toConstantValue(exports.TREE_PROPS);
    return treeContainer.get(master_tree_widget_1.MasterTreeWidget);
}
/**
 * Creates a new inversify container to create tree editor widgets using the given customizations.
 * If further services are needed than the given ones, these must either be bound in the parent container
 * or to the returned container before a tree editor widget is requested.
 *
 * Note that this method does not create a singletion tree editor but returns a new instance whenever an instace is requested.
 *
 * @param parent The parent inversify container
 * @param treeEditorWidget The concrete tree editor widget to create
 * @param modelService The tree editor's model service
 * @param nodeFactory The tree editor's node factory
 */
function createBasicTreeContainer(parent, treeEditorWidget, modelService, nodeFactory) {
    const container = parent.createChild();
    container.bind(interfaces_1.TreeEditor.ModelService).to(modelService);
    container.bind(interfaces_1.TreeEditor.NodeFactory).to(nodeFactory);
    container.bind(detail_form_widget_1.DetailFormWidget).toSelf();
    container.bind(master_tree_widget_1.MasterTreeWidget).toDynamicValue(context => createTreeWidget(context.container));
    container.bind(treeEditorWidget).toSelf();
    return container;
}
exports.createBasicTreeContainer = createBasicTreeContainer;
/**
 * Creates a new map based on the model service's children mapping.
 * The created map maps from command ID to command descriptor.
 * The command descriptor contains information about the parent type, the type of the new node and the container property.
 *
 * Basically, this creates add commands for all types that can be created in properties, grouped by command id.
 *
 * @param modelService The tree editor's model service
 */
function generateAddCommandDescriptions(modelService) {
    // Create a command for every type that can be added to a node
    const commandMap = new Map();
    Array.from(modelService.getChildrenMapping()).forEach(([parentType, value]) => {
        // get all creatable types for the parent node
        const creatableTypes = value
            // get flat array of child descriptors
            .reduce((acc, val) => acc.concat(val), [])
            // unify by adding to set
            .reduce((acc, val) => acc.add(val), new Set());
        Array.from(creatableTypes).forEach(desc => {
            desc.children.forEach(type => {
                const name = modelService.getNameForType(type);
                const commandId = `json-forms-tree.add.${parentType}.${desc.property}.${name}`;
                const command = {
                    id: commandId,
                    label: name
                };
                commandMap.set(commandId, { parentType, property: desc.property, type, command });
            });
        });
    });
    return commandMap;
}
exports.generateAddCommandDescriptions = generateAddCommandDescriptions;
//# sourceMappingURL=util.js.map