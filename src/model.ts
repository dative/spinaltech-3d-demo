import { ModelViewerElement } from '@google/model-viewer';

const braceEl = document.querySelector(
  'model-viewer#brace'
) as ModelViewerElement;

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
      const texture = await braceEl.createTexture(patternUri);
      // bodyMaterial.pbrMetallicRoughness['metallicRoughnessTexture'].setTexture(
      //   texture
      // );
      bodyMaterial.pbrMetallicRoughness['baseColorTexture'].setTexture(texture);
      // bodyMaterial['normalTexture'].setTexture(texture);
      // emissiveTexture
      // occlusionTexture;
      // pbrMetallicRoughness;
    };

    const patternSelect = document?.querySelector(
      '#patterns'
    ) as HTMLSelectElement;

    patternSelect?.addEventListener('input', (event) => {
      const target = event.target as HTMLSelectElement;
      createAndApplyTexture(target.value);
    });
  }
});
