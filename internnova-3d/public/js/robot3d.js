// 3D Robot & Orbital Particle Sphere Engine (Three.js)
// Replaces the pink circle blob with the Spline 3D Robot & background particle sphere

(function() {
  let container, canvas;
  let scene, camera, renderer;
  let robotGroup, headGroup, neckGroup, baseGroup;
  let eyes = [], pupils = [];
  let particleSphere, outerRingPoints;
  let spotLightFloor;
  
  // Mouse tracking state
  let mouseX = 0, mouseY = 0;
  let targetHeadRotY = 0, targetHeadRotX = 0;
  let targetBaseRotY = 0, targetBaseRotX = 0;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let manualRotationY = 0, manualRotationX = 0;
  let isInteracting = false;
  let blinkTimer = 0;
  let isBlinking = false;
  let nodAnimation = 0;
  let clock;

  function init() {
    container = document.getElementById('hero-3d-stage');
    canvas = document.getElementById('robot-canvas');
    if (!container || !canvas || typeof THREE === 'undefined') return;

    clock = new THREE.Clock();

    // Scene setup
    scene = new THREE.Scene();

    // Camera setup
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
    camera.position.set(0, 1.2, 7.8);
    camera.lookAt(0, 0.8, 0);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Lighting setup (matching the Spline scene dark room & vibrant rim lights)
    const ambientLight = new THREE.AmbientLight(0x2d1f47, 1.6);
    scene.add(ambientLight);

    // Top Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 8, 6);
    scene.add(keyLight);

    // Vibrant Magenta/Purple Rim Light (Left)
    const rimLightLeft = new THREE.DirectionalLight(0xd946ef, 3.2);
    rimLightLeft.position.set(-6, 3, -2);
    scene.add(rimLightLeft);

    // Cyan/Blue Accent Light (Right)
    const rimLightRight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    rimLightRight.position.set(6, 4, -1);
    scene.add(rimLightRight);

    // Stage ground light (casting pink/purple glow upwards)
    const stageLight = new THREE.PointLight(0xa855f7, 2.8, 10);
    stageLight.position.set(0, -0.6, 1.5);
    scene.add(stageLight);

    // Build Scene Elements
    createBackgroundParticleSphere();
    createRobot();

    // Event Listeners
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Drag / Orbit interaction on canvas
    canvas.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onCanvasDrag, false);
    canvas.addEventListener('click', onRobotClick, false);

    // Start loop
    animate();
  }

  // Create Circular Orbital Particle Sphere (Image 1 reference)
  function createBackgroundParticleSphere() {
    const particleGroup = new THREE.Group();
    particleGroup.position.set(0, 1.0, -1.8); // Directly behind the robot

    // Generate glowing dot texture
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 64;
    particleCanvas.height = 64;
    const ctx = particleCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(168, 85, 247, 0.8)');
    grad.addColorStop(0.6, 'rgba(236, 72, 153, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();

    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    // 1. Spherical Cloud Particles (Image 1)
    const sphereCount = 1400;
    const sphereGeo = new THREE.BufferGeometry();
    const spherePositions = new Float32Array(sphereCount * 3);
    const sphereColors = new Float32Array(sphereCount * 3);
    const sphereSizes = new Float32Array(sphereCount);

    const radius = 2.8;
    for (let i = 0; i < sphereCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius * (0.8 + Math.random() * 0.4);

      spherePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      spherePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      spherePositions[i * 3 + 2] = r * Math.cos(phi);

      // Color variation between lavender, magenta and white
      const c = Math.random();
      if (c > 0.6) {
        sphereColors[i * 3] = 0.95; sphereColors[i * 3 + 1] = 0.95; sphereColors[i * 3 + 2] = 1.0;
      } else if (c > 0.3) {
        sphereColors[i * 3] = 0.75; sphereColors[i * 3 + 1] = 0.45; sphereColors[i * 3 + 2] = 0.95;
      } else {
        sphereColors[i * 3] = 0.92; sphereColors[i * 3 + 1] = 0.35; sphereColors[i * 3 + 2] = 0.65;
      }
      sphereSizes[i] = 0.08 + Math.random() * 0.12;
    }

    sphereGeo.setAttribute('position', new THREE.BufferAttribute(spherePositions, 3));
    sphereGeo.setAttribute('color', new THREE.BufferAttribute(sphereColors, 3));

    const sphereMat = new THREE.PointsMaterial({
      size: 0.14,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    particleSphere = new THREE.Points(sphereGeo, sphereMat);
    particleGroup.add(particleSphere);

    // 2. Concentric Orbital Rings (Equatorial Ring from Image 1)
    const ringCount = 600;
    const ringGeo = new THREE.BufferGeometry();
    const ringPositions = new Float32Array(ringCount * 3);
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      const ringRadius = 3.2 + (Math.random() - 0.5) * 0.3;
      ringPositions[i * 3] = Math.cos(angle) * ringRadius;
      ringPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.25;
      ringPositions[i * 3 + 2] = Math.sin(angle) * ringRadius;
    }
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));

    const ringMat = new THREE.PointsMaterial({
      size: 0.16,
      map: particleTexture,
      color: 0xe0e7ff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    outerRingPoints = new THREE.Points(ringGeo, ringMat);
    outerRingPoints.rotation.x = Math.PI * 0.22;
    outerRingPoints.rotation.z = -Math.PI * 0.12;
    particleGroup.add(outerRingPoints);

    scene.add(particleGroup);
  }

  // Create Futuristic 3D Robot (Spline model recreation)
  function createRobot() {
    robotGroup = new THREE.Group();
    robotGroup.position.set(0, 0, 0);

    // Materials
    // Sleek chrome / dark titanium material with glossy reflections
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0x1e202f,
      metalness: 0.88,
      roughness: 0.16
    });

    // Dark screen faceplate
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x090a10,
      metalness: 0.6,
      roughness: 0.22
    });

    // Metallic silver joints
    const jointMat = new THREE.MeshStandardMaterial({
      color: 0x8a92a6,
      metalness: 0.95,
      roughness: 0.12
    });

    // Glowing Eyes Material (Emissive bright white/cyan)
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x67e8f9,
      emissiveIntensity: 2.5,
      roughness: 0.1
    });

    // 1. BASE TORSO / PEDESTAL (Cubic body from Spline preview)
    baseGroup = new THREE.Group();
    baseGroup.position.set(0, -0.15, 0);

    // Pedestal main cube
    const baseGeo = new THREE.BoxGeometry(1.65, 1.45, 1.65);
    const baseMesh = new THREE.Mesh(baseGeo, chromeMat);
    baseGroup.add(baseMesh);

    // Base beveled foot/collar
    const footGeo = new THREE.BoxGeometry(1.75, 0.12, 1.75);
    const footMesh = new THREE.Mesh(footGeo, jointMat);
    footMesh.position.y = -0.73;
    baseGroup.add(footMesh);

    // Subtle neon trim line around torso
    const trimGeo = new THREE.BoxGeometry(1.67, 0.05, 1.67);
    const trimMat = new THREE.MeshBasicMaterial({ color: 0xc084fc });
    const trimMesh = new THREE.Mesh(trimGeo, trimMat);
    trimMesh.position.y = 0.55;
    baseGroup.add(trimMesh);

    robotGroup.add(baseGroup);

    // 2. NECK SWIVEL (Ball & Socket Joint from Spline preview)
    neckGroup = new THREE.Group();
    neckGroup.position.set(0, 0.65, 0);

    const neckPillarGeo = new THREE.CylinderGeometry(0.32, 0.42, 0.45, 32);
    const neckPillar = new THREE.Mesh(neckPillarGeo, jointMat);
    neckGroup.add(neckPillar);

    const neckBallGeo = new THREE.SphereGeometry(0.36, 32, 32);
    const neckBall = new THREE.Mesh(neckBallGeo, jointMat);
    neckBall.position.y = 0.28;
    neckGroup.add(neckBall);

    robotGroup.add(neckGroup);

    // 3. HEAD (Monitor with rounded screen, eyes, ear dials)
    headGroup = new THREE.Group();
    headGroup.position.set(0, 1.5, 0);

    // Head chassis box
    const headGeo = new THREE.BoxGeometry(1.85, 1.35, 1.25);
    const headMesh = new THREE.Mesh(headGeo, chromeMat);
    headGroup.add(headMesh);

    // Front Screen Inset
    const screenGeo = new THREE.PlaneGeometry(1.5, 1.05);
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0, 0.63);
    headGroup.add(screenMesh);

    // Screen bezel frame
    const bezelGeo = new THREE.BoxGeometry(1.58, 1.13, 0.04);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x33374d,
      metalness: 0.8,
      roughness: 0.2
    });
    const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
    bezelMesh.position.set(0, 0, 0.61);
    headGroup.add(bezelMesh);

    // 4. ROBOT EYES (Glowing spheres from Spline preview)
    const eyeGeo = new THREE.SphereGeometry(0.19, 32, 32);
    
    // Left Eye
    const eyeLeft = new THREE.Mesh(eyeGeo, eyeMat.clone());
    eyeLeft.position.set(-0.38, 0.08, 0.66);
    headGroup.add(eyeLeft);
    eyes.push(eyeLeft);

    // Right Eye
    const eyeRight = new THREE.Mesh(eyeGeo, eyeMat.clone());
    eyeRight.position.set(0.38, 0.08, 0.66);
    headGroup.add(eyeRight);
    eyes.push(eyeRight);

    // 5. EAR SENSORS / DIALS (Circular dials on sides from Spline preview)
    const earGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.12, 32);
    earGeo.rotateZ(Math.PI / 2);

    const earLeft = new THREE.Mesh(earGeo, jointMat);
    earLeft.position.set(-0.96, 0, 0);
    headGroup.add(earLeft);

    const earRight = new THREE.Mesh(earGeo, jointMat);
    earRight.position.set(0.96, 0, 0);
    headGroup.add(earRight);

    // Neon accent circles on ear dials
    const earRingGeo = new THREE.RingGeometry(0.12, 0.18, 32);
    earRingGeo.rotateY(Math.PI / 2);
    const earRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide });

    const earRingLeft = new THREE.Mesh(earRingGeo, earRingMat);
    earRingLeft.position.set(-1.03, 0, 0);
    headGroup.add(earRingLeft);

    const earRingRight = new THREE.Mesh(earRingGeo, earRingMat);
    earRingRight.position.set(1.03, 0, 0);
    headGroup.add(earRingRight);

    // Subtle Top Antenna
    const antStemGeo = new THREE.CylinderGeometry(0.03, 0.04, 0.35, 16);
    const antStem = new THREE.Mesh(antStemGeo, jointMat);
    antStem.position.set(0, 0.8, 0);
    headGroup.add(antStem);

    const antTipGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const antTipMat = new THREE.MeshBasicMaterial({ color: 0xf472b6 });
    const antTip = new THREE.Mesh(antTipGeo, antTipMat);
    antTip.position.set(0, 1.0, 0);
    headGroup.add(antTip);

    robotGroup.add(headGroup);

    scene.add(robotGroup);
  }

  // Mouse move handler (Tracks across the whole screen)
  function onMouseMove(event) {
    const rect = container.getBoundingClientRect();
    // Compute normalized mouse position from -1 to 1 based on screen center
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = (event.clientY / window.innerHeight) * 2 - 1;

    mouseX = x;
    mouseY = y;

    if (!isDragging) {
      // Head rotates smoothly to look at cursor
      targetHeadRotY = mouseX * 0.95;
      targetHeadRotX = mouseY * 0.55;

      // Torso has subtle reactive sway
      targetBaseRotY = mouseX * 0.25;
      targetBaseRotX = mouseY * 0.15;
    }
  }

  function onTouchMove(event) {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      const x = (touch.clientX / window.innerWidth) * 2 - 1;
      const y = (touch.clientY / window.innerHeight) * 2 - 1;
      mouseX = x;
      mouseY = y;
      if (!isDragging) {
        targetHeadRotY = mouseX * 0.85;
        targetHeadRotX = mouseY * 0.45;
      }
    }
  }

  // Interactive Drag & Orbit
  function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
  }

  function onMouseUp() {
    isDragging = false;
  }

  function onCanvasDrag(event) {
    if (!isDragging) return;
    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    manualRotationY += deltaX * 0.01;
    manualRotationX += deltaY * 0.01;

    targetHeadRotY = manualRotationY;
    targetHeadRotX = manualRotationX;

    previousMousePosition = { x: event.clientX, y: event.clientY };
  }

  // Cheerful Interactive Click / Tap Reaction
  function onRobotClick() {
    nodAnimation = 1.0;
    // Eyes flash happy colors
    eyes.forEach(eye => {
      eye.material.emissive.setHex(0xf43f5e);
      eye.material.emissiveIntensity = 4.0;
    });

    // Play robot chirp audio if sound is active
    if (window.InternNovaSound && window.InternNovaSound.playRobotClick) {
      window.InternNovaSound.playRobotClick();
    }

    setTimeout(() => {
      eyes.forEach(eye => {
        eye.material.emissive.setHex(0x67e8f9);
        eye.material.emissiveIntensity = 2.5;
      });
    }, 450);

    // Show quick toast hint
    if (window.InternNovaToast) {
      window.InternNovaToast('🤖 Robot: "Hello! I am ready to guide your internship journey!"');
    }
  }

  function onWindowResize() {
    if (!container || !camera || !renderer) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // Render Loop
  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // 1. Idle Floating Levitation & Breathing
    if (robotGroup) {
      const hoverY = Math.sin(elapsedTime * 2.2) * 0.08;
      robotGroup.position.y = hoverY;
    }

    // 2. Smooth Lerp Head and Neck Tracking
    if (headGroup && neckGroup) {
      // Damping towards target
      headGroup.rotation.y += (targetHeadRotY - headGroup.rotation.y) * 0.08;
      headGroup.rotation.x += (targetHeadRotX - headGroup.rotation.x) * 0.08;

      // Subtle lateral head tilt
      headGroup.rotation.z += (-targetHeadRotY * 0.2 - headGroup.rotation.z) * 0.08;

      // Neck joint rotates halfway for natural ergonomics
      neckGroup.rotation.y += (targetHeadRotY * 0.4 - neckGroup.rotation.y) * 0.08;
      neckGroup.rotation.x += (targetHeadRotX * 0.2 - neckGroup.rotation.x) * 0.08;

      // Base body responds subtly
      baseGroup.rotation.y += (targetBaseRotY - baseGroup.rotation.y) * 0.05;
      baseGroup.rotation.x += (targetBaseRotX - baseGroup.rotation.x) * 0.05;

      // Nod reaction animation if clicked
      if (nodAnimation > 0) {
        headGroup.rotation.x += Math.sin(nodAnimation * Math.PI * 4) * 0.2;
        nodAnimation -= delta * 1.5;
        if (nodAnimation < 0) nodAnimation = 0;
      }
    }

    // 3. Eye Blinking Logic
    blinkTimer += delta;
    if (blinkTimer > 3.8 && !isBlinking) {
      isBlinking = true;
    }
    if (isBlinking) {
      eyes.forEach(eye => {
        eye.scale.y = Math.max(0.08, eye.scale.y - delta * 14);
      });
      if (eyes[0].scale.y <= 0.1) {
        blinkTimer = 0;
        isBlinking = false;
      }
    } else {
      eyes.forEach(eye => {
        if (eye.scale.y < 1.0) {
          eye.scale.y = Math.min(1.0, eye.scale.y + delta * 12);
        }
      });
    }

    // 4. Rotate Background Particle Sphere (Image 1)
    if (particleSphere) {
      particleSphere.rotation.y += 0.003;
      particleSphere.rotation.x = Math.sin(elapsedTime * 0.4) * 0.08 + mouseY * 0.15;
      particleSphere.rotation.z = mouseX * 0.15;
    }
    if (outerRingPoints) {
      outerRingPoints.rotation.y += 0.005;
    }

    renderer.render(scene, camera);
  }

  // Initialize once DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
