const tiempoTotal = 3.3; // s *Nota: Probar a 3.2s
const tiempoDiscreto = 0.1; // s
const masaSeca = 2.1; // kg
const densidadAire = 0.96; // kg/m3
const velocidadSalida = 910; // m/s
const gravedad = 9.78; // m/s2
const coeficienteArrastre = 0.43; // 1
const diametroFuselaje = 0.075 // m
const areaFuselaje = (( diametroFuselaje / 2 ) ** 2) * Math.PI;

let masaTotal = 2.443 // kg
let flujoMasico = 0.38; // kg/s
let masaCombustible = 0.343; // kg
let masaInicialPerdida = 0; // kg
let masaFinalPerdida = flujoMasico * tiempoDiscreto; // kg
let empuje = flujoMasico * velocidadSalida; // N
let peso; // N
let altura = 0; // m
let arrastre; // N
let velocidad; // m/s
let aceleracion; // m/s2

// let pendientePerdida = (masaFinalPerdida - masaCombustible) / tiempoDiscreto; // 1

let valoresTiempo = [];
let valoresFlujoMasico = [];
let valoresMasaContraTiempo = [];
let valoresEmpujeContraTiempo = [];
let valoresPesoContraTiempo = [];
let valoresVelocidadContraTiempo = [];
let valoresAceleracionContraTiempo = [];
let valoresAlturaContraTiempo = [];
let valoresArrastreContraTiempo = [];



for (i = 0;i <= (tiempoTotal + tiempoDiscreto); i += tiempoDiscreto) {
    
    if (i == 0) {
        let velocidadActual = velocidadSalida;
        aceleracion = -186;
        velocidad = velocidadActual

    }
    else {
        altura = altura + (velocidad * (i - (i - tiempoDiscreto)))
        let velocidadActual = velocidad + (((-1 * gravedad) + ( -1 * 1/2 * densidadAire * velocidad * Math.abs(velocidad) * ((coeficienteArrastre * areaFuselaje) / (masaTotal + masaFinalPerdida))) + (((velocidad) / (Math.abs(velocidad))) * ((masaCombustible + masaFinalPerdida) * velocidadSalida) / masaTotal + masaFinalPerdida)) * (i - (i - tiempoDiscreto)))
        aceleracion = (velocidadActual - velocidad) / (i - (i - tiempoDiscreto))
        velocidad = velocidadActual
    }

    arrastre = (1 / 2) * densidadAire * (velocidad ** 2) * coeficienteArrastre * areaFuselaje

    valoresAceleracionContraTiempo.push(aceleracion);
    valoresArrastreContraTiempo.push(arrastre);
    valoresVelocidadContraTiempo.push(velocidad);
    valoresAlturaContraTiempo.push(altura);

    

    if (masaCombustible >= 0) {
        // Se calcular el peso con la masaTotal (Inicia incluyendo combustible) multiplicada por la gravedad
        peso = masaTotal * gravedad;
        
        // Cada iteración comienza añadiendo los datos de masaTotal, peso y empuje a sus respectivos arrays
        valoresMasaContraTiempo.push(masaTotal);
        valoresPesoContraTiempo.push(peso);
        valoresEmpujeContraTiempo.push(empuje);
        
        // La masaTotal se actualiza restando la masa que se ha perdido.
        masaTotal = masaTotal - masaFinalPerdida;
    }
    else {
        empuje = 0
        flujoMasico = 0
        
        valoresMasaContraTiempo.push(masaTotal + masaFinalPerdida);
        valoresPesoContraTiempo.push(peso);
        valoresEmpujeContraTiempo.push(empuje);
    }
    // La masa del combustible se actualiza en cada iteración restando la masaFinalPerdida, que es a su vez el combustible total usado
    masaCombustible = masaCombustible - masaFinalPerdida
    
    // Por cada iteración se añaden los valores del tiempo
    valoresTiempo.push(i.toPrecision(2));
    valoresFlujoMasico.push(flujoMasico);
}


var grafica = new Chart(graficaFlujoMasico,{
    type: 'line',
    data:{
        labels:valoresTiempo,
        datasets:[
            {
                label: 'Gráfica flujo másico',
                data: valoresFlujoMasico
            }
        ]
    }
})
var grafica2 = new Chart(graficaMasaContraTiempo,{
    type: 'line',
    data:{
        labels:valoresTiempo,
        datasets:[
            {
                label: 'Gráfica masa contra tiempo',
                data: valoresMasaContraTiempo
            }
        ]
    }
})
var grafica3 = new Chart(graficaEmpujeContraTiempo,{
    type: 'line',
    data:{
        labels:valoresTiempo,
        datasets:[
            {
                label: 'Gráfica empuje contra tiempo',
                data: valoresEmpujeContraTiempo
            }
        ]
    }
})
var grafica3 = new Chart(graficaPesoContraTiempo,{
    type: 'line',
    data:{
        labels:valoresTiempo,
        datasets:[
            {
                label: 'Gráfica peso contra tiempo',
                data: valoresPesoContraTiempo
            }
        ]
    }
})
var grafica4 = new Chart(graficaVelocidadContraTiempo,{
    type: 'line',
    data:{
        labels:valoresTiempo,
        datasets:[
            {
                label: 'Gráfica velocidad contra tiempo',
                data: valoresVelocidadContraTiempo
            }
        ]
    }
})
var grafica5 = new Chart(graficaAlturaContraTiempo,{
    type: 'line',
    data:{
        labels:valoresTiempo,
        datasets:[
            {
                label: 'Gráfica altura contra tiempo',
                data: valoresAlturaContraTiempo
            }
        ]
    }
})
var grafica6 = new Chart(graficaArrastreContraTiempo,{
    type: 'line',
    data:{
        labels:valoresTiempo,
        datasets:[
            {
                label: 'Gráfica arrastre contra tiempo',
                data: valoresArrastreContraTiempo
            }
        ]
    }
})
var grafica7 = new Chart(graficaAceleracionContraTiempo,{
    type: 'line',
    data:{
        labels:valoresTiempo,
        datasets:[
            {
                label: 'Gráfica aceleración contra tiempo',
                data: valoresAceleracionContraTiempo
            }
        ]
    }
})


// let graficaFlujoMasico = document.getElementById('graficaFlujoMasico').getContext('2d');
// let graficaMasaContraTiempo = document.getElementById('graficaMasaContraTiempo').getContext('2d');