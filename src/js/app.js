// Entrada JS basada en la maqueta original
// Importa el SCSS principal para generar assets/css/app.css
import '../scss/app.scss';

// Asegura jQuery en el scope global para plugins UMD (slick, jquery-ui)
// pero sin romper la instancia global si ya existe (por ejemplo, la que carga el theme por CDN).
import $ from 'jquery';
const jq = window.jQuery || window.$ || $;
window.$ = jq;
window.jQuery = jq;

// Módulos locales ligeros que podemos cargar siempre
import {toggleClass} from './modules/toggleClass';
import {nav} from './modules/nav';
import {lazy} from './modules/lazyload';
import {tabs} from './modules/tabs';
import {svg} from './modules/svg';
import {accordion} from './modules/accordion';
import {account} from './modules/account';
import {accordionJquery} from './modules/accordionJquery';
import {tooltips} from './modules/tooltips';
import {vquestion} from './modules/vquestion';

document.addEventListener('DOMContentLoaded', async () => {
  // Inicializaciones ligeras
  toggleClass();
  nav();
  lazy();
  tabs();
  svg();
  accordion();
  account();
  accordionJquery();
  tooltips();
  vquestion();

  // Carga AOS solo si hay elementos animados
  if (document.querySelector('[data-aos]')) {
    const AOS = (await import('aos')).default;
    AOS.init({ offset: 50, once: true });
  }

  // Carga sliders solo si hay sliders en el DOM
  if (document.querySelector('.js-slider, .js-slider-arrows, .js-slider-video')) {
    const slideMod = await import('./modules/slide');
    if (document.querySelector('.js-slider, .js-slider-arrows')) {
      slideMod.slide();
    }
    if (document.querySelector('.js-slider-video')) {
      slideMod.slideVideo();
    }
  }

  // Carga carouseles solo si existen
  if (document.querySelector('.js-carousel, .js-logos-carousel, .js-cards-carousel')) {
    const { initCarousel } = await import('./modules/carousel');
    initCarousel();
  }

  // Input file label
  $('#file-upload').on('change', function () {
    const filename = $('#file-upload').val().split('\\\\').pop();
    $('.c-contact-form__field--fl').html(filename);
  });

  // Calendario solo si existe #calendar
  const calendarEl = document.getElementById('calendar');
  if (calendarEl) {
    const [core, dayGrid, timeGrid, list, moment, es, ca] = await Promise.all([
      import('@fullcalendar/core'),
      import('@fullcalendar/daygrid'),
      import('@fullcalendar/timegrid'),
      import('@fullcalendar/list'),
      import('@fullcalendar/moment'),
      import('@fullcalendar/core/locales/es'),
      import('@fullcalendar/core/locales/ca'),
    ]);

    const locale = document.documentElement.lang === 'es' ? es.default : ca.default;
    const { Calendar } = core;

    window.cal = new Calendar(calendarEl, {
      plugins: [moment.default, dayGrid.default, timeGrid.default, list.default],
      titleFormat: 'MMMM YYYY',
      initialView: 'dayGridMonth',
      fixedWeekCount: false,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'prev,next today'
      },
      eventColor: 'var(--color-secondary)',
      locale,
      dayHeaderFormat: { weekday: 'long' },
      firstDay: 1,
      eventClick: function(info) {
        $('.calendarEventInfo').css('display', 'none');
        $('#'+info.event.id).css('display', 'block');
        setTimeout(function () {
          const offset = $('#' + info.event.id).offset().top - 150;
          $('html, body').animate({ scrollTop: offset }, 500);
        }, 50);
      },
    });

    cal.render();
    setTimeout(() => { cal.updateSize(); });
  }
});
