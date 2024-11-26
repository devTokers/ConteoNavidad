$(function(){
  $.fn.extend({
    countdown: function(props){
      props = jQuery.extend({ 
        until: new Date(),
      }, props);

      // Estado inicial del contador (días, horas, minutos, segundos) en 0
      const state = {
        Dias: 0,
        Horas: 0,
        Minutos: 0,
        Segundos: 0
      };

      // Función para renderizar el contador en el DOM
      let render = (props) => {
        const { Dias, Horas, Minutos, Segundos } = props;

        this.empty();// Limpia el contenido del elemento

        // Muestra los días, horas, minutos y segundos
        this.append(`
        <div class="countdownProp" date-count="${Dias == 1 ? 'day' : 'Dias'}">${Dias}</div>
        <div class="countdownProp" date-count="${Horas == 1 ? 'hour' : 'Horas'}">${Horas < 10 ? '0' + Horas : Horas}</div>
        <div class="countdownProp" date-count="${Minutos == 1 ? 'minute' : 'Minutos'}">${Minutos < 10 ? '0' + Minutos : Minutos}</div>
        <div class="countdownProp" date-count="${Segundos == 1 ? 'second' : 'Segundos'}">${Segundos < 10 ? '0' + Segundos : Segundos}</div>
        `);
      }
       // Muestra el estado inicial del contador
      render(state);
      let update = setInterval(function(){

        let counter = props.until - (new Date().getTime());// Calcula el tiempo restante

        if (counter <= 0) {

          clearInterval(update);// Detiene el contador cuando llega a 0
          return false;
        }

        // Calcula días, horas, minutos y segundos restantes
        state.Dias = Math.floor(counter / (1000 * 60 * 60 * 24));
        state.Horas = Math.floor((counter % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        state.Minutos = Math.floor((counter % (1000 * 60 * 60)) / (1000 * 60));
        state.Segundos = Math.floor((counter % (1000 * 60)) / 1000);

        render(state);// Vuelve a renderizar con el nuevo tiempo

      }, 1000);
      return this;
    },

    // Función para crear un efecto de nieve con partículas SVG
    nieve: function(props){
      props = jQuery.extend({ 
        amount: 60
      }, props);
      let random = (min, max) => {
        return Math.random() * (max - min) + min;
      }
      let svg = '<svg class="nieve" xmlns="http://www.w3.org/2000/svg">';
      for (let index = 0; index < props.amount; index++) {
        svg += `<circle class="particle" r="${random(1, 3)}" cx="${random(1, 100)}%" cy="-${random(1, 100)}" />`;
      }
      svg += '</svg>';
      this.replaceWith(svg);
    }
  })

  // Variables de la fecha actual y la fecha de Navidad
  const now = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const finalDay = 25;
  const finalMonth = 12;
  const currentDay = now.getDate();
  const currentMonth = now.getMonth();
  const counterYear = ((currentDay >= finalDay) && (currentMonth + 1 === finalMonth)) ? now.getFullYear() + 1 : now.getFullYear();

   // Inicia el contador regresivo para Navidad
  $('.countdown').countdown({
    until: new Date(`${months[finalMonth - 1]}, ${finalDay}, ${counterYear}`) //// cuenta regresiva hasta el 25 de diciembre de 2024
  })
  $('.nieve').nieve({
    amount: 100 
  });
});