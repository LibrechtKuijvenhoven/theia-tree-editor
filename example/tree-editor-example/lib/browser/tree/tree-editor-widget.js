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
var TreeEditorWidget_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeEditorWidget = void 0;
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
const theia_tree_editor_1 = require("@eclipse-emfcloud/theia-tree-editor");
const browser_1 = require("@theia/core/lib/browser");
const common_1 = require("@theia/core/lib/common");
const browser_2 = require("@theia/editor/lib/browser");
const workspace_service_1 = require("@theia/workspace/lib/browser/workspace-service");
const inversify_1 = require("inversify");
let TreeEditorWidget = TreeEditorWidget_1 = class TreeEditorWidget extends theia_tree_editor_1.ResourceTreeEditorWidget {
    constructor(treeWidget, formWidget, workspaceService, logger, options, provider, nodeFactory, editorPreferences) {
        super(treeWidget, formWidget, workspaceService, logger, TreeEditorWidget_1.WIDGET_ID, options, provider, nodeFactory, editorPreferences);
        this.treeWidget = treeWidget;
        this.formWidget = formWidget;
        this.workspaceService = workspaceService;
        this.logger = logger;
        this.options = options;
        this.provider = provider;
        this.nodeFactory = nodeFactory;
        this.editorPreferences = editorPreferences;
    }
    getTypeProperty() {
        return 'typeId';
    }
    configureTitle(title) {
        super.configureTitle(title);
        title.iconClass = (0, browser_1.codicon)('list-tree');
    }
};
TreeEditorWidget = TreeEditorWidget_1 = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(theia_tree_editor_1.MasterTreeWidget)),
    __param(1, (0, inversify_1.inject)(theia_tree_editor_1.DetailFormWidget)),
    __param(2, (0, inversify_1.inject)(workspace_service_1.WorkspaceService)),
    __param(3, (0, inversify_1.inject)(common_1.ILogger)),
    __param(4, (0, inversify_1.inject)(theia_tree_editor_1.NavigatableTreeEditorOptions)),
    __param(5, (0, inversify_1.inject)(common_1.DefaultResourceProvider)),
    __param(6, (0, inversify_1.inject)(theia_tree_editor_1.TreeEditor.NodeFactory)),
    __param(7, (0, inversify_1.inject)(browser_2.EditorPreferences)),
    __metadata("design:paramtypes", [theia_tree_editor_1.MasterTreeWidget,
        theia_tree_editor_1.DetailFormWidget,
        workspace_service_1.WorkspaceService, Object, Object, common_1.DefaultResourceProvider, Object, Object])
], TreeEditorWidget);
exports.TreeEditorWidget = TreeEditorWidget;
// eslint-disable-next-line no-redeclare
(function (TreeEditorWidget) {
    TreeEditorWidget.WIDGET_ID = 'tree-editor-example-tree-editor';
    TreeEditorWidget.EDITOR_ID = 'tree-editor-example.tree.editor';
})(TreeEditorWidget = exports.TreeEditorWidget || (exports.TreeEditorWidget = {}));
exports.TreeEditorWidget = TreeEditorWidget;
//# sourceMappingURL=tree-editor-widget.js.map