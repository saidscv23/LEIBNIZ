//constante que llama al framework
const express = require('express')
const app = express()
console.log('esta corriendo el servicio2');
app.get('/calcular-pi', (req, res) => {
    const terminos = parseInt(req.query.terminos);
  
    function calcularSerie(numTerminos) {
      let serie = '';
      let piAprox = 0;
  
      for (let i = 0; i < numTerminos; i++) {
        const denominador = 2 * i + 1;
        const signo = i % 2 === 0 ? '+' : '-';
  
        const termino = `4/${denominador}`;
        serie += (i === 0 ? '' : ` ${signo} `) + termino;
  
        piAprox += signo === '+' ? 4 / denominador : -4 / denominador;
      }
  
      return { serie, piAprox };
    }
  
    const { serie, piAprox } = calcularSerie(terminos);
  
    res.json({ terminos,serie,valorAproximadoDePi: piAprox});
  });
app.listen(3000);