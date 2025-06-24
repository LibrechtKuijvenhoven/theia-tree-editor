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
import { BaseWidget, Message, Saveable, SaveableSource, SplitPanel, Widget } from '@theia/core/lib/browser';
import { Emitter } from '@theia/core/lib/common';
import { injectable } from '@theia/core/shared/inversify';
import { isEqual, debounce } from 'lodash';
import { EditorDataWidget } from './editor-data-widget';
import { EditorTreeWidget } from './editor-tree-widget';
import { TreeEditorNode } from './types';

import '../../styles/editor.css';

const TreeEditorClass = 'split-tree-editor';
const TreeEditorPanelClass = 'split-tree-editor-panel';
const TreeEditorTreeClass = 'split-tree-editor-tree';
const TreeEditorDataClass = 'split-tree-editor-data';

@injectable()
export abstract class SplitTreeEditor extends BaseWidget implements Saveable, SaveableSource {
    private panel: SplitPanel;
    protected selectedNode: TreeEditorNode | undefined;
    protected data: any;

    public dirty = false;
    protected readonly onDirtyChangedEmitter = new Emitter<void>();
    readonly onDirtyChanged = this.onDirtyChangedEmitter.event;
    protected readonly onContentChangedEmitter = new Emitter<void>();
    readonly onContentChanged = this.onDirtyChangedEmitter.event;

    constructor(
        protected readonly treeWidget: EditorTreeWidget,
        protected readonly dataWidget: EditorDataWidget,
        readonly widgetId: string
    ) {
        super();
        this.id = widgetId;
        this.addClass(TreeEditorClass);
        this.treeWidget.addClass(TreeEditorTreeClass);
        this.dataWidget.addClass(TreeEditorDataClass);
        this.toDispose.pushAll([
            this.treeWidget.onSelectionChange(n => {
                this.selectedNode = n[0];
                if (this.selectedNode) {
                    this.dataWidget.updateTreeSelection(this.selectedNode);
                }
                this.update();
            }),
            this.dataWidget.onDataChange(
                debounce(data => {
                    if (!this.selectedNode || isEqual(data, this.selectedNode.data)) {
                        return;
                    }
                    this.onDataWidgetChange(data, this.selectedNode);
                }),
                250
            )
        ]);
        this.panel = this.instantiateSplitPanel();
    }
    protected instantiateSplitPanel(): SplitPanel {
        const panel = new SplitPanel();
        panel.addClass(TreeEditorPanelClass);
        panel.addWidget(this.treeWidget);
        panel.addWidget(this.dataWidget);
        panel.setRelativeSizes([2, 5]);
        return panel;
    }

    protected onAfterAttach(msg: Message): void {
        this.treeWidget.activate();
        Widget.attach(this.panel, this.node);
        super.onAfterAttach(msg);
    }
    protected abstract onDataWidgetChange(data: any, node: TreeEditorNode): void;
    get saveable(): Saveable {
        return this;
    }
    public save(): void {
        // do nothing by default
    }
}
