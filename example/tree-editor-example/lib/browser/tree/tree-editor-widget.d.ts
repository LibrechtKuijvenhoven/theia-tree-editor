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
import { DetailFormWidget, MasterTreeWidget, NavigatableTreeEditorOptions, ResourceTreeEditorWidget, TreeEditor } from '@eclipse-emfcloud/theia-tree-editor';
import { Title, Widget } from '@theia/core/lib/browser';
import { DefaultResourceProvider, ILogger } from '@theia/core/lib/common';
import { EditorPreferences } from '@theia/editor/lib/browser';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
export declare class TreeEditorWidget extends ResourceTreeEditorWidget {
    readonly treeWidget: MasterTreeWidget;
    readonly formWidget: DetailFormWidget;
    readonly workspaceService: WorkspaceService;
    readonly logger: ILogger;
    protected readonly options: NavigatableTreeEditorOptions;
    protected provider: DefaultResourceProvider;
    protected readonly nodeFactory: TreeEditor.NodeFactory;
    protected readonly editorPreferences: EditorPreferences;
    constructor(treeWidget: MasterTreeWidget, formWidget: DetailFormWidget, workspaceService: WorkspaceService, logger: ILogger, options: NavigatableTreeEditorOptions, provider: DefaultResourceProvider, nodeFactory: TreeEditor.NodeFactory, editorPreferences: EditorPreferences);
    protected getTypeProperty(): string;
    protected configureTitle(title: Title<Widget>): void;
}
export declare namespace TreeEditorWidget {
    const WIDGET_ID = "tree-editor-example-tree-editor";
    const EDITOR_ID = "tree-editor-example.tree.editor";
}
//# sourceMappingURL=tree-editor-widget.d.ts.map