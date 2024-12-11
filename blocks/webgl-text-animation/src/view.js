import {Curtains, Plane, ShaderPass} from 'curtainsjs';
import {TextTexture} from './TextTexture';

document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.wp-block-my-theme-webgl-text-animation');
  
  blocks.forEach(block => {
    initWebGL(block);
  });
});

function initWebGL(block) {
  const scrollStrength = parseFloat(block.dataset.scrollStrength) || 2.5;
  const canvas = block.querySelector('canvas');
  
  // Your provided WebGL initialization code here, modified to work with the block
  const curtains = new Curtains({
    container: canvas,
    pixelRatio: Math.min(1.5, window.devicePixelRatio)
  });

  // Rest of your WebGL code...
  // (Include all the shader code and initialization from your original file)
}