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
import { Emitter, ILogger } from '@theia/core/lib/common';
import { ReactWidget } from '@theia/core/lib/browser';
import * as React from '@theia/core/shared/react';
import { TreeEditorNode } from './types';
export type matchNode = (node: Readonly<TreeEditorNode>) => boolean;
export type renderFunc = () => React.ReactNode;
export interface DataTester<T extends TreeEditorNode> {
    test: (node: Readonly<TreeEditorNode>) => node is T;
    render: (node?: T) => React.ReactNode;
}
export declare abstract class EditorDataWidget extends ReactWidget {
    protected readonly logger: ILogger;
    protected selectedNode: Readonly<TreeEditorNode>;
    updateTreeSelection(selectedNode: Readonly<TreeEditorNode>): void;
    protected onDataChangeEmitter: Emitter<any>;
    readonly onDataChange: import("@theia/core/lib/common").Event<any>;
    /**
     * Map containing all the different views that the data widget
     * can render based on the selected node
     *
     * @prop matchNode: callback function that tests if this view should be rendered
     * @prop renderFunc: function to render the actual view
     *
     */
    protected abstract views: Map<matchNode, renderFunc>;
    protected render(): React.ReactNode;
    renderEmptyView(): React.ReactNode;
}
//# sourceMappingURL=editor-data-widget.d.ts.map