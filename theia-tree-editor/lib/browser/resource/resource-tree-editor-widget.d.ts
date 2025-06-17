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
import { Saveable } from '@theia/core/lib/browser';
import { DefaultResourceProvider, ILogger, Resource } from '@theia/core/lib/common';
import { EditorPreferences } from '@theia/editor/lib/browser';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { DetailFormWidget } from '../detail-form-widget';
import { TreeEditor } from '../interfaces';
import { AddCommandProperty, MasterTreeWidget } from '../master-tree-widget';
import { NavigatableTreeEditorOptions, NavigatableTreeEditorWidget } from '../navigatable-tree-editor-widget';
export declare abstract class ResourceTreeEditorWidget extends NavigatableTreeEditorWidget {
    protected readonly treeWidget: MasterTreeWidget;
    protected readonly formWidget: DetailFormWidget;
    protected readonly workspaceService: WorkspaceService;
    protected readonly logger: ILogger;
    readonly widget_id: string;
    protected readonly options: NavigatableTreeEditorOptions;
    protected readonly provider: DefaultResourceProvider;
    protected readonly nodeFactory: TreeEditor.NodeFactory;
    protected readonly editorPreferences: EditorPreferences;
    protected resource: Resource;
    constructor(treeWidget: MasterTreeWidget, formWidget: DetailFormWidget, workspaceService: WorkspaceService, logger: ILogger, widget_id: string, options: NavigatableTreeEditorOptions, provider: DefaultResourceProvider, nodeFactory: TreeEditor.NodeFactory, editorPreferences: EditorPreferences);
    protected init(): void;
    revert(options?: Saveable.RevertOptions): Promise<void>;
    applySnapshot(snapshot: {
        value: string;
    }): void;
    /**
     * @return the property that contains data objects' type identifier.
     */
    protected abstract getTypeProperty(): string;
    save(): void;
    protected load(): Promise<void>;
    protected setTreeData(error: boolean): Promise<void>;
    protected deleteNode(node: Readonly<TreeEditor.Node>): Promise<void>;
    protected addNode({ node, type, property }: AddCommandProperty): Promise<void>;
    protected handleFormUpdate(data: any, node: TreeEditor.Node): Promise<void>;
    /**
     * Called when a change occurred. Handle based on the autoSave flag.
     */
    protected handleChanged(): void;
    /**
     * Triggers a delayed save
     */
    protected saveDelayed(): void;
}
//# sourceMappingURL=resource-tree-editor-widget.d.ts.map