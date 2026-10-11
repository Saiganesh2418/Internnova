[README.md](https://github.com/user-attachments/files/33310054/README.md)
# InternNova - 3D Interactive Website Clone

A high-performance, 3D interactive clone of [InternNova](https://internnova.co.in), featuring real-time WebGL Three.js interactive graphics, 3D cursor-tracking robot, orbital particle spheres, flowing neon wave ribbons, and cosmic nebulae.

---

## 🌟 Key 3D Features & User Customizations

1. **3D Cursor-Tracking Robot (Hero Section)**:
   - Replaced the static hero gradient blob / pink circle with a true 3D interactive robot inspired by the [Spline 3D Community Model](https://app.spline.design/community/file/cac7b931-901d-41f3-bfdb-d0d173f271f2).
   - **Real-Time Cursor Tracking**: The robot's rounded monitor head and articulated ball-joint neck rotate and tilt smoothly to follow your mouse cursor everywhere across the screen.
   - **Orbital Particle Sphere in Background**: Directly behind the robot, a 3D spherical stardust cloud (from Image 1 / `particles_sphere.png`) rotates in orbit with responsive parallax depth.
   - **Interactive Expressions**:
     - Auto-blinking glowing eyes.
     - Idle floating levitation & breathing motion.
     - Click the robot for a celebratory nod, flashing eye glow, and sound effect!
     - Drag directly on the canvas to freely rotate and orbit the 3D robot.

2. **3D Flowing Wave Ribbon Showcase (Image 2)**:
   - "We turn complex ideas into effortless experiences"
   - Real-time interactive WebGL/Canvas sinusoidal wave ribbon with vibrant gradients (violet, magenta, orange, and white neon).
   - Generates interactive ripples, wave surges, and stardust sparks on mouse hover.

3. **3D Cosmic Nebula & Starfield (Image 3)**:
   - Embedded in the Stay Connected & Newsletter section.
   - 150+ glowing cosmic particles that respond to mouse gravity and form luminous constellation threads.

4. **3D Perspective Tilt on Cards**:
   - All program cards, feature cards, and stats cards smoothly tilt in 3D perspective based on mouse cursor position, complete with a dynamic specular light glare overlay.

5. **Complete InternNova Website Cloning**:
   - **Header & Navigation**: Sticky blur navbar, responsive mobile drawer, dropdown menus for Programs, Student Corner, and Company.
   - **Dynamic Greeting**: Time-aware greeting badge (`Good Morning ☀️` / `Good Afternoon ⛅` / `Good Evening 🌙` • Welcome to InternNova).
   - **Marquee Ticker Bar**: Smooth infinite marquee with live announcements.
   - **Stats Section**: Interactive animated count-up (`1000+`, `6`, `6`, `100%`).
   - **Pro Internships**: Full Stack Web Development, Artificial Intelligence & ML, Data Analytics & BI cards with feature checklists and instant Apply Modal.
   - **Premium Courses**: Complete MERN, ML/AI, and Java Spring Boot course cards with ratings and pricing.
   - **Events & Workshops**: Live upcoming masterclass listings with registration modals.
   - **6-Week Domain Internship Tracks**:
     - Web Development (D-01)
     - Data Analytics (D-02)
     - Cyber Security (D-03)
     - Artificial Intelligence (D-04)
     - Python Programming (D-05)
     - Java Development (D-06)
     - Features interactive **6-Week Curriculum Roadmap Modal** for every domain.
   - **Student Corner**: Project Portfolio, AI Resume Builder, Verify Certificate, Campus Ambassador.
   - **Why InternNova**: 4 feature pillars (Real-World Projects, Offer Letter, Verified Certificate, Flexible Learning).
   - **Global Community**: Marquee of 100+ premier universities (IIT Bombay, IIT Delhi, BITS Pilani, NIT Trichy, VIT, etc.).
   - **How It Works**: 4-step path to success timeline.
   - **FAQ**: Interactive accordion with smooth chevron animations.
   - **Footer**: Full social links (LinkedIn, Instagram, WhatsApp, YouTube, X), MSME registration (`UDYAM-BR-24-0054689`), legal links, and contact info.
   - **Floating WhatsApp Widget**: 1-click WhatsApp chat button with green pulse animation.
   - **Working Certificate Verification**: Test with IDs like `IN-2024-8841` to see authenticated certificate badge.
   - **Dark / Light Theme Toggle**: Seamless transition between dark cyberpunk theme and clean light theme.
   - **Web Audio Sound Effects**: Subtle synthesized feedback for clicks and robot interactions (toggleable via the audio button in header).

---

## 🚀 How to Run the Website

### Start the Local Server
```bash
cd C:\Users\yadav\.gemini\antigravity\scratch\internnova-3d
node server.js
```

Then open your browser and navigate to:
👉 **`http://localhost:3000`**

---

## 📁 Project Directory Structure
```
internnova-3d/
├── package.json
├── server.js               # Zero-dependency local Node.js static server
├── README.md
└── public/
    ├── index.html          # Main HTML structure with all sections & cloned content
    ├── original.css        # Authentic InternNova CSS styling
    ├── logo.png            # InternNova brand logo
    ├── particles_sphere.png# Image 1: 3D Orbital particle sphere
    ├── wave_ribbon.png     # Image 2: Flowing wave ribbon
    ├── nebula_cloud.png    # Image 3: Cosmic nebula particle cloud
    ├── robot_preview.jpg   # Spline 3D robot model preview reference
    ├── css/
    │   └── custom.css      # 3D stage, tilt effects, modals, and responsive layout
    ├── js/
    │   ├── robot3d.js      # Three.js 3D Robot & Orbital Particle Sphere Engine
    │   ├── ribbon3d.js     # Flowing gradient wave ribbon canvas engine
    │   ├── nebula3d.js     # Cosmic nebula starfield particle engine
    │   └── app.js          # Main app logic, modals, sound FX, roadmaps, theme
    └── libs/
        ├── three.min.js    # Three.js 3D WebGL library
        └── lucide.min.js   # Lucide icons library
```
