// Crear la escena, la cámara y el renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear un array para almacenar las partículas
const particulas = [];

// Función para crear partículas en forma de texto
function crearParticulasTexto(texto, geometria, material) {
    const particulasTexto = [];
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = 'Bold 30px Arial'; // Ajusta el tamaño y la fuente del texto
    context.fillStyle = '#ffffff'; // Color del texto
    context.fillText(texto, 0, 30); // Dibuja el texto en el lienzo
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const index = (x + y * canvas.width) * 4;
            if (imageData.data[index] > 0) {
                const particula = new THREE.Mesh(geometria, material.clone()); // Clona el material para evitar compartir la opacidad
                particula.position.set(
                    (x - canvas.width / 2) * 0.02 + (Math.random() - 0.5) * 0.01, // Introducir variabilidad en X
                    (canvas.height / 2 - y) * 0.02 + (Math.random() - 0.5) * 0.01, // Introducir variabilidad en Y
                    (Math.random() - 0.5) * 5
                );
                particula.velocidadX = Math.random() * 0.02 - 0.01;
                particula.velocidadY = Math.random() * 0.02 - 0.01;
                particulasTexto.push(particula);
                scene.add(particula);
            }
        }
    }

    return particulasTexto;
}

// Crear la geometría y el material para las partículas
const geometria = new THREE.SphereGeometry(0.01, 10, 10); // Ajustar el tamaño
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 }); // Ajustar la opacidad

// Crear partículas para formar el texto "Psycho Nona"
particulas.push(...crearParticulasTexto("Psycho Nona", geometria, material));

// Agregar una luz puntual a la escena
const light = new THREE.PointLight(0xffffff);
scene.add(light);

// Variables para almacenar la posición del mouse
let mouseX = 5;
let mouseY = 5;

// Controlador de eventos para el movimiento del mouse
window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 5 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 5 + 1;
});

// Función de animación
function animar() {
    requestAnimationFrame(animar);

    // Actualizar la posición de las partículas
    for (const particula of particulas) {
        const dx = mouseX - particula.position.x;
        const dy = mouseY - particula.position.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        particula.position.x += dx / len * 0.01 + particula.velocidadX; // Ajusta la aceleración
        particula.position.y += dy / len * 0.01 + particula.velocidadY; // Ajusta la aceleración
    }

    renderer.render(scene, camera);
}

animar();



// // Crear la escena, la cámara y el renderizador
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Crear un array para almacenar las partículas
// var particulas = [];

// // Crear la geometría y el material para las partículas
// var geometria = new THREE.SphereGeometry(0.02, 8, 8); // Reducir el tamaño de las partículas
// var material = new THREE.MeshBasicMaterial({ color: 0xffffff });

// // Crear miles de partículas
// for (var i = 0; i < 5000; i++) {
//     var particula = new THREE.Mesh(geometria, material);
//     particula.position.x = Math.random() * 20 - 10; // Aumentar el rango de posición
//     particula.position.y = Math.random() * 20 - 10;
//     particula.position.z = Math.random() * 20 - 10;
//     particula.velocidadX = Math.random() * 0.02 - 0.01;
//     particula.velocidadY = Math.random() * 0.02 - 0.01;
//     scene.add(particula);
//     particulas.push(particula);
// }

// // Agregar una luz puntual a la escena
// var light = new THREE.PointLight(0xffffff);
// scene.add(light);

// // Variables para almacenar la posición del mouse
// var mouseX = 0;
// var mouseY = 0;

// // Controlador de eventos para el movimiento del mouse
// window.addEventListener('mousemove', function (e) {
//     mouseX = (e.clientX / window.innerWidth) * 2 - 1;
//     mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
// });

// // Función de animación
// function animar() {
//     requestAnimationFrame(animar);

//     // Actualizar la posición de las partículas
//     for (var i = 0; i < particulas.length; i++) {
//         var particula = particulas[i];
//         var dx = mouseX - particula.position.x;
//         var dy = mouseY - particula.position.y;
//         var len = Math.sqrt(dx * dx + dy * dy);
//         dx /= len;
//         dy /= len;
//         particula.position.x += dx * particula.velocidadX;
//         particula.position.y += dy * particula.velocidadY;

//         // Puedes agregar condiciones para hacer que las partículas reboten al llegar a ciertos límites
//         // Ejemplo: if (particula.position.x > 10 || particula.position.x < -10) particula.velocidadX *= -1;
//         //         if (particula.position.y > 10 || particula.position.y < -10) particula.velocidadY *= -1;
//     }

//     renderer.render(scene, camera);
// }

// animar();
