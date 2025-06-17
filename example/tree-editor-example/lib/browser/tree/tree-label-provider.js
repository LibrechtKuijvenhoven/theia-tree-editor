"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeLabelProvider = void 0;
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
const tree_editor_widget_1 = require("./tree-editor-widget");
const tree_model_1 = require("./tree-model");
const ICON_CLASSES = new Map([
    [tree_model_1.ExampleModel.Type.Leaf, (0, browser_1.codicon)('chrome-maximize')],
    [tree_model_1.ExampleModel.Type.Tree, (0, browser_1.codicon)('list-tree')],
    [tree_model_1.ExampleModel.Type.Node, (0, browser_1.codicon)('type-hierarchy-sub')]
]);
/* Icon for unknown types */
const UNKNOWN_ICON = (0, browser_1.codicon)('question');
let TreeLabelProvider = class TreeLabelProvider {
    canHandle(element) {
        if ((theia_tree_editor_1.TreeEditor.Node.is(element) || theia_tree_editor_1.TreeEditor.CommandIconInfo.is(element)) && element.editorId === tree_editor_widget_1.TreeEditorWidget.EDITOR_ID) {
            return 1000;
        }
        return 0;
    }
    getIcon(element) {
        let iconClass;
        if (theia_tree_editor_1.TreeEditor.CommandIconInfo.is(element)) {
            iconClass = ICON_CLASSES.get(element.type);
        }
        else if (theia_tree_editor_1.TreeEditor.Node.is(element)) {
            iconClass = ICON_CLASSES.get(element.jsonforms.type);
        }
        return iconClass !== null && iconClass !== void 0 ? iconClass : UNKNOWN_ICON;
    }
    getName(element) {
        const data = theia_tree_editor_1.TreeEditor.Node.is(element) ? element.jsonforms.data : element;
        if (data.name) {
            return data.name;
        }
        else if (data.typeId) {
            return this.getTypeName(data.typeId);
        }
        return undefined;
    }
    getTypeName(typeId) {
        return tree_model_1.ExampleModel.Type.name(typeId);
    }
};
TreeLabelProvider = __decorate([
    (0, inversify_1.injectable)()
], TreeLabelProvider);
exports.TreeLabelProvider = TreeLabelProvider;
//# sourceMappingURL=tree-label-provider.js.map