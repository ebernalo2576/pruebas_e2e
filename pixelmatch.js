import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { options } from './vrt.config.js';

// Calcula la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorios de las imágenes
const beforePath = path.join(__dirname, 'pixelmatch', 'before');
const afterPath = path.join(__dirname, 'pixelmatch', 'after');
const comparePath = path.join(__dirname, 'pixelmatch', 'compare');

// Asegúrate de que la carpeta de diferencias exista
if (!fs.existsSync(comparePath)) {
    fs.mkdirSync(comparePath);
}

// Lee las imágenes de ambas carpetas
const referenceImages = fs.readdirSync(beforePath);
const testImages = fs.readdirSync(afterPath);

// Compara las imágenes que coinciden por nombre
referenceImages.forEach((fileName) => {
    if (testImages.includes(fileName)) {
        const referencePath = path.join(beforePath, fileName);
        const testPath = path.join(afterPath, fileName);
        const diffPath = path.join(comparePath, `diff-${fileName}`);

        // Carga las imágenes PNG
        const img1 = PNG.sync.read(fs.readFileSync(referencePath));
        const img2 = PNG.sync.read(fs.readFileSync(testPath));
        const { width, height } = img1;

        // Crea una nueva imagen para la diferencia
        const diff = new PNG({ width, height });

        // Realiza la comparación
        const numDiffPixels = pixelmatch(
            img1.data,
            img2.data,
            diff.data,
            width,
            height,
            options
        );

        // Guarda la imagen de diferencia
        fs.writeFileSync(diffPath, PNG.sync.write(diff));

        console.log(`Diferencias en ${fileName}: ${numDiffPixels} píxeles.`);
    } else {
        console.log(`No se encontró la imagen de prueba para ${fileName}`);
    }
});
