import { Component } from '@angular/core';
import { StatsComponent } from "./stats/stats.component";
import { MapComponent } from "./map/map.component";
import { FormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    StatsComponent,
    MapComponent,
    FormsModule,
    NgForOf
  ],
  template: `
    <header class="app-header">
      <div class="header-left">
        ✈ Aircraft Accident Map
      </div>

      <div class="header-right">
        <label>Year</label>
        <select [(ngModel)]="year">
          <option *ngFor="let y of years" [value]="y">
            {{ y }}
          </option>
        </select>
      </div>
    </header>

    <app-map [year]="year"></app-map>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  year = 2019;
  years = [2018, 2019, 2020];
}
