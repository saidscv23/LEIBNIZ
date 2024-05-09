//constante que llama al framework
const express = require('express')
const app = express()
console.log('esta corriendo el servicio2');
app.get('/calcular-pi', (req, res) => {
    const terminos = parseInt(req.query.terminos);
  
    function calcularSerie(numTerminos) { 


        
    let serie = ''; // almcaena la secuencia
      var piAprox = 0; // es un valor acumulativo 

      // formula
  
      for (let i = 0; i < numTerminos; i++) { 
        const denominador = 2 * i + 1; //es el valor que se usa para dividir(formula)
        const signo = i % 2 === 0 ? '+' : '-'; // si es par + : caso contrario -
  
        const termino = `4/${denominador}`;    
        
        
        serie += (i === 0 ? '' : ` ${signo} `) + termino;

    //Calcula el valor aproximado utilizando el signo y el denominador

        piAprox += signo === '+' ? 4 / denominador : -4 / denominador;
      }
  

      // Devuelve la serie y el valor aproximado 
      return { serie, piAprox };
    }
  
    //asigna los resultados
    const { serie, piAprox } = calcularSerie(terminos);
  

    // Envía una respuesta json con los términos, la serie y el valor aproximado
    res.json({ terminos,serie,valorAproximadoDePi: piAprox});
  });
app.listen(3000);