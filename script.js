const despesasInfo = document.getElementById("despesasInfo");
const descricao = document.getElementById("descricao");

var listaDespesas = [];
var organizadorDespesas = [];

//Essa função é a resposável por adicionar despesas novas à lista
function adicionarDespesa(){
    const vencimento = document.getElementById("vencimentoDespesa").value;
    const valorDespesa = parseInt(document.getElementById("valorDespesa").value);
    const nome = document.getElementById("nomeDespesa").value;
    
    //Ele compara se o valor da despesa é um número >=1
    if(typeof valorDespesa === typeof 1 && valorDespesa >=1){
        //E cria um objeto despesa
        const despesa = {
            nome: nome,
            valorDespesa: valorDespesa,
            vencimento: vencimento          
        };
        //Depois, o objeto é mandado para a lista de despesas e posteriormente exibido
        listaDespesas.push(despesa);
        exibirDespesas();
    }else{
        console.warn("Valor de despesa inválido");
    } 
}

//Esta é a função de exibição
function exibirDespesas(){
    //Zeramos a lista e alteramos o nome para mostrar o estado atual
    descricao.innerHTML = "Lista de Despesas";
    despesasInfo.innerHTML = "";
    listaDespesas.forEach(function(despesa, indice){
        const listItem = document.createElement("li");
        listItem.innerHTML = `Índice: ${indice}, Nome: ${despesa.nome}, Valor: R$${despesa.valorDespesa}, Vencimento: ${despesa.vencimento}`;
        despesasInfo.appendChild(listItem);
    })
}

//Convertemos para JSON para realizarmos o download da lista
function downloadJson(){
    const dadosJSON = JSON.stringify(listaDespesas);
    const blob = new Blob([dadosJSON], {type: "application/json"});

    //Criar um URL temporário para o Blob
    const url = URL.createObjectURL(blob);

    const linkDownload = document.createElement("a");
    linkDownload.href = url;
    linkDownload.download = "dados_despesas.json";

    document.body.appendChild(linkDownload);

    linkDownload.click();

    URL.revokeObjectURL(url);
}

//Função que excluí despesas
function excluirDespesa(){
    //Para a exclusão, primeiramente verificamos se o número fornecido pelo usuário é válido
    const indiceExclusao = parseInt(document.getElementById("indiceExclusao").value);
    if(typeof indiceExclusao === typeof 2){
        listaDespesas.forEach(function(despesa, indice){
            //Depois disso, rodamos pela nossa lista e pegamos os objetos que possuem o índice diferente 
            //do pedido
            if(indiceExclusao != indice){
                //Em seguida, armazenamos eles em uma lista diferente
                organizadorDespesas.push(despesa);
            }
        })
    }else{
        console.log("Índice Inválido");
    }
    //Aqui, transferirmos nova lista para a outra, substituindo ela e zerando a organizacional
    listaDespesas = organizadorDespesas;
    organizadorDespesas = [];
    exibirDespesas();
}

//Aqui, apenas zeramos todas as listas e exibimos as despesas
function excluirTodasDespesas(){
    listaDespesas = [];
    organizadorDespesas = [];
    exibirDespesas();
}
// Função de Maior despesa:
function maiorDespesa(){
    let maiorDespesa = 0;
    let indiceMaiorDepesa = 0;
    //Primeiramente, buscamos qual a maior despesa e pegamos seu índice
    listaDespesas.forEach(function(despesa, indice){
        
        if(maiorDespesa < despesa.valorDespesa){
            maiorDespesa = despesa.valorDespesa;
            indiceMaiorDepesa = indice;
        }
    })
    //Em seguida, rodamos a lista novamente para realizar a exibição da maior despesa
    listaDespesas.forEach(function(despesa, indice){
        if(indiceMaiorDepesa == indice){
            //Aqui, alteramos também o nome exibido para enfatizarmos a função
            despesasInfo.innerHTML = "";
            const listItem = document.createElement("li");
            listItem.innerHTML = `Índice: ${indice}, Nome: ${despesa.nome}, Valor: R$${despesa.valorDespesa}, Vencimento: ${despesa.vencimento}`;
            despesasInfo.appendChild(listItem);
            descricao.innerHTML = "A Despesa Mais Alta é";
        }
    })

}
// Função de Total de despesas:
function totalDespesas(){
    //Nesta função, apenas somamos todas despesas
    total = 0;
    listaDespesas.forEach(function(despesa){
        total += despesa.valorDespesa;
    })
    despesasInfo.innerHTML = "";
    descricao.innerHTML = `O Total de Despesas é R$${total}`;
    return total;
}

//Função que Calcula a Média das despesas
function calcularMedia(){
    //E nesta, chamamos o total e depois dividimos pelo número de despesas
    let total = totalDespesas();
    let media = total / listaDespesas.length;
    despesasInfo.innerHTML = "";
    descricao.innerHTML = `A Média das Despesas é R$${media}`;
    console.log(media);
}
