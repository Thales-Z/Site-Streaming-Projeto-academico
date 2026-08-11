document.addEventListener('DOMContentLoaded', () => {

    const imagensSlideshow = document.querySelectorAll('.slideshow-container img');
    const botaoAnterior = document.getElementById('prev-btn');
    const botaoProximo = document.getElementById('next-btn');
    const tituloSlide = document.getElementById('slide-titulo');
    const subtituloSlide = document.getElementById('slide-subtitulo');
    
    let slideAtual = 0;
    let intervaloSlide;

    function mostrarSlide(indice) {
        imagensSlideshow.forEach((slide) => {
            slide.classList.remove('slide-active');
        });
        
        imagensSlideshow[indice].classList.add('slide-active');
        tituloSlide.style.opacity = 0;
        subtituloSlide.style.opacity = 0;

        setTimeout(() => {
            const imagemAtiva = imagensSlideshow[indice];
            const novoTitulo = imagemAtiva.getAttribute('data-titulo');
            const novoSubtitulo = imagemAtiva.getAttribute('data-subtitulo');

            if (tituloSlide && novoTitulo) {
                tituloSlide.textContent = novoTitulo;
            }
            if (subtituloSlide && novoSubtitulo) {
                subtituloSlide.textContent = novoSubtitulo;
            }

            tituloSlide.style.opacity = 1;
            subtituloSlide.style.opacity = 1;

        }, 700); 
    }

    function proximoSlide() {
        slideAtual = (slideAtual + 1) % imagensSlideshow.length; 
        mostrarSlide(slideAtual);
    }
    
    function slideAnterior() {
        slideAtual = (slideAtual - 1 + imagensSlideshow.length) % imagensSlideshow.length;
        mostrarSlide(slideAtual);
    }
    
    function iniciarSlideshow() {
        intervaloSlide = setInterval(proximoSlide, 4000); 
    }

    botaoProximo.addEventListener('click', () => {
        clearInterval(intervaloSlide); 
        proximoSlide();
        iniciarSlideshow(); 
    });

    botaoAnterior.addEventListener('click', () => {
        clearInterval(intervaloSlide); 
        slideAnterior();
        iniciarSlideshow(); 
    });

    iniciarSlideshow();

    const botoesFiltro = document.querySelectorAll('.filtro-btn');
    const itensGaleria = document.querySelectorAll('.item-galeria');

    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            botoesFiltro.forEach(outroBotao => outroBotao.classList.remove('active'));
            botao.classList.add('active');

            const valorFiltro = botao.getAttribute('data-filtro');

            itensGaleria.forEach(item => {
                const tipoItem = item.getAttribute('data-tipo');
                const generoItem = item.getAttribute('data-genero');
                let deveMostrar = false;

                if (valorFiltro === 'todos') {
                    deveMostrar = true;
                } else if (valorFiltro === 'filme' && tipoItem === 'filme') {
                    deveMostrar = true;
                } else if (valorFiltro === 'serie' && tipoItem === 'serie') {
                    deveMostrar = true;
                } else if (valorFiltro === 'dorama' && generoItem === 'dorama') {
                    deveMostrar = true;
                } else if (valorFiltro === 'animacao' && generoItem === 'animacao') {
                    deveMostrar = true;
                }

                if (deveMostrar) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });
});
