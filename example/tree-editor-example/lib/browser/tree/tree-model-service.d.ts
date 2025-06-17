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
import { TreeEditor } from '@eclipse-emfcloud/theia-tree-editor';
import { JsonSchema, UISchemaElement } from '@jsonforms/core';
import { ILogger } from '@theia/core';
export declare class TreeModelService implements TreeEditor.ModelService {
    private readonly logger;
    constructor(logger: ILogger);
    getDataForNode(node: TreeEditor.Node): any;
    getSchemaForNode(node: TreeEditor.Node): JsonSchema | undefined;
    private getSchemaForType;
    getUiSchemaForNode(node: TreeEditor.Node): UISchemaElement | undefined;
    getChildrenMapping(): Map<string, TreeEditor.ChildrenDescriptor[]>;
    getNameForType(type: string): string;
}
//# sourceMappingURL=tree-model-service.d.ts.map