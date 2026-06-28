import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const displayVertexShader = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const displayFragmentShader = `
precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_fluid;
uniform sampler2D u_fluidTex;
varying vec2 v_uv;

vec3 palette(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 uv = v_uv;
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  uv = (uv * 2.0 - 1.0) * aspect;

  vec2 mouse = vec2(-10.0, -10.0);
  if (u_mouse.x > 0.0) {
    mouse = (u_mouse * 2.0 - 1.0) * aspect;
  }

  float r = length(uv);
  float theta = atan(uv.y, uv.x);
  r += 0.05 * sin(theta * 3.0 + u_time * 0.3) + 0.03 * sin(theta * 7.0 - u_time * 0.5);

  vec2 swirl = vec2(cos(r * 4.0 - u_time * 0.6 + theta), sin(r * 4.0 - u_time * 0.6 + theta));
  vec2 baseField = vec2(cos(theta + swirl.x * 0.4), sin(theta + swirl.y * 0.4)) * (0.5 + 0.3 * sin(r * 6.0 + u_time * 0.2));

  vec2 mouseField = vec2(0.0);
  vec2 mD = uv - mouse;
  float mR = length(mD);
  float mF = 0.5 * exp(-mR * mR * 0.2);
  mouseField += mF * vec2(-mD.y, mD.x) / (mR + 0.001);
  mouseField -= 0.5 * mF * mD / (mR + 0.001);

  vec2 field = baseField + mouseField + vec2(0.3 * cos(uv.y * 3.0 + u_time * 0.3), 0.3 * sin(uv.x * 3.0 + u_time * 0.4));

  vec2 fUV = v_uv + field * u_fluid * 0.02;
  vec4 fluidColor = texture2D(u_fluidTex, fUV);
  r -= 0.1 * (fluidColor.r + fluidColor.g);

  float patA = dot(field, vec2(cos(theta), sin(theta)));
  patA += fluidColor.r * 0.4;
  patA += fluidColor.g * 0.3;
  patA = clamp(0.5 * patA, 0.0, 1.0);

  float patB = smoothstep(0.4, 0.6, r + (fluidColor.r + fluidColor.g) * 0.15);
  float patC = smoothstep(0.3, 0.8, length(field));

  vec3 goldA = vec3(0.5, 0.4, 0.1);
  vec3 goldB = vec3(0.5, 0.3, 0.1);
  vec3 goldC = vec3(1.0, 0.8, 0.6);
  vec3 goldD = vec3(0.1, 0.05, 0.0);

  vec3 emberA = vec3(0.5, 0.3, 0.1);
  vec3 emberB = vec3(0.5, 0.2, 0.1);
  vec3 emberC = vec3(0.8, 0.4, 0.3);
  vec3 emberD = vec3(0.1, 0.02, 0.0);

  float tA = patA + 0.02 * u_time;
  float tB = patB + 0.015 * u_time;
  vec3 colA = palette(tA, goldA, goldB, goldC, goldD);
  vec3 colB = palette(tB, emberA, emberB, emberC, emberD);
  vec3 col = mix(colA, colB, patC);

  float edge = 1.0 - smoothstep(0.8, 1.1, r);
  col *= 0.85 + 0.15 * edge;

  float grain = hash(uv + fract(u_time * 0.1) * 100.0);
  col += 0.04 * grain - 0.02;

  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;

const fluidVertexShader = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fluidFragmentShader = `
precision mediump float;
uniform sampler2D u_prevFluid;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_mouseActive;
uniform float u_fluid;
uniform float u_time;
varying vec2 v_uv;

void main() {
  vec2 texel = 1.0 / u_resolution;
  vec4 prev = texture2D(u_prevFluid, v_uv);
  float vx = prev.r;
  float vy = prev.g;
  float ink = prev.b;

  vec4 left = texture2D(u_prevFluid, v_uv + vec2(-texel.x, 0.0));
  vec4 right = texture2D(u_prevFluid, v_uv + vec2(texel.x, 0.0));
  vec4 up = texture2D(u_prevFluid, v_uv + vec2(0.0, texel.y));
  vec4 down = texture2D(u_prevFluid, v_uv + vec2(0.0, -texel.y));

  vx += 0.25 * (left.r + right.r + up.r + down.r) - 0.1;
  vy += 0.25 * (left.g + right.g + up.g + down.g) - 0.1;
  ink += 0.25 * (left.b + right.b + up.b + down.b) - 0.1;

  vec2 advUV = v_uv - 0.02 * vec2(vx, vy);
  vec4 advected = texture2D(u_prevFluid, advUV);
  vx += 0.03 * advected.b;
  vy += 0.03 * advected.g;
  ink += 0.03 * advected.r;

  float fx = v_uv.x * 8.0 + u_time * 0.15;
  float fy = v_uv.y * 8.0 + u_time * 0.2;
  vx += 0.002 * cos(fy);
  vy += 0.002 * sin(fx);

  float amb = exp(-pow(length(v_uv - 0.5) * 2.5, 2.0));
  ink += 0.005 * amb;
  ink *= 0.99;

  if (u_mouseActive > 0.5) {
    vec2 mouseNorm = u_mouse;
    vec2 mD = v_uv - mouseNorm;
    float mR = length(m_d);
    float mF = 0.25 * exp(-mR * mR * 12.0);
    vx += mF * (-mD.y);
    vy += mF * mD.x;
    ink += mF * 0.15;
  }

  vx *= 0.994;
  vy *= 0.994;

  gl_FragColor = vec4(clamp(vx, -0.4, 0.4), clamp(vy, -0.4, 0.4), clamp(ink, -0.4, 1.2), 1.0);
}
`;

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.offsetWidth;
    const h = container.offsetHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setSize(w, h);
    renderer.setPixelRatio(dpr * 0.5);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Camera
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Geometry
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Fluid ping-pong buffers
    const simW = Math.floor(w * dpr * 0.5);
    const simH = Math.floor(h * dpr * 0.5);

    const rtOptions: THREE.RenderTargetOptions = {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType,
    };

    let rtA = new THREE.WebGLRenderTarget(simW, simH, rtOptions);
    let rtB = new THREE.WebGLRenderTarget(simW, simH, rtOptions);

    // Fluid material
    const fluidMaterial = new THREE.ShaderMaterial({
      vertexShader: fluidVertexShader,
      fragmentShader: fluidFragmentShader,
      uniforms: {
        u_prevFluid: { value: rtA.texture },
        u_resolution: { value: new THREE.Vector2(simW, simH) },
        u_mouse: { value: new THREE.Vector2(-1, -1) },
        u_mouseActive: { value: 0.0 },
        u_fluid: { value: 1.0 },
        u_time: { value: 0.0 },
      },
    });

    // Display material
    const displayMaterial = new THREE.ShaderMaterial({
      vertexShader: displayVertexShader,
      fragmentShader: displayFragmentShader,
      uniforms: {
        u_resolution: { value: new THREE.Vector2(w, h) },
        u_mouse: { value: new THREE.Vector2(-1, -1) },
        u_time: { value: 0.0 },
        u_fluid: { value: 1.0 },
        u_fluidTex: { value: rtB.texture },
      },
    });

    // Scenes
    const fluidScene = new THREE.Scene();
    const fluidMesh = new THREE.Mesh(geometry, fluidMaterial);
    fluidScene.add(fluidMesh);

    const displayScene = new THREE.Scene();
    const displayMesh = new THREE.Mesh(geometry, displayMaterial);
    displayScene.add(displayMesh);

    // Mouse tracking
    const mouse = { x: -1, y: -1, targetX: -1, targetY: -1 };
    let mouseTimeout: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX / w;
      mouse.targetY = 1.0 - e.clientY / h;
      fluidMaterial.uniforms.u_mouseActive.value = 1.0;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        fluidMaterial.uniforms.u_mouseActive.value = 0.0;
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const startTime = performance.now();

    function animate() {
      frameRef.current = requestAnimationFrame(animate);

      const elapsed = (performance.now() - startTime) / 1000;

      // Lerp mouse
      if (mouse.targetX >= 0) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      }

      // Update fluid uniforms
      fluidMaterial.uniforms.u_time.value = elapsed;
      fluidMaterial.uniforms.u_mouse.value.set(mouse.x, mouse.y);
      fluidMaterial.uniforms.u_prevFluid.value = rtA.texture;

      // Fluid pass: render to rtB
      renderer.setRenderTarget(rtB);
      renderer.render(fluidScene, camera);

      // Update display uniforms
      displayMaterial.uniforms.u_time.value = elapsed;
      displayMaterial.uniforms.u_mouse.value.set(mouse.x, mouse.y);
      displayMaterial.uniforms.u_fluidTex.value = rtB.texture;

      // Display pass: render to screen
      renderer.setRenderTarget(null);
      renderer.render(displayScene, camera);

      // Swap
      const temp = rtA;
      rtA = rtB;
      rtB = temp;
    }

    animate();

    // Resize
    const handleResize = () => {
      const newW = container.offsetWidth;
      const newH = container.offsetHeight;
      const newDpr = Math.min(window.devicePixelRatio, 2);

      renderer.setSize(newW, newH);
      renderer.setPixelRatio(newDpr * 0.5);

      const newSimW = Math.floor(newW * newDpr * 0.5);
      const newSimH = Math.floor(newH * newDpr * 0.5);

      rtA.setSize(newSimW, newSimH);
      rtB.setSize(newSimW, newSimH);

      displayMaterial.uniforms.u_resolution.value.set(newW, newH);
      fluidMaterial.uniforms.u_resolution.value.set(newSimW, newSimH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      clearTimeout(mouseTimeout);
      renderer.dispose();
      geometry.dispose();
      fluidMaterial.dispose();
      displayMaterial.dispose();
      rtA.dispose();
      rtB.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
