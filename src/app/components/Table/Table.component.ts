import { Component, OnDestroy } from "@angular/core";
import { ImportService } from "src/app/services/import.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-Table",
  templateUrl: "./Table.component.html",
  styleUrls: ["./Table.component.scss"],
})
export class TableComponent implements OnDestroy {
  private _unsubscribeAll: Subject<any>;
  currentPerformence: any[] = [];
  interValue: string = "";
  allValues: any[] = [];
  benchmark: any[] = [];
  allBenchmark: any[] = [];
  constructor (private importService: ImportService) {
    this._unsubscribeAll = new Subject();
    this.loadData();
  }

  onResize(event: any) {
    // console.log(event.target.innerWidth);
    // console.log(event.target.innerWidth / 1.35, 400)
  }

  loadData() {
    // Subscribe to update on CurrentPerformence change
    this.importService
      .getData()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((curPerformence) => {
        this.currentPerformence = curPerformence;
        if (this.currentPerformence?.length === 0) {
          this.allValues = Array(9).fill(0);
        } else {
          for (let i of this.currentPerformence) {
            this.allValues = i.values;
            this.allBenchmark = i.benchmark;
          }
        }
      });
  }

  /**
   * Converts given value to a color
   *
   * @param value
   */
  getColor(value: any, benchmark: any): any {
    if (benchmark !== undefined) {
      if (typeof value === "string") {
        return "gray";
      } else {
        if (value >= 0 && value <= benchmark) {
          return "green";
        } else if (value > benchmark && value <= benchmark + 200) {
          return "yellow";
        } else if (value > benchmark + 200) {
          return "red";
        }
      }
    } else {
      return "gray";
    }
  }

  /**
   * Converts given index to a Word
   *
   * @param index
   */
  check(index: number): any {
    switch (index) {
      case 0:
        return (this.interValue = "Abfrage der ungefilterten Kundenliste");
      case 1:
        return (this.interValue = "Durchführung einer Standardkundensuche");
      case 2:
        return (this.interValue = "Abfrage der ungefilterten Vorgangsliste");
      case 3:
        return (this.interValue = "Durchführung einer Standardvorgangsuche");
      case 4:
        return (this.interValue =
          "Abfrage der ungefilterten Fahrzeugbestandsliste");
      case 5:
        return (this.interValue =
          "Durchführung einer Standardfahrzeugkonfiguration");
      case 6:
        return (this.interValue = "Kunde speichern");
      case 7:
        return (this.interValue = "Fahrzeug speichern");
      case 8:
        return (this.interValue = "Vorgang speichern");
    }
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
