"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var MasterTreeWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterTreeWidget = exports.TreeContextMenu = void 0;
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
const core_1 = require("@theia/core");
const browser_1 = require("@theia/core/lib/browser");
const context_menu_renderer_1 = require("@theia/core/lib/browser/context-menu-renderer");
const tree_widget_1 = require("@theia/core/lib/browser/tree/tree-widget");
const inversify_1 = require("inversify");
const react_1 = __importDefault(require("react"));
const uuid_1 = require("uuid");
const interfaces_1 = require("./interfaces");
var TreeContextMenu;
(function (TreeContextMenu) {
    TreeContextMenu.CONTEXT_MENU = ['theia-tree-editor-tree-context-menu'];
    TreeContextMenu.ADD_MENU = ['theia-tree-editor-tree-add-menu'];
})(TreeContextMenu = exports.TreeContextMenu || (exports.TreeContextMenu = {}));
let MasterTreeWidget = MasterTreeWidget_1 = class MasterTreeWidget extends tree_widget_1.TreeWidget {
    constructor(props, model, contextMenuRenderer, nodeFactory) {
        super(props, model, contextMenuRenderer);
        this.props = props;
        this.model = model;
        this.contextMenuRenderer = contextMenuRenderer;
        this.nodeFactory = nodeFactory;
        this.onTreeWidgetSelectionEmitter = new core_1.Emitter();
        this.onDeleteEmitter = new core_1.Emitter();
        this.onAddEmitter = new core_1.Emitter();
        this.id = MasterTreeWidget_1.WIDGET_ID;
        this.title.label = MasterTreeWidget_1.WIDGET_LABEL;
        this.title.caption = MasterTreeWidget_1.WIDGET_LABEL;
        model.root = {
            id: MasterTreeWidget_1.WIDGET_ID,
            name: MasterTreeWidget_1.WIDGET_LABEL,
            parent: undefined,
            visible: false,
            children: []
        };
    }
    init() {
        super.init();
        this.toDispose.push(this.onTreeWidgetSelectionEmitter);
        this.toDispose.push(this.onDeleteEmitter);
        this.toDispose.push(this.onAddEmitter);
        this.toDispose.push(this.model.onSelectionChanged(e => {
            this.onTreeWidgetSelectionEmitter.fire(e);
        }));
    }
    /** Overrides method in TreeWidget */
    handleClickEvent(node, event) {
        const x = event.target;
        if (x.classList.contains('node-button')) {
            // Don't do anything because the event is handled in the button's handler
            return;
        }
        super.handleClickEvent(node, event);
    }
    /*
     * Overrides TreeWidget.renderTailDecorations
     * Add a add child and a remove button.
     */
    renderTailDecorations(node, props) {
        const deco = super.renderTailDecorations(node, props);
        if (!interfaces_1.TreeEditor.Node.is(node)) {
            return deco;
        }
        const addPlus = this.nodeFactory.hasCreatableChildren(node);
        // Do not render remove button for root nodes. Root nodes have depth 0.
        const addRemoveButton = props.depth > 0;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            deco,
            react_1.default.createElement("div", { className: "node-buttons" },
                addPlus ? react_1.default.createElement("div", { className: `node-button ${(0, browser_1.codicon)('plus')}`, onClick: this.createAddHandler(node) }) : '',
                addRemoveButton ? (react_1.default.createElement("div", { className: `node-button ${(0, browser_1.codicon)('trash')}`, onClickCapture: this.createRemoveHandler(node) })) : (''))));
    }
    /**
     * Creates a handler for the delete button of a tree node.
     * @param node The tree node to create a remove handler for
     */
    createRemoveHandler(node) {
        return event => {
            event.stopPropagation();
            const dialog = new browser_1.ConfirmDialog({
                title: 'Delete Node?',
                msg: 'Are you sure you want to delete the selected node?'
            });
            dialog.open().then(remove => {
                if (remove && node.parent && node.parent && interfaces_1.TreeEditor.Node.is(node.parent)) {
                    this.onDeleteEmitter.fire(node);
                }
            });
        };
    }
    createAddHandler(node) {
        return event => {
            const addHandler = (property, type) => this.onAddEmitter.fire({ node, property, type });
            const treeAnchor = {
                x: event.nativeEvent.x,
                y: event.nativeEvent.y,
                node: node,
                onClick: addHandler
            };
            const renderOptions = {
                context: event.currentTarget,
                menuPath: TreeContextMenu.ADD_MENU,
                anchor: treeAnchor
            };
            this.contextMenuRenderer.render(renderOptions);
        };
    }
    async setData(data) {
        this.data = data;
        await this.refreshModelChildren();
    }
    selectFirst() {
        if (this.model.root &&
            interfaces_1.TreeEditor.RootNode.is(this.model.root) &&
            this.model.root.children.length > 0 &&
            interfaces_1.TreeEditor.Node.is(this.model.root.children[0])) {
            this.model.selectNode(this.model.root.children[0]);
            this.model.refresh();
        }
    }
    findNode(propIndexPaths) {
        const rootNode = this.model.root;
        return propIndexPaths.reduce((parent, segment) => {
            const fitting = parent.children.filter(n => interfaces_1.TreeEditor.Node.is(n) && n.jsonforms.property === segment.property && n.jsonforms.index === segment.index);
            return fitting[0];
        }, rootNode.children[0]);
    }
    select(paths) {
        if (paths.length === 0) {
            return;
        }
        const rootNode = this.model.root;
        const toSelect = paths.reduceRight((node, path) => node.children.find(value => value.name === path), rootNode);
        this.model.selectNode(toSelect);
        this.model.refresh();
    }
    get onSelectionChange() {
        return this.onTreeWidgetSelectionEmitter.event;
    }
    get onDelete() {
        return this.onDeleteEmitter.event;
    }
    get onAdd() {
        return this.onAddEmitter.event;
    }
    async refreshModelChildren() {
        if (this.model.root && interfaces_1.TreeEditor.RootNode.is(this.model.root)) {
            const newTree = !this.data || this.data.error ? [] : await this.nodeFactory.mapDataToNodes(this.data);
            this.model.root.children = newTree;
            this.model.refresh();
        }
    }
    defaultNode() {
        return {
            id: (0, uuid_1.v4)(),
            expanded: false,
            selected: false,
            parent: undefined,
            decorationData: {},
            children: []
        };
    }
    isExpandable(node) {
        return interfaces_1.TreeEditor.Node.is(node) && node.children.length > 0;
    }
    renderIcon(node) {
        return (react_1.default.createElement("div", { className: "tree-icon-container" },
            react_1.default.createElement("div", { className: this.labelProvider.getIcon(node) })));
    }
    /**
     * Overrides super method because there are no context menus on nodes of the tree editor.
     * Without this, the editor tab flashes when right clicking a tree node
     * because an empty context menu is opened and immediately closed again.
     * This causes unfocus and refocus of the editor tab leading to a 'flash'.
     *
     * Override this in case you need a context menu on nodes or somewhere else in the tree.
     *
     * ---
     *
     * Handle the context menu click event.
     * - The context menu click event is triggered by the right-click.
     * @param node the tree node if available.
     * @param event the right-click mouse event.
     */
    handleContextMenuEvent(node, event) {
        event.stopPropagation();
        event.preventDefault();
    }
    /**
     * Updates the data of the given node with the new data. Refreshes the tree if necessary.
     * Note that this method will only work properly if only data relevant for this node was changed.
     * If data of the subtree was changed, too, please call updateDataForSubtree instead.
     */
    updateDataForNode(node, data) {
        const oldName = this.labelProvider.getName(node);
        Object.assign(node.jsonforms.data, data);
        const newName = this.labelProvider.getName(node);
        if (oldName !== newName) {
            node.name = newName;
            this.model.refresh();
        }
    }
    /**
     * Updates the data of the given node and recreates its whole subtree. Refreshes the tree.
     */
    async updateDataForSubtree(node, data) {
        Object.assign(node.jsonforms.data, data);
        const newNode = await this.nodeFactory.mapData(data);
        node.name = newNode.name;
        node.children = newNode.children;
        this.model.refresh();
    }
    /**
     * Creates new tree nodes for the given data and adds them to the given node.
     *
     * @param node The node to add children to
     * @param data The data array to generate the new tree nodes from
     * @param property The property of the parent data which will contain the new nodes.
     */
    async addChildren(node, data, property) {
        const currentValue = node.jsonforms.data[property];
        let index = 0;
        if (Array.isArray(currentValue)) {
            index = currentValue.length;
        }
        const iterableEntriesWithIndex = data.map((d, i) => ({ d, i }));
        for (const { d, i } of iterableEntriesWithIndex) {
            await this.nodeFactory.mapData(d, node, property, index + i);
        }
        this.updateIndex(node, property);
        this.model.refresh();
    }
    removeChildren(node, indices, property) {
        const toDelete = node.children
            .filter(n => interfaces_1.TreeEditor.Node.is(n) && n.jsonforms.property === property && indices.includes(Number(n.jsonforms.index)))
            .map(n => node.children.indexOf(n));
        toDelete.forEach(i => node.children.splice(i, 1));
        this.updateIndex(node, property);
        this.model.refresh();
    }
    updateIndex(node, property) {
        let realIndex = 0;
        node.children.forEach((n, i) => {
            if (interfaces_1.TreeEditor.Node.is(n) && n.jsonforms.property === property) {
                n.jsonforms.index = realIndex.toString();
                realIndex++;
            }
        });
    }
};
__decorate([
    (0, inversify_1.postConstruct)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MasterTreeWidget.prototype, "init", null);
MasterTreeWidget = MasterTreeWidget_1 = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(tree_widget_1.TreeProps)),
    __param(1, (0, inversify_1.inject)(browser_1.TreeModel)),
    __param(2, (0, inversify_1.inject)(context_menu_renderer_1.ContextMenuRenderer)),
    __param(3, (0, inversify_1.inject)(interfaces_1.TreeEditor.NodeFactory)),
    __metadata("design:paramtypes", [Object, Object, context_menu_renderer_1.ContextMenuRenderer, Object])
], MasterTreeWidget);
exports.MasterTreeWidget = MasterTreeWidget;
// eslint-disable-next-line no-redeclare
(function (MasterTreeWidget) {
    MasterTreeWidget.WIDGET_ID = 'theia-tree-editor-tree';
    MasterTreeWidget.WIDGET_LABEL = 'Theia Tree Editor - Tree';
})(MasterTreeWidget = exports.MasterTreeWidget || (exports.MasterTreeWidget = {}));
exports.MasterTreeWidget = MasterTreeWidget;
//# sourceMappingURL=master-tree-widget.js.map