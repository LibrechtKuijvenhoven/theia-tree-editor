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
import { BaseWidget, Message, Saveable, SaveableSource, SplitPanel, ViewContainer } from '@theia/core/lib/browser';
import { Emitter, ILogger } from '@theia/core/lib/common';
import { EditorDataWidget } from './editor-data-widget';
import { EditorTreeWidget } from './editor-tree-widget';
import { TreeEditorNode } from './types';
import '../../styles/editor.css';
export declare abstract class SplitTreeEditor extends BaseWidget implements Saveable, SaveableSource {
    protected readonly treeWidget: EditorTreeWidget;
    protected readonly dataWidget: EditorDataWidget;
    protected readonly treeWidgetContainerFactory: ViewContainer.Factory;
    protected readonly logger: ILogger;
    readonly widgetId: string;
    private panel;
    protected selectedNode: TreeEditorNode | undefined;
    protected data: any;
    protected treeWidgetOptions: ViewContainer.Factory.WidgetOptions;
    protected abstract treeHeaderTitle: string;
    dirty: boolean;
    protected readonly onDirtyChangedEmitter: Emitter<void>;
    readonly onDirtyChanged: import("@theia/core/lib/common").Event<void>;
    protected readonly onContentChangedEmitter: Emitter<void>;
    readonly onContentChanged: import("@theia/core/lib/common").Event<void>;
    constructor(treeWidget: EditorTreeWidget, dataWidget: EditorDataWidget, treeWidgetContainerFactory: ViewContainer.Factory, logger: ILogger, widgetId: string);
    protected instantiateSplitPanel(): SplitPanel;
    protected onAfterAttach(msg: Message): void;
    protected abstract onDataWidgetChange(data: any, node: TreeEditorNode): void;
    get saveable(): Saveable;
    save(): void;
}
//# sourceMappingURL=tree-editor.d.ts.map