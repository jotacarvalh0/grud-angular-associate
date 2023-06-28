import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssociateElement } from '../models/AssociateElement';

@Injectable()
export class AssociateElementService {
  elementApiUrl = 'https://localhost:4200/api/AssociateElements'
  constructor(private http: HttpClient) { }

  getElements(): Observable<AssociateElement[]> {
    return this.http.get<AssociateElement[]>(this.elementApiUrl);
  }

  createElements(element: AssociateElement): Observable<AssociateElement> {
    return this.http.post<AssociateElement>(this.elementApiUrl, element);
  }

  editElements(element: AssociateElement): Observable<AssociateElement> {
    return this.http.put<AssociateElement>(this.elementApiUrl, element);
  }

  deleteElements(id: number): Observable<any> {
    return this.http.delete<any>(`${this.elementApiUrl}?id=${id}`);
  }
}
