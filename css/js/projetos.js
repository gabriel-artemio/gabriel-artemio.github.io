document.addEventListener("DOMContentLoaded", () => {

    const parallaxElements = document.querySelectorAll(".parallax");

    function updateParallax() {

        const scrollPosition = window.scrollY;

        parallaxElements.forEach(element => {

            const container = element.closest(".parallax-container");

            if (!container) return;

            const rect = container.getBoundingClientRect();

            const speed = parseFloat(
                element.dataset.speed || 0.15
            );

            const elementCenter =
                rect.top + rect.height / 2;

            const viewportCenter =
                window.innerHeight / 2;

            const distance =
                elementCenter - viewportCenter;

            const movement =
                distance * speed;

            element.style.transform =
                `translate3d(0, ${movement}px, 0)`;

        });

    }

    window.addEventListener(
        "scroll",
        updateParallax,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateParallax
    );

    updateParallax();

});