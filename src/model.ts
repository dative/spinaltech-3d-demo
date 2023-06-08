import { ModelViewerElement } from '@google/model-viewer';

const braceEl = document.querySelector(
  'model-viewer#brace'
) as ModelViewerElement;

// Brace model mappings:
// Neck Strap [0]
// Neck Strap Pins [1]
// exterior [2]
// interior shield [3]
// Strap Clip [4]
// Strap Pins [5]
// Straps [6]
// Straps Clip Base [7]
// Interior Cushion [8]

braceEl?.addEventListener('load', () => {
  if (braceEl?.model) {
    const bodyMaterial = braceEl.model.materials[2];

    const createAndApplyTexture = async (patternUri: string) => {
      // 938D84
      if (patternUri === '') {
        const texture = await braceEl.createTexture(
          '/assets/Textures/Busto injoinato texturizzare_3_BaseColor.png'
        );
        bodyMaterial.pbrMetallicRoughness['baseColorTexture'].setTexture(
          texture
        );
        return;
      }
      const texture = await braceEl.createTexture(patternUri);

      // bodyMaterial['normalTexture'].setTexture(texture);
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
