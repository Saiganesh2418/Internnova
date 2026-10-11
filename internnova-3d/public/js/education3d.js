// 3D Interactive Education Theme Engine (Three.js)
// Renders an interactive 3D Graduation Cap, Diploma, and Knowledge Orbit Rings behind "INTERN NOVA"

(function() {
  let container, canvas;
  let scene, camera, renderer;
  let eduGroup, capGroup, tasselGroup, orbitGroup, diplomaGroup;
  let stardust;
  let mouse = { x: 0, y: 0 };
  let targetRotY = 0, targetRotX = 0;
  let tasselAngle = 0, tasselVelocity = 0;
  let isTossing = false;
  let tossProgress = 0;
  let clock;

  function init() {
    container = document.querySelector('.education-3d-backdrop');
    canvas = document.getElementById('education-canvas');
    if (!container || !canvas || typeof THREE === 'undefined') return;

    clock = new THREE.Clock();

    scene = new THREE.Scene();

    const width = container.clientWidth || 650;
    const height = container.clientHeight || 380;
    const aspect = width / height;

    camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
    camera.position.set(0, 0.4, 6.2);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x3b2d54, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd946ef, 3.0);
    rimLight.position.set(-4, -2, -2);
    scene.add(rimLight);

    const goldLight = new THREE.PointLight(0xf59e0b, 2.5, 8);
    goldLight.position.set(1.5, 1.5, 2);
    scene.add(goldLight);

    buildEducationObjects();

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onCapClick);

    animate();
  }

  function buildEducationObjects() {
    eduGroup = new THREE.Group();
    eduGroup.position.set(0, 0, 0);

    // 1. GRADUATION CAP (Mortarboard)
    capGroup = new THREE.Group();

    // Cap Top Board (Diamond Square)
    const boardGeo = new THREE.BoxGeometry(2.6, 0.08, 2.6);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x181829,
      roughness: 0.35,
      metalness: 0.5,
      bumpScale: 0.05
    });
    const boardMesh = new THREE.Mesh(boardGeo, capMat);
    boardMesh.rotation.y = Math.PI / 4; // Diamond orientation
    capGroup.add(boardMesh);

    // Skullcap (Conical base underneath)
    const skullGeo = new THREE.CylinderGeometry(0.85, 0.7, 0.65, 32);
    const skullMesh = new THREE.Mesh(skullGeo, capMat);
    skullMesh.position.y = -0.36;
    capGroup.add(skullMesh);

    // Skullcap golden rim band
    const rimGeo = new THREE.TorusGeometry(0.86, 0.03, 16, 64);
    rimGeo.rotateX(Math.PI / 2);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.18,
      emissive: 0x78350f,
      emissiveIntensity: 0.4
    });
    const rimMesh = new THREE.Mesh(rimGeo, goldMat);
    rimMesh.position.y = -0.25;
    capGroup.add(rimMesh);

    // Center Golden Button on top
    const buttonGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 24);
    const buttonMesh = new THREE.Mesh(buttonGeo, goldMat);
    buttonMesh.position.y = 0.08;
    capGroup.add(buttonMesh);

    // 2. TASSEL (Golden cord hanging with physics)
    tasselGroup = new THREE.Group();
    tasselGroup.position.set(0, 0.08, 0);

    const cordCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.6, -0.05, 0.6),
      new THREE.Vector3(1.15, -0.2, 1.15),
      new THREE.Vector3(1.3, -0.7, 1.3)
    ]);
    const cordGeo = new THREE.TubeGeometry(cordCurve, 20, 0.03, 8, false);
    const cordMesh = new THREE.Mesh(cordGeo, goldMat);
    tasselGroup.add(cordMesh);

    // Tassel Brush at bottom
    const brushGeo = new THREE.ConeGeometry(0.12, 0.45, 16);
    const brushMesh = new THREE.Mesh(brushGeo, goldMat);
    brushMesh.position.set(1.3, -0.9, 1.3);
    brushMesh.rotation.x = Math.PI;
    tasselGroup.add(brushMesh);

    capGroup.add(tasselGroup);

    // Tilt cap slightly forward for iconic angle
    capGroup.rotation.x = 0.35;
    capGroup.rotation.z = -0.15;
    eduGroup.add(capGroup);

    // 3. ROLLED DIPLOMA SCROLL
    diplomaGroup = new THREE.Group();
    diplomaGroup.position.set(-1.4, -0.6, 0.4);
    diplomaGroup.rotation.set(0.4, 0.8, -0.6);

    const scrollGeo = new THREE.CylinderGeometry(0.18, 0.18, 1.6, 24);
    const scrollMat = new THREE.MeshStandardMaterial({
      color: 0xfafaf8,
      roughness: 0.4,
      metalness: 0.1
    });
    const scrollMesh = new THREE.Mesh(scrollGeo, scrollMat);
    diplomaGroup.add(scrollMesh);

    // Red/Magenta ribbon ribbon tied around scroll
    const ribGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.28, 24);
    const ribMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      roughness: 0.2,
      metalness: 0.6,
      emissive: 0xbe185d,
      emissiveIntensity: 0.4
    });
    const ribMesh = new THREE.Mesh(ribGeo, ribMat);
    diplomaGroup.add(ribMesh);

    eduGroup.add(diplomaGroup);

    // 4. HOLOGRAPHIC KNOWLEDGE ORBIT RINGS
    orbitGroup = new THREE.Group();

    // Ring 1 (Purple)
    const ring1Geo = new THREE.TorusGeometry(2.3, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.7 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI * 0.35;
    ring1.rotation.y = Math.PI * 0.15;
    orbitGroup.add(ring1);

    // Ring 2 (Cyan)
    const ring2Geo = new THREE.TorusGeometry(2.5, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI * 0.3;
    ring2.rotation.z = Math.PI * 0.25;
    orbitGroup.add(ring2);

    // Orbiting particle sphere nodes
    const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const node1 = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
    node1.position.set(2.3, 0, 0);
    ring1.add(node1);

    const node2 = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: 0xf59e0b }));
    node2.position.set(-2.5, 0, 0);
    ring2.add(node2);

    eduGroup.add(orbitGroup);

    // 5. FLOATING GOLDEN STARDUST
    const starCount = 80;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 5.0;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 3.5;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 3.0;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xfde047,
      transparent: true,
      opacity: 0.85
    });
    stardust = new THREE.Points(starGeo, starMat);
    eduGroup.add(stardust);

    scene.add(eduGroup);
  }

  function onMouseMove(e) {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2);

    mouse.x = x;
    mouse.y = y;

    targetRotY = x * 0.65;
    targetRotX = y * 0.45;

    // Tassel inertia
    tasselVelocity += x * 0.05;
  }

  function onCapClick() {
    if (isTossing) return;
    isTossing = true;
    tossProgress = 0;

    if (window.InternNovaSound) {
      window.InternNovaSound.playRobotClick();
    }
    if (window.InternNovaToast) {
      window.InternNovaToast('🎓 Graduation Cap Toss! Accelerate your tech degree with real skills.');
    }
  }

  function onResize() {
    if (!container || !camera || !renderer) return;
    const width = container.clientWidth || 650;
    const height = container.clientHeight || 380;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // 1. Idle Floating Levitation
    if (eduGroup) {
      eduGroup.position.y = Math.sin(time * 1.8) * 0.1;
    }

    // 2. Smooth Cursor Following (Lerp)
    if (capGroup && !isTossing) {
      capGroup.rotation.y += (targetRotY - capGroup.rotation.y) * 0.08;
      capGroup.rotation.x += (0.35 + targetRotX - capGroup.rotation.x) * 0.08;
    }

    // 3. Tassel physics
    if (tasselGroup) {
      tasselVelocity *= 0.92;
      tasselAngle += tasselVelocity;
      tasselGroup.rotation.y = Math.sin(time * 2.5) * 0.08 + tasselAngle;
      tasselAngle *= 0.95;
    }

    // 4. Orbit Rings slow rotation
    if (orbitGroup) {
      orbitGroup.rotation.y += 0.008;
      orbitGroup.rotation.z += 0.004;
    }

    // 5. Stardust sparkle
    if (stardust) {
      stardust.rotation.y += 0.002;
    }

    // 6. Cap Toss Animation on click
    if (isTossing) {
      tossProgress += delta * 2.2;
      const heightOffset = Math.sin(tossProgress * Math.PI) * 1.8;
      capGroup.position.y = heightOffset;
      capGroup.rotation.y += delta * 8.0; // Spin while tossing

      if (tossProgress >= 1.0) {
        isTossing = false;
        capGroup.position.y = 0;
        tossProgress = 0;
      }
    }

    renderer.render(scene, camera);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
