import { JsonFormsInitStateProps, JsonFormsReactProps } from '@jsonforms/react';
import { StyleContext } from '@jsonforms/vanilla-renderers';
import { Emitter, Event } from '@theia/core';
import { BaseWidget, Message } from '@theia/core/lib/browser';
import { TreeEditor } from './interfaces';
/**
 * Renders the detail view of the tree editor and binds the selected object's data to a generated form.
 */
export declare class DetailFormWidget extends BaseWidget {
    private readonly modelService;
    private selectedNode;
    private jsonformsOnChange;
    private root;
    protected changeEmitter: Emitter<Readonly<any>>;
    constructor(modelService: TreeEditor.ModelService);
    get onChange(): Event<Readonly<any>>;
    setSelection(selectedNode: TreeEditor.Node): Promise<void>;
    protected renderForms(): Promise<void>;
    /**
     * Provides configuration for JsonForms rendering the detail forms.
     * Unless the configuration actually changes,
     * this should always return the same object to avoid unnecessary re-renders.
     */
    protected getJsonFormsConfig(): JsonFormsDetailConfig;
    /**
     * Returns the styles for the detail form.
     * As long as the styles do not change,
     * this should always return the same object to avoid unnecessary re-renders of the form.
     */
    protected getStyles(): StyleContext;
    protected renderEmptyForms(): void;
    protected onUpdateRequest(msg: Message): void;
}
export type JsonFormsDetailConfig = Omit<JsonFormsInitStateProps & JsonFormsReactProps, 'data' | 'onChange' | 'schema' | 'uischema'>;
/** Default json forms configuration using the default vanilla cells and renderers. */
export declare const jsonFormsConfig: JsonFormsDetailConfig;
/** Default vanilla styles extend with theia-specific styling. */
export declare const styleContextValue: StyleContext;
//# sourceMappingURL=detail-form-widget.d.ts.map