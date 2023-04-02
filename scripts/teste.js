
function teste(a) {
  return a * 2;
}

function goBack() {
  window.history.back()
}

function calculo(area_piso,PD,FS,Ujanela){
var Tmax = 34; //--> VARIAR NA INTERFACE Temperatura máxima externa
var amplitude = 10; //--> VARIAR NA INTERFACE Amplitude térmica diária

fator_amplitude = new Array(0.87,0.92,0.96,0.99,1,0.98,0.93,0.84,0.71,0.56,0.39,0.23,0.11,0.03,0,0.03,0.1,0.21,0.34,0.47,0.58,0.68,0.76,0.82);

Text = new Array(24);

for (i=0;i<24;i=i+1){
    Text[i] = Tmax - (amplitude*fator_amplitude[i]);
}

Tint = new Array(24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24);

let radiacao = [  //linhas = horas, colunas = superfícies (cob, norte, leste, sul, oeste)
[0,0,0,0,0,],
[0,0,0,0,0,],
[0,0,0,0,0,],
[0,0,0,0,0,],
[0,0,0,0,0,],
[73,88,241,108,20,],
[289,203,583,213,38,],
[567,229,746,234,50,],
[801,189,657,194,58,],
[985,155,511,158,63,],
[1105,135,309,138,68,],
[1140,127,65,124,65,],
[1105,135,68,138,309,],
[985,155,63,158,511,],
[801,189,58,194,657,],
[567,229,50,234,746,],
[289,203,38,213,583,],
[73,88,20,108,241,],
[0,0,0,0,0,],
[0,0,0,0,0,],
[0,0,0,0,0,],
[0,0,0,0,0,],
[0,0,0,0,0,],
[0,0,0,0,0,],
];

// --> Aqui iniciam os cálculos dos ganhos de calor por superfície
//var area_piso = 12; //--> VARIAR NA INTERFACE
//var PD = 2.8; //--> VARIAR NA INTERFACE pé-direito
var area_superficie = new Array(12,8,8,8,8); //-->VARIAR NA INTERFACE - ordem: cobertura, norte, leste, sul, oeste
var sol_superficie = new Array(0,0,0,0,1); //-->VARIAR NA INTERFACE
var alfa = 0.026; //-->VARIAR NA INTERFACE - absortância da superfícies (clara ou escura)

// criar matrizes para cálculo das cargas por superfície
var temp_sol_ar = [];
var ganho_superficie = [];
// inicializar as matrizes
for (i = 0; i<24;i++){ // i = linhas = 24 horas
    temp_sol_ar[i] = []; 
    ganho_superficie[i] = [];
    for (j=0;j<5;j++){ // j = colunas = 5 superfícies
        temp_sol_ar[i][j]=0;
        ganho_superficie[i][j]=0;
    }
}

//cálculo da temperatura sol-ar, utilizando a temp externa e radiação solar
for (j=0;j<5;j++){ //j = 5 superfícies
    for (i = 0; i < 24; i++){ // i = horas
        if (sol_superficie[j] == 1) {
            temp_sol_ar[i][j] = Text[i] + alfa*radiacao[i][j];
        } else {
            temp_sol_ar[i][j] = Text[i];
        }
    }
}

// criar matrizes dos fatores de resposta de cada superfície
//--> VARIAR NA INTERFACE POR TIPO DE SISTEMA CONSTRUTIVO total de 7 fatores de resposta
var bn = [];
var cn = [];
var dn = [];
// inicializar as matrizes
for (i=0 ; i<=4; i++){ // total de 5 superfícies
    bn[i] = [];
    dn[i] = [];
    for (j=0 ; j<=6; j++){ // total de 7 fatores
        bn[i][j]=0;
        dn[i][j]=0;
    }
}

for (i = 0 ; i<=4; i++){ // total de 5 superfícies
    if (i == 0) { // cobertura
        bn[i][0] = 0.01614;
        bn[i][1] = 0.17494;
        bn[i][2] = 0.11764;
        bn[i][3] = 0.00668;
        bn[i][4] = 0.00001;
        bn[i][5] = 0;
        bn[i][6] = 0;

        cn[i] = 0.315425;

        dn[i][0] = 0;
        dn[i][1] = -0.97905;
        dn[i][2] = 0.13444;
        dn[i][3] = -0.00272;
        dn[i][4] = 0;
        dn[i][5] = 0;
        dn[i][6] = 0;

    } else { // paredes
        bn[i][0] = 0.00140;
        bn[i][1] = 0.07639;
        bn[i][2] = 0.17535;
        bn[i][3] = 0.05098;
        bn[i][4] = 0.00179;
        bn[i][5] = 0;
        bn[i][6] = 0;

        cn[i] = 0.305873;

        dn[i][0] = 0;
        dn[i][1] = -1.16040;
        dn[i][2] = 0.32547;
        dn[i][3] = -0.02746;
        dn[i][4] = 0.00021;
        dn[i][5] = 0;
        dn[i][6] = 0;
    }
}

var horai;
var superficie;
var count;
for (superficie = 0; superficie <= 4; superficie ++ ){
    for (count=0 ; count<=4 ; count++){  //5 iterações
        for (i=0; i<=23; i++){ // 24 horas
            var SomaBn = 0;
            var SomaDn = 0;
            for (j=0 ; j<=6; j++){ // 0 a 6 fatores de resposta
                if ((i - j) < 0) {
                    horai = 24;
                } else {
                    horai = i;
                }
                //document.writeln(bn[superficie][j]);
                SomaBn = SomaBn + bn[superficie][j] * temp_sol_ar[horai - j][superficie];
                if (j < 6) {
                    if (i == 0 ) {
                        horai = 23 - j;
                    } else {
                        if ((i - j) <= 0){
                            horai = 23 - j + 1;
                        } else {
                            horai = i - j - 1;
                        }
                    }
                    SomaDn = SomaDn + dn[superficie][j+1] * ganho_superficie[horai][superficie];
                }
            }
            SomaDn = SomaDn / area_superficie[superficie];
            ganho_superficie[i][superficie] = area_superficie[superficie] * (SomaBn - SomaDn - (Tint[i]* cn[superficie]));
            //document.writeln(ganho_superficie[i][superficie]+"<br>")
        }
    }
}

// ATENÇÃO ---- DEVO CRIAR UMA ROTINA PARA FLUXO DE CALOR POR PAREDES INTERNAS. 
ganho_total_superficies = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
for (i=0; i<24; i++){ 
    for (superficie = 0; superficie < 5; superficie ++ ){
        ganho_total_superficies[i] += ganho_superficie[i][superficie];
    }
    //document.writeln(ganho_total_superficies[i]+"<br>")
}


// --> Fim dos cálculos dos ganhos de calor por superfície

// --> início do ganho de calor por janelas
//var Ujanela = 5.8; // --> VARIAR NA INTERFACE
//var FS = 0.87; // --> VARIAR NA INTERFACE
area_janela = new Array (0, 0, 0, 2); // --> VARIAR NA INTERFACE - ORDEM: Norte, Leste, Sul, Oeste
var conducao_janela = [];
var radiacao_janela = [];
radiacao_janelas_total = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var janela;
// inicializar a matriz dos ganhos
for (i=0 ; i<24; i++){ // total de 24 horas
    conducao_janela[i] = [];
    radiacao_janela[i] = [];
    for (j=0 ; j<4; j++){ // total de 4 janelas permitidas
        conducao_janela[i][j]=0;
        radiacao_janela[i][j]=0;
        //document.writeln(conducao_janela[i][j]+"<br>")
    }
}


for (janela = 0; janela < 4; janela++ ){ // 4 superfícies 
    for (i=0; i<24; i++){ // 24 horas
        conducao_janela[i][janela] = area_janela[janela] * Ujanela * (Text[i] - Tint[i]);
        radiacao_janela[i][janela] = sol_superficie[janela+1]*area_janela[janela] * FS * radiacao[i][janela + 1]; // aqui eu usei janela + 1 porque a cobertura não terá janelas
        radiacao_janelas_total[i] += radiacao_janela[i][janela];
        //document.writeln(radiacao_janelas_total[i]+"<br>")
    }
}

// --> fim do ganho de calor por janelas

// --> início do cálculo dos ganhos e carga térmica por fontes internas
var num_pessoas = 2; //--> VARIAR NA INTERFACE
var equipamentos = 150; //--> VARIAR NA INTERFACE
var iluminacao = 40; //--> VARIAR NA INTERFACE
var infiltracao = 0.5; //--> DEIXAR TRAVADO POR ENQUANTO, E 24 HORAS POR DIA
schedule = new Array(0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0); //--> VARIAR NA INTERFACE

ganho_pessoas_sens = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
ganho_equipamentos = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
ganho_iluminacao = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
ganho_infiltracao_sens = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
carga_conveccao = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
carga_radiante = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

//ganhos convectivos
var hora;
for (hora=0; hora<24; hora++){
    ganho_pessoas_sens[hora] = 70 * num_pessoas * schedule[hora]; // considerei 70 W de calor sensível
    ganho_equipamentos[hora] = equipamentos * schedule[hora];
    ganho_iluminacao[hora] = iluminacao * schedule[hora];
    ganho_infiltracao_sens[hora] = 1230 * area_piso * PD * infiltracao * (Text[hora] - Tint[hora])/3600;

    for (janela=0; janela<4; janela++){
        carga_conveccao[hora] += conducao_janela[hora][janela]; //soma os ganhos por condução das 4 janelas
    }
    carga_conveccao[hora] += ganho_infiltracao_sens[hora] + 0.67 * ganho_pessoas_sens[hora] 
    carga_conveccao[hora] += 0.5 * (ganho_equipamentos[hora] + ganho_iluminacao[hora]); //considerei 50% de parcela convectiva
    //document.writeln(carga_conveccao[hora]+"<br>")
}

//carga radiante
var w1 = -0.93 //--> TRAVEI PARA UM SISTEMA CONSTRUTIVO APENAS
v_pes_equip = new Array(0.197, -0.127);
v_ilum = new Array(0.55, -0.48);
v_solar = new Array(0.197, -0.127);
v_conducao = new Array(0.681, -0.611);

carga_rad_janelas = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
carga_rad_pessoas = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
carga_rad_equipamentos = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
carga_rad_iluminacao = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
carga_superficies = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

// carga radiante por janelas
var iteracao;
for (iteracao = 0; iteracao < 6; iteracao++){ // 5 iterações
    for (hora = 0; hora < 24; hora++ ) {
       if (hora == 0){
        horai = 23;
        } else {
        horai = hora - 1;
        }
        carga_rad_janelas[hora] = v_solar[0] * radiacao_janelas_total[hora] + v_solar[1] * radiacao_janelas_total[horai] ;
        carga_rad_janelas[hora] -= w1 * carga_rad_janelas[horai] ;
        //document.writeln(carga_rad_janelas[hora]+"<br>");

        carga_rad_pessoas[hora] = v_pes_equip[0] * ganho_pessoas_sens[hora] * 0.33 + v_pes_equip[1] * ganho_pessoas_sens[horai] * 0.33;
        carga_rad_pessoas[hora] -= w1 * carga_rad_pessoas[horai];
        //document.writeln(carga_rad_pessoas[hora]+"<br>");

        carga_rad_equipamentos[hora] = v_pes_equip[0] * ganho_equipamentos[hora] * 0.5 + v_pes_equip[1] * ganho_equipamentos[horai] * 0.5;
        carga_rad_equipamentos[hora] -= w1 * carga_rad_equipamentos[horai];
        //document.writeln(carga_rad_equipamentos[hora]+"<br>");

        carga_rad_iluminacao[hora] = v_ilum[0] * ganho_iluminacao[hora] * 0.5 + v_ilum[1] * ganho_iluminacao[horai] * 0.5;
        carga_rad_iluminacao[hora] -= w1 * carga_rad_iluminacao[horai];
        //document.writeln(carga_rad_iluminacao[hora]+"<br>");

        carga_superficies[hora] = v_conducao[0] * ganho_total_superficies[hora] + v_conducao[1] * ganho_total_superficies[horai];
        carga_superficies[hora] -= w1 * carga_superficies[horai];
        //document.writeln(carga_superficies[hora]+"<br>");
        
    }
}

carga_total_sensivel = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
for (hora = 0; hora < 24; hora++ ) {
    carga_total_sensivel[hora] = carga_conveccao[hora] + carga_rad_janelas[hora] + carga_rad_pessoas[hora];
    carga_total_sensivel[hora] += carga_rad_equipamentos[hora] + carga_rad_iluminacao[hora] + carga_superficies[hora];
    carga_total_sensivel[hora] = parseInt(carga_total_sensivel[hora]);
    //document.writeln(carga_total_sensivel[hora]+"<br>");
}


//identifica o valor máximo de carga térmica
var max = 0;
for (hora = 0; hora < 24; hora++ ) {
  if (carga_total_sensivel[hora] > max){
    max = carga_total_sensivel[hora];
  }
}
document.writeln(max);


// --> fim do cálculo dos ganhos por cargas internas
}