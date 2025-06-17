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
import { TreeProps } from '@theia/core/lib/browser/tree';
import { interfaces } from 'inversify';
import { TreeEditor } from './interfaces';
import { BaseTreeEditorWidget } from './tree-editor-widget';
export declare const TREE_PROPS: TreeProps;
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
export declare function createBasicTreeContainer(parent: interfaces.Container, treeEditorWidget: interfaces.Newable<BaseTreeEditorWidget>, modelService: interfaces.Newable<TreeEditor.ModelService>, nodeFactory: interfaces.Newable<TreeEditor.NodeFactory>): interfaces.Container;
/**
 * Creates a new map based on the model service's children mapping.
 * The created map maps from command ID to command descriptor.
 * The command descriptor contains information about the parent type, the type of the new node and the container property.
 *
 * Basically, this creates add commands for all types that can be created in properties, grouped by command id.
 *
 * @param modelService The tree editor's model service
 */
export declare function generateAddCommandDescriptions(modelService: TreeEditor.ModelService): Map<string, TreeEditor.AddCommandDescription>;
//# sourceMappingURL=util.d.ts.map