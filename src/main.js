class App {
    constructor() {
        this.input=document.getElementById('input');
        this.numeros=document.querySelectorAll('.numeros div');
        this.operadores=document.querySelectorAll('.operadores div');
        this.resultado=document.getElementById('result');
        this.limpar=document.getElementById('limpar');
        this.result=false;

        this.registerHandlers();
    }

    registerHandlers(){
        Array.prototype.forEach.call(this.numeros,(item) => {
            item.addEventListener("click",(n) => {
                let valorAtual = this.input.innerHTML;
                let ultimoC = valorAtual[valorAtual.length - 1];
                if (this.result === false) {
                    this.input.innerHTML += n.target.innerHTML;
                } else if (this.result === true && ultimoC === "+" || ultimoC === "-" || ultimoC === "×" || ultimoC === "÷") {
                    this.result = false;
                    this.input.innerHTML += n.target.innerHTML;
                } else {
                    this.result = false;
                    this.input.innerHTML = "";
                    this.input.innerHTML += n.target.innerHTML;
                }
            });
        });

        Array.prototype.forEach.call(this.operadores,(item) => {
            item.addEventListener("click",(o) => {
                let valorAtual = this.input.innerHTML;
                let ultimoC = valorAtual[valorAtual.length - 1];
                if (ultimoC === "+" || ultimoC === "-" || ultimoC === "×" || ultimoC === "÷") {
                    let nString = valorAtual.substring(0, valorAtual.length - 1) + o.target.innerHTML;
                    this.input.innerHTML = nString;
                } else if (valorAtual.length == 0) {
                    alert("Digite um número primeiro");
                } else {
                    this.input.innerHTML += o.target.innerHTML;
                }
            });
        });

        this.resultado.addEventListener("click", () => {
            this.input.innerHTML = this.calcular(this.input.innerHTML.replace(/[0-9]|\./g, "").split(""),this.input.innerHTML.split(/\+|\-|\×|\÷/g));
            this.result = true;
        });

        this.limpar.addEventListener("click",() => this.input.innerHTML = "");
    }

    calcular(o,n){
        let divisao = o.indexOf("÷");
        let multiplicacao = o.indexOf("×");
        let subtracao = o.indexOf("-");
        let soma = o.indexOf("+");

        if (divisao != -1)
            n.splice(divisao, 2, n[divisao] / n[divisao + 1]);
            o.splice(divisao, 1);
            divisao = o.indexOf("÷");
        if (multiplicacao != -1)
            n.splice(multiplicacao, 2, n[multiplicacao] * n[multiplicacao + 1]);
            o.splice(multiplicacao, 1);
            multiplicacao = o.indexOf("×");
        if (subtracao != -1)
            n.splice(subtracao, 2, n[subtracao] - n[subtracao + 1]);
            o.splice(subtracao, 1);
            subtracao = o.indexOf("-");
        if (soma != -1)
            n.splice(soma, 2, parseFloat(n[soma]) + parseFloat(n[soma + 1]));
            o.splice(soma, 1);
            soma = o.indexOf("+");
        return n[0];
    }
}
new App();