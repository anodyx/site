// WireframeSphere.jsx
// Drop this into your React project.
// Install: npm install three
// Usage: <WireframeSphere />

import { useEffect, useRef, CSSProperties } from "react";
import * as THREE from "three";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

interface WireframeSphereProps {
  width?: string | number;
  height?: string | number;
  style?: CSSProperties;
  className?: string;
}

export default function WireframeSphere({ width, height, style, className }: WireframeSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const W = container.clientWidth;
    const H = container.clientHeight;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true }); // Disabled antialias for performance
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Cap pixel ratio
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    // ── Sphere geometry — extract nodes & edges ───────────────────────────────
    const RADIUS = 1.6;
    const geoBase = new THREE.IcosahedronGeometry(RADIUS, 3);
    const posAttr = geoBase.getAttribute("position");

    const uniqueVerts = [];
    const vertMap = new Map();

    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i), y = posAttr.getY(i), z = posAttr.getZ(i);
      const key = `${x.toFixed(3)},${y.toFixed(3)},${z.toFixed(3)}`;
      if (!vertMap.has(key)) {
        vertMap.set(key, uniqueVerts.length);
        uniqueVerts.push(new THREE.Vector3(x, y, z));
      }
    }

    const edgeSet = new Set();
    const edgeList = [];
    for (let i = 0; i < posAttr.count; i += 3) {
      const tri = [0, 1, 2].map((j) => {
        const x = posAttr.getX(i + j), y = posAttr.getY(i + j), z = posAttr.getZ(i + j);
        return vertMap.get(`${x.toFixed(3)},${y.toFixed(3)},${z.toFixed(3)}`);
      });
      for (let a = 0; a < 3; a++) {
        const v0 = tri[a], v1 = tri[(a + 1) % 3];
        const ekey = v0 < v1 ? `${v0}_${v1}` : `${v1}_${v0}`;
        if (!edgeSet.has(ekey)) {
          edgeSet.add(ekey);
          edgeList.push([v0, v1]);
        }
      }
    }

    const nodeCount = uniqueVerts.length;
    const nodeTargets = uniqueVerts.map((v) => v.clone());
    const nodeStarts = uniqueVerts.map(
      () =>
        new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 14
        )
    );
    const nodeCurrent = nodeStarts.map((v) => v.clone());

    // ── Node Points ───────────────────────────────────────────────────────────
    const nodeGeo = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    const nodeSizes = new Float32Array(nodeCount);
    for (let i = 0; i < nodeCount; i++) nodeSizes[i] = 0.022 + Math.random() * 0.012;
    nodeGeo.setAttribute("size", new THREE.BufferAttribute(nodeSizes, 1));

    const nodeMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        assembled: { value: 0 },
        pingIndex: { value: -1 },
        pingTime: { value: -999 },
      },
      vertexShader: `
        attribute float size;
        uniform float time;
        uniform float assembled;
        uniform int pingIndex;
        uniform float pingTime;
        varying float vPulse;
        varying float vPing;
        void main() {
          float phase = float(gl_VertexID) * 0.618 * 3.14159;
          float pulse = sin(time * 1.8 + phase) * 0.5 + 0.5;
          vPulse = pulse;
          float pingAge = time - pingTime;
          vPing = (gl_VertexID == pingIndex && pingAge > 0.0 && pingAge < 1.2)
                  ? max(0.0, 1.0 - pingAge / 1.2) : 0.0;
          float s = size * (1.0 + pulse * 0.3 * assembled + vPing * 0.8);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = s * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying float vPulse;
        varying float vPing;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float core = smoothstep(0.5, 0.1, d);
          float glow = smoothstep(0.5, 0.0, d) * 0.6;
          vec3 coreColor = mix(vec3(0.7, 0.95, 1.0), vec3(1.0, 1.0, 1.0), core);
          vec3 glowColor = vec3(0.0, 0.83, 1.0);
          vec3 pingColor = vec3(0.3, 1.0, 0.9);
          vec3 col = coreColor * core + glowColor * glow + pingColor * vPing * 0.9;
          float alpha = (core + glow * 0.7) * (1.0 + vPulse * 0.2 + vPing * 0.6);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodePoints);

    // ── Edges ─────────────────────────────────────────────────────────────────
    const edgeGeo = new LineSegmentsGeometry();
    const edgePositionArray = new Float32Array(edgeList.length * 2 * 3);
    edgeGeo.setPositions(edgePositionArray);
    const edgeMat = new LineMaterial({
      color: 0x00ccff,
      transparent: true,
      opacity: 0.5,
      linewidth: 1,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      resolution: new THREE.Vector2(W, H),
    });
    const edgeLines = new LineSegments2(edgeGeo, edgeMat);
    scene.add(edgeLines);

    // ── Glow shell ────────────────────────────────────────────────────────────
    const glowGeo = new THREE.SphereGeometry(RADIUS * 1.12, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x0044ff,
      transparent: true,
      opacity: 0.5,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glowMesh);

    // ── 3D Logo — loaded from SVG vector paths ─────────────────────────────
    const logoMat = new THREE.MeshPhysicalMaterial({
      color: 0x1565C0,
      metalness: 0.6,
      roughness: 0.3,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
      transmission: 0,
      thickness: 1,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });

    let logoMesh: THREE.Mesh | null = null;

    const svgLoader = new SVGLoader();
    svgLoader.load("/Logo_2.svg", (svgData) => {

      const geometries: THREE.BufferGeometry[] = [];

      svgData.paths.forEach((path) => {

        const shapes = SVGLoader.createShapes(path);

        shapes.forEach((shape) => {

          const extrudeGeo = new THREE.ExtrudeGeometry(shape, {
            depth: 0.35,                 // controlled depth
            bevelEnabled: true,
            bevelThickness: 0.06,
            bevelSize: 0.05,
            bevelOffset: 0,
            bevelSegments: 5,
            steps: 1,
            curveSegments: 32
          });

          extrudeGeo.computeVertexNormals();
          geometries.push(extrudeGeo);

        });

      });

      if (!geometries.length) return;

      const mergedGeo = mergeGeometries(geometries, true);
      geometries.forEach(g => g.dispose());

      mergedGeo.center();

      // Flip Y because SVG coordinate system is inverted
      mergedGeo.scale(1, -1, 1);

      // Scale nicely inside sphere
      mergedGeo.computeBoundingBox();
      const box = mergedGeo.boundingBox!;
      const size = new THREE.Vector3();
      box.getSize(size);

      const maxDim = Math.max(size.x, size.y);
      const target = RADIUS * 1.15;
      const scaleFactor = target / maxDim;

      mergedGeo.scale(scaleFactor, scaleFactor, scaleFactor);
      mergedGeo.center();

      logoMesh = new THREE.Mesh(mergedGeo, logoMat);
      logoMesh.castShadow = false;
      logoMesh.receiveShadow = false;

      scene.add(logoMesh);
    });

    // Simple buffer geometry merge helper
    function mergeBufferGeometries(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry | null {
      const positions: number[] = [];
      const normals: number[] = [];

      for (const geo of geometries) {
        geo.computeVertexNormals();
        const posAttr2 = geo.getAttribute("position");
        const normAttr = geo.getAttribute("normal");
        for (let i = 0; i < posAttr2.count; i++) {
          positions.push(posAttr2.getX(i), posAttr2.getY(i), posAttr2.getZ(i));
          if (normAttr) {
            normals.push(normAttr.getX(i), normAttr.getY(i), normAttr.getZ(i));
          }
        }
      }

      if (positions.length === 0) return null;

      const merged = new THREE.BufferGeometry();
      merged.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      if (normals.length > 0) {
        merged.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
      }
      return merged;
    }

    // ── Lighting for 3D logo ───────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x3399ff, 0.7);
    fillLight.position.set(-3, -2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x00ccff, 1.0);
    rimLight.position.set(0, 0, -4);
    scene.add(rimLight);

    // ── Helpers ───────────────────────────────────────────────────────────────
    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    // ── Mouse ─────────────────────────────────────────────────────────────────
    let mouseX = 0, mouseY = 0;
    let currentRotX = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Animation loop ────────────────────────────────────────────────────────
    const ASSEMBLE_DUR = 2200;
    const EDGE_FADE_DUR = 600;
    const assembleStart = performance.now();
    let nextPingTime = 3.5;
    const clock = new THREE.Clock();
    let animId;

    const updateNodePositions = (t) => {
      const pos = nodeGeo.getAttribute("position");
      for (let i = 0; i < nodeCount; i++) {
        const delay = (i / nodeCount) * 0.35;
        const localT = Math.max(0, Math.min(1, (t - delay) / (1 - delay)));
        nodeCurrent[i].lerpVectors(nodeStarts[i], nodeTargets[i], easeOutExpo(localT));
        pos.setXYZ(i, nodeCurrent[i].x, nodeCurrent[i].y, nodeCurrent[i].z);
      }
      pos.needsUpdate = true;
    };

    const updateEdgePositions = () => {
      for (let i = 0; i < edgeList.length; i++) {
        const [a, b] = edgeList[i];
        edgePositionArray[i * 6] = nodeCurrent[a].x;
        edgePositionArray[i * 6 + 1] = nodeCurrent[a].y;
        edgePositionArray[i * 6 + 2] = nodeCurrent[a].z;
        edgePositionArray[i * 6 + 3] = nodeCurrent[b].x;
        edgePositionArray[i * 6 + 4] = nodeCurrent[b].y;
        edgePositionArray[i * 6 + 5] = nodeCurrent[b].z;
      }
      edgeGeo.setPositions(edgePositionArray);
    };

    // ── Intersection Observer ─────────────────────────────────────────────────
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0, rootMargin: '100px' }
    );
    intersectionObserver.observe(container);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      
      // Skip rendering if not visible
      if (!isVisibleRef.current) return;
      
      const elapsed = clock.getElapsedTime();
      const now = performance.now();
      const assembleT = Math.min(1, (now - assembleStart) / ASSEMBLE_DUR);
      const assembled = easeOutExpo(assembleT);

      updateNodePositions(assembleT);
      updateEdgePositions();
      nodeMat.uniforms.time.value = elapsed;
      nodeMat.uniforms.assembled.value = assembled;

      const edgeFadeStart = ASSEMBLE_DUR - EDGE_FADE_DUR * 0.5;
      const edgeT = Math.max(0, Math.min(1, (now - assembleStart - edgeFadeStart) / EDGE_FADE_DUR));
      edgeMat.opacity = easeOutCubic(edgeT) * 0.65;
      glowMat.opacity = assembled * 0.10;

      // 3D Logo fades in after sphere assembles, with gentle float + slow rotation
      if (logoMesh) {
        const logoFade = Math.max(0, Math.min(1, (assembleT - 0.7) / 0.3));
        logoMat.opacity = easeOutCubic(logoFade);
        logoMesh.position.y = Math.sin(elapsed * 1.2) * 0.04;
        logoMesh.rotation.y = elapsed * 0.3;
      }

      nodePoints.rotation.y = elapsed * 0.18;
      edgeLines.rotation.y = elapsed * 0.18;
      glowMesh.rotation.y = elapsed * 0.18;

      currentRotX += (mouseY * 0.25 - currentRotX) * 0.05;
      scene.rotation.x = currentRotX * 0.6;

      if (assembled > 0.95 && elapsed > nextPingTime) {
        const idx = Math.floor(Math.random() * nodeCount);
        nodeMat.uniforms.pingIndex.value = idx;
        nodeMat.uniforms.pingTime.value = elapsed;
        nextPingTime = elapsed + 2.0 + Math.random() * 2.0;
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = container.clientWidth, h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      edgeMat.resolution.set(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup on unmount ────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      intersectionObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      [geoBase, nodeGeo, edgeGeo, nodeMat, edgeMat, glowMat, glowGeo, logoMat].forEach((o) => o?.dispose?.());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: width ?? "100%",
        height: height ?? "100%",
        background: "transparent",
        ...style,
      }}
    />
  );
}
