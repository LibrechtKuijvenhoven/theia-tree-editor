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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceTreeEditorWidget = void 0;
const inversify_1 = require("@theia/core/shared/inversify");
const interfaces_1 = require("../interfaces");
const navigatable_tree_editor_widget_1 = require("../navigatable-tree-editor-widget");
class ResourceTreeEditorWidget extends navigatable_tree_editor_widget_1.NavigatableTreeEditorWidget {
    constructor(treeWidget, formWidget, workspaceService, logger, widget_id, options, provider, nodeFactory, editorPreferences) {
        super(treeWidget, formWidget, workspaceService, logger, widget_id, options);
        this.treeWidget = treeWidget;
        this.formWidget = formWidget;
        this.workspaceService = workspaceService;
        this.logger = logger;
        this.widget_id = widget_id;
        this.options = options;
        this.provider = provider;
        this.nodeFactory = nodeFactory;
        this.editorPreferences = editorPreferences;
    }
    init() {
        super.init();
        const uri = this.options.uri;
        this.provider.get(uri).then(resource => {
            this.resource = resource;
            this.load();
        }, _ => console.error(`Could not create ressource for uri ${uri}`));
        this.autoSave = this.editorPreferences['files.autoSave'];
        this.autoSaveDelay = this.editorPreferences['files.autoSaveDelay'];
        this.editorPreferences.onPreferenceChanged(ev => {
            if (ev.preferenceName === 'files.autoSave') {
                this.autoSave = ev.newValue;
            }
            if (ev.preferenceName === 'files.autoSaveDelay') {
                this.autoSaveDelay = ev.newValue;
            }
        });
        this.onDirtyChanged(ev => {
            if (this.autoSave !== 'off' && this.dirty) {
                this.saveDelayed();
            }
        });
    }
    async revert(options) {
        return this.load();
    }
    applySnapshot(snapshot) {
        super.applySnapshot(snapshot);
        this.setTreeData(false);
    }
    save() {
        const content = JSON.stringify(this.instanceData, undefined, 2);
        this.resource.saveContents(content).then(_ => this.setDirty(false), error => console.error(`Resource ${this.uri} could not be saved.`, error));
    }
    async load() {
        let content = undefined;
        let error = false;
        try {
            content = await this.resource.readContents();
        }
        catch (e) {
            console.error(`Loading ${this.resource.uri} failed.`, e);
            error = true;
        }
        const json = JSON.parse(content);
        this.instanceData = json;
        return this.setTreeData(error);
    }
    setTreeData(error) {
        const treeData = {
            error,
            data: this.instanceData
        };
        return this.treeWidget.setData(treeData);
    }
    async deleteNode(node) {
        if (node.parent && interfaces_1.TreeEditor.Node.is(node.parent)) {
            const propertyData = node.parent.jsonforms.data[node.jsonforms.property];
            if (Array.isArray(propertyData)) {
                propertyData.splice(Number(node.jsonforms.index), 1);
                // eslint-disable-next-line no-null/no-null
            }
            else if (propertyData !== null && typeof propertyData === 'object') {
                propertyData[node.jsonforms.index] = undefined;
            }
            else {
                this.logger.error(`Could not delete node's data from its parent's property ${node.jsonforms.property}. Property data:`, propertyData);
                return;
            }
            // Data was changed in place but need to trigger tree updates.
            await this.treeWidget.updateDataForSubtree(node.parent, node.parent.jsonforms.data);
            this.handleChanged();
        }
    }
    async addNode({ node, type, property }) {
        // Create an empty object that only contains its type identifier
        const newData = {};
        newData[this.getTypeProperty()] = type;
        // TODO handle children not being stored in an array
        if (!node.jsonforms.data[property]) {
            node.jsonforms.data[property] = [];
        }
        node.jsonforms.data[property].push(newData);
        await this.treeWidget.updateDataForSubtree(node, node.jsonforms.data);
        this.handleChanged();
    }
    async handleFormUpdate(data, node) {
        await this.treeWidget.updateDataForSubtree(node, data);
        this.handleChanged();
    }
    /**
     * Called when a change occurred. Handle based on the autoSave flag.
     */
    handleChanged() {
        if (this.autoSave !== 'off') {
            this.saveDelayed();
        }
        else {
            this.setDirty(true);
        }
    }
    /**
     * Triggers a delayed save
     */
    saveDelayed() {
        const handle = window.setTimeout(() => {
            this.save();
            window.clearTimeout(handle);
        }, this.autoSaveDelay);
    }
}
__decorate([
    (0, inversify_1.postConstruct)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResourceTreeEditorWidget.prototype, "init", null);
exports.ResourceTreeEditorWidget = ResourceTreeEditorWidget;
//# sourceMappingURL=resource-tree-editor-widget.js.map