import { Component, ViewChild } from "@angular/core";
import "ag-grid-enterprise";


import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ClickableParentComponent } from './popup-renderer/clickable-parent.component';
import { PriceDetails } from './price-details';
import {DisplayDialogComponent} from './dialog/display-dialog.component';

import {GridOptions} from "ag-grid";
@Component({
  selector: "price-grid",
  templateUrl: './grid.component.html'
})
export class GridComponent {
  public gridOptions: GridOptions;
  private gridApi;
  private gridColumnApi;
  private context;
  private columnDefs;
  private rowData;
  private groupDefaultExpanded;
  private getDataPath;
  private autoGroupColumnDef;
  public result: any;
  private data: Array<PriceDetails>;
  private gridComp = this;
  public dialogRef: MatDialogRef<DisplayDialogComponent>;
  public updatedAmt: number;
  public totalType: boolean;
  
  constructor(public dialog: MatDialog) {

    this.columnDefs = [

      {
        headerName: "Unit Count",
        children: [
          {
            field: "total"
          },
          {
            field: "avail"
          }
        ]
      },

      {
        headerName: "Occupancy",
        children: [
          {
            field: "units"
          },
          { field: "chg" },
          { field: "pct" }
        ]
      }, {
        headerName: "Exposure",
        children: [
          {
            headerName: "Units",
            field: "expUnits"
          },
          { headerName: "Chg", field: "expChg" },
          { headerName: "Pct", field: "expPct" }]
      },
      {
        headerName: "Rent",
        children: [
          {
            field: "occupied",
            headerName: "Occupied", valueFormatter: this.formatCurrency,
            width: 350
          },
          { field: "current", valueFormatter: this.formatCurrency, headerName: "Current", },

          {
            field: "recmd",
            valueFormatter: this.formatCurrency, headerName: "Rec.cd",
            cellClass: "number-cell"
          },

          { field: "override" ,cellRendererFramework: ClickableParentComponent},
          {
            field: "chgd",
            aggFunc: "sum",
             valueGetter: "data.current - data.recmd",
            valueFormatter: this.formatCurrency,

            cellClass: "number-cell", headerName: "Chg$"
          },
          { field: "chgp", headerName: "Chg%", 
           valueGetter: this.getChange }]
      }

    ];

    this.rowData = this.getData();
    this.context = {
      componentParent: this
    };
    this.getDataPath = function (data) {
      return data.filePath;
    };
    this.groupDefaultExpanded = -1;

    this.autoGroupColumnDef = {
      headerName: "Unit Type",
      field: "unittype",
      width : 350,
      cellRendererParams: {
        suppressCount: true,
        padding: 20
      }
    };
  }

 
  public methodFromParent(cell) {
	  
	  this.dialogRef = this.dialog.open(DisplayDialogComponent, {
		      width: '250px',
		      height:'300px',
		      disableClose:true,
		    });
		    
		    this.dialogRef.afterClosed().subscribe(result => {
		        console.log('The dialog was closed');
		        if(!this.dialogRef.componentInstance.isCancel) {
		           this.updatedAmt = +this.dialogRef.componentInstance.amount;
		           this.totalType = this.dialogRef.componentInstance.isTotalType;
		           this.setOverride(cell.id, cell.recmd);
		        }
		        
		      });
		    
		    if(this.dialogRef !== undefined && this.dialogRef.componentInstance !== undefined) {
		    	this.dialogRef.componentInstance.data = cell;
		        return this.dialogRef.afterClosed();
		    }
	   }
  
  setOverride(id, recmd) {
	    id = id-1;
	    let finalValue = Math.abs(this.updatedAmt + recmd);
	    var rowNode = this.gridApi.getRowNode(id);
	    if(this.totalType) {
	    	rowNode.setDataValue("recmd", this.updatedAmt);
	    } else {
	    	rowNode.setDataValue("recmd", finalValue);
	    }
	  }
  
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


    params.api.sizeColumnsToFit();
  }
  
 private getChange(params){
	return Math.abs(((params.data.current-params.data.recmd) * 100)/params.data.current)
	.toFixed(2);
  }
  private getData(): Array<PriceDetails> {
    this.data = [
      {
        "id": 1,
        "unittype": "STD",
        filePath: ["Pricing Unit1"],
        "total": 25,
        "avail": 23,
        "units": 2012,
        "chg": 0,
        "pct": 100,
        "expUnits": 2012,
        "expChg": 1,
        "expPct": 0,
        "current": 1200,
        "recmd": 1300,
        "override": "$1200",
        "chgd": 12,
        "chgp": 14.1, "occupied": 1100
      }, {
        "id": 2,
        "unittype": "STD",
        filePath: ["Pricing Unit1", "Master Unit1"],
        "total": 25,
        "avail": 23,
        "units": 2012,
        "chg": 1,
        "pct": 100,
        "expUnits": 2012,
        "expChg": 0,
        "expPct": 2,
        "current": 1200,
        "recmd": 1300,
        "override": "N",
        "chgd": 12,
        "chgp": 14.1, "occupied": 1050
      }, {
        "id": 3,
        "unittype": "STD",
        filePath: ["Pricing Unit2"],
        "total": 25,
        "avail": 23,
        "units": 2012,
        "chg": 1,
        "pct": 100,
        "expUnits": 2012,
        "expChg": 1,
        "expPct": 1,
        "current": 1200,
        "recmd": 1380,
        "override": "$1250",
        "chgd": 13,
        "chgp": 14.1, "occupied": 1000
      }, {
        "id": 4,
        "unittype": "STD",
        filePath: ["Pricing Unit2", "Master Unit1"],
        "total": 25,
        "avail": 23,
        "units": 2012,
        "chg": 2,
        "pct": 2,
        "expUnits": 2012,
        "expChg": 0,
        "expPct": 0,
        "current": 1112,
        "recmd": 1322,
        "override": "N",
        "chgd": 12,
        "chgp": 14.1, "occupied": 1000
      }, {
        "id": 5,
        "unittype": "STD",
        filePath: ["Pricing Unit2", "Master Unit2"],
        "total": 25,
        "avail": 23,
        "units": 2012,
        "chg": 11,
        "pct": 2,
        "expUnits": 2012,
        "expChg": 1,
        "expPct": 1,
        "current": 1302,
        "recmd": 1450,
        "override": "N",
        "chgd": 12,
        "chgp": 14.1, "occupied": 1200
      }];
    return this.data;
  }
  currencyFormatter(value: any) {
    return "\x24" + Math.floor(Math.abs(value))
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  formatCurrency(params) {
    return "\x24" + Math.floor(Math.abs(params.value))
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  formatNumber(value: any) {
    return Math.floor(value)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
}