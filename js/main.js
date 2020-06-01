let data;
let miPais=0;
renderData()

async function getData() {
  const response = await fetch('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest')
  const data = await response.json()
  return data
}

function renderExtraData({ confirmed, deaths, recovered, provincestate, countryregion }) {
  let contenedor = 'item'
  if(countryregion=='Argentina' && miPais==0){
    contenedor = 'local'
    miPais=1;
  }
  document.querySelector(`#${contenedor}`).innerHTML+= (`
    <div class="${contenedor} col-md-4 col-sm-6">
      <p> <strong class="text-uppercase">${countryregion}</strong> </p>
      <p class="text-primary text-capitalize"> confirmados: ${confirmed} </p>
      <p class="text-danger text-capitalize"> muertes: ${deaths} </p>
      <p class="text-success text-capitalize"> recuperados: ${recovered} </p>
    </div>
  `)
}    


async function renderData() {
  data = await getData()
/*       
    data.forEach(item => {
    renderExtraData(item);
  }) 
*/

  data.map (item =>{
    renderExtraData(item)
  })
}

const updateResult = query => {
let resultList = document.querySelector("#item");
resultList.innerHTML = "";

data.map(myresult =>{
query.split(" ").map(word =>{
        if(myresult.countryregion.toLowerCase().indexOf(word.toLowerCase()) != -1){
            renderExtraData(myresult)
        }
    })
})
}

//updateResult("")