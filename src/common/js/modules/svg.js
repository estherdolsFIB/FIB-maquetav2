
import $ from 'jquery';

function svg (){

    document.querySelectorAll('img.svg').forEach((el) => {
        const imgID = el.getAttribute('id');
        const imgClass = el.getAttribute('class');
        const imgURL = el.getAttribute('src');

        fetch(imgURL)
        .then(data => data.text())
        .then(response => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response, 'text/html');
            let svg = xmlDoc.querySelector('svg');
            const width = svg.getAttribute('width');
            const height = svg.getAttribute('height');
            const viewbox = svg.getAttribute('viewbox');
            if(width) {
                svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
            } else if(viewbox) {
                svg.setAttribute('viewBox', viewbox);
            }
            svg.setAttribute('height', height);
            if (typeof imgID !== 'undefined') {
                svg.setAttribute('id', imgID);
            }

            if(typeof imgClass !== 'undefined') {
                svg.setAttribute('class', imgClass + ' replaced-svg');
            }

            svg.removeAttribute('xmlns:a');

            el.parentNode.replaceChild(svg, el);
        });
    });
}

export  {svg};

