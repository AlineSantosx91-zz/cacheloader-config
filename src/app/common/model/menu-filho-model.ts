export class Filho {

    nome: string;
    contexto: string;
    uri: string;
    uid: string;
    uidPai: string;
    chaveMobile: string;
    icone: string;
    ordem: number;
    ativo: boolean;
    subMenu: boolean;
    rota: string;
    regras: Array<string>;
    filhos: Array<Filho>;

    constructor(){}
}