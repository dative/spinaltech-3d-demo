import { ModelViewerElement } from '@google/model-viewer';

const braceEl = document.querySelector(
  'model-viewer#brace'
) as ModelViewerElement;

const canvasTexture = braceEl?.createCanvasTexture();
const canvas = canvasTexture.source.element as HTMLCanvasElement;
canvas.width = 8000;
canvas.height = 8000;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const getCanvasTexture = (image: string) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const img = new Image();
  img.src = image;

  img.addEventListener('load', () => {
    // Create a pattern with this image, and set it to "repeat".
    const ptrn = ctx.createPattern(img, 'repeat') as CanvasPattern;
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvasTexture.source.update();
  });
  return canvasTexture;
};

braceEl?.addEventListener('load', () => {
  if (braceEl?.model) {
    const bodyMaterial = braceEl.model.materials[0];
    bodyMaterial.pbrMetallicRoughness.setBaseColorFactor('#FFFFFF');

    const createAndApplyTexture = async (patternUri: string) => {
      if (patternUri === '') {
        const texture = await braceEl.createTexture(
          './assets/Textures/Busto injoinato texturizzare_3_BaseColor.png'
        );
        bodyMaterial.pbrMetallicRoughness['baseColorTexture'].setTexture(
          texture
        );
        return;
      }

      const texture = await braceEl.createTexture(patternUri, 'image/jpeg');

      // Using a canvas texture instead of an image texture so we can set the
      // pattern to repeat at a larger scale.
      // const texture = getCanvasTexture(patternUri);
      bodyMaterial.pbrMetallicRoughness['baseColorTexture'].setTexture(texture);

      // Controls shine and roughness of the material
      bodyMaterial.pbrMetallicRoughness.setMetallicFactor(0.5);
      bodyMaterial.pbrMetallicRoughness.setRoughnessFactor(0.25);
    };

    createAndApplyTexture('./patterns/butterflysquare.jpg');

    const patternSelect = document?.querySelector(
      '#patterns'
    ) as HTMLSelectElement;

    patternSelect?.addEventListener('input', (event) => {
      const target = event.target as HTMLSelectElement;
      createAndApplyTexture(target.value);
    });
  }
});
