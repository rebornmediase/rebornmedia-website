// Content Loader - Dynamically loads JSON content into HTML pages
// This allows Netlify CMS to edit content without touching HTML files

// Helper function to safely set text content
function setText(selector, text) {
    const element = document.querySelector(selector);
    if (element && text) {
        element.textContent = text;
    }
}

// Helper function to safely set HTML content
function setHTML(selector, html) {
    const element = document.querySelector(selector);
    if (element && html) {
        element.innerHTML = html;
    }
}

// Helper function to safely set attribute
function setAttr(selector, attr, value) {
    const element = document.querySelector(selector);
    if (element && value) {
        element.setAttribute(attr, value);
    }
}

// Load Home Page Content
async function loadHomeContent() {
    try {
        const response = await fetch('/data/home.json');
        const data = await response.json();
        
        // Hero Section
        setText('.hero h1', data.hero.title);
        setText('.hero .subtitle', data.hero.subtitle);
        setText('.hero .btn-primary', data.hero.cta_text);
        setAttr('.hero .btn-primary', 'href', data.hero.cta_link);
        
        // Services Cards - DYNAMIC CREATION
        const cardsContainer = document.querySelector('#services-teaser .cards-grid');
        if (cardsContainer && data.services) {
            cardsContainer.innerHTML = ''; // Clear existing cards
            data.services.forEach(service => {
                const serviceCard = `
                    <div class="card">
                        <h3>${service.title}</h3>
                        <p>${service.description}</p>
                    </div>
                `;
                cardsContainer.innerHTML += serviceCard;
            });
        }
        
        // Process Timeline - DYNAMIC CREATION
        setText('#process-overview .section-title', data.process.title);
        setText('#process-overview .section-subtitle', data.process.subtitle);
        
        const timelineContainer = document.querySelector('.process-timeline');
        if (timelineContainer && data.process.steps) {
            timelineContainer.innerHTML = ''; // Clear existing steps
            data.process.steps.forEach(step => {
                const processStep = `
                    <div class="process-step">
                        <div class="process-number">${step.number}</div>
                        <h3>${step.title}</h3>
                        <p>${step.description}</p>
                    </div>
                `;
                timelineContainer.innerHTML += processStep;
            });
        }
        
        // Final CTA
        setText('#final-cta .section-title', data.final_cta.title);
        setText('#final-cta .section-subtitle', data.final_cta.subtitle);
        setText('#final-cta .btn-primary', data.final_cta.button_text);
        setAttr('#final-cta .btn-primary', 'href', data.final_cta.button_link);
        
    } catch (error) {
        console.error('Error loading home content:', error);
    }
}

// Load Services Page Content
async function loadServicesContent() {
    try {
        const response = await fetch('/data/services.json');
        const data = await response.json();
        
        // Page Header
        setText('.page-header h1', data.page.title);
        setText('.page-header .subtitle', data.page.subtitle);
        
        // Services Grid
        const container = document.querySelector('.services-grid');
        if (container && data.services) {
            container.innerHTML = '';
            data.services.forEach(service => {
                const serviceCard = `
                    <div class="service-card">
                        <h3>${service.title}</h3>
                        <p class="service-description">${service.description}</p>
                        <p class="service-details">${service.details}</p>
                    </div>
                `;
                container.innerHTML += serviceCard;
            });
        }
        
    } catch (error) {
        console.error('Error loading services content:', error);
    }
}

// Load About Page Content
async function loadAboutContent() {
    try {
        const response = await fetch('/data/about.json');
        const data = await response.json();
        
        // Page Header
        setText('.page-header h1', data.page.title);
        setText('.page-header .subtitle', data.page.subtitle);
        
        // Content sections
        setText('.about-intro', data.content.intro);
        setText('.about-mission', data.content.mission);
        setText('.about-approach', data.content.approach);
        
        // Values
        const valuesContainer = document.querySelector('.values-grid');
        if (valuesContainer && data.values) {
            valuesContainer.innerHTML = '';
            data.values.forEach(value => {
                const valueCard = `
                    <div class="value-card">
                        <h3>${value.title}</h3>
                        <p>${value.description}</p>
                    </div>
                `;
                valuesContainer.innerHTML += valueCard;
            });
        }
        
    } catch (error) {
        console.error('Error loading about content:', error);
    }
}

// Load Process Page Content
async function loadProcessContent() {
    try {
        const response = await fetch('/data/process.json');
        const data = await response.json();
        
        // Page Header
        setText('.page-header h1', data.page.title);
        setText('.page-header .subtitle', data.page.subtitle);
        setText('.process-intro', data.intro);
        
        // Process Phases
        const phasesContainer = document.querySelector('.process-phases');
        if (phasesContainer && data.phases) {
            phasesContainer.innerHTML = '';
            data.phases.forEach(phase => {
                const phaseCard = `
                    <div class="phase-card">
                        <div class="phase-number">${phase.number}</div>
                        <h3>${phase.title}</h3>
                        <p class="phase-description">${phase.description}</p>
                        <p class="phase-details">${phase.details}</p>
                    </div>
                `;
                phasesContainer.innerHTML += phaseCard;
            });
        }
        
        // CTA Section
        setText('.process-cta .section-title', data.cta.title);
        setText('.process-cta .section-subtitle', data.cta.subtitle);
        setText('.process-cta .btn-primary', data.cta.button_text);
        setAttr('.process-cta .btn-primary', 'href', data.cta.button_link);
        
    } catch (error) {
        console.error('Error loading process content:', error);
    }
}

// Load Contact Page Content
async function loadContactContent() {
    try {
        const response = await fetch('/data/contact.json');
        const data = await response.json();
        
        // Page Header
        setText('.page-header h1', data.page.title);
        setText('.page-header .subtitle', data.page.subtitle);
        
        // Contact Info
        setText('.contact-email', data.contact_info.email);
        setText('.contact-phone', data.contact_info.phone);
        setText('.contact-address', data.contact_info.address);
        
        // Form Section
        setText('.form-section h2', data.form.title);
        setText('.form-section .subtitle', data.form.subtitle);
        setText('.form-cta-text', data.cta_text);
        
    } catch (error) {
        console.error('Error loading contact content:', error);
    }
}

// Load Global Company Info (for footer, etc.)
async function loadCompanyInfo() {
    try {
        const response = await fetch('/data/company.json');
        const data = await response.json();
        
        // Footer contact
        const footerEmails = document.querySelectorAll('.footer-contact p:first-child, footer .footer-contact p:nth-child(1)');
        footerEmails.forEach(el => {
            if (el && el.textContent.includes('@')) el.textContent = data.email;
        });
        
        const footerPhones = document.querySelectorAll('.footer-contact p:last-child, footer .footer-contact p:nth-child(2)');
        footerPhones.forEach(el => {
            if (el && el.textContent.match(/\d/)) el.textContent = data.phone;
        });
        
        // Copyright
        setText('.footer-bottom p', data.copyright);
        
    } catch (error) {
        console.error('Error loading company info:', error);
    }
}

// Initialize content loading based on current page
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    // Load company info on all pages
    loadCompanyInfo();
    
    // Load page-specific content
    if (path === '/' || path === '/index.html' || path.endsWith('/')) {
        loadHomeContent();
    } else if (path.includes('tjanster')) {
        loadServicesContent();
    } else if (path.includes('om-oss')) {
        loadAboutContent();
    } else if (path.includes('process')) {
        loadProcessContent();
    } else if (path.includes('kontakt')) {
        loadContactContent();
    }
});
