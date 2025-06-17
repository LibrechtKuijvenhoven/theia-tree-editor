"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigatableTreeEditorWidget = exports.NavigatableTreeEditorOptions = void 0;
const tree_editor_widget_1 = require("./tree-editor-widget");
exports.NavigatableTreeEditorOptions = Symbol('NavigatableTreeEditorOptions');
class NavigatableTreeEditorWidget extends tree_editor_widget_1.BaseTreeEditorWidget {
    constructor(treeWidget, formWidget, workspaceService, logger, widget_id, options) {
        super(treeWidget, formWidget, workspaceService, logger, widget_id);
        this.treeWidget = treeWidget;
        this.formWidget = formWidget;
        this.workspaceService = workspaceService;
        this.logger = logger;
        this.widget_id = widget_id;
        this.options = options;
    }
    /** The uri of the editor's resource. */
    get uri() {
        return this.options.uri;
    }
    getResourceUri() {
        return this.uri;
    }
    createMoveToUri(resourceUri) {
        return this.options.uri && this.options.uri.withPath(resourceUri.path);
    }
    configureTitle(title) {
        title.label = this.options.uri.path.base;
        title.caption = this.options.uri.toString();
        title.closable = true;
    }
}
exports.NavigatableTreeEditorWidget = NavigatableTreeEditorWidget;
//# sourceMappingURL=navigatable-tree-editor-widget.js.map