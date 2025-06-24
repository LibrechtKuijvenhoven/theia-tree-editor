/// <reference types="react" />
import { Emitter } from '@theia/core/lib/common';
import { ReactWidget } from '@theia/core/lib/browser';
import * as React from '@theia/core/shared/react';
import { TreeEditorNode } from './tree-editor';
export type matchNode = (node: Readonly<TreeEditorNode>) => boolean;
export type renderFunc = () => React.ReactNode;
export declare abstract class EditorDataWidget extends ReactWidget {
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