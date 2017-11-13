import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: 'ag-clickable',
    template: `
        <div style="height: 21px" (click)="click()">{{name}}</div>
    `,
    styles: [
        `.btn {
            line-height: 0.5;
            width: 100%;
        }`
    ]
})
export class ClickableComponent {
    @Input() cell: any;
    @Input() name: String;
    @Output() onClicked = new EventEmitter<boolean>();

    click(): void {
        this.onClicked.emit(this.cell);
    }
}