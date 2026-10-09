/* ============================================================
   particles.js — Lightweight animated particle field (canvas)
   Floating glowing dots with subtle connecting lines.
   ============================================================ */

(function () {
    "use strict";

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = document.getElementById("particles");
    if (!canvas || prefersReduced) return;

    const ctx = canvas.getContext("2d");
    let width, height, particles, rafId;
    const COLORS = ["124, 92, 255", "34, 211, 238", "244, 114, 182"];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    }

    function particleCount() {
        // Scale density to screen size, capped for performance.
        return Math.min(Math.floor((width * height) / 18000), 90);
    }

    function initParticles() {
        particles = [];
        const count = particleCount();
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.8 + 0.6,
                c: COLORS[Math.floor(Math.random() * COLORS.length)],
                a: Math.random() * 0.5 + 0.25
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(" + p.c + ", " + p.a + ")";
            ctx.fill();

            // Connecting lines to nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const dist = dx * dx + dy * dy;
                if (dist < 13000) {
                    const opacity = (1 - dist / 13000) * 0.14;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = "rgba(" + p.c + ", " + opacity + ")";
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        rafId = requestAnimationFrame(draw);
    }

    function start() {
        cancelAnimationFrame(rafId);
        resize();
        draw();
    }

    let resizeTimer;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(start, 180);
    });

    start();
})();
