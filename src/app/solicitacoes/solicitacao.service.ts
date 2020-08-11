import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  private changesSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(environment.API_URL + 'solicitacoes');
  }

  getByID(id: string) {
    return this.http.get(environment.API_URL + 'solicitacoes/' + id);
  }

  post(model: any) {
    return this.http.post(environment.API_URL + 'solicitacoes', model);
  }

  put(id: string, model: any) {
    return this.http.put(environment.API_URL + 'solicitacoes/' + id, model);
  }

  notify() {
    this.changesSubject.next(true);
  }

  changes(): Observable<any> {
    return this.changesSubject.asObservable();
  }

}
