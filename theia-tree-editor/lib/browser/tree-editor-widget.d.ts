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
import { Title } from '@theia/core/shared/@lumino/widgets';
import { BaseWidget, Message, Saveable, SaveableSource, Widget } from '@theia/core/lib/browser';
import { Emitter, Event, ILogger } from '@theia/core/lib/common';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { DetailFormWidget } from './detail-form-widget';
import { TreeEditor } from './interfaces';
import { AddCommandProperty, MasterTreeWidget } from './master-tree-widget';
export declare abstract class BaseTreeEditorWidget extends BaseWidget implements Saveable, SaveableSource {
    protected readonly treeWidget: MasterTreeWidget;
    protected readonly formWidget: DetailFormWidget;
    protected readonly workspaceService: WorkspaceService;
    protected readonly logger: ILogger;
    readonly widgetId: string;
    dirty: boolean;
    autoSave: 'off' | 'afterDelay' | 'onFocusChange' | 'onWindowChange';
    protected autoSaveDelay: number;
    private splitPanel;
    protected readonly onDirtyChangedEmitter: Emitter<void>;
    get onDirtyChanged(): Event<void>;
    protected readonly onContentChangedEmitter: Emitter<void>;
    get onContentChanged(): Event<void>;
    selectedNode: TreeEditor.Node;
    protected instanceData: any;
    constructor(treeWidget: MasterTreeWidget, formWidget: DetailFormWidget, workspaceService: WorkspaceService, logger: ILogger, widgetId: string);
    protected init(): void;
    get saveable(): Saveable;
    createSnapshot(): Saveable.Snapshot;
    applySnapshot(snapshot: {
        value: string;
    }): void;
    revert(options?: Saveable.RevertOptions): Promise<void>;
    protected onResize(_msg: any): void;
    protected renderError(errorMessage: string): void;
    protected treeSelectionChanged(selectedNodes: readonly Readonly<TreeEditor.Node>[]): void;
    /**
     * Sets the dirty state of this editor and notify listeners subscribed to the dirty state.
     *
     * @param dirty true if the editor is dirty
     */
    protected setDirty(dirty: boolean): void;
    /**
     * Delete the given node including its associated data from the tree.
     *
     * @param node The tree node to delete
     */
    protected abstract deleteNode(node: Readonly<TreeEditor.Node>): Promise<void>;
    /**
     * Add a node to the tree.
     * @param node The tree node to add
     * @param type The type of the node's data
     * @param property The property containing the node's data
     */
    protected abstract addNode({ node, type, property }: AddCommandProperty): Promise<void>;
    protected onAfterAttach(msg: Message): void;
    protected onActivateRequest(): void;
    /**
     * Called when the data in the detail was changed.
     * Whether you need to manually apply the change to the tree node's referenced data
     * depends on your implementation of method 'getDataForNode' of your ModelService.
     *
     * @param data The new data for the node
     * @param node The tree node whose data will be updated
     */
    protected abstract handleFormUpdate(data: any, node: TreeEditor.Node): Promise<void>;
    save(): void;
    /**
     * Configure this editor's title tab by configuring the given Title object.
     *
     * @param title The title object configuring this editor's title tab in Theia
     */
    protected abstract configureTitle(title: Title<Widget>): void;
}
export declare namespace BaseTreeEditorWidget {
    const WIDGET_LABEL = "Theia Tree Editor";
    namespace Styles {
        const EDITOR = "theia-tree-editor";
        const TREE = "theia-tree-editor-tree";
        const FORM = "theia-tree-editor-form";
        const SASH = "theia-tree-editor-sash";
    }
}
//# sourceMappingURL=tree-editor-widget.d.ts.map