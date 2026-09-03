/**
 * JiyanTech — Master Interactive 3D Digital Network Sphere
 * Faithfully implementing the high-end technology sphere architecture:
 * - Fibonacci particle point cloud with organic harmonic wave displacement
 * - Exploded-state entrance formation animation
 * - Deep navy, electric blue, tech cyan, and airy light particles
 * - Latitude guide rings
 * - Elevated network nodes & dynamic Catmull-Rom connection arcs
 * - Bidirectional data packets flowing across the network
 * - Dual tilted orbital trajectories with revolving satellite points
 * - Damped mouse parallax & dual-axis camera reaction
 * - ScrollTrigger scrub integration (dispersion & spatial shift)
 */

(function () {
  'use strict';

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const container = document.getElementById('hero-webgl-container');
    const canvas = document.getElementById('hero-sphere-canvas');
    if (!container || !canvas) return;

    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded. Retrying in 100ms...');
      setTimeout(init, 100);
      return;
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    try {
      buildScene(canvas, container);
    } catch (err) {
      console.error('DigitalNetwork init error:', err);
    }
  }

  // JiyanTech brand palette
  const COLOR_NAVY = 0x0a192f;
  const COLOR_ELECTRIC = 0x1d6fe8;
  const COLOR_DEEP_BLUE = 0x1557bf;
  const COLOR_CYAN = 0x0284c7;
  const COLOR_ACCENT = 0x38bdf8;

  function createSharpDotTexture() {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const center = size / 2;
    const radius = size * 0.4;

    ctx.clearRect(0, 0, size, size);
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    const grad = ctx.createRadialGradient(center, center, radius * 0.6, center, center, radius);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }

  function buildScene(canvas, container) {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = container.clientWidth || window.innerWidth * 0.5;
    let height = container.clientHeight || 560;
    const maxDPR = Math.min(window.devicePixelRatio || 1, 2);

    const particleCount = isMobile ? 6000 : isTablet ? 14000 : 22000;
    const sphereRadius = isMobile ? 2.4 : 2.9;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(isMobile ? 50 : 42, width / height, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 7.6 : 7.0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(maxDPR);
    renderer.setClearColor(0x000000, 0);

    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);
    sphereGroup.position.set(isMobile ? 0 : 0.35, isMobile ? -0.15 : 0, 0);

    const dotTexture = createSharpDotTexture();

    // --- Particle Sphere ---
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const initialPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);
    const baseAlphas = new Float32Array(particleCount);

    const tmpColor = new THREE.Color();
    const goldenAngle = Math.PI * (1 + Math.sqrt(5));

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
      const theta = goldenAngle * i;
      const jitter = 1 + (Math.random() - 0.5) * 0.05;
      const r = sphereRadius * jitter;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      const explode = 1.6 + Math.random() * 2.2;
      initialPositions[i3] = x * explode + (Math.random() - 0.5) * 1.2;
      initialPositions[i3 + 1] = y * explode + (Math.random() - 0.5) * 1.2;
      initialPositions[i3 + 2] = z * explode + (Math.random() - 0.5) * 1.2;

      // Mostly light/transparent, blue as accent — ~70% light, 20% navy, 10% blue
      const rand = Math.random();
      if (rand > 0.9) {
        tmpColor.setHex(COLOR_ELECTRIC);
      } else if (rand > 0.8) {
        tmpColor.setHex(COLOR_CYAN);
      } else if (rand > 0.6) {
        tmpColor.setHex(COLOR_NAVY);
      } else {
        // Light particles — very soft, airy
        tmpColor.setRGB(0.62, 0.72, 0.85);
      }

      colors[i3] = tmpColor.r;
      colors[i3 + 1] = tmpColor.g;
      colors[i3 + 2] = tmpColor.b;

      sizes[i] = (1.0 + Math.random() * 1.4) * (isMobile ? 0.8 : 1.0);
      phases[i] = Math.random() * Math.PI * 2;
      baseAlphas[i] = 0.3 + Math.random() * 0.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('aInitialPos', new THREE.BufferAttribute(initialPositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particleGeo.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
    particleGeo.setAttribute('baseAlpha', new THREE.BufferAttribute(baseAlphas, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: prefersReducedMotion ? 1.0 : 0.0 },
        uDispersion: { value: 0.0 },
        uTexture: { value: dotTexture },
        uDPR: { value: maxDPR },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uProgress;
        uniform float uDispersion;
        uniform float uDPR;

        attribute vec3 aInitialPos;
        attribute vec3 color;
        attribute float size;
        attribute float phase;
        attribute float baseAlpha;

        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec3 targetPos = position;
          float wave = sin(targetPos.x * 2.0 + uTime * 0.7 + phase)
                     * cos(targetPos.y * 2.0 + uTime * 0.7) * 0.022;
          targetPos += normalize(targetPos) * wave;

          if (uDispersion > 0.001) {
            targetPos += normalize(targetPos) * (uDispersion * 2.8);
          }

          vec3 currentPos = mix(aInitialPos, targetPos, uProgress);
          vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          float pSize = size * (200.0 / -mvPosition.z) * (uDPR * 0.5);
          gl_PointSize = clamp(pSize, 1.0, 18.0);

          float depthFactor = smoothstep(-9.5, -4.5, mvPosition.z);
          vec3 mutedColor = vec3(0.55, 0.65, 0.78);
          vColor = mix(mutedColor, color, depthFactor * 0.85 + 0.15);
          vAlpha = baseAlpha * (0.12 + 0.88 * depthFactor);
          vAlpha *= (1.0 - uDispersion * 0.75);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec4 texColor = texture2D(uTexture, gl_PointCoord);
          if (texColor.a < 0.05) discard;
          gl_FragColor = vec4(vColor, texColor.a * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMaterial);
    sphereGroup.add(particleSystem);

    // --- Guide rings (latitude) ---
    const guideRingGroup = new THREE.Group();
    sphereGroup.add(guideRingGroup);
    [-1.4, -0.7, 0, 0.7, 1.4].forEach((alt) => {
      const ringR = Math.sqrt(Math.max(0.1, sphereRadius * sphereRadius - alt * alt));
      const ringGeo = new THREE.BufferGeometry();
      const pts = [];
      for (let s = 0; s <= 72; s++) {
        const a = (s / 72) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * ringR, alt, Math.sin(a) * ringR));
      }
      ringGeo.setFromPoints(pts);
      const ringMat = new THREE.LineBasicMaterial({
        color: COLOR_ELECTRIC,
        transparent: true,
        opacity: alt === 0 ? 0.14 : 0.07,
        depthWrite: false,
      });
      guideRingGroup.add(new THREE.Line(ringGeo, ringMat));
    });

    // --- Network nodes ---
    const nodeCount = isMobile ? 18 : 24;
    const nodeData = [];
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
      const theta = goldenAngle * i * 1.25;
      const r = sphereRadius * 1.006;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      const pos = new THREE.Vector3(x, y, z);
      nodeData.push({ position: pos, connections: [] });
      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      const isCore = i % 3 === 0;
      const nColor = isCore ? COLOR_ELECTRIC : i % 2 === 0 ? COLOR_NAVY : COLOR_CYAN;
      const c = new THREE.Color(nColor);
      nodeColors[i * 3] = c.r;
      nodeColors[i * 3 + 1] = c.g;
      nodeColors[i * 3 + 2] = c.b;
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodeGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      size: isMobile ? 6 : 8,
      map: dotTexture,
      vertexColors: true,
      transparent: true,
      opacity: prefersReducedMotion ? 0.9 : 0,
      depthWrite: false,
    });

    sphereGroup.add(new THREE.Points(nodeGeometry, nodeMaterial));

    // --- Connection arcs ---
    const arcCount = isMobile ? 12 : 18;
    const arcCurves = [];
    const arcLines = [];
    const arcLineGroup = new THREE.Group();
    sphereGroup.add(arcLineGroup);

    let createdArcs = 0;
    for (let i = 0; i < nodeCount && createdArcs < arcCount; i++) {
      const nodeA = nodeData[i];
      const distances = [];
      for (let j = 0; j < nodeCount; j++) {
        if (i === j) continue;
        const d = nodeA.position.distanceTo(nodeData[j].position);
        if (d > 0.8 && d < sphereRadius * 1.3) {
          distances.push({ index: j, dist: d, node: nodeData[j] });
        }
      }
      distances.sort((a, b) => a.dist - b.dist);
      const toConnect = Math.min(distances.length, i % 2 === 0 ? 2 : 1);

      for (let k = 0; k < toConnect && createdArcs < arcCount; k++) {
        const { node: nodeB, index: j } = distances[k];
        if (nodeA.connections.includes(j)) continue;
        nodeA.connections.push(j);
        nodeB.connections.push(i);

        const p1 = nodeA.position;
        const p2 = nodeB.position;
        const points = [];
        const midElev = 0.16 + (p1.distanceTo(p2) / sphereRadius) * 0.2;

        for (let s = 0; s <= 28; s++) {
          const t = s / 28;
          const p = new THREE.Vector3().copy(p1).lerp(p2, t).normalize();
          const alt = sphereRadius + Math.sin(t * Math.PI) * midElev;
          p.multiplyScalar(alt);
          points.push(p);
        }

        const curve = new THREE.CatmullRomCurve3(points);
        arcCurves.push(curve);

        const arcGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(32));
        const arcMat = new THREE.LineBasicMaterial({
          color: createdArcs % 2 === 0 ? COLOR_ELECTRIC : COLOR_CYAN,
          transparent: true,
          opacity: 0.32,
          depthWrite: false,
        });
        const arcLine = new THREE.Line(arcGeo, arcMat);
        arcLineGroup.add(arcLine);

        arcLines.push({
          material: arcMat,
          baseOpacity: 0.22 + Math.random() * 0.25,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.7 + Math.random() * 0.7,
        });
        createdArcs++;
      }
    }

    // --- Data packets flowing on arcs ---
    const dataPacketCount = isMobile ? 10 : 18;
    const dataPackets = [];
    const dataGeo = new THREE.BufferGeometry();
    const dataPositions = new Float32Array(dataPacketCount * 3);
    const dataColors = new Float32Array(dataPacketCount * 3);

    if (arcCurves.length > 0) {
      for (let i = 0; i < dataPacketCount; i++) {
        const arcIndex = i % arcCurves.length;
        const progress = Math.random();
        dataPackets.push({
          curve: arcCurves[arcIndex],
          progress,
          speed: (0.12 + Math.random() * 0.18) * (Math.random() > 0.3 ? 1 : -1),
        });
        const p = arcCurves[arcIndex].getPoint(progress);
        dataPositions[i * 3] = p.x;
        dataPositions[i * 3 + 1] = p.y;
        dataPositions[i * 3 + 2] = p.z;

        const c = new THREE.Color(i % 2 === 0 ? COLOR_ELECTRIC : COLOR_CYAN);
        dataColors[i * 3] = c.r;
        dataColors[i * 3 + 1] = c.g;
        dataColors[i * 3 + 2] = c.b;
      }
    }

    dataGeo.setAttribute('position', new THREE.BufferAttribute(dataPositions, 3));
    dataGeo.setAttribute('color', new THREE.BufferAttribute(dataColors, 3));

    const dataMaterial = new THREE.PointsMaterial({
      size: isMobile ? 5 : 7,
      map: dotTexture,
      vertexColors: true,
      transparent: true,
      opacity: prefersReducedMotion ? 0.9 : 0,
      depthWrite: false,
    });

    sphereGroup.add(new THREE.Points(dataGeo, dataMaterial));

    // --- Orbital paths ---
    const orbitGroup = new THREE.Group();
    sphereGroup.add(orbitGroup);
    const orbitTrackers = [];
    const orbitConfigs = [
      { radiusX: sphereRadius * 1.32, radiusZ: sphereRadius * 1.22, rotX: 0.5, rotY: 0.3, color: COLOR_ELECTRIC, opacity: 0.18, speed: 0.04 },
      { radiusX: sphereRadius * 1.44, radiusZ: sphereRadius * 1.34, rotX: -0.6, rotY: 0.8, color: COLOR_CYAN, opacity: 0.14, speed: -0.035 },
    ];

    orbitConfigs.forEach((cfg) => {
      const ringGeo = new THREE.BufferGeometry();
      const pts = [];
      for (let s = 0; s <= 100; s++) {
        const a = (s / 100) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * cfg.radiusX, 0, Math.sin(a) * cfg.radiusZ));
      }
      ringGeo.setFromPoints(pts);
      const ringMat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
        depthWrite: false,
      });
      const ringLine = new THREE.Line(ringGeo, ringMat);
      ringLine.rotation.set(cfg.rotX, cfg.rotY, 0);
      orbitGroup.add(ringLine);

      const satGeo = new THREE.BufferGeometry();
      satGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3));
      const satMat = new THREE.PointsMaterial({
        size: 6,
        map: dotTexture,
        color: cfg.color,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      });
      const satPoint = new THREE.Points(satGeo, satMat);
      ringLine.add(satPoint);

      orbitTrackers.push({
        satPoint,
        radiusX: cfg.radiusX,
        radiusZ: cfg.radiusZ,
        speed: cfg.speed,
        progress: Math.random() * Math.PI * 2,
      });
    });

    // --- Mouse interaction ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, normX: 0, normY: 0 };

    function onPointerMove(e) {
      const clientX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
      const rect = container.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 0.35;
      mouse.targetY = y * 0.28;
      mouse.normX = (clientX / window.innerWidth) * 2 - 1;
      mouse.normY = -(clientY / window.innerHeight) * 2 + 1;
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    // --- Entrance animation ---
    let formationProgress = { val: prefersReducedMotion ? 1.0 : 0.0 };
    if (!prefersReducedMotion && typeof gsap !== 'undefined') {
      gsap.to(formationProgress, {
        val: 1.0,
        duration: 2.0,
        delay: 0.3,
        ease: 'power2.out',
        onUpdate: () => {
          particleMaterial.uniforms.uProgress.value = formationProgress.val;
        },
      });
      gsap.fromTo(nodeMaterial, { opacity: 0 }, { opacity: 0.9, duration: 1.5, delay: 1.0, ease: 'power2.out' });
      gsap.fromTo(dataMaterial, { opacity: 0 }, { opacity: 0.9, duration: 1.2, delay: 1.4, ease: 'power2.out' });
    }

    // --- Scroll-driven story ---
    let scrollDispersion = 0;
    let scrollSpeedMultiplier = 1.0;
    const heroSection = document.getElementById('hero-section');

    if (heroSection && !prefersReducedMotion && typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;
          scrollSpeedMultiplier = 1.0 + p * 2.5;
          scrollDispersion = p * 0.6;
          particleMaterial.uniforms.uDispersion.value = scrollDispersion;
          if (!isMobile) {
            sphereGroup.position.x = 0.35 - p * 0.7;
            sphereGroup.position.z = -p * 1.8;
          }
        },
      });
    }

    // --- Visibility observer ---
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // --- Animation loop ---
    let lastTime = performance.now();
    let clockTime = 0;
    let rafId = 0;

    function animate() {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!prefersReducedMotion) clockTime += delta;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const baseRot = prefersReducedMotion ? 0 : 0.14;
      sphereGroup.rotation.y += baseRot * scrollSpeedMultiplier * delta;
      sphereGroup.rotation.x = mouse.y * 0.32 + Math.sin(clockTime * 0.25) * 0.035;
      sphereGroup.rotation.z = mouse.x * -0.18;

      camera.position.x += (mouse.normX * 0.32 - camera.position.x) * 0.03;
      camera.position.y += (mouse.normY * 0.22 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      particleMaterial.uniforms.uTime.value = clockTime;

      for (let i = 0; i < arcLines.length; i++) {
        const item = arcLines[i];
        if (!prefersReducedMotion) {
          item.material.opacity = item.baseOpacity + Math.sin(clockTime * item.pulseSpeed + item.pulsePhase) * 0.12;
        }
      }

      if (dataPackets.length > 0) {
        const dataPosAttr = dataGeo.attributes.position;
        for (let i = 0; i < dataPackets.length; i++) {
          const pkt = dataPackets[i];
          if (!prefersReducedMotion) {
            pkt.progress += pkt.speed * delta;
            if (pkt.progress > 1.0) pkt.progress = 0;
            if (pkt.progress < 0.0) pkt.progress = 1;
          }
          const pt = pkt.curve.getPoint(pkt.progress);
          dataPosAttr.setXYZ(i, pt.x, pt.y, pt.z);
        }
        dataPosAttr.needsUpdate = true;
      }

      orbitTrackers.forEach((orb) => {
        if (!prefersReducedMotion) orb.progress += orb.speed * delta * 2.0;
        const satX = Math.cos(orb.progress) * orb.radiusX;
        const satZ = Math.sin(orb.progress) * orb.radiusZ;
        orb.satPoint.geometry.attributes.position.setXYZ(0, satX, 0, satZ);
        orb.satPoint.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
    }

    animate();

    // --- Resize handler ---
    let resizeTimer;
    function handleResize() {
      width = container.clientWidth || window.innerWidth * 0.5;
      height = container.clientHeight || 560;
      const newIsMobile = window.innerWidth < 768;
      camera.aspect = width / height;
      camera.fov = newIsMobile ? 50 : 42;
      camera.position.z = newIsMobile ? 7.6 : 7.0;
      camera.updateProjectionMatrix();
      sphereGroup.position.set(newIsMobile ? 0 : 0.35, newIsMobile ? -0.15 : 0, 0);
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      particleMaterial.uniforms.uDPR.value = Math.min(window.devicePixelRatio || 1, 2);
    }

    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    }
    window.addEventListener('resize', onResize, { passive: true });
  }
})();
