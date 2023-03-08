document.addEventListener('DOMContentLoaded', function() {
    darkMode();
});

function darkMode() {

    const prefiereDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    // console.log(prefiereDarkMode.matches);

    if(prefiereDarkMode.matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    prefiereDarkMode.addEventListener('change', function() {
        if(prefiereDarkMode.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });

    const botonDarkMode = document.querySelector('.dark-mode-boton');
    botonDarkMode.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });
}

const botonModal = document.querySelector('#mostrarInformacion');

botonModal.addEventListener('click', function(){
    mostrarModal();
    document.body.classList.toggle('quieto');
});

function mostrarModal(){
    const modal = document.createElement('DIV');
        modal.classList.add('modal');
        modal.innerHTML = `
            <form class="formulario modal">
                <legend>Agrega tu dirección de contacto</legend>
                    <div class="campo">
                        <label>Dirección</label>
                        <input class="input-text" type="text" placeholder="Tu Dirección">
                    </div>

                    <div class="Correo">
                        <label>Email</label>
                        <input class="input-text" type="email" placeholder="Tu Correo">
                    </div>
                <div class="opciones">
                    <input type="submit" class="boton submit-nueva-tarea" value="Enviar">
                    <button type="button" class="boton cerrar-modal">Cerrar</button>
                </div>
            </form>
        `;

        setTimeout(() => {
            const formulario = document.querySelector('.formulario');
            formulario.classList.add('animar');
        }, 0);

        modal.addEventListener('click', function(e) {
            e.preventDefault();

            if(e.target.classList.contains('cerrar-modal')) {
                const formulario = document.querySelector('.formulario');
                formulario.classList.add('cerrar');
                
                setTimeout(() => {
                    document.body.classList.remove('quieto');
                    modal.remove();
                }, 500);
            }

        });

        document.querySelector('.dashboard').appendChild(modal);
}
