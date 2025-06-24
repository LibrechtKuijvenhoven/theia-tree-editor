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
exports.EditorTreeWidget = void 0;
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
const inversify_1 = require("@theia/core/shared/inversify");
const vscode_languageserver_protocol_1 = require("@theia/core/shared/vscode-languageserver-protocol");
let EditorTreeWidget = class EditorTreeWidget extends browser_1.TreeWidget {
    constructor(props, model, contextMenuRenderer) {
        super(props, model, contextMenuRenderer);
        this.onDataChangeEmitter = new vscode_languageserver_protocol_1.Emitter();
        this.onDataChange = this.onDataChangeEmitter.event;
        this.onSelectionChangeEmitter = new vscode_languageserver_protocol_1.Emitter();
        this.onSelectionChange = this.onSelectionChangeEmitter.event;
        this.toDispose.pushAll([
            this.model.onSelectionChanged(n => {
                this.onSelectionChangeEmitter.fire(n);
            })
        ]);
    }
    set data(data) {
        this._data = data;
        this.onDataChangeEmitter.fire(this._data);
    }
    updateNodeData(node, data) {
        const currentName = this.labelProvider.getName(node);
        node.data = data;
        const newName = this.labelProvider.getName(node);
        // if the node doesnt look different then it doesnt need to be refreshed
        if (currentName === newName) {
            return;
        }
        this.model.refresh();
    }
};
EditorTreeWidget = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(browser_1.TreeProps)),
    __param(1, (0, inversify_1.inject)(browser_1.TreeModel)),
    __param(2, (0, inversify_1.inject)(browser_1.ContextMenuRenderer)),
    __metadata("design:paramtypes", [Object, Object, browser_1.ContextMenuRenderer])
], EditorTreeWidget);
exports.EditorTreeWidget = EditorTreeWidget;
//# sourceMappingURL=editor-tree-widget.js.map