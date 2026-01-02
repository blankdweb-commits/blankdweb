// Debounce function to limit the rate at which a function can fire.
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// --- Navbar Toggle for Mobile ---
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    }
}


// --- Active Nav Link on Scroll ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

const changeNavOnScroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                let correspondingLink = document.querySelector('header nav a[href*=' + id + ']');
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            });
        }
    });

    // --- Sticky Header ---
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // --- Remove toggle icon and navbar when click navbar links (scroll) ---
    if (menuIcon) {
        menuIcon.classList.remove('bx-x');
    }
    if (navbar) {
        navbar.classList.remove('active');
    }
};

window.addEventListener('scroll', debounce(changeNavOnScroll));


// --- Scroll-triggered Animations ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animate');
            
            // --- Animate Progress Lines for Skills ---
            if(entry.target.classList.contains('skills')) {
                 const progressLines = document.querySelectorAll('.progress-line span');
                 progressLines.forEach(line => {
                    const value = line.dataset.value;
                    line.style.width = value;
                 });
            }
        }
    });
}, {
    threshold: 0.1
});

const elementsToAnimate = document.querySelectorAll('section');
elementsToAnimate.forEach((el) => observer.observe(el));


// --- Smooth Scrolling for Anchor Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetEl = document.querySelector(this.getAttribute('href'));
        if (targetEl) {
            targetEl.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});