import { TAsset } from '@type/index';
import Loader from '@util/Loader';
import { emitEvent } from '@util/Event';
import * as THREE from 'three'

class Resources {
  public items: Record<string, THREE.Texture>;
  private loader: Loader;
  private queue: number;
  private loaded: number;

  constructor(private readonly assets: Array<TAsset>) {
    this.items = {};
    this.loader = new Loader();
    this.queue = assets.length;
    this.loaded = 0;
    
    this.preload()
      .then(() => {
        emitEvent('eResourcesReady')
      })
  }

  private async preload(): Promise<void> {
    for (const asset of this.assets) {
      if (asset.type === 'image') {
        await this.loader.loaderTexture(asset.path).then((result) => {
          this.save(asset, result);
        })
      }
    }
  }

  private save(asset: TAsset, result: any): void {
    this.items[asset.name] = result;
    this.loaded++;
    if (this.loaded === this.queue) {
      return;
    }
  }
}

export default Resources;