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
import { BaseTreeEditorContribution, TreeEditor } from '@eclipse-emfcloud/theia-tree-editor';
import { ApplicationShell, NavigatableWidgetOptions, OpenerService, WidgetOpenerOptions } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { TreeLabelProvider } from './tree/tree-label-provider';
export declare class TreeContribution extends BaseTreeEditorContribution {
    protected shell: ApplicationShell;
    protected opener: OpenerService;
    constructor(modelService: TreeEditor.ModelService, labelProvider: TreeLabelProvider);
    readonly id = "tree-editor-example-tree-editor";
    readonly label = "Theia Tree Editor - Tree";
    canHandle(uri: URI): number;
    protected createWidgetOptions(uri: URI, options?: WidgetOpenerOptions): NavigatableWidgetOptions;
    protected serializeUri(uri: URI): string;
}
//# sourceMappingURL=tree-contribution.d.ts.map