// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections and items that should animate
document.querySelectorAll('.section, .education-item, .skill-item, .strength-item').forEach((el) => {
    observer.observe(el);
});

// Add hover effects for skills
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Add copy to clipboard functionality for contact info
const contactInfo = document.querySelectorAll('.contact-info p');
contactInfo.forEach(info => {
    info.addEventListener('click', () => {
        const text = info.textContent.replace(/\s+/g, ' ').trim();
        navigator.clipboard.writeText(text);
        info.style.color = '#007bff';
        setTimeout(() => {
            info.style.color = '#333';
        }, 1000);
    });
});

// Add print functionality for the resume
const printButton = document.createElement('button');
printButton.innerHTML = 'Print Resume';
printButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1000;
`;

document.body.appendChild(printButton);

printButton.addEventListener('click', () => {
    window.print();
});
