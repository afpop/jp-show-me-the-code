import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SolicitacaoService } from '../solicitacao.service';
import { Solicitacao } from '../solicitacao.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-solicitacao-form',
  templateUrl: './solicitacao-form.component.html',
  styleUrls: ['./solicitacao-form.component.sass']
})
export class SolicitacaoFormComponent implements OnInit {

  @ViewChild('form') form;

  planos = [
    { id: 1, descricao: 'P30', minutos: 30 },
    { id: 2, descricao: 'P60', minutos: 60 },
    { id: 3, descricao: 'P120', minutos: 120 }
  ];
  solicitacao: Solicitacao = new Solicitacao({});
  solicitacaoForm: FormGroup;

  constructor(private solicitacaoService: SolicitacaoService, private formBuilder: FormBuilder,
    private notification: NotificationService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.solicitacaoForm = this.formBuilder.group({
      empresa: [null, [Validators.required]],
      cnpj: [null, [Validators.required]],
      plano: [null, [Validators.required]],
      tarifa: [null, [Validators.required]],
      minutos: [null, [Validators.required]],
      valorPlano: [null, [Validators.required]],
      dataAdesao: [null, [Validators.required]],
      dataEnvio: [new Date(), [Validators.required]]
    });
  }

  submit() {
    if (!this.solicitacaoForm.valid) {
      this.notification.show('Por favor, verifique os dados informados.');
      return;
    }
    this.solicitacaoService.post(this.solicitacaoForm.value).subscribe((response: Solicitacao) => {
      this.notification.show('Solicitação criada com sucesso!');
      this.form.reset();
      this.form.resetForm();
      this.buildForm();
      this.solicitacaoService.notify();
    }, error => {
      console.log(error);
    });
  }

}
