//seleciona o input amount
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal =  document.querySelector("aside header h2")

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
        //cria o elemento para adicionar o item na lista
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //cria o icone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")
        
        //cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense
        
        //cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name
        
        //adiciona nome e categoria na div das infos da despesa
        expenseInfo.append(expenseName, expenseCategory)

         //cria o elemento da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        //adiciona a img do butao de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "/img/remove.svg");
        removeIcon.setAttribute("alt", "remover");


        //adiciona as informações no item.
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        //adiciona o item na lista.
        expenseList.append(expenseItem)
        
        //limpa o formulario apos adicionar o item
        formClear()

        //atualiza os totais
        updateTotals()

    } catch (error) {
        alert("Não foi possivel atualizar a lista de despesas.")
        console.log(error)
    }
}

function updateTotals(){
    try {
        // recupera todos os itens da lista

        const items = expenseList.children

        //atualiza a quantidade de itens da lista
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        //variavel para incrementar o total.
        let total = 0

        //percorre cada item da lista
        for (let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")

            //remove caracteres não numericos e substitui a virgula pelo ponto
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")

            //converte o valor para float
            value = parseFloat(value)

            //verifica se é um numero valido.
            if (isNaN(value)){
                return alert("Não foi possível calcular o total. O valor não parece ser um número.")
            }

            // incrementar o valor total.
            total += Number(value)
        }

        //cria a span para add o R$ formatado.
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        //Formata o valor e remove o R$ que será exibido pela small com um estilo customizado.
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        //limpa o conteudo do elemento
        expensesTotal.innerHTML = ""
        //adiciona o simbolo da moeda e o valor total formatado
        expensesTotal.append(symbolBRL, total)

    } catch (error) {
        console.log(error)
        alert("Não foi possivel atualizar os totais.")
    }
}

//evento que captura o clique nos itens da lista.
expenseList.addEventListener("click", (event)=>{
    if(event.target.classList.contains("remove-icon")){
        //obtem a li pai do elemento clicado
        const item = event.target.closest(".expense")
        //remove item da lista
        item.remove()
    }
    //atualiza a lista
    updateTotals()
})

function formClear(){
    //limpa os inputs
    expense.value = ""
    category.value = ""
    amount.value = ""

    //coloca o foco no input apos limpar os campos
    expense.focus()
}