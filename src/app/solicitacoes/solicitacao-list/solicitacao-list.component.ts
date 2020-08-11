import { Component, OnInit } from '@angular/core';
import { SolicitacaoService } from '../solicitacao.service';
import { Solicitacao } from '../solicitacao.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-solicitacao-list',
  templateUrl: './solicitacao-list.component.html',
  styleUrls: ['./solicitacao-list.component.sass']
})
export class SolicitacaoListComponent implements OnInit {

  solicitacaoSubscription: Subscription;
  displayedColumns: string[] = ['ID', 'Empresa', 'Plano', 'Tarifa', 'Minutos', 'Valor plano', 'Data de adesão', 'Data de envio', 'Ação'];
  solicitacoes: Solicitacao[];
  loaded: boolean = false;

  constructor(private solicitacaoService: SolicitacaoService) { }

  ngOnInit(): void {
    this.solicitacaoSubscription = this.solicitacaoService.changes().subscribe(message => {
      this.reload();
    });
  }

  reload() {
    this.loaded = false;
    this.solicitacaoService.get().subscribe((response: Solicitacao[]) => {
      this.solicitacoes = response;
      setTimeout(() => { this.loaded = true; }, 3000);
    }, error => {
      console.log(error);
    });
  }
}
