// NUMERO DE PRODUTOS QUE VAO SENDO ADCIONADOS AO CARRINHO
var contCar = 0;

var somaPrecos = 0;
// COLOCAR AUTOMATICO O CATALOGO NO SITE
fetch('../produtos.json')
    .then(response => response.json())
    .then(data => {
        // LOCAL PARA COLOCAR OS PRODUTOS
        const localDosPro = document.querySelector('#localdospro');
        
        // PRODUTOS DO JSON COMO UMA LISTA
        const produtosArray = data.produtos;

        // PRODUTOS ADCIONADOS AO CARRINHO
        const produtosAddCar = data.addCar;
        
        
            // FOR PARA CRIAR E COLOCAR TODOS OS ELEMENTOS EM SEU DEVIDO LUGAR NA PAG
            for (let i = 0; i < produtosArray.length; i++) {
                
                const item = produtosArray[i];

                // DIV PAG
                const pagDiv = document.createElement('div')
                
                const elementoH1 = document.createElement('h1');
                elementoH1.textContent = `${item.nome}`;
                
                pagDiv.className = `pag ${elementoH1.innerHTML}`;

                let img11 = item.img1;
                let img22 = item.img2;
                let img33 = item.img3;
                const img1 = document.createElement('img');
                const img2 = document.createElement('img');
                const img3 = document.createElement('img');
                img1.src = img11;
                img2.src = img22;
                img3.src = img33;

                // DIV PRODUTOS
                const produtosDiv = document.createElement('div')
                produtosDiv.id = 'produtos';

                produtosDiv.appendChild(img1);
                produtosDiv.appendChild(img2);
                produtosDiv.appendChild(img3);  
    
                const elementoH3 = document.createElement('h3');
                elementoH3.textContent = `R$ ${item.valor}`;

                const elementoH4 = document.createElement('h4');
                elementoH4.textContent = `${item.juros}x sem juros`;

                const btnAddCar = document.createElement('button');
                btnAddCar.textContent = "Adcionar ao Carrinho";
                btnAddCar.className = `${elementoH1.innerHTML}`;
                btnAddCar.addEventListener('click', () => {
                    if(contCar == 15) {
                        alert("Você chegou ao número maximo de produtos no carrinho!");
                    } else {

                        let divProdutosCar = document.querySelector('.produ');
    
                        let divProdutoAdd = document.createElement('div');
                        divProdutoAdd.className = 'produtoadd';
    
                        let imgPro = document.createElement('img');
                        imgPro.src = item.img1;
    
                        let divInfos = document.createElement('div');
                        divInfos.className = 'infos';
    
                        let eleH3 = document.createElement('h3');
                        eleH3.innerHTML = item.nome;
    
                        let eleH3pre = document.createElement('h3');
                        eleH3pre.innerHTML = `RS${item.valor}`;
                        eleH3pre.className = 'h3';
    
                        divInfos.appendChild(eleH3);
                        divInfos.appendChild(eleH3pre);
    
                        divProdutoAdd.appendChild(imgPro);
                        divProdutoAdd.appendChild(divInfos);
                        
                        divProdutosCar.appendChild(divProdutoAdd);
    
                        somaPrecos += parseFloat(item.valor);
                        document.querySelector('#valtotal h2').innerHTML = `R$${somaPrecos}`;
    
                        const nameProduto = btnAddCar.className;
                        contCar += 1;
                        
                        const itemAdd = {
                            nome: nameProduto,
                            preco: item.valor
                        };
    
                        produtosAddCar.push(itemAdd);
                        document.querySelector('main #car h1').innerHTML = `${contCar}`;
                        console.log(produtosAddCar);
                    }
                });
                
                pagDiv.appendChild(elementoH1);
                pagDiv.appendChild(produtosDiv);
                pagDiv.appendChild(elementoH3);
                pagDiv.appendChild(elementoH4);
                pagDiv.appendChild(btnAddCar);
    
                localDosPro.appendChild(pagDiv);
            }
        }

    )
    .catch(error => console.error(error))


document.querySelector('#car').addEventListener('click', () => {
    document.querySelector('.car').style.display = 'block';
    document.body.classList.add('body-no-scroll');
})

document.querySelector('.car .close').addEventListener('click', () => {
    document.querySelector('.car').style.display = 'none';
    document.body.classList.remove('body-no-scroll');
})

function limparCar() {
    var elementoParaRemover = document.querySelectorAll(".produtoadd");
    for(let i = 0; i < elementoParaRemover.length; i++) {
        elementoParaRemover[i].remove();
    }
    document.querySelector('#valtotal h2').innerHTML = `R$0.00`;
    contCar = 0;
    somaPrecos = 0;
    document.querySelector('#valtotal h2').innerHTML = `R$${somaPrecos}`;
    document.querySelector('main #car h1').innerHTML = '0';
}

function compra() {
    if(somaPrecos == 0) {
        alert('Por favor adcione produtos ao carrinho primeiro!');
    } else {
        alert('Sua compra foi realizada com sucesso!');
    }
};