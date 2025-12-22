import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { AccidentService } from '../services/accident.service';

const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
const iconUrl = 'assets/leaflet/marker-icon.png';
const shadowUrl = 'assets/leaflet/marker-shadow.png';

L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

@Component({
  selector: 'app-map',
  standalone: true,
  template: `<div id="map"></div>`,
  styleUrls: ['./map.component.css']
  // styles: [`
  //   #map {
  //     width: 100%;
  //     height: 100%;
  //   }
  // `]
})
export class MapComponent implements AfterViewInit, OnChanges {

  @Input() year!: number;

  private map!: L.Map;
  private layer = L.layerGroup();

  constructor(private accidentService: AccidentService) {}

  ngAfterViewInit() {
    this.initMap();
    this.layer.addTo(this.map);
    this.loadAccidents();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['year'] && this.map) {
      this.loadAccidents();
    }
  }

  private initMap() {
    this.map = L.map('map', {
      zoomControl: false,
      preferCanvas: true, // 🚀 NAGYON FONTOS – teljesítmény
    }).setView([39, -98], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private loadAccidents() {
    if (!this.year) return;

    this.layer.clearLayers();

    this.accidentService.getAccidents(this.year).subscribe(accidents => {
      accidents.forEach(acc => {
        if (!acc.Latitude || !acc.Longitude) return;

        const severity = acc['Injury.Severity']?.toString() ?? '';
        const isFatal =
          severity.startsWith('Fatal');

        // const isFatal =
        //   acc['Injury.Severity']?.toString().trim() === 'Fatal';

        const color = isFatal ? 'red' : 'orange';

        L.circleMarker([acc.Latitude, acc.Longitude], {
          radius: isFatal ? 5 : 4,
          color,
          weight: 1,
          fillOpacity: 0.6,
        })
          .bindTooltip(`
        <b>${acc.Location ?? 'Unknown location'}</b><br/>
        Date: ${acc['Event.Date'] ?? ''}<br/>
        Severity: ${acc['Injury.Severity'] ?? 'Unknown'}
      `)
          .addTo(this.layer);
      });
    });
  }

}
