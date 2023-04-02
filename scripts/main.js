
/*function teste(a) {
  return a * 2;
}*/

var btnCalcular = document.querySelector("#btnCalcular");

btnCalcular.addEventListener("click", function(event){
  event.preventDefault();
  //console.log("foi clicado");
  //document.writeln("teste");
  
  var area = document.querySelector("#area");
  var PD = document.querySelector("#PD");
  var FS = document.querySelector("#FS");
  var U = document.querySelector("#U");
   
  //--> aqui chama a função, antes de adicionar o elemento no HTML:
  //resultado.textContent = calculo(area.value, PD.value, FS.value, U.value);
  //debugger
  calculo(parseFloat(area.value), parseFloat(PD.value), parseFloat(0.87), parseFloat(5.8));
  calculo(parseFloat(area.value), parseFloat(PD.value), parseFloat(FS.value), parseFloat(U.value));

  // Aqui chama o elemento do HTML
  var divTeste = document.querySelector("#teste")
  
  // E finalmente adiciona-se o elemente
  divTeste.appendChild(max);
  
  //console.log(frmNome.value);

})
