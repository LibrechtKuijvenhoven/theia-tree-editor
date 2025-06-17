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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var BaseTreeEditorWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTreeEditorWidget = void 0;
const browser_1 = require("@theia/core/lib/browser");
const common_1 = require("@theia/core/lib/common");
const workspace_service_1 = require("@theia/workspace/lib/browser/workspace-service");
const inversify_1 = require("@theia/core/shared/inversify");
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("@theia/core/shared/react"));
const client_1 = require("react-dom/client");
const detail_form_widget_1 = require("./detail-form-widget");
const master_tree_widget_1 = require("./master-tree-widget");
let BaseTreeEditorWidget = BaseTreeEditorWidget_1 = class BaseTreeEditorWidget extends browser_1.BaseWidget {
    get onDirtyChanged() {
        return this.onDirtyChangedEmitter.event;
    }
    get onContentChanged() {
        return this.onContentChangedEmitter.event;
    }
    constructor(treeWidget, formWidget, workspaceService, logger, widgetId) {
        super();
        this.treeWidget = treeWidget;
        this.formWidget = formWidget;
        this.workspaceService = workspaceService;
        this.logger = logger;
        this.widgetId = widgetId;
        this.dirty = false;
        this.autoSave = 'off';
        this.onDirtyChangedEmitter = new common_1.Emitter();
        this.onContentChangedEmitter = new common_1.Emitter();
        this.id = widgetId;
        this.splitPanel = new browser_1.SplitPanel();
        this.addClass(BaseTreeEditorWidget_1.Styles.EDITOR);
        this.splitPanel.addClass(BaseTreeEditorWidget_1.Styles.SASH);
        this.treeWidget.addClass(BaseTreeEditorWidget_1.Styles.TREE);
        this.formWidget.addClass(BaseTreeEditorWidget_1.Styles.FORM);
        this.formWidget.onChange((0, lodash_1.debounce)(data => {
            if (!this.selectedNode || !this.selectedNode.jsonforms || (0, lodash_1.isEqual)(this.selectedNode.jsonforms.data, data)) {
                return;
            }
            this.handleFormUpdate(data, this.selectedNode);
        }, 250));
        this.toDispose.push(this.treeWidget.onSelectionChange(ev => this.treeSelectionChanged(ev)));
        this.toDispose.push(this.treeWidget.onDelete(node => this.deleteNode(node)));
        this.toDispose.push(this.treeWidget.onAdd(addProp => this.addNode(addProp)));
        this.toDispose.push(this.onDirtyChangedEmitter);
    }
    init() {
        this.configureTitle(this.title);
    }
    get saveable() {
        return this;
    }
    createSnapshot() {
        const state = JSON.stringify(this.instanceData);
        return { value: state };
    }
    applySnapshot(snapshot) {
        this.instanceData = JSON.parse(snapshot.value);
    }
    async revert(options) {
        throw new Error('Method revert needs to be overriden by implementor of BaseTreeEditorWiget');
    }
    onResize(_msg) {
        if (this.splitPanel) {
            this.splitPanel.update();
        }
    }
    renderError(errorMessage) {
        const root = (0, client_1.createRoot)(this.formWidget.node);
        root.render(react_1.default.createElement(react_1.default.Fragment, null, errorMessage));
    }
    treeSelectionChanged(selectedNodes) {
        if (selectedNodes.length === 0) {
            this.selectedNode = undefined;
        }
        else {
            this.selectedNode = selectedNodes[0];
            this.formWidget.setSelection(this.selectedNode);
        }
        this.update();
    }
    /**
     * Sets the dirty state of this editor and notify listeners subscribed to the dirty state.
     *
     * @param dirty true if the editor is dirty
     */
    setDirty(dirty) {
        if (this.dirty !== dirty) {
            this.dirty = dirty;
            this.onDirtyChangedEmitter.fire();
        }
    }
    onAfterAttach(msg) {
        this.splitPanel.addWidget(this.treeWidget);
        this.splitPanel.addWidget(this.formWidget);
        this.splitPanel.setRelativeSizes([1, 4]);
        browser_1.Widget.attach(this.splitPanel, this.node);
        this.treeWidget.activate();
        super.onAfterAttach(msg);
    }
    onActivateRequest() {
        if (this.splitPanel) {
            this.splitPanel.node.focus();
        }
    }
    save() {
        // do nothing by default
    }
};
__decorate([
    (0, inversify_1.postConstruct)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseTreeEditorWidget.prototype, "init", null);
BaseTreeEditorWidget = BaseTreeEditorWidget_1 = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [master_tree_widget_1.MasterTreeWidget,
        detail_form_widget_1.DetailFormWidget,
        workspace_service_1.WorkspaceService, Object, String])
], BaseTreeEditorWidget);
exports.BaseTreeEditorWidget = BaseTreeEditorWidget;
// eslint-disable-next-line no-redeclare
(function (BaseTreeEditorWidget) {
    BaseTreeEditorWidget.WIDGET_LABEL = 'Theia Tree Editor';
    let Styles;
    (function (Styles) {
        Styles.EDITOR = 'theia-tree-editor';
        Styles.TREE = 'theia-tree-editor-tree';
        Styles.FORM = 'theia-tree-editor-form';
        Styles.SASH = 'theia-tree-editor-sash';
    })(Styles = BaseTreeEditorWidget.Styles || (BaseTreeEditorWidget.Styles = {}));
})(BaseTreeEditorWidget = exports.BaseTreeEditorWidget || (exports.BaseTreeEditorWidget = {}));
exports.BaseTreeEditorWidget = BaseTreeEditorWidget;
//# sourceMappingURL=tree-editor-widget.js.map