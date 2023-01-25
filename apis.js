//Identificação do arquivo
var apisFILE = true

let api = {
    github:'https://api.github.com/users/renanfranca93'
}

async function getDataFromApi(api) {
    const response = await fetch(api)
    const data = await response.json()
    console.log(data)
  }