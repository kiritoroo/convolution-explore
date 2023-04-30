import * as $ from 'three';

export default class Loader {

  private manager: $.LoadingManager;
  private textureLoader: $.TextureLoader;

  constructor() {
    this.manager = new $.LoadingManager();
    this.textureLoader = new $.TextureLoader(this.manager);
  }

  public loaderTexture(url: string): Promise<$.Texture> {
    return new Promise((resolve, reject) => {
      this.textureLoader
        .load(url, (texture: $.Texture) => {
          texture.needsUpdate = true;
          const result = texture;
          resolve(result);
        }, undefined, reject);
    })
  }
}