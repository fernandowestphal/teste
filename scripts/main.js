
function teste(a) {
  return a * 2;
}

function goBack() {
  window.history.back()
}

function calculo(regiao,area_piso,PD,tipo_vidro,composicao,area_par, cor_par, orientacao,pessoas, iluminacao, equipamentos,horario,cob_exposta,cor_cobertura,area_janela){

    var COP = 3; //travei o COP do ar-condicionado!

    var regiao_id;
    var Tmax;
    var amplitude;
    var dias_consumo;
    if (regiao == "norte"){
        regiao_id = 0;
        Tmax = 36;
        amplitude = 10;
        dias_consumo = 0.7 * 365;
    } else {
        if (regiao == "centro"){
            regiao_id = 1;
            Tmax = 34;
            amplitude = 10;
            dias_consumo = 0.5 * 365;
        } else {
            regiao_id = 2;
            Tmax = 32;
            amplitude = 10;
            dias_consumo = 0.45 * 365;
        }
    }


    fator_amplitude = new Array(0.87,0.92,0.96,0.99,1,0.98,0.93,0.84,0.71,0.56,0.39,0.23,0.11,0.03,0,0.03,0.1,0.21,0.34,0.47,0.58,0.68,0.76,0.82);  

    Text = new Array(24);   

    for (i=0;i<24;i=i+1){
        Text[i] = Tmax - (amplitude*fator_amplitude[i]);
    }   

    Tint = new Array(24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24);
    var radiacao_centro = [  //linhas = horas, colunas = superfícies (cob, norte, leste, sul, oeste)
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
    [0,0,0,0,0,]
    ];  

    var radiacao_sul = [  //linhas = horas, colunas = superfícies (cob, norte, leste, sul, oeste)
    [0,0,0,0,0,],
    [0,0,0,0,0,],
    [0,0,0,0,0,],
    [0,0,0,0,0,],
    [0,0,0,0,0,],
    [114,25,340,142,25,],
    [345,43,633,188,43,],
    [588,50,715,143,50,],
    [804,58,667,75,58,],
    [985,117,517,63,63,],
    [1099,170,309,68,68,],
    [1134,179,65,65,65,],
    [1099,170,68,68,309,],
    [985,117,63,63,517,],
    [804,58,58,78,667,],
    [588,50,50,143,715,],
    [345,43,43,188,633,],
    [114,25,25,142,340,],
    [0,0,0,0,0,],
    [0,0,0,0,0,],
    [0,0,0,0,0,],
    [0,0,0,0,0,],
    [0,0,0,0,0,],
    [0,0,0,0,0,]
    ];  

    var radiacao_norte = [  //linhas = horas, colunas = superfícies (cob, norte, leste, sul, oeste)
    [0,0,0,0,0,],
    [0,0,0,0,0,],
    [0,0,0,0,0,],
    [0,0,0,0,0,],
    [0,0,0,0,0,],
    [0,0,22,59,0,],
    [185,49,490,220,30,],
    [466,104,705,301,48,],
    [739,146,689,331,55,],
    [954,181,547,336,63,],
    [1091,204,326,332,68,],
    [1129,205,65,327,65,],
    [1091,204,68,332,326,],
    [954,181,63,336,547,],
    [739,146,55,331,689,],
    [466,104,48,301,705,],
    [185,49,30,220,490,],
    [0,0,0,59,2,],
    [0,0,0,0,0,],
    [0,0,0,0,0,],
    [0,0,0,0,0,],
    [0,0,0,0,0,],
    [0,0,0,0,0,],
    [0,0,0,0,0,]
    ];  

    var radiacao = [radiacao_norte, radiacao_centro, radiacao_sul]; 

    // --> Aqui iniciam os cálculos dos ganhos de calor por superfície
    //var area_piso = 12; //--> VARIAR NA INTERFACE
    //var PD = 2.8; //--> VARIAR NA INTERFACE pé-direito
    var area_superficie = new Array(area_piso,0,0,0,0); //-->VARIAR NA INTERFACE - ordem: cobertura, norte, leste, sul, oeste
    var sol_superficie = new Array(0,0,0,0,0); //-->VARIAR NA INTERFACE
    var alfa = new Array(0.026,0.026,0.026,0.026,0.026,);
    if (cor_par == "escura"){
        alfa[1] = 0.052;
        alfa[2] = 0.052;
        alfa[3] = 0.052;
        alfa[4] = 0.052;
    }   

    switch (orientacao){
        case "norte":
            area_superficie[1] = area_par;
            sol_superficie[1] = 1;

            break;
        case "leste":
            area_superficie[2] = area_par;
            sol_superficie[2] = 1;
            break;
        case "sul":
            area_superficie[3] = area_par;
            sol_superficie[3] = 1;
            break;
        case "oeste":
            area_superficie[4] = area_par;
            sol_superficie[4] = 1;
            break;
    }   

    if (cob_exposta=="sim"){
        sol_superficie[0]=1;
    }   

    if (cor_cobertura=="escura"){
        alfa[0] = 0.052;
    }   

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
                temp_sol_ar[i][j] = Text[i] + alfa[j] * radiacao[regiao_id][i][j];
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
        if (area_superficie[superficie] > 0 ){
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
        } else {
            for (i=0; i<=23; i++){
                ganho_superficie[i][superficie] = 0;
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
    //area_janela = new Array (0, 0, 0, 2); // --> VARIAR NA INTERFACE - ORDEM: Norte, Leste, Sul, Oeste
    var conducao_janela = [];
    var radiacao_janela = [];
    radiacao_janelas_total = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
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

    var FS;
    switch (tipo_vidro){
        case "incolor":
            FS = 0.87;
            break;
        case "colorido":
            FS = 0.60;
            break;
        case "refletivo":
            FS = 0.45;
            break;
        case "refletivo_alta":
            FS = 0.30;
            break;
    }   
    var Ujanela; 
    switch (composicao){
        case "monolitico":
            Ujanela = 5.8;
            break;
        case "laminado":
            Ujanela = 5.6;
            break;
        case "insulado":
            Ujanela = 2.8;
            break;
        case "insulado_lowe":
            Ujanela = 1.8;
            break;
    }   

    var janela; 
    for (janela = 0; janela < 4; janela++ ){ // 4 superfícies 
        if (sol_superficie[janela + 1] == 1){ // Usei [janela + 1] porque o primeiro item de superfície é a cobertura 
            for (i=0; i<24; i++){ // 24 horas
                conducao_janela[i][janela] = area_janela * Ujanela * (Text[i] - Tint[i]);
                radiacao_janela[i][janela] = area_janela * FS * radiacao[regiao_id][i][janela + 1]; // aqui eu usei janela + 1 porque a cobertura não terá janelas
                radiacao_janelas_total[i] += radiacao_janela[i][janela];
                //document.writeln(radiacao_janelas_total[i]+"<br>")
            }
        }

    }   

    // --> fim do ganho de calor por janelas    

    // --> início do cálculo dos ganhos e carga térmica por fontes internas
    //var num_pessoas = 2; //--> VARIAR NA INTERFACE
    //var equipamentos = 150; //--> VARIAR NA INTERFACE
    //var iluminacao = 40; //--> VARIAR NA INTERFACE
    var infiltracao = 0.5; //--> DEIXAR TRAVADO POR ENQUANTO, E 24 HORAS POR DIA    

    switch (horario){
        case "escritorio": 
            schedule = new Array(0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0); 
            break;
        case "dormitorio":
            schedule = new Array(1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1);
            break;
        case "24horas":
            schedule = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
            break;
    }   

    ganho_pessoas_sens = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    ganho_equipamentos = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    ganho_iluminacao = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    ganho_infiltracao_sens = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    carga_conveccao = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    carga_radiante = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);    

    //ganhos convectivos
    var hora;
    for (hora=0; hora<24; hora++){
        ganho_pessoas_sens[hora] = 70 * pessoas * schedule[hora]; // considerei 70 W de calor sensível
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

    //identifica o valor máximo de carga térmica e calcula o consumo
    var max = 0;
    var consumo = 0;

    for (hora = 0; hora < 24; hora++ ) {
        if (carga_total_sensivel[hora] > max){
            max = carga_total_sensivel[hora];
        }
        if (schedule[hora] == 1){
            consumo += carga_total_sensivel[hora];
        }
    }
    consumo = dias_consumo * (consumo / 1000) / COP;
    return [max, consumo];
    
    // --> fim do cálculo dos ganhos por cargas internas
}

var btnCalcular = document.querySelector("#btnCalcular");

btnCalcular.addEventListener("click", function(event){
    event.preventDefault();
    //debugger;
    //var area_piso = document.querySelector("#area");
    var regiao = document.getElementById('regiao').value;
    var area_piso = parseFloat(document.getElementById('area_piso').value);
    var PD = parseFloat(document.getElementById('PD').value);
    var area_par = parseFloat(document.getElementById('area_par').value);
    var cor_par = document.getElementById('cor_par').value;
    var orientacao = document.getElementById('orientacao').value;
    var pessoas =  parseFloat(document.getElementById('pessoas').value);
    var iluminacao =  parseFloat(document.getElementById('iluminacao').value);
    var equipamentos =  parseFloat(document.getElementById('equipamentos').value);
    var horario = document.getElementById('horario').value;
    var cob_exposta = document.getElementById('cob_exposta').value;
    var cor_cobertura = document.getElementById('cor_cob').value;
    var area_janela = parseFloat(document.getElementById('area_janela').value);
    var tipo_vidro = document.getElementById('tipo_vidro').value;
    var composicao = document.getElementById('composicao').value;

    //console.log(horario);
  
    var carga_referencia = calculo(regiao,area_piso, PD, "incolor", "monolitico", area_par,cor_par,orientacao, pessoas, iluminacao, equipamentos,horario,cob_exposta,cor_cobertura,area_janela)[0];
    var carga_modelo = calculo(regiao,area_piso, PD, tipo_vidro, composicao,area_par,cor_par,orientacao, pessoas, iluminacao, equipamentos,horario,cob_exposta,cor_cobertura,area_janela)[0];
    var reducao = parseInt((carga_referencia - carga_modelo) * 3.41);

    var consumo_referencia = calculo(regiao,area_piso, PD, "incolor", "monolitico", area_par,cor_par,orientacao, pessoas, iluminacao, equipamentos,horario,cob_exposta,cor_cobertura,area_janela)[1];
    var consumo_modelo = calculo(regiao,area_piso, PD, tipo_vidro, composicao,area_par,cor_par,orientacao, pessoas, iluminacao, equipamentos,horario,cob_exposta,cor_cobertura,area_janela)[1];
    var economia = consumo_referencia - consumo_modelo;
    consumo_referencia = consumo_referencia.toFixed(1);
    consumo_modelo = consumo_modelo.toFixed(1);
    var economia_reais = economia * parseFloat(document.getElementById('tarifa').value);
    var payback = parseFloat(document.getElementById('custo_vidro').value) / economia_reais;
    economia_reais = economia_reais.toFixed(2);
    economia = economia.toFixed(1);
    payback = payback.toFixed(1);

    document.getElementById("res_referencia").innerHTML= "Pico de carga - Referência: " + carga_referencia + " W";
    document.getElementById("res_modelo").innerHTML="Pico de carga - Modelo : " + carga_modelo + " W";
    document.getElementById("res_reducao").innerHTML="Redução na carga térmica : " + reducao + " BTU/h";
    document.getElementById("res_economia_kwh").innerHTML="Economia de energia: " + consumo_referencia + " - " + consumo_modelo + " = " + economia + " kWh ao ano";
    document.getElementById("res_economia_reais").innerHTML="Economia em custo: R$ " + economia_reais;
    if (payback >= 2){
        document.getElementById("payback").innerHTML="Payback: " + payback + " anos";
    } else {
        document.getElementById("payback").innerHTML="Payback: " + payback + " ano";
    }
    

    /*document.getElementById("res_referencia").innerHTML= "Referência: " + calculo(area_piso, PD, 0.87, 5.8, area_par,cor_par,orientacao, pessoas, iluminacao, equipamentos,horario,cob_exposta,cor_cobertura,area_janela) 
    + " W";
    document.getElementById("res_modelo").innerHTML="Modelo : " + calculo(area_piso, PD, FS, Ujanela,area_par,cor_par,orientacao, pessoas, iluminacao, equipamentos,horario,cob_exposta,cor_cobertura,area_janela)
    + " W";
    */
})
