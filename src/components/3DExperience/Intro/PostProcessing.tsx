import { ToneMapping, 
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Scanline, 
} from '@react-three/postprocessing'
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber';

export const PostProcessing = () => {

  return (
    <EffectComposer multisampling={8}>
      {/* <DepthOfField focalLength={0.4} bokehScale={0.05} height={700} /> */}
    </EffectComposer>
  )
}