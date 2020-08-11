import { Component } from '@angular/core';
import { SolicitacaoService } from './solicitacoes/solicitacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'TalkMore';
}
