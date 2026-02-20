function cargarBannerCookies() {
    // Si ya aceptó o rechazó antes, no hacemos nada
    if (localStorage.getItem("cookiesAccepted")) return;

    // Sistema inteligente para detectar si estamos en una subcarpeta
    // y poner bien el enlace hacia bases-legales/politica-cookies.html
    const scripts = document.getElementsByTagName('script');
    let prefijo = "";
    for (let s of scripts) {
        if (s.src.includes('politica-cookies/index.js')) {
            if (s.getAttribute('src').startsWith('../')) {
                prefijo = "../";
            }
            break;
        }
    }
    const legalPath = prefijo + 'bases-legales/politica-cookies.html';

    // Creamos los estilos CSS (con los arreglos para móvil incluidos)
    const style = document.createElement('style');
    style.innerHTML = `
        .cookie-banner { position: fixed; bottom: -100%; left: 0; width: 100%; background: rgba(16, 16, 16, 0.98); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-top: 1px solid rgba(118, 230, 0, 0.3); padding: 20px 5%; z-index: 9999; box-shadow: 0 -10px 30px rgba(0,0,0,0.8); transition: bottom 0.5s ease-in-out; display: flex; justify-content: center; }
        .cookie-banner.show { bottom: 0; }
        .cookie-content { max-width: 1200px; width: 100%; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px; font-family: 'Inter', sans-serif;}
        .cookie-text { flex: 1 1 500px; color: #ddd; font-size: 0.85rem; line-height: 1.5; margin: 0; }
        .cookie-text a { color: #76E600; text-decoration: underline; font-weight: 600; }
        .cookie-buttons { display: flex; gap: 15px; flex-wrap: wrap; justify-content: flex-end;}
        .btn-cookie { padding: 12px 25px; border-radius: 50px; font-family: 'Manrope', sans-serif; font-weight: 800; font-size: 0.8rem; text-transform: uppercase; cursor: pointer; transition: all 0.3s ease; text-align: center; }
        .btn-accept { background: #76E600; color: #000; border: 2px solid #76E600; }
        .btn-accept:hover { background: #88ff00; transform: scale(1.05); }
        .btn-reject { background: transparent; color: #fff; border: 2px solid #555; }
        .btn-reject:hover { border-color: #fff; }
        
        /* DISEÑO ESPECÍFICO PARA MÓVILES (PERFECTAMENTE ADAPTADO) */
        @media (max-width: 768px) { 
            .cookie-banner { padding: 20px; border-top: 2px solid #76E600;}
            .cookie-content { flex-direction: column; text-align: left; gap: 15px; } 
            .cookie-text { font-size: 0.75rem; flex: 1 1 auto; color: #ccc;}
            .cookie-buttons { flex-direction: column-reverse; width: 100%; gap: 10px; } 
            .btn-cookie { width: 100%; padding: 14px 20px; font-size: 0.85rem;} 
        }
    `;
    document.head.appendChild(style);

    // Creamos el HTML del banner
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <p class="cookie-text">
                Utilizamos cookies propias y de terceros para fines analíticos y para mostrarte publicidad personalizada en base a un perfil elaborado a partir de tus hábitos de navegación. Puedes aceptar todas las cookies pulsando el botón "Aceptar", rechazarlas pulsando "Rechazar" o consultar nuestra <a href="${legalPath}">Política de Cookies</a>.
            </p>
            <div class="cookie-buttons">
                <button id="btn-reject-cookies" class="btn-cookie btn-reject">Rechazar</button>
                <button id="btn-accept-cookies" class="btn-cookie btn-accept">Aceptar todas</button>
            </div>
        </div>
    `;
    document.body.appendChild(banner);

    // Lo mostramos con medio segundo de retraso para que haga el efecto de subir
    setTimeout(() => { banner.classList.add('show'); }, 500);

    // Damos función a los botones
    document.getElementById('btn-accept-cookies').addEventListener('click', () => {
        banner.classList.remove('show');
        localStorage.setItem('cookiesAccepted', 'yes');
    });
    
    document.getElementById('btn-reject-cookies').addEventListener('click', () => {
        banner.classList.remove('show');
        localStorage.setItem('cookiesAccepted', 'no');
    });
}

// Arrancamos el código directamente
cargarBannerCookies();
