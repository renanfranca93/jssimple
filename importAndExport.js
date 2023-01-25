//Identificação do arquivo
var importAndExportFILE = true

//Verificação de dependencias
if(typeof dataFunctionsFILE === "undefined"){
    alert("Verifique se importou o arquivo importAndExport.js")
}

//exporta os dados
function exportData() {
    const link = document.createElement("a");
    const file = new Blob([JSON.stringify(tempDB)], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "sample.txt";
    link.click();
    URL.revokeObjectURL(link.href);
 }

 //importa dados
 function importData() {

    let data

    if (document.getElementById('importData').files.length == 0) {
      alert("Erro : Nenhum arquivo selecionado");
      return;
    }
  
    let file = document.getElementById('importData').files[0];
  
    let reader = new FileReader();
  
    reader.addEventListener("load", function (e) {
      
    data = e.target.result;
  
    tempDB = {...JSON.parse(data)}
    saveObject(tempDB)

    });
  
    reader.readAsText(file);
    document.getElementById('importData').value = ''

  }

  //salva objeto no localStorage
function saveObject(data){

  let temp = Object.entries(data);
  temp.map(item=>{
      localStorage.setItem(item[0], item[1])
  })

  setExistingValues()
  updateDataList()

}