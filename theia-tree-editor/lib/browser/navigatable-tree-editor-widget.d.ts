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
import { ILogger } from '@theia/core';
import { Navigatable, Title, Widget } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { DetailFormWidget } from './detail-form-widget';
import { MasterTreeWidget } from './master-tree-widget';
import { BaseTreeEditorWidget } from './tree-editor-widget';
export declare const NavigatableTreeEditorOptions: unique symbol;
export interface NavigatableTreeEditorOptions {
    uri: URI;
}
export declare abstract class NavigatableTreeEditorWidget extends BaseTreeEditorWidget implements Navigatable {
    protected readonly treeWidget: MasterTreeWidget;
    protected readonly formWidget: DetailFormWidget;
    protected readonly workspaceService: WorkspaceService;
    protected readonly logger: ILogger;
    readonly widget_id: string;
    protected readonly options: NavigatableTreeEditorOptions;
    constructor(treeWidget: MasterTreeWidget, formWidget: DetailFormWidget, workspaceService: WorkspaceService, logger: ILogger, widget_id: string, options: NavigatableTreeEditorOptions);
    /** The uri of the editor's resource. */
    get uri(): URI;
    getResourceUri(): URI | undefined;
    createMoveToUri(resourceUri: URI): URI | undefined;
    protected configureTitle(title: Title<Widget>): void;
}
//# sourceMappingURL=navigatable-tree-editor-widget.d.ts.map