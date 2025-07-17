/// <reference types="react" />
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
import { ContextMenuRenderer, NodeProps, TreeModel, TreeNode, TreeProps, TreeWidget } from '@theia/core/lib/browser';
import { TreeEditorNode } from './types';
import * as React from '@theia/core/shared/react';
import { ILogger } from '@theia/core';
export declare abstract class EditorTreeWidget extends TreeWidget {
    protected readonly logger: ILogger;
    protected _data: any;
    private onDataChangeEmitter;
    protected readonly onDataChange: import("vscode-jsonrpc/lib/common/events").Event<void>;
    private onSelectionChangeEmitter;
    readonly onSelectionChange: import("vscode-jsonrpc/lib/common/events").Event<readonly Readonly<TreeEditorNode>[]>;
    constructor(props: TreeProps, model: TreeModel, contextMenuRenderer: ContextMenuRenderer);
    set data(data: any);
    updateNodeData(node: TreeEditorNode, data: any): void;
    protected renderIcon(node: TreeNode, props: NodeProps): React.ReactNode;
}
//# sourceMappingURL=editor-tree-widget.d.ts.map