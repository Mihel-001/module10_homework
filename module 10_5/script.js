const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
    alert("Ширина экрана: " + window.screen.width + "px, высота: " + window.screen.height + "px.");
});