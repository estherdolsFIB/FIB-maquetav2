import $ from 'jquery';

function vquestion () {
  const NS = 'vquestion';

  // Evita duplicar listeners si la funció es torna a cridar
  $(document).off(`click.${NS}`, '.js-vquestion-trigger');

  // Delegació: funciona encara que October re-renderitzi parts del DOM
  $(document).on(`click.${NS}`, '.js-vquestion-trigger', function (e) {
    e.preventDefault();

    const $item = $(this).closest('.js-vquestion');
    if (!$item.length) return;

    // Tanca els altres
    $('.js-vquestion').not($item).removeClass('is-open');

    // Obre/Tanca l’actual
    $item.toggleClass('is-open');

    // (Opcional) canvia el signe +/× si tens un span dins del trigger
    const $sign = $(this).find('[data-sign]');
    if ($sign.length) $sign.text($item.hasClass('is-open') ? '×' : '+');
  });

  // Rebind després d’updates AJAX d’October (una sola vegada)
  $(document)
    .off(`ajaxUpdateComplete.${NS} ajaxComplete.${NS}`)
    .on(`ajaxUpdateComplete.${NS} ajaxComplete.${NS}`, function () {
      // no cal res extra perquè usem delegació; mantenim el hook per si vols lógica addicional
    });
}

export { vquestion };

