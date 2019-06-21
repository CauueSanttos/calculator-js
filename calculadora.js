/**
 * Calculadora Javascript
 * @author Cauê dos Santos Silva <cauedossantossilva@unidavi.edu.br>
 */

const Calculator = function() {

    const values = ['9',  '8',   '7',   '/',
                    '6',  '5',   '4',   '*',
                    '3',  '2',   '1',   '+',
                    '%',  '0',   '=',   '-'];

    this.operador         = null;
    this.numeroInicial    = null;
    this.numeroSecundario = null;

    /**
     * Realiza a validação se o elemento passado é numérico
     * @param {String} sElement
     * @return {Boolean}
     */
    function isNum(sElement){
        return /^\d+$/.test(sElement);
    }

    /**
     * Realiza a criação dos elementos em tela
     * @param {String} sTag
     * @return {Object}
     */
    function create(sTag) {
        return document.createElement(sTag);
    }

    /**
     * Retorna o objeto do DOM de acordo com sua Tag
     * @param {String} sTag
     * @return {Object}
     */
    function getElement(sTag) {
        return document.getElementsByTagName(sTag)[0]; 
    }
    
    /**
     * Realiza a criação do visor da calculadora
     */
    function createInput() {
        let oInput = create('input');
        oInput.setAttribute('id', 'input-calculator');
        return oInput;
    }
    
    /**
     * Realiza a criação de um botão
     * @param {String} sOperator
     * @return {Object}
     */
    function createButton(sOperator) {
        oButton = create('input');
        oButton.setAttribute('type', 'button');
        oButton.setAttribute('value', sOperator);
        oButton.setAttribute('class', 'button-calculator');
        return oButton;
    }
    
    /**
     * Realiza a criação da tabela
     * @return {Object}
     */
    function createTable() {
        let oTable = create('table');
        
        let iContador = 0;
        for (let iCont = 0; iCont < 4; iCont++) {
            let oTr = create('tr');
            
            for (let iAux = 0; iAux < 4; iAux++) {
                let oTd = create('td');
                let oBotao = createButton(values[iContador]);

                if (values[iContador] != '=') {
                    oBotao.addEventListener('click', function() {
                        calculate(this.value);
                    });
                } else {
                    oBotao.addEventListener('click', function() {
                        calculateExpression();
                    });
                }

                oTd.appendChild(oBotao);

                oTr.appendChild(oTd);

                iContador++;
            }
            oTable.appendChild(oTr);
        }
        return oTable;
    }
    
    /**
     * Realiza a criação da calculadora 
     */
    this.createCalculator = () => {
        let oDiv = create('div');
        oDiv.setAttribute('id', 'div-calculator');
        oDiv.appendChild(createInput());
        oDiv.appendChild(createTable());

        let oBody = getElement('body');
        oBody.appendChild(oDiv);
    };
    
    /**
     * Realiza o calculo dos números
     * @param sValor
     */
    function calculate(sValor) {
        let aOperadores = ['/', '*', '+', '%', '-'];

        if (this.numeroInicial != null && this.operador != null) {
            if (this.numeroSecundario == null) {
                this.numeroSecundario = sValor;
            } else {
                this.numeroSecundario += `${sValor}`;
            }

            document.getElementById('input-calculator').value = this.numeroSecundario;
            return;
        }

        if (aOperadores.indexOf(sValor) == -1 && sValor != '=') {
            if (this.numeroInicial == null) {
                this.numeroInicial = sValor;
            } else {
                this.numeroInicial += `${sValor}`;
            }
            document.getElementById('input-calculator').value = this.numeroInicial;
            return;
        }
        
        if (aOperadores.indexOf(sValor) > -1) {
            if (this.operador == null) {
                this.operador = sValor;
                document.getElementById('input-calculator').value = '';
                return;
            } else {
                alert(`Você já informou um operador: ${this.operador}, continue digitando os números`);
            }
        }
    }

    /**
     * Realiza o calculo da expressão e reinicia a calculadora
     */
    function calculateExpression() {
        if (this.numeroInicial != null && this.numeroSecundario != null && this.operador != null) {
            let sExpression = this.numeroInicial + this.operador + this.numeroSecundario;

            document.getElementById('input-calculator').value = eval(sExpression);
            
            this.numeroInicial    = null;
            this.numeroSecundario = null;
            this.operador         = null;

            setTimeout(() => {
                alert('A calculadora foi zerada!');
            }, 2500);
        }
    }
};

oCalculadora = new Calculator();
oCalculadora.createCalculator();