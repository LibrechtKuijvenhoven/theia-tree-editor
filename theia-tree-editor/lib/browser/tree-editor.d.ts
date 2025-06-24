import { BaseWidget, CompositeTreeNode, DecoratedTreeNode, ExpandableTreeNode, Message, Saveable, SaveableSource, SelectableTreeNode, SplitPanel } from "@theia/core/lib/browser";
import { Emitter } from "@theia/core/lib/common";
import { EditorDataWidget } from "./editor-data-widget";
import { EditorTreeWidget } from "./editor-tree-widget";
import "../../assets/tree-editor.css";
export type TreeEditorNode = TreeLeaf | TreeNode;
export interface TreeNode extends CompositeTreeNode, ExpandableTreeNode, TreeLeaf {
}
export interface TreeLeaf extends SelectableTreeNode, DecoratedTreeNode {
    data: any;
}
export declare namespace TreeEditorNode {
    type Root = CompositeTreeNode;
    function isRoot(node: unknown): node is Root;
    function isNode(node: unknown): node is TreeEditorNode;
    function isLeaf(node: unknown): node is TreeEditorNode;
}
export declare abstract class SplitTreeEditor extends BaseWidget implements Saveable, SaveableSource {
    protected readonly treeWidget: EditorTreeWidget;
    protected readonly dataWidget: EditorDataWidget;
    readonly widgetId: string;
    private panel;
    protected selectedNode: TreeEditorNode | undefined;
    protected data: any;
    dirty: boolean;
    protected readonly onDirtyChangedEmitter: Emitter<void>;
    readonly onDirtyChanged: import("@theia/core/lib/common").Event<void>;
    protected readonly onContentChangedEmitter: Emitter<void>;
    readonly onContentChanged: import("@theia/core/lib/common").Event<void>;
    constructor(treeWidget: EditorTreeWidget, dataWidget: EditorDataWidget, widgetId: string);
    protected instaniateSplitPanel(): SplitPanel;
    protected onAfterAttach(msg: Message): void;
    protected abstract onDataWidgetChange(data: any, node: TreeEditorNode): void;
    get saveable(): Saveable;
    save(): void;
}
//# sourceMappingURL=tree-editor.d.ts.map