//seleciona o input amount
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//evento para detectar a entrada de valor no input
amount.oninput = () => {
    //regex para negar entrada de caracteres no input
    let value = amount.value.replace(/\D/g, "")

    //transforma de texto para numerico
    value = Number(value) / 100

    //retorna o valor formatado pela função reescrevendo o valor do input
    amount.value = formatCurrencyBRL(value)
}

//função que pega o valor do amount e formata para a moeda local
function formatCurrencyBRL(value){
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
    return value
}

//captura o evento de envio do formulario
form.onsubmit = (e) =>{
    e.preventDefault();

    //cria um objeto com os detalhes da nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    expenseAdd(newExpense)
}

function expenseAdd(newExpense){
    try {
        
    } catch (error) {
        alert("Não foi possivel atualizar a lista de despesas.")
        console.log(error)
    }
}