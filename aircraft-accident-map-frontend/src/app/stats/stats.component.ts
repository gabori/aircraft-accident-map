import { Component, Input, OnChanges } from '@angular/core';
import { AccidentService, AccidentStats } from '../services/accident.service';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent implements OnChanges {
  @Input() year!: number;
  stats?: AccidentStats;

  constructor(private service: AccidentService) {}

  ngOnChanges() {
    this.service.getStats(this.year).subscribe(s => (this.stats = s));
  }
}
