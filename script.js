// Avisa o CSS de que o JavaScript está funcionando
document.documentElement.classList.add('js');

const botao = document.querySelector('.menu-botao');
const lista = document.querySelector('#menu-links');
const links = document.querySelectorAll('#menu-links a');

/* ---------- 1. Menu para celular ---------- */
function alternarMenu(abrir) {
  lista.classList.toggle('aberto', abrir);
  botao.setAttribute('aria-expanded', abrir);
  botao.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
  botao.innerHTML = abrir ? '&#10005;' : '&#9776;';
}

botao.addEventListener('click', () => {
  alternarMenu(!lista.classList.contains('aberto'));
});

// Fecha o menu ao clicar em um link ou apertar Esc
links.forEach((link) => {
  link.addEventListener('click', () => alternarMenu(false));
});

document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') alternarMenu(false);
});

/* ---------- 2. Destaque do link da seção atual ---------- */
function marcarAtivo(id) {
  links.forEach((link) => {
    link.classList.toggle('ativo', link.getAttribute('href') === '#' + id);
  });
}

// Observa o cabeçalho e as seções; a "faixa" de leitura fica no meio da tela
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) marcarAtivo(entrada.target.id);
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

document.querySelectorAll('header, main section').forEach((secao) => {
  observador.observe(secao);
});

// Caso especial: no fim da página, a seção de contato é curta e pode não
// chegar ao meio da tela, então marcamos ela quando a rolagem chega ao fim.
window.addEventListener('scroll', () => {
  const noFim = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
  if (noFim) marcarAtivo('contato');
});
