/********************************************************************************
 * Copyright (c) 2024 Librecht Kuijvenhove or YourName.
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
import { interfaces } from '@theia/core/shared/inversify';
import { EditorDataWidget } from './editor-data-widget';
import { SplitTreeEditor } from './tree-editor';
export declare function createTreeEditorContainer(treeContainer: interfaces.Container, dataEditorWidget: interfaces.Newable<EditorDataWidget>, editor: interfaces.Newable<SplitTreeEditor>): interfaces.Container;
//# sourceMappingURL=tree-editor-container.d.ts.map