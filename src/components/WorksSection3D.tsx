// ── WorksSection3D — Rocket Launch Scene ──────────────────────────────────────
// Each project is a rocket on a launch pad. Click to launch!
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { Rocket, CheckCircle2 } from "lucide-react";
import * as THREE from "three";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

const projects = [
  {
    title: "HackOverflow 2K25",
    subtitle: "Hackathon Management Portal",
    challenge: "SRKR Coding Club needed a comprehensive platform to manage their flagship hackathon event with registration, team management, and real-time updates.",
    solution: "Built a vibrant, user-friendly event management platform with participant registration, team formation, live leaderboards, and admin dashboard in 4 weeks.",
    results: ["250+ event registrations", "Zero downtime during 24-hour hackathon", "Seamless experience for 50+ teams"],
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    color: 0x3b82f6,
    accentColor: 0x93c5fd,
    hexColor: "#3b82f6",
    hexAccent: "#93c5fd",
    position: { x: -8, z: 0 },
    url: "https://hackoverflow.srkrcodingclub.in/",
  },
  {
    title: "IconCoderz Portal",
    subtitle: "Coding Competition Platform",
    challenge: "SRKR Coding Club required a dedicated platform for their coding competition series with automated evaluation and scoring systems.",
    solution: "Developed an interactive coding portal with problem sets, real-time code submission, automated testing, and dynamic ranking system.",
    results: ["300+ active participants", "99.9% uptime during competitions", "Automated evaluation of 5000+ submissions"],
    tech: ["React", "Express", "PostgreSQL", "Docker"],
    color: 0xa855f7,
    accentColor: 0xd8b4fe,
    hexColor: "#a855f7",
    hexAccent: "#d8b4fe",
    position: { x: -4, z: 0 },
    url: "https://iconcoderz.srkrcodingclub.in/",
  },
  {
    title: "Raja Cycle Stores",
    subtitle: "E-commerce & Inventory Platform",
    challenge: "A traditional bicycle retail business needed digital transformation with online presence and inventory management on a tight timeline.",
    solution: "Created a modern e-commerce platform with product catalog, online ordering, inventory tracking, and customer management system despite challenging last-minute requirement changes.",
    results: ["Digital presence established", "Online ordering system live", "Streamlined inventory management"],
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    color: 0xf97316,
    accentColor: 0xfdba74,
    hexColor: "#f97316",
    hexAccent: "#fdba74",
    position: { x: 0, z: 0 },
    url: "https://www.therajacyclestores.com/",
  },
  {
    title: "CodeQuest",
    subtitle: "Interactive Learning Platform",
    challenge: "Building an engaging platform for students to learn programming through interactive challenges and gamified experiences.",
    solution: "Developed a comprehensive learning platform with coding challenges, progress tracking, achievement system, and community features.",
    results: ["Engaging learning experience", "Interactive code editor", "Gamified progress system"],
    tech: ["React", "Firebase", "Monaco Editor", "Tailwind CSS"],
    color: 0x10b981,
    accentColor: 0x6ee7b7,
    hexColor: "#10b981",
    hexAccent: "#6ee7b7",
    position: { x: 4, z: 0 },
    url: "https://codequest.srkrcodingclub.in/",
  },
  {
    title: "Car 1983",
    subtitle: "Uber-like Ride-Hailing Platform",
    challenge: "Developing a highly scalable, real-time ride-hailing platform from scratch to handle instant driver matching, live trip tracking, and secure payments for a multi-state US launch.",
    solution: "Engineered an event-driven microservices backend using NestJS and Kafka on AWS, paired with cross-platform React Native mobile apps and a Next.js admin dashboard.",
    results: ["Real-time latency under 3 seconds", "Single codebase for iOS & Android", "API response times < 200ms"],
    tech: ["React Native", "NestJS", "AWS", "Kafka"],
    color: 0xf59e0b,
    accentColor: 0xfde68a,
    hexColor: "#f59e0b",
    hexAccent: "#fde68a",
    position: { x: 8, z: 0 },
    url: "", // Insert the correct URL when ready
  }
];

// ── Build a rocket mesh group ─────────────────────────────────────────────────
function buildRocket(color: number, accentColor: number, isLowEnd: boolean): THREE.Group {
  const group = new THREE.Group();
  const seg = isLowEnd ? 12 : 24;

  const bodyMat   = new THREE.MeshStandardMaterial({ color, metalness: 0.5, roughness: 0.45 });
  const accentMat = new THREE.MeshStandardMaterial({ color: accentColor, metalness: 0.6, roughness: 0.3 });
  const darkMat   = new THREE.MeshStandardMaterial({ color: 0x111122, metalness: 0.7, roughness: 0.4 });
  const nozzleMat = new THREE.MeshStandardMaterial({ color: 0x777788, metalness: 0.9, roughness: 0.2 });
  const windowMat = new THREE.MeshStandardMaterial({
    color: 0x88ccff, emissive: 0x224466, emissiveIntensity: 0.7,
    metalness: 0.9, roughness: 0.1,
  });

  // Body
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.42, 3.2, seg), bodyMat);
  body.position.y = 1.6;
  body.castShadow = !isLowEnd;
  group.add(body);

  // Nose cone
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.38, 1.6, seg), accentMat);
  nose.position.y = 4.0;
  nose.castShadow = !isLowEnd;
  group.add(nose);

  // Nose tip cap
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), darkMat);
  tip.position.y = 4.82;
  group.add(tip);

  // Accent bands
  const band1 = new THREE.Mesh(new THREE.CylinderGeometry(0.435, 0.435, 0.17, seg), accentMat);
  band1.position.y = 2.8;
  group.add(band1);

  const band2 = new THREE.Mesh(new THREE.CylinderGeometry(0.435, 0.435, 0.17, seg), darkMat);
  band2.position.y = 1.2;
  group.add(band2);

  // Porthole + ring
  const porthole = new THREE.Mesh(new THREE.CircleGeometry(0.13, 16), windowMat);
  porthole.position.set(0.4, 2.5, 0);
  porthole.rotation.y = Math.PI / 2;
  group.add(porthole);
  const pRing = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.025, 8, 20), accentMat);
  pRing.position.set(0.39, 2.5, 0);
  pRing.rotation.y = Math.PI / 2;
  group.add(pRing);

  // Fins (3 × 120°)
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    const shape = new THREE.Shape();
    shape.moveTo(0, 0); shape.lineTo(0.85, -0.55);
    shape.lineTo(0.65, 0.9); shape.lineTo(0, 0.95); shape.closePath();
    const finGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.06, bevelEnabled: false });
    finGeo.center();
    const fin = new THREE.Mesh(finGeo, accentMat);
    fin.rotation.y = angle + Math.PI / 2;
    fin.position.set(Math.cos(angle) * 0.43, 0.7, Math.sin(angle) * 0.43);
    fin.castShadow = !isLowEnd;
    group.add(fin);
  }

  // Engine nozzle
  const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.38, 0.55, isLowEnd ? 12 : 20), nozzleMat);
  nozzle.position.y = -0.27;
  group.add(nozzle);
  const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.52, 0.28, isLowEnd ? 12 : 20), nozzleMat);
  bell.position.y = -0.67;
  group.add(bell);

  // --- Flame group (hidden by default) ---
  const flameGroup = new THREE.Group();
  flameGroup.name = "flame";
  flameGroup.visible = false;

  const mkFlameCone = (radius: number, height: number, color: number, opacity: number) => {
    const m = new THREE.Mesh(
      new THREE.ConeGeometry(radius, height, 14),
      new THREE.MeshBasicMaterial({
        color, transparent: true, opacity,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })
    );
    m.rotation.x = Math.PI;
    return m;
  };

  const fc = mkFlameCone(0.16, 1.3, 0xffffaa, 0.95); fc.position.y = -1.4; flameGroup.add(fc);
  const fm = mkFlameCone(0.34, 2.0, 0xff7700, 0.70); fm.position.y = -1.8; flameGroup.add(fm);
  const fo = mkFlameCone(0.50, 2.6, 0xff2200, 0.32); fo.position.y = -2.1; flameGroup.add(fo);
  group.add(flameGroup);

  return group;
}

// ── Build a launch pad mesh group ─────────────────────────────────────────────
function buildLaunchPad(color: number, isLowEnd: boolean): THREE.Group {
  const group = new THREE.Group();
  const concreteMat = new THREE.MeshStandardMaterial({ color: 0x444455, roughness: 0.9, metalness: 0.1 });
  const steelMat    = new THREE.MeshStandardMaterial({ color: 0x778899, roughness: 0.5, metalness: 0.7 });
  const accentMat   = new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.5 });

  // Base disc
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.4, 0.22, isLowEnd ? 10 : 20), concreteMat);
  base.receiveShadow = !isLowEnd;
  group.add(base);

  // Central column
  const col = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 1.2, 10), steelMat);
  col.position.y = 0.7;
  group.add(col);

  // Platform top
  const top = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.65, 0.14, isLowEnd ? 10 : 20), steelMat);
  top.position.y = 1.37;
  group.add(top);

  // Accent ring
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.045, 8, isLowEnd ? 20 : 36), accentMat);
  ring.position.y = 1.45;
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  // Support struts
  if (!isLowEnd) {
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      const strut = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.9, 0.07), steelMat);
      strut.position.set(Math.cos(a) * 0.9, 0.5, Math.sin(a) * 0.9);
      strut.rotation.z = a + Math.PI / 6;
      group.add(strut);
    }
  }

  return group;
}

// ── Main Section Component ──────────────────────────────────────────────────
const WorksSection3D = () => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const rocketsRef        = useRef<THREE.Group[]>([]);
  const exhaustLightsRef  = useRef<THREE.PointLight[]>([]);
  const scrollProgressRef = useRef(0);
  const isVisibleRef      = useRef(false);
  const isDraggingRef     = useRef(false);
  const mouseRef          = useRef({ x: 0, y: 0 });
  const targetRotRef      = useRef({ x: 0, y: 0 });
  const currentRotRef     = useRef({ x: 0.18, y: 0 });
  const { isLowEnd } = usePerformanceMode();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headerY       = useTransform(scrollYProgress, [0, 0.25], [60, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.18], [0, 1]);

  // Track scroll for camera orbit
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => { scrollProgressRef.current = v; });
    return () => unsub();
  }, [scrollYProgress]);

  // Pause when off-screen
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { isVisibleRef.current = e.isIntersecting; }),
      { threshold: 0, rootMargin: "100px" }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // ── Three.js scene ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    // Pre-dawn cobalt sky — vibrant but not pitch black
    scene.background = new THREE.Color(0x0f2548);
    scene.fog = new THREE.FogExp2(0x0f2548, 0.014);

    const camera = new THREE.PerspectiveCamera(
      52,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      600
    );
    camera.position.set(0, 7, 22);
    camera.lookAt(0, 3, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: !isLowEnd && window.devicePixelRatio <= 1,
      alpha: false, // solid background so the sky color shows
      powerPreference: "high-performance",
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowEnd ? 1 : 1.5));
    renderer.shadowMap.enabled = !isLowEnd;
    if (!isLowEnd) renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // ── Lighting ──────────────────────────────────────────────────────────────
    // Strong ambient so rockets are clearly visible
    scene.add(new THREE.AmbientLight(0x4466aa, isLowEnd ? 3.5 : 2.2));

    // Main key light — bright cool white from above-left
    const moonLight = new THREE.DirectionalLight(0xe8f0ff, 2.2);
    moonLight.position.set(-8, 18, 8);
    if (!isLowEnd) {
      moonLight.castShadow = true;
      moonLight.shadow.mapSize.set(1024, 1024);
      moonLight.shadow.camera.near = 0.5;
      moonLight.shadow.camera.far = 60;
      moonLight.shadow.bias = -0.001;
    }
    scene.add(moonLight);

    // Fill light from the right so no face is fully dark
    const fillLight = new THREE.DirectionalLight(0x6699cc, 1.2);
    fillLight.position.set(10, 8, -5);
    scene.add(fillLight);

    // Hemisphere: bright sky blue top, medium navy ground
    scene.add(new THREE.HemisphereLight(0x4488cc, 0x182d4a, 1.4));

    // ── Stars ─────────────────────────────────────────────────────────────────
    const starCount = isLowEnd ? 600 : 1400;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 120 + Math.random() * 180;
      starPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      starPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i*3+2] = r * Math.cos(phi);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
      color: 0xffffff, size: 0.5, sizeAttenuation: true, transparent: true, opacity: 0.85,
    })));

    // ── Ground ────────────────────────────────────────────────────────────────
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(80, 60, isLowEnd ? 8 : 24, isLowEnd ? 6 : 18),
      new THREE.MeshStandardMaterial({ color: 0x1a3050, roughness: 0.9, metalness: 0.15 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.11;
    ground.receiveShadow = !isLowEnd;
    scene.add(ground);

    if (!isLowEnd) {
      const grid = new THREE.GridHelper(60, 30, 0x3a6090, 0x1a3050);
      grid.position.y = -0.09;
      scene.add(grid);
    }

    // ── Build pads + rockets ──────────────────────────────────────────────────
    rocketsRef.current       = [];
    exhaustLightsRef.current = [];

    projects.forEach((p, i) => {
      const pad = buildLaunchPad(p.color, isLowEnd);
      pad.position.set(p.position.x, 0, p.position.z);
      scene.add(pad);

      const rocket = buildRocket(p.color, p.accentColor, isLowEnd);
      rocket.position.set(p.position.x, 1.46, p.position.z);
      rocket.userData = { index: i, baseY: 1.46, targetY: 1.46, launched: false };
      scene.add(rocket);
      rocketsRef.current.push(rocket);

      const exLight = new THREE.PointLight(p.color, 0, 8, 2);
      exLight.position.set(p.position.x, 0.5, p.position.z);
      scene.add(exLight);
      exhaustLightsRef.current.push(exLight);
    });

    // ── Raycaster / interaction ───────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse     = new THREE.Vector2();

    // Collect only non-flame meshes for hit-testing
    const collectHittable = () =>
      rocketsRef.current.flatMap((r) =>
        r.children.filter(
          (c): c is THREE.Mesh =>
            c instanceof THREE.Mesh && c.name !== "flame"
        )
      );

    let lastRaycast = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;

      if (isDraggingRef.current) {
        targetRotRef.current.y += (e.clientX - mouseRef.current.x) * 0.005;
        targetRotRef.current.x += (e.clientY - mouseRef.current.y) * 0.003;
        targetRotRef.current.x = Math.max(-0.5, Math.min(0.6, targetRotRef.current.x));
        mouseRef.current = { x: e.clientX, y: e.clientY };
        return;
      }

      const now = Date.now();
      if (now - lastRaycast < 80) return;
      lastRaycast = now;

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(collectHittable(), false);

      rocketsRef.current.forEach((rocket) => {
        const isHit = hits.some((h) => rocket.children.includes(h.object));
        const fg = rocket.getObjectByName("flame");
        if (fg) fg.visible = isHit || rocket.userData.launched;
        exhaustLightsRef.current[rocket.userData.index].intensity =
          isHit || rocket.userData.launched ? 1.4 : 0;
      });
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(collectHittable(), false);
      if (!hits.length) return;

      const hitRocket = rocketsRef.current.find((r) => r.children.includes(hits[0].object));
      if (!hitRocket) return;

      const idx = hitRocket.userData.index;
      setSelectedProject((prev) => {
        const next = prev === idx ? null : idx;

        // Reset all other rockets
        rocketsRef.current.forEach((r, i) => {
          if (i !== idx || next === null) {
            r.userData.launched = false;
            r.userData.targetY  = r.userData.baseY;
            const fg = r.getObjectByName("flame");
            if (fg) fg.visible = false;
            exhaustLightsRef.current[i].intensity = 0;
          }
        });

        if (next !== null) {
          hitRocket.userData.launched = true;
          hitRocket.userData.targetY  = hitRocket.userData.baseY + 2.8;
          const fg = hitRocket.getObjectByName("flame");
          if (fg) fg.visible = true;
        }
        return next;
      });
    };

    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      mouseRef.current      = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => { isDraggingRef.current = false; };

    canvasRef.current.addEventListener("mousemove",  onMouseMove);
    canvasRef.current.addEventListener("click",      onClick);
    canvasRef.current.addEventListener("mousedown",  onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const onResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ────────────────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      const t = clock.getElapsedTime();

      // Camera orbit
      currentRotRef.current.x += (targetRotRef.current.x - currentRotRef.current.x) * 0.05;
      currentRotRef.current.y += (targetRotRef.current.y - currentRotRef.current.y) * 0.05;

      if (!isDraggingRef.current) {
        targetRotRef.current.y = scrollProgressRef.current * Math.PI * 1.6;
      }

      const r = 22;
      camera.position.x = Math.sin(currentRotRef.current.y) * r;
      camera.position.z = Math.cos(currentRotRef.current.y) * r;
      camera.position.y = 7 + Math.sin(currentRotRef.current.x) * 5;
      camera.lookAt(0, 3, 0);

      // Animate rockets
      rocketsRef.current.forEach((rocket) => {
        // Smooth vertical lerp
        rocket.position.y += (rocket.userData.targetY - rocket.position.y) * 0.07;

        if (!rocket.userData.launched) {
          // Gentle idle sway on pad
          rocket.rotation.z = Math.sin(t * 0.55 + rocket.userData.index * 1.3) * 0.012;
          rocket.rotation.x = Math.sin(t * 0.40 + rocket.userData.index * 0.9) * 0.008;
        } else {
          // Shake on launch
          rocket.rotation.z = Math.sin(t * 18 + rocket.userData.index) * 0.018;
        }

        // Flame flicker
        const fg = rocket.getObjectByName("flame");
        if (fg && fg.visible) {
          const flicker = 0.85 + Math.sin(t * 32 + rocket.userData.index * 3.7) * 0.15;
          fg.scale.set(flicker, flicker + Math.sin(t * 45) * 0.12, flicker);

          const ex = exhaustLightsRef.current[rocket.userData.index];
          if (ex) {
            ex.intensity = 1.6 + Math.sin(t * 28 + rocket.userData.index) * 0.5;
            ex.position.y = rocket.position.y - 1.2;
          }
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvasRef.current?.removeEventListener("mousemove",  onMouseMove);
      canvasRef.current?.removeEventListener("click",      onClick);
      canvasRef.current?.removeEventListener("mousedown",  onMouseDown);
      window.removeEventListener("mouseup",  onMouseUp);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, [isLowEnd]);

  // Sync emissive highlight when selectedProject changes
  useEffect(() => {
    rocketsRef.current.forEach((rocket, i) => {
      const body = rocket.children[0] as THREE.Mesh;
      if (body?.material instanceof THREE.MeshStandardMaterial) {
        body.material.emissive.set(i === selectedProject ? projects[i].hexColor : "#000000");
        body.material.emissiveIntensity = i === selectedProject ? 0.35 : 0;
      }
    });
  }, [selectedProject]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-muted/30 via-background to-muted/20 relative overflow-hidden"
    >
      {/* Subtle ambient blobs using theme primary/accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/8 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-secondary/10 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
          >
            <Rocket className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Mission Control</span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Projects We've Launched
          </h2>
          <p className="text-sm text-muted-foreground italic">
            💡 Scroll to orbit · Drag to look around · Click a rocket to launch
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-border shadow-xl mb-12"
        >
          <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_60px_rgba(0,0,0,0.4)]" />

          {/* Rocket labels */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-around px-6 pointer-events-none">
            {projects.map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-1 opacity-80">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.hexColor }} />
                <span className="text-[10px] text-white/70 font-medium hidden md:block text-center max-w-[80px] leading-tight">
                  {p.title}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Project Details Panel */}
        {selectedProject !== null && (
          <motion.div
            key={selectedProject}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35 }}
            className="max-w-4xl mx-auto bg-card rounded-2xl p-8 shadow-xl border mb-12"
            style={{
              borderColor: `${projects[selectedProject].hexColor}40`,
              boxShadow: `0 8px 40px ${projects[selectedProject].hexColor}14`,
            }}
          >
            {/* Color bar */}
            <div
              className="w-14 h-1 rounded-full mb-6"
              style={{ background: projects[selectedProject].hexColor }}
            />

            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-display text-3xl font-bold text-foreground mb-2">
                  {projects[selectedProject].title}
                </h3>
                <p className="text-lg font-medium" style={{ color: projects[selectedProject].hexColor }}>
                  {projects[selectedProject].subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-muted-foreground hover:text-foreground transition-colors text-xl leading-none mt-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Challenge</h4>
                <p className="text-foreground leading-relaxed">{projects[selectedProject].challenge}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Solution</h4>
                <p className="text-foreground leading-relaxed">{projects[selectedProject].solution}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" /> Key Results
                </h4>
                <ul className="space-y-2">
                  {projects[selectedProject].results.map((result, i) => (
                    <li key={i} className="flex items-start gap-2 text-foreground">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {projects[selectedProject].tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-md text-sm font-semibold"
                      style={{
                        background: `${projects[selectedProject].hexColor}15`,
                        border:     `1px solid ${projects[selectedProject].hexColor}38`,
                        color:       projects[selectedProject].hexAccent,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-muted-foreground max-w-md text-sm">Ready to launch your next big idea?</p>
            <Button
              size="lg"
              className="text-base px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <a href="#cta">🚀 Start Your Launch</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorksSection3D;
