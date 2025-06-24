import { ContextMenuRenderer, TreeModel, TreeProps, TreeWidget } from '@theia/core/lib/browser';
import { TreeEditorNode } from './tree-editor';
export declare abstract class EditorTreeWidget extends TreeWidget {
    protected _data: any;
    private onDataChangeEmitter;
    protected readonly onDataChange: import("vscode-jsonrpc/lib/common/events").Event<void>;
    private onSelectionChangeEmitter;
    readonly onSelectionChange: import("vscode-jsonrpc/lib/common/events").Event<readonly Readonly<TreeEditorNode>[]>;
    constructor(props: TreeProps, model: TreeModel, contextMenuRenderer: ContextMenuRenderer, id: string);
    set data(data: any);
    updateNodeData(node: TreeEditorNode, data: any): void;
}
//# sourceMappingURL=editor-tree-widget.d.ts.map