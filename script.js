var { jStat } = require('jstat')
const jStat = window.jStat;
//Funciones Usadas

//INTERVALOS DE CONFIANZA PARA LA MEDIA POBLACIONAL


//Poblacion normal y varianza conocida
function calcularIntervaloConfianzaNormalVarianzaConocida(mediaMuestral, desviacionEstandar, tamanoMuestra, nivelConfianza) {
    const z = jStat.normal.inv(1 - (1 - nivelConfianza) / 2, 0, 1);
    const errorEstandar = desviacionEstandar / Math.sqrt(tamanoMuestra);
    const margenError = z * errorEstandar;
    const limiteInferior = mediaMuestral - margenError;
    const limiteSuperior = mediaMuestral + margenError;
    return [limiteInferior, limiteSuperior];
  }

//Población normal y varianza desconocida (n < 30)
function calcularIntervaloConfianzaNormalVarianzaDesconocidaPequena(mediaMuestral, desviacionMuestral, tamanoMuestra, nivelConfianza) {
const t = jStat.studentt.inv(1 - (1 - nivelConfianza) / 2, tamanoMuestra - 1);
const errorEstandar = desviacionMuestral / Math.sqrt(tamanoMuestra);
const margenError = t * errorEstandar;
const limiteInferior = mediaMuestral - margenError;
const limiteSuperior = mediaMuestral + margenError;
return [limiteInferior, limiteSuperior];
}


//Población cualquiera y varianza desconocida (n >= 30)
function calcularIntervaloConfianzaNoNormalVarianzaDesconocidaGrande(mediaMuestral, desviacionMuestral, tamanoMuestra, nivelConfianza) {
const z = jStat.normal.inv(1 - (1 - nivelConfianza) / 2, 0, 1);
const errorEstandar = desviacionMuestral / Math.sqrt(tamanoMuestra);
const margenError = z * errorEstandar;
const limiteInferior = mediaMuestral - margenError;
const limiteSuperior = mediaMuestral + margenError;
return [limiteInferior, limiteSuperior];
}

//Población cualquiera y varianza conocida (n >= 30)
function calcularIntervaloConfianzaNoNormalVarianzaConocida(mediaMuestral, desviacionEstandar, tamanoMuestra, nivelConfianza) {
    const z = jStat.normal.inv(1 - (1 - nivelConfianza) / 2, 0, 1);
    const errorEstandar = desviacionEstandar / Math.sqrt(tamanoMuestra);
    const margenError = z * errorEstandar;
    const limiteInferior = mediaMuestral - margenError;
    const limiteSuperior = mediaMuestral + margenError;
    return [limiteInferior, limiteSuperior];
  }

//INTERVALOS DE CONFIANZA PARA UNA PROPORCION DE POBLACION NORMAL (MUESTRAS GRANDES)

function calcularIntervaloConfianzaProporcion(p, n, nivelConfianza) {
    const z = jStat.normal.inv(1 - (1 - nivelConfianza) / 2, 0, 1);
    const errorEstandar = Math.sqrt((p * (1 - p)) / n);
    const margenError = z * errorEstandar;
    const limiteInferior = p - margenError;
    const limiteSuperior = p + margenError;
    return [limiteInferior, limiteSuperior];
  }

  

//INTERVALOS DE CONFIANZA PARA LA DIFERENCIA DE PROPORCIONES DE POBLACION NORMAL (MUESTRAS GRANDES)
function calcularIntervaloConfianzaDiferenciaProporciones(p1, p2, n1, n2, nivelConfianza) {
    const z = jStat.normal.inv(1 - (1 - nivelConfianza) / 2, 0, 1);
    const p = ((p1 * n1) + (p2 * n2)) / (n1 + n2);
    const errorEstandar = Math.sqrt((p * (1 - p)) * ((1 / n1) + (1 / n2)));
    const margenError = z * errorEstandar;
    const limiteInferior = (p1 - p2) - margenError;
    const limiteSuperior = (p1 - p2) + margenError;
    return [limiteInferior, limiteSuperior];
  }

//INTERVALOS DE CONFIANZA PARA LA DIFERENCIA ENTRE MEDIAS DE POBLACIONES NORMALES INDEPENDIENTES

//Varianzas conocidas 

function calcularIntervaloConfianzaDiferenciaMediasVC(mu1, mu2, desv1, desv2, n1, n2, nivelConfianza) {
    const z = jStat.normal.inv(1 - (1 - nivelConfianza) / 2, 0, 1);
    const errorEstandar = Math.sqrt((Math.pow(desv1, 2) / n1) + (Math.pow(desv2, 2) / n2));
    const margenError = z * errorEstandar;
    const limiteInferior = mu1 - mu2 - margenError;
    const limiteSuperior = mu1 - mu2 + margenError;
    return [limiteInferior, limiteSuperior];
  }

  //Varianzas desconocidas (n >= 30)
function calcularIntervaloConfianzaDiferenciaMediasVD(n1, n2, x1, x2, s1, s2, nivelConfianza) {
const z = jStat.normal.inv(1 - (1 - nivelConfianza) / 2, 0, 1);
const errorEstandar = Math.sqrt((Math.pow(s1, 2) / n1) + (Math.pow(s2, 2) / n2));
const margenError = z * errorEstandar;
const limiteInferior = x1 - x2 - margenError;
const limiteSuperior = x1 - x2 + margenError;
return [limiteInferior, limiteSuperior];
}

//Varianzas iguales y desconocidas (n >= 30)
function calcularIntervaloConfianzaDiferenciaMediasVI(n1, n2, x1, x2, s, nivelConfianza) {
    const t = jStat.studentt.inv(1 - (1 - nivelConfianza) / 2, n1 + n2 - 2);
    const errorEstandar = s * Math.sqrt((1 / n1) + (1 / n2));
    const margenError = t * errorEstandar;
    const limiteInferior = x1 - x2 - margenError;
    const limiteSuperior = x1 - x2 + margenError;
  
    return [limiteInferior, limiteSuperior];
  }
  
//Intervalo de confianza para la varianza de una población normal 
function calcularIntervaloConfianzaVarianzaNormal(n, s2, nivelConfianza) {
    const chi2Inferior = jStat.jStat.chisquare.inv(1 - (1 - nivelConfianza) / 2, n - 1);
    const chi2Superior = jStat.jStat.chisquare.inv((1 - nivelConfianza) / 2, n - 1);
    const limiteInferior = (n - 1) * s2 / chi2Inferior;
    const limiteSuperior = (n - 1) * s2 / chi2Superior;
    return [limiteInferior, limiteSuperior];
  }

//Intervalos de confianza para la razón de varianzas de poblaciones normales independientes
function calcularIntervaloConfianzaRazonVarianzas(n1, n2, s1, s2, nivelConfianza) {
    const fInferior = jStat.jStat.f.inv(1 - (1 - nivelConfianza) / 2, n1 - 1, n2 - 1);
    const fSuperior = jStat.jStat.f.inv((1 - nivelConfianza) / 2, n1 - 1, n2 - 1);
    const limiteInferior = s1 ** 2 / s2 ** 2 / fInferior;
    const limiteSuperior = s1 ** 2 / s2 ** 2 / fSuperior;
    return [limiteInferior, limiteSuperior];
  }

  