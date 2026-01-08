import $ from 'jquery';

function getJQ() {
  return window.jQuery || window.$ || $;
}

async function ensureJqueryUI() {
  const jq = getJQ();
  if (jq.fn && typeof jq.fn.accordion === 'function') return;
  // Si no está disponible globalmente, intenta cargar dinámicamente (fallback)
  try {
    await import('jquery-ui/ui/unique-id'); // REQUIRED: uniqueId() method
    await import('jquery-ui/ui/widget');
    await import('jquery-ui/ui/widgets/accordion');
  } catch (_) {
    // silencioso: en layouts cargamos jQuery UI por CDN
  }
}

function accordionJquery () {
    ensureJqueryUI().then(() => {
        const jq = getJQ();
        jq( ".js-accordion-ap" ).accordion({
            header:'h3',
            heightStyle: "content",
            collapsible: true,
            active: false,
            activate: function( event, ui ) {
                if(!jq.isEmptyObject(ui.newHeader.offset())) {
                    jq('html:not(:animated), body:not(:animated)').animate({ scrollTop: ui.newHeader.offset().top - 75 }, 'normal');
                }
            }
        });
    });
}

export  {accordionJquery};
