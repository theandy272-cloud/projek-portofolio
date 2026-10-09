/* ============================================================
   main.js — Interactivity
   • Typewriter effect
   • Navbar scroll state + active link highlighting
   • Mobile menu toggle
   • Scroll reveal (IntersectionObserver)
   • Animated stat counters
   • Contact form handling
   • Footer year
   ============================================================ */

(function () {
    "use strict";

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Typewriter ---------- */
    (function typewriter() {
        const el = document.getElementById("typewriter");
        if (!el) return;

        const words = ["Math Teacher", "Pendidik Matematika", "Mentor Olimpiade", "Pencinta Angka"];
        let wi = 0, ci = 0, deleting = false;

        if (prefersReduced) { el.textContent = words[0]; return; }

        function tick() {
            const word = words[wi];
            el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

            let delay = deleting ? 55 : 110;

            if (!deleting && ci === word.length + 1) {
                deleting = true;
                delay = 1500;
            } else if (deleting && ci === 0) {
                deleting = false;
                wi = (wi + 1) % words.length;
                delay = 350;
            }
            setTimeout(tick, delay);
        }
        tick();
    })();

    /* ---------- Navbar scroll state ---------- */
    const navbar = document.getElementById("navbar");
    function onScroll() {
        if (window.scrollY > 24) navbar.classList.add("is-scrolled");
        else navbar.classList.remove("is-scrolled");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---------- Mobile menu ---------- */
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");

    function closeMenu() {
        toggle.classList.remove("is-open");
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
        const open = menu.classList.toggle("is-open");
        toggle.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", String(open));
    });

    menu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", closeMenu);
    });

    /* ---------- Active link highlighting ---------- */
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    const links = Array.from(document.querySelectorAll(".nav__link"));

    const spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                links.forEach(function (l) {
                    l.classList.toggle("is-active", l.getAttribute("href") === "#" + id);
                });
            }
        });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (s) { spy.observe(s); });

    /* ---------- Scroll reveal ---------- */
    const revealEls = document.querySelectorAll(".reveal");

    if (prefersReduced || !("IntersectionObserver" in window)) {
        revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
        const revealObs = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry, i) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    // Stagger siblings slightly
                    setTimeout(function () { el.classList.add("is-visible"); }, (i % 4) * 90);
                    obs.unobserve(el);
                }
            });
        }, { threshold: 0.14 });

        revealEls.forEach(function (el) { revealObs.observe(el); });
    }

    /* ---------- Animated counters ---------- */
    const counters = document.querySelectorAll(".stat__num");

    function animateCount(el) {
        const target = parseInt(el.getAttribute("data-count"), 10) || 0;
        const duration = 1600;
        const start = performance.now();

        function step(now) {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            el.textContent = Math.floor(eased * target).toLocaleString("id-ID");
            if (t < 1) requestAnimationFrame(step);
            else el.textContent = target.toLocaleString("id-ID");
        }
        requestAnimationFrame(step);
    }

    if ("IntersectionObserver" in window && !prefersReduced) {
        const countObs = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(function (c) { countObs.observe(c); });
    } else {
        counters.forEach(function (c) {
            c.textContent = (parseInt(c.getAttribute("data-count"), 10) || 0).toLocaleString("id-ID");
        });
    }

    /* ---------- Contact form ---------- */
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const message = form.message.value.trim();

            if (!name || !email || !message) {
                status.style.color = "var(--accent-3)";
                status.textContent = "Mohon lengkapi semua kolom.";
                return;
            }
            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (!emailOk) {
                status.style.color = "var(--accent-3)";
                status.textContent = "Format email tidak valid.";
                return;
            }

            // Front-end only: open the user's mail client as a graceful fallback.
            status.style.color = "var(--accent-2)";
            status.textContent = "Terima kasih, " + name + "! Membuka aplikasi email Anda...";

            const subject = encodeURIComponent("Pesan dari portofolio — " + name);
            const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
            window.location.href =
                "mailto:theandy272@gmail.com?subject=" + subject + "&body=" + body;

            form.reset();
        });
    }

    /* ---------- Footer year ---------- */
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
