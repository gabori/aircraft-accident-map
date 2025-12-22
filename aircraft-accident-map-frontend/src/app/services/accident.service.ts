import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../environment.prod";
export interface Accident {
  id: number;
  year: number;
  event_date?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
}
export interface AccidentStats {
  year: number;
  total_accidents: number;
  total_fatal_injuries: number;
  fatal_accidents: number;
}
@Injectable({ providedIn: 'root' })
export class AccidentService {

  private localBaseUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {}
  listByYear(year: number): Observable<Accident[]> {
    return this.http.get<Accident[]>(`${environment.apiUrl}/accidents?year=${year}`);
  }
  getStats(year: number): Observable<AccidentStats> {
    return this.http.get<AccidentStats>(
      `${environment.apiUrl}/accidents/stats?year=${year}`
    );
  }
  getAccidents(year: number) {
    return this.http.get<any[]>(`${environment.apiUrl}/accidents?year=${year}`);
  }
}
