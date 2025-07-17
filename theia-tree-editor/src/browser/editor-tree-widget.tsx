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
import { inject, injectable } from '@theia/core/shared/inversify';
import { Emitter } from '@theia/core/shared/vscode-languageserver-protocol';
import { TreeEditorNode } from './types';
import * as React from '@theia/core/shared/react';
import { ILogger } from '@theia/core';

@injectable()
export abstract class EditorTreeWidget extends TreeWidget {
    @inject(ILogger)
    protected readonly logger: ILogger;
    protected _data: any;

    private onDataChangeEmitter = new Emitter<void>();
    protected readonly onDataChange = this.onDataChangeEmitter.event;

    private onSelectionChangeEmitter = new Emitter<readonly Readonly<TreeEditorNode>[]>();
    readonly onSelectionChange = this.onSelectionChangeEmitter.event;
    constructor(
        @inject(TreeProps) props: TreeProps,
        @inject(TreeModel) model: TreeModel,
        @inject(ContextMenuRenderer)
        contextMenuRenderer: ContextMenuRenderer
    ) {
        super(props, model, contextMenuRenderer);
        this.toDispose.pushAll([
            this.model.onSelectionChanged(n => {
                this.onSelectionChangeEmitter.fire(n as readonly Readonly<TreeEditorNode>[]);
            })
        ]);
    }
    set data(data: any) {
        this._data = data;
        this.onDataChangeEmitter.fire(this._data);
    }

    updateNodeData(node: TreeEditorNode, data: any): void {
        const currentName = this.labelProvider.getName(node);
        node.data = data;
        const newName = this.labelProvider.getName(node);
        // if the node doesnt look different then it doesnt need to be refreshed
        if (currentName === newName) {
            return;
        }
        this.model.refresh();
    }
    protected override renderIcon(node: TreeNode, props: NodeProps): React.ReactNode {
        const icon = this.toNodeIcon(node);
        return icon ? <div className={icon + ' default-file-icon file-icon'}></div> : undefined;
    }
}
