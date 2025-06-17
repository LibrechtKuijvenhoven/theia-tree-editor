"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
require("@eclipse-emfcloud/theia-tree-editor/style/forms.css");
require("@eclipse-emfcloud/theia-tree-editor/style/index.css");
require("../../src/browser/style/editor.css");
const theia_tree_editor_1 = require("@eclipse-emfcloud/theia-tree-editor");
const core_1 = require("@theia/core");
const browser_1 = require("@theia/core/lib/browser");
const uri_1 = __importDefault(require("@theia/core/lib/common/uri"));
const inversify_1 = require("inversify");
const tree_contribution_1 = require("./tree-contribution");
const tree_label_provider_contribution_1 = require("./tree-label-provider-contribution");
const tree_editor_widget_1 = require("./tree/tree-editor-widget");
const tree_label_provider_1 = require("./tree/tree-label-provider");
const tree_model_service_1 = require("./tree/tree-model-service");
const tree_node_factory_1 = require("./tree/tree-node-factory");
exports.default = new inversify_1.ContainerModule(bind => {
    // Bind Theia IDE contributions for the tree editor
    bind(browser_1.LabelProviderContribution).to(tree_label_provider_contribution_1.TreeLabelProviderContribution);
    bind(browser_1.OpenHandler).to(tree_contribution_1.TreeContribution);
    bind(core_1.MenuContribution).to(tree_contribution_1.TreeContribution);
    bind(core_1.CommandContribution).to(tree_contribution_1.TreeContribution);
    bind(browser_1.LabelProviderContribution).to(tree_label_provider_1.TreeLabelProvider);
    // bind services to themselves because we use them outside of the editor widget, too.
    bind(tree_model_service_1.TreeModelService).toSelf().inSingletonScope();
    bind(tree_label_provider_1.TreeLabelProvider).toSelf().inSingletonScope();
    bind(browser_1.WidgetFactory).toDynamicValue(context => ({
        id: tree_editor_widget_1.TreeEditorWidget.WIDGET_ID,
        createWidget: (options) => {
            const treeContainer = (0, theia_tree_editor_1.createBasicTreeContainer)(context.container, tree_editor_widget_1.TreeEditorWidget, tree_model_service_1.TreeModelService, tree_node_factory_1.TreeNodeFactory);
            // Bind options
            const uri = new uri_1.default(options.uri);
            treeContainer.bind(theia_tree_editor_1.NavigatableTreeEditorOptions).toConstantValue({ uri });
            return treeContainer.get(tree_editor_widget_1.TreeEditorWidget);
        }
    }));
});
//# sourceMappingURL=tree-editor-example-frontend-module.js.map