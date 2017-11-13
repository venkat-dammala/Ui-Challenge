import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'clickable-cell',
    template: `
        <ag-clickable (onClicked)="invokeParentMethod()" [name]="inputData" [cell]="cell"></ag-clickable>
    `
})
export class ClickableParentComponent implements ICellRendererAngularComp {
    private params: any;
    public cell: any;
    public inputData: string = "--NA--";

    agInit(params: any): void {
        this.params = params;
        this.cell = {row: params.value, col: params.colDef.headerName};
    }

    public invokeParentMethod() {
        if(this.params.data.filePath.length > 1){
    	 this.params.context.componentParent.methodFromParent(this.params.data);
        }
    }
    
    refresh(params: any): boolean {
    	this.params = params;
    	if(this.params.data.override !== undefined) {
    		this.inputData = this.params.data.override;
    	}
        return true;
    }
}