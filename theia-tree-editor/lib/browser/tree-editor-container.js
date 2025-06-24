"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTreeEditorContainer = void 0;
const editor_data_widget_1 = require("./editor-data-widget");
function createTreeEditorContainer(treeContainer, 
// a already bound tree editor
dataEditorWidget, editor) {
    const container = treeContainer.createChild();
    container.bind(dataEditorWidget).toSelf();
    container.bind(editor_data_widget_1.EditorDataWidget).to(dataEditorWidget);
    container.bind(editor).toSelf();
    return container;
}
exports.createTreeEditorContainer = createTreeEditorContainer;
//# sourceMappingURL=tree-editor-container.js.map