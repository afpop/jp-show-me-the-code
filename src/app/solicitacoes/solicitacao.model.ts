export class Solicitacao {
    public _id: string;
    public empresa: string;
    public cnpj: string;
    public plano: number;
    public tarifa: number;
    public minutos: number;
    public valorPlano: number;
    public dataAdesao: Date;
    public dataEnvio: Date;
    constructor(resultObject: Partial<Solicitacao>) {
        Object.assign(this, resultObject);
    }
}