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
export declare namespace ExampleModel {
    namespace Type {
        const Leaf = "Leaf";
        const Tree = "Tree";
        const Node = "Node";
        function name(type: string): string;
    }
    /** Maps types to their creatable children */
    const childrenMapping: Map<string, TreeEditor.ChildrenDescriptor[]>;
}
//# sourceMappingURL=tree-model.d.ts.map