//Identificação do arquivo
var dataFunctionsFILE = true

//Verificação de dependencias
if(typeof configFILE === "undefined"){
    alert("Verifique se importou o arquivo config.js")
}

//função que agrega tudo a ser inicializado
function initApp(){
    getAllStoragedData()
}

//Pega tudo do localStorage e mantem na memoria
function getAllStoragedData(){
    tempDB = { ...localStorage }

    if(refreshListOnUpdate){
        updateDataList()
    }
}

//atribui value aos fields existentes
function setExistingValues(){

    let tempTempDB = Object.entries(tempDB);
    tempTempDB.map(entry=>{
        let tempField = document.getElementById(entry[0])
        if(tempField){
            tempField.value = entry[1]
        }else{
            addNewField(entry[0])
            let tempField = document.getElementById(entry[0])
            tempField.value = entry[1]
        }
    })

}

function createNewField(){

    const fieldName = prompt("Qual o nome do campo?")
    addNewField(fieldName)

}

function addNewField(fieldName){
    

    let newInput = document.createElement('input')
    newInput.type = 'text'
    newInput.id = fieldName
    newInput.onblur = ()=>saveFieldData(fieldName)

    let fieldArea = document.getElementById('fieldArea')
    fieldArea.appendChild(newInput)

}

//Limpa todos os dados
function clearAllStoragedData(){
    localStorage.clear()
}

//funcao que recebe o id de um input. o valor desse input é salvo na localStorage
function saveFieldData(fieldID){
    
    saveData(fieldID, document.getElementById(fieldID).value)
}

//função que salva no localStorage
function saveData(field, data){
    localStorage.setItem(field,data)
    getAllStoragedData()
}

//resgata um valor especifico da localStorage
function getData(fieldID){
    return localStorage.getItem(fieldID)
}

//cria uma lista (li) em uma div especificada (place) com um array recebido(data)
async function createDataList(place, data){
    

    let listPlace = document.getElementById(place)
    
    let list = document.createElement('ul')

    list.id = 'dataList'

    tempTempDB = Object.entries(data);

    tempTempDB.map(entry=>{
        let item=document.createElement('li');
    
        list.appendChild(item);

        item.innerHTML=entry[0]+": "+entry[1]+" <spam onclick='cleanItem(\""+entry[0]+"\")'>x</a>";
    })

    listPlace.appendChild(list)

}


function updateDataList(){
    
    let list = document.getElementById('dataList')
    if(!list){
        return
    }

    list.innerHTML = ''

    tempTempDB = Object.entries(tempDB);

    tempTempDB.map(entry=>{
        let item=document.createElement('li');
    
        list.appendChild(item);
        item.innerHTML=entry[0]+": "+entry[1]+" <spam onclick='cleanItem(\""+entry[0]+"\")'>x</a>";
    })

}

function removeItem(key){
    const confirmation = confirm("Deseja apagar esse campo?")
    if(confirmation){
        localStorage.removeItem(key)
        getAllStoragedData()
        setExistingValues()
        updateDataList()
    }
    

}

function cleanItem(key){
    const confirmation = confirm("Deseja apagar esse dado?")
    if(confirmation){
        localStorage.setItem(key,'')
        getAllStoragedData()
        setExistingValues()
        updateDataList()
    }
    

}

initApp()