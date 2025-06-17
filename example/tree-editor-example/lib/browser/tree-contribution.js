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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeContribution = void 0;
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
const inversify_1 = require("inversify");
const tree_editor_widget_1 = require("./tree/tree-editor-widget");
const tree_label_provider_1 = require("./tree/tree-label-provider");
const tree_model_service_1 = require("./tree/tree-model-service");
let TreeContribution = class TreeContribution extends theia_tree_editor_1.BaseTreeEditorContribution {
    constructor(modelService, labelProvider) {
        super(tree_editor_widget_1.TreeEditorWidget.EDITOR_ID, modelService, labelProvider);
        this.id = tree_editor_widget_1.TreeEditorWidget.WIDGET_ID;
        this.label = theia_tree_editor_1.MasterTreeWidget.WIDGET_LABEL;
    }
    canHandle(uri) {
        if (uri.path.ext === '.tree') {
            return 1000;
        }
        return 0;
    }
    createWidgetOptions(uri, options) {
        return {
            kind: 'navigatable',
            uri: this.serializeUri(uri)
        };
    }
    serializeUri(uri) {
        return uri.withoutFragment().toString();
    }
};
__decorate([
    (0, inversify_1.inject)(browser_1.ApplicationShell),
    __metadata("design:type", browser_1.ApplicationShell)
], TreeContribution.prototype, "shell", void 0);
__decorate([
    (0, inversify_1.inject)(browser_1.OpenerService),
    __metadata("design:type", Object)
], TreeContribution.prototype, "opener", void 0);
TreeContribution = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(tree_model_service_1.TreeModelService)),
    __param(1, (0, inversify_1.inject)(tree_label_provider_1.TreeLabelProvider)),
    __metadata("design:paramtypes", [Object, tree_label_provider_1.TreeLabelProvider])
], TreeContribution);
exports.TreeContribution = TreeContribution;
//# sourceMappingURL=tree-contribution.js.map