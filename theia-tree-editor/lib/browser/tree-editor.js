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
exports.SplitTreeEditor = void 0;
/********************************************************************************
 * Copyright (c) 2024 Librecht Kuijvenhoven.
 * Copyright (c) 2019-2020 EclipseSource and others (original inspiration).
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0, or the MIT License which is
 * available at https://opensource.org/licenses/MIT.
 *
 * This component is a derivative work inspired by the 'DetailFormWidget'
 * from [Original Project Name or link to its repo, e.g., 'https://github.com/EclipseSource/theia-tree-editor-example'].
 *
 * SPDX-License-Identifier: EPL-2.0 OR MIT
 *******************************************************************************/
const browser_1 = require("@theia/core/lib/browser");
const common_1 = require("@theia/core/lib/common");
const inversify_1 = require("@theia/core/shared/inversify");
const lodash_1 = require("lodash");
const editor_data_widget_1 = require("./editor-data-widget");
const editor_tree_widget_1 = require("./editor-tree-widget");
require("../../styles/editor.css");
const TreeEditorClass = 'split-tree-editor';
const TreeEditorPanelClass = 'split-tree-editor-panel';
const TreeEditorTreeClass = 'split-tree-editor-tree';
const TreeEditorDataClass = 'split-tree-editor-data';
let SplitTreeEditor = class SplitTreeEditor extends browser_1.BaseWidget {
    constructor(treeWidget, dataWidget, widgetId) {
        super();
        this.treeWidget = treeWidget;
        this.dataWidget = dataWidget;
        this.widgetId = widgetId;
        this.dirty = false;
        this.onDirtyChangedEmitter = new common_1.Emitter();
        this.onDirtyChanged = this.onDirtyChangedEmitter.event;
        this.onContentChangedEmitter = new common_1.Emitter();
        this.onContentChanged = this.onDirtyChangedEmitter.event;
        this.id = widgetId;
        this.addClass(TreeEditorClass);
        this.treeWidget.addClass(TreeEditorTreeClass);
        this.dataWidget.addClass(TreeEditorDataClass);
        this.toDispose.pushAll([
            this.treeWidget.onSelectionChange(n => {
                this.selectedNode = n[0];
                this.update();
            }),
            this.dataWidget.onDataChange((0, lodash_1.debounce)(data => {
                if (!this.selectedNode || (0, lodash_1.isEqual)(data, this.selectedNode.data)) {
                    return;
                }
                this.onDataWidgetChange(data, this.selectedNode);
            }), 250)
        ]);
    }
    instaniateSplitPanel() {
        const panel = new browser_1.SplitPanel();
        panel.addClass(TreeEditorPanelClass);
        panel.addWidget(this.treeWidget);
        panel.addWidget(this.dataWidget);
        panel.setRelativeSizes([2, 5]);
        return panel;
    }
    onAfterAttach(msg) {
        this.treeWidget.activate();
        browser_1.Widget.attach(this.panel, this.node);
        super.onAfterAttach(msg);
    }
    get saveable() {
        return this;
    }
    save() {
        // do nothing by default
    }
};
SplitTreeEditor = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [editor_tree_widget_1.EditorTreeWidget,
        editor_data_widget_1.EditorDataWidget, String])
], SplitTreeEditor);
exports.SplitTreeEditor = SplitTreeEditor;
//# sourceMappingURL=tree-editor.js.map