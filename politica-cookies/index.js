(function() {
    // Si ya aceptó o rechazó antes, no hacemos nada
    if (localStorage.getItem("cookiesAccepted")) return;

    // Detectamos de forma automática y segura si estamos en una subcarpeta
    let prefijo = "";
    if (document.currentScript && document.currentScript.getAttribute('src').includes('../')) {
        prefijo = "../";
    }
    const legalPath = prefijo + 'bases-legales/politica-cookies.html';

    // Creamos los estilos CSS con la versión móvil súper compacta
    const style = document.createElement('style');
    style.innerHTML = `
        .cookie-banner { position: fixed; bottom: -100%; left: 0; width: 100%; background: rgba(16, 16, 16, 0.98); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-top: 1px solid rgba(118, 230, 0, 0.3); padding: 15px 5%; z-index: 9999; box-shadow: 0 -10px 30px rgba(0,0,0,0.8); transition: bottom 0.5s ease-in-out; display: flex; justify-content: center; font-family: 'Inter', sans-serif; }
        .cookie-banner.show { bottom: 0; }
        .cookie-content { max-width: 1200px; width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
        .cookie-text { flex: 1; color: #ddd; font-size: 0.8rem; line-height: 1.4; margin: 0; }
        .cookie-text a { color: var(--accent, #76E600); text-decoration: underline; font-weight: 600; }
        .cookie-buttons { display: flex; gap: 10px; flex-shrink: 0; }
        .btn-cookie { padding: 10px 20px; border-radius: 50px; font-family: 'Manrope', sans-serif; font-weight: 800; font-size: 0.75rem; text-transform: uppercase; cursor: pointer; transition: all 0.3s ease; white-space: nowrap; }
        .btn-accept { background: var(--accent, #76E600); color: #000; border: 2px solid var(--accent, #76E600); }
        .btn-accept:hover { filter: brightness(1.1); transform: scale(1.05); }
        .btn-reject { background: transparent; color: #fff; border: 2px solid #555; }
        .btn-reject:hover { border-color: #fff; }
        
        /* VERSIÓN MÓVIL SÚPER COMPACTA */
        @media (max-width: 768px) { 
            .cookie-banner { padding: 12px 15px; border-top: 2px solid var(--accent, #76E600); }
            .cookie-content { flex-direction: column; align-items: stretch; gap: 10px; } 
            .cookie-text { font-size: 0.7rem; text-align: left; line-height: 1.3;}
            .cookie-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; } 
            .btn-cookie { width: 100%; padding: 10px; font-size: 0.7rem; } 
        }
    `;
    document.head.appendChild(style);

    // Creamos el HTML del banner (Texto un poco más resumido pero legal)
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <p class="cookie-text">
                Utilizamos cookies para fines analíticos y publicidad personalizada. Puedes aceptar, rechazar o consultar nuestra <a href="${legalPath}">Política de Cookies</a>.
            </p>
            <div class="cookie-buttons">
                <button id="btn-reject-cookies" class="btn-cookie btn-reject">Rechazar</button>
                <button id="btn-accept-cookies" class="btn-cookie btn-accept">Aceptar</button>
            </div>
        </div>
    `;
    document.body.appendChild(banner);

    // Lo mostramos rapidísimo (100 milisegundos)
    setTimeout(() => { banner.classList.add('show'); }, 100);

    // Funciones de guardado al hacer clic
    document.getElementById('btn-accept-cookies').addEventListener('click', () => {
        banner.classList.remove('show');
        localStorage.setItem('cookiesAccepted', 'yes');
    });
    
    document.getElementById('btn-reject-cookies').addEventListener('click', () => {
        banner.classList.remove('show');
        localStorage.setItem('cookiesAccepted', 'no');
    });
})();
