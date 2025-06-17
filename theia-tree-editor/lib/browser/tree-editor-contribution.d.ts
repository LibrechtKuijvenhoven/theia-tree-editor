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
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry } from '@theia/core';
import { LabelProviderContribution, WidgetOpenHandler } from '@theia/core/lib/browser';
import { TreeEditor } from './interfaces';
import { BaseTreeEditorWidget } from './tree-editor-widget';
/**
 * Abstract base class for defining custom tree editor contributions.
 * An editor's contribution registers its commands and context menus.
 * Furthermore, it defines which URIs the editor can handle and may configure
 * the widget with additional options (see WidgetOpenHandler).
 */
export declare abstract class BaseTreeEditorContribution extends WidgetOpenHandler<BaseTreeEditorWidget> implements CommandContribution, MenuContribution {
    private editorId;
    private modelService;
    private labelProvider;
    private commandMap;
    constructor(editorId: string, modelService: TreeEditor.ModelService, labelProvider: LabelProviderContribution);
    /**
     * @returns maps property names to type identifiers to their corresponding add command
     */
    private getCommandMap;
    registerCommands(commands: CommandRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
}
//# sourceMappingURL=tree-editor-contribution.d.ts.map