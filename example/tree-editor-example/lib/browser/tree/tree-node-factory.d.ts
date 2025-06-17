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
import { TreeEditor } from '@eclipse-emfcloud/theia-tree-editor';
import { ILogger } from '@theia/core';
import { TreeLabelProvider } from './tree-label-provider';
export declare class TreeNodeFactory implements TreeEditor.NodeFactory {
    private readonly labelProvider;
    private readonly logger;
    constructor(labelProvider: TreeLabelProvider, logger: ILogger);
    mapDataToNodes(treeData: TreeEditor.TreeData): TreeEditor.Node[];
    mapData(data: any, parent?: TreeEditor.Node, property?: string, indexOrKey?: number | string): TreeEditor.Node;
    hasCreatableChildren(node: TreeEditor.Node): boolean;
    protected defaultNode(): Omit<TreeEditor.Node, 'editorId'>;
    /** Derives the type id from the given data. */
    protected getTypeId(data: any): string;
}
//# sourceMappingURL=tree-node-factory.d.ts.map