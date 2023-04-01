<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  <style type="text/css">
<!--
.style4 {font-family: tahoma; font-size: 12px; font-weight: bold; }
.style5 {font-size: 12px; font-family: tahoma;}
.style6 {font-size: 12px; font-family: tahoma; color: #FFFFFF; }
.style8 {font-family: tahoma; font-size: 12px; font-weight: bold; color: #0000FF; }
-->
  </style>
</head>
<body>
 <table align="center" border="0" cellpadding="15" width="590">
    <tbody>
      <tr>
        <td colspan="1" rowspan="1" align="left" height="50"> <font
 face="tahoma" size="3"><b>NBR10821
- Esquadrias para edifica&ccedil;&otilde;es. <br>
Parte 4:
Requisitos adicionais de desempenho <br>
        </b></font><b><font color="#696969" face="tahoma" size="2">4.2.3
- Conforto t&eacute;rmico<br>
4.2.3.2 - Classifica&ccedil;&atilde;o e desempenho - PLANILHA
DE C&Aacute;LCULO</font></b>
        </td>
         <td><img
 src="images/etiqueta_final_red.jpg" alt="Etiqueta"
 style="width: 51px; height: 81px;"></td>

      </tr>
    </tbody>
  </table>
  <table
 style="width: 590px; text-align: left; margin-left: auto; margin-right: auto;"
 border="0" cellpadding="5" cellspacing="5">
    <tbody>
      <tr>
        <td style="width: 158px;" colspan="3" bgcolor="#000000">
        <p class="style6"><br>
        </p>
        </td>
      </tr>
    <tr>
      <td><span class="style8">Par&acirc;metros de Entrada</span></td>
    </tr>
  </tbody>
</table>

<?php

function pv($pv_var){
//muda ponto para virgula ou vice-versa
$pv_tipo='.';
for ($f=0; $f<=strlen(strval($pv_var))-1; $f++) {
  //if ($pv_var[$f] == '.') $pv_tipo = '.';
  if ($pv_var[$f] == ',') $pv_tipo = ',';
  //echo $pv_var[$f];
}
if ($pv_tipo == ',') {
  return number_format(str_replace(',','.',$pv_var)+0,2);
 }
else {
  return number_format($pv_var+0,2);
  }
}

$txt;
global $Rvj;
global $Uf;
global $SHGCg;
global $Ug;
global $Tvg;
//$Rvj = number_format(pv($_POST['Rvj'], 3, ".", ","));
$Rvj = pv($_POST['Rvj']);
$Uf = pv($_POST['Uf']);
$SHGCg = pv($_POST['SHGCg']);
$Ug = pv($_POST['Ug']);
$Tvg = pv($_POST['Tvg']);

global $SHGC;
global $Uo;
global $Tv;
global $UoUg;

//Variáveis: graus-hora de cada zona
global $GHzn1;
global $GHzn2;
global $GHzn3;

//Variáveis: nível de classificação de cada zona
global $nivelzn1;
global $nivelzn2;
global $nivelzn3;

//Variáveis: cor da classificação de cada zona, para colocar no fundo da célula com o nível
global $corzn1;
global $corzn2;
global $corzn3;

$SHGC = $Rvj * $SHGCg;
$Uo = $Uf*(1-$Rvj)+$Ug*$Rvj;
$Tv = $Rvj * $Tvg;
$UoUg = $Uo/$Ug;

echo ("<table class='style5' width='590' align='center' border='0' cellspacing='0' cellpadding='5'><tr>");
echo ("<td align='right' width='50%'><b>&Aacute;rea de vidro(adim.): </b></td><td align='left'>") . $Rvj;
echo ("</td></tr><tr><td align='right'><B>Uf(W/m&sup2;.K): </b></td><td align='left'>") . $Uf;
echo ("</td></tr><tr><td align='right'><B>SHGCg(adim.): </b></td><td align='left'>") . $SHGCg;
echo ("</td></tr><tr><td align='right'><B>Ug(W/m&sup2;.K): </b></td><td align='left'>") . $Ug;
echo ("</td></tr><tr><td align='right'><B>Tvg(adim.): </b></td><td align='left'>") . $Tvg;
echo ("</td></tr></table>");

echo ("<table class='style5' width='590' align='center' border='0' cellspacing='0' cellpadding='5'>");
echo ("<tr><td class='style8'>Par&acirc;metros Calculados</td></tr>");

echo ("<tr><td style='text-align: right; width: 50%;'><b>SHGC(adim.): </b></td><td align='left'>") . $SHGC . ("</td></tr>");
echo ("<tr><td align='right'><B>Uo(W/m&sup2;.K): </b></td><td align='left'>") . round($Uo,2) . ("</td></tr>");
echo ("<tr><td align='right'><B>Tv(adim.): </b></td><td align='left'>") . $Tv . ("</td></tr>");
echo ("<tr><td align='right'><B>Uo/Ug(W/m&sup2;.K): </b></td><td align='left'>") . round($UoUg,2) . ("</td></tr>");
echo ("</table>");

//Cálculo de Graus-hora para Zona 1
$GHzn1 = 71605 * $SHGC + 226 * $Uo + 11920 * $Tv - 1459 * $UoUg + 17113;
//Cálculo de Graus-hora para Zona 2
$GHzn2 = 12061 * $SHGC + 84 * $Uo + 926 * $Tv - 981 * $UoUg + 4686;
//Cálculo de Graus-hora para Zona 3
$GHzn3 = 10862 * $SHGC + 463 * $Uo + 264 * $Tv + 897 * $UoUg + 17825;

if ($GHzn1 <= 39000){
  $nivelzn1 = "A";
  $corzn1 = "#228B22";
  }
elseif ($GHzn1 <= 46000){
  $nivelzn1 = "B";
  $corzn1 = "#ADFF2F";
  }
elseif ($GHzn1 <= 54000){
  $nivelzn1 = "C";
  $corzn1 = "#FFFF00";
  }
elseif ($GHzn1 <= 64000){
  $nivelzn1 = "D";
  $corzn1 = "#FFA500";
  }
else{
  $nivelzn1 = "E";
  $corzn1 = "#FF0000";
  }

if ($GHzn2 <= 7800){
  $nivelzn2 = "A";
  $corzn2 = "#228B22";
  }
elseif ($GHzn2 <= 8600){
  $nivelzn2 = "B";
  $corzn2 = "#ADFF2F";
  }
elseif ($GHzn2 <= 9400){
  $nivelzn2 = "C";
  $corzn2 = "#FFFF00";
  }
elseif ($GHzn2 <= 10200){
  $nivelzn2 = "D";
  $corzn2 = "#FFA500";
  }
else{
  $nivelzn2 = "E";
  $corzn2 = "#FF0000";
  }

if ($GHzn3 <= 22500){
  $nivelzn3 = "A";
  $corzn3 = "#228B22";
  }
elseif ($GHzn3 <= 23500){
  $nivelzn3 = "B";
  $corzn3 = "#ADFF2F";
  }
elseif ($GHzn3 <= 24500){
  $nivelzn3 = "C";
  $corzn3 = "#FFFF00";
  }
elseif ($GHzn3 <= 25500){
  $nivelzn3 = "D";
  $corzn3 = "#FFA500";
  }
else{
  $nivelzn3 = "E";
  $corzn3 = "#FF0000";
  }
  
echo ("<table class='style5' width='590' align='center' border='0' cellspacing='0' cellpadding='5'>");
echo ("<tr><td class='style8'>Graus-hora de desconforto</td></tr>");
echo ("<tr><td align='right' width='50%'><b>Zona 1: </b></td><td align='left'>") . round($GHzn1) . ("</td><td bgcolor=") . $corzn1 . (">N&iacute;vel = ") . $nivelzn1 . ("</td></tr>");
echo ("<tr><td align='right'><b>Zona 2: </b></td><td align='left'>") . round($GHzn2) . ("</td><td bgcolor=") . $corzn2 . (">N&iacute;vel = ") . $nivelzn2 . ("</td></tr>");
echo ("<tr><td align='right'><b>Zona 3: </b></td><td align='left'>") . round($GHzn3) . ("</td><td bgcolor=") . $corzn3 . (">N&iacute;vel = ") . $nivelzn3 . ("</td></tr>");
echo ("</table>");


?>

<p align="center"><input value="Voltar" name="btVoltar"
 onclick="history.go(-1)" type="button"></p>
</body>
</html>
