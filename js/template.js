let name = document.querySelector('#name')
let purpose = document.querySelector('#purpose')
let weight = document.querySelector('#weight')
let price = document.querySelector('#price')
let addBtn = document.querySelector('#add-btn')
let clearBtn = document.querySelector('#clear-btn')
let delBtn = document.querySelector('#del-btn')
let showBtn = document.querySelector('#show-btn')
let minWeightBtn = document.querySelector('#min-weight-btn')
let addPropertyBtn = document.querySelector('#add-property-btn')
let selectDel = document.querySelector('#select-del')

let adress = ''
let id = 0
let tools = []
class tool {
    constructor(id, name, purpose, weight, price){
        this.id = id
        this.name = name
        this.purpose = purpose
        this.weight = weight
        this.price = price
    }
}

addBtn.onclick = addTool
clearBtn.onclick = clearForm
delBtn.onclick = delTool
showBtn.onclick = showTable
minWeightBtn.onclick = showMinWeightTool
addPropertyBtn.onclick = addPropertyTool

let table = document.querySelector('#my-table')

function showOnlyTable(tools, table){
    table.innerHTML = ''
    let tr = document.createElement('tr')
    
    let tdid = document.createElement('td');
    tdid.innerHTML = 'ID'
    tr.appendChild(tdid)
    let td1 = document.createElement('td');
    td1.innerHTML = 'Название'
    tr.appendChild(td1)
    let td2 = document.createElement('td');
    td2.innerHTML = 'Назначение'
    tr.appendChild(td2)
    let td3 = document.createElement('td');
    td3.innerHTML = 'Вес'
    tr.appendChild(td3)
    let td4 = document.createElement('td');
    td4.innerHTML = 'Цена'
    tr.appendChild(td4)
    let td5 = document.createElement('td');
    td5.innerHTML = 'Адрес'
    tr.appendChild(td5)
    table.appendChild(tr)

    for(let addedTool of tools){
        let tr = document.createElement('tr')
    
        let tdid = document.createElement('td');
        tdid.innerHTML = addedTool.id
        tr.appendChild(tdid)

        let td1 = document.createElement('td');
        td1.innerHTML = addedTool.name
        tr.appendChild(td1)
    
        let td2 = document.createElement('td');
        td2.innerHTML = addedTool.purpose
        tr.appendChild(td2)
    
        let td3 = document.createElement('td');
        td3.innerHTML = addedTool.weight
        tr.appendChild(td3)
    
        let td4 = document.createElement('td');
        td4.innerHTML = addedTool.price
        tr.appendChild(td4)

        let td5 = document.createElement('td');
        td5.innerHTML = adress
        tr.appendChild(td5)
    
        table.appendChild(tr)
    }
    console.log(tools);
}

function addTool(event){
    event.preventDefault()
    if(name.value && purpose.value && weight.value && price.value){
        id++
        addOption = document.createElement('option')
        addOption.value = id
        addOption.innerHTML = id
        selectDel.add(addOption)
        let addedTool = new tool(id, name.value, purpose.value, weight.value, price.value)
        tools.push(addedTool)
        showOnlyTable(tools, table)
    }
}

function clearForm(event){
    event.preventDefault()
    name.value = ''
    purpose.value = ''
    weight.value = ''
    price.value = ''
}

function delTool(event){
    event.preventDefault()
    const index = tools.findIndex(n => n.id == selectDel.value);
    if (index !== -1) {
        tools.splice(index, 1);
    }
    for(let i = 0; i < selectDel.length; i++){
        if(selectDel.value == selectDel[i].value) selectDel.removeChild(selectDel[i]);
    }
    showOnlyTable(tools, table)
}

function showTable(event){
    event.preventDefault()
    document.querySelector('#my-table').classList.remove('hide')
    showOnlyTable(tools, table)
}

function showMinWeightTool(event){
    event.preventDefault()
    document.querySelector('#modal-window-frame').onclick = closeModal;
    let arrWeight = []
    for(let i = 0; i < tools.length; i++){
        arrWeight.push(tools[i].weight)
    }
    let min = arrWeight[0];
    for (let i = 1; i < arrWeight.length; i++) {
      if (parseInt(arrWeight[i]) < parseInt(min)) min = arrWeight[i]
      console.log(min);
    }
    function filterByWeight(item) {
        if (item.weight == min) {
            return true;
        }
        return false;
    }
    let arrMinWeight = tools.filter(filterByWeight);
    console.log(arrMinWeight);
    let tableModal = document.querySelector('#min-table')
    showOnlyTable(arrMinWeight, tableModal)
    document.querySelector('#modal-window-frame').classList.remove('hide')
}

function closeModal(){
    document.querySelector('#modal-window-frame').classList.add('hide');
}

function addPropertyTool(event){
    event.preventDefault()
    adress = document.querySelector('#adress').value
    showOnlyTable(tools, table)
}