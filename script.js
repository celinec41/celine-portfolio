"use strict";

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(
    ".nav-links a"
);

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-card"
);

function toggleMobileMenu() {
    if (!menuButton || !navLinks) {
        return;
    }

    const isOpen = navLinks.classList.toggle("open");

    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );
}

function closeMobileMenu() {
    if (!menuButton || !navLinks) {
        return;
    }

    navLinks.classList.remove("open");
    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );
}

if (menuButton) {
    menuButton.addEventListener(
        "click",
        toggleMobileMenu
    );
}

navigationLinks.forEach((link) => {
    link.addEventListener(
        "click",
        closeMobileMenu
    );
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);

revealElements.forEach((element, index) => {
    const delay = Math.min(index * 60, 300);

    element.style.setProperty(
        "--delay",
        `${delay}ms`
    );

    revealObserver.observe(element);
});

const sections = document.querySelectorAll(
    "header[id], main section[id]"
);

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const currentId = entry.target.id;

            navigationLinks.forEach((link) => {
                const target = link.getAttribute("href");

                link.classList.toggle(
                    "active",
                    target === `#${currentId}`
                );
            });
        });
    },
    {
        threshold: 0.35,
        rootMargin: "-15% 0px -55% 0px"
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});

const heroArt = document.querySelector(".hero-art");

window.addEventListener(
    "pointermove",
    (event) => {
        if (!heroArt || window.innerWidth < 850) {
            return;
        }

        const x =
            (event.clientX / window.innerWidth - 0.5) * 8;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 8;

        heroArt.style.setProperty(
            "--pointer-x",
            `${x}px`
        );

        heroArt.style.setProperty(
            "--pointer-y",
            `${y}px`
        );
    },
    {
        passive: true
    }
);
