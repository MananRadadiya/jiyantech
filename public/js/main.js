/**
 * JiyanTech Client Interaction Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Navbar Scroll Effect
  const navbar = document.getElementById('main-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 15) {
        navbar.classList.add('bg-white/95', 'shadow-sm', 'border-slate-200/80');
        navbar.classList.remove('bg-white/80', 'border-slate-200/50');
      } else {
        navbar.classList.remove('bg-white/95', 'shadow-sm', 'border-slate-200/80');
        navbar.classList.add('bg-white/80', 'border-slate-200/50');
      }
    }, { passive: true });
  }

  // 3. Mobile Navigation Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
      }
    });

    // Close mobile drawer when clicking links
    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 4. Copy Email to Clipboard
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('hello@jiyantech.com').then(() => {
        const textSpan = document.getElementById('copy-email-text');
        if (textSpan) {
          const originalText = textSpan.innerText;
          textSpan.innerText = 'Copied to clipboard!';
          textSpan.classList.add('text-emerald-400');
          setTimeout(() => {
            textSpan.innerText = originalText;
            textSpan.classList.remove('text-emerald-400');
          }, 2000);
        }
      }).catch(err => {
        console.error('Clipboard copy failed', err);
      });
    });
  }

  // 5. Interactive Services Tabs (Homepage)
  const servicesJsonEl = document.getElementById('services-json');
  if (servicesJsonEl) {
    try {
      const servicesData = JSON.parse(servicesJsonEl.textContent);
      const tabButtons = document.querySelectorAll('.service-tab-btn');
      
      const codeEl = document.getElementById('service-preview-code');
      const specEl = document.getElementById('service-preview-spec');
      const counterEl = document.getElementById('service-preview-counter');
      const titleEl = document.getElementById('service-preview-title');
      const descEl = document.getElementById('service-preview-desc');
      const tagsEl = document.getElementById('service-preview-tags');

      tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const index = parseInt(btn.getAttribute('data-index'), 10);
          const service = servicesData[index];
          if (!service) return;

          // Update active styles on buttons
          tabButtons.forEach((b, idx) => {
            const numSpan = b.querySelector('.service-tab-num');
            const tagSpan = b.querySelector('.service-tab-tag');
            const arrow = b.querySelector('.service-tab-arrow');

            if (idx === index) {
              b.classList.add('bg-brand-50/60', 'text-slate-900', 'border-l-4', 'border-l-brand-500');
              b.classList.remove('text-slate-600', 'hover:bg-slate-50');
              b.setAttribute('aria-selected', 'true');
              if (numSpan) { numSpan.classList.add('text-brand-500', 'font-bold'); numSpan.classList.remove('text-slate-400'); }
              if (tagSpan) { tagSpan.classList.add('bg-brand-100', 'text-brand-700', 'opacity-100'); tagSpan.classList.remove('opacity-0'); }
              if (arrow) { arrow.classList.add('text-brand-500', '-rotate-45'); arrow.classList.remove('text-slate-300'); }
            } else {
              b.classList.remove('bg-brand-50/60', 'text-slate-900', 'border-l-4', 'border-l-brand-500');
              b.classList.add('text-slate-600');
              b.setAttribute('aria-selected', 'false');
              if (numSpan) { numSpan.classList.remove('text-brand-500', 'font-bold'); numSpan.classList.add('text-slate-400'); }
              if (tagSpan) { tagSpan.classList.remove('bg-brand-100', 'text-brand-700', 'opacity-100'); tagSpan.classList.add('opacity-0'); }
              if (arrow) { arrow.classList.remove('text-brand-500', '-rotate-45'); arrow.classList.add('text-slate-300'); }
            }
          });

          // Update Preview Card
          if (codeEl) codeEl.innerText = `${service.code} / CORE SYSTEM`;
          if (specEl) specEl.innerText = `SPEC: ${service.highlight}`;
          if (counterEl) counterEl.innerText = `${service.number} / 0${servicesData.length}`;
          if (titleEl) titleEl.innerText = service.title;
          if (descEl) descEl.innerText = service.description;

          if (tagsEl) {
            tagsEl.innerHTML = service.tags.map(tag => `
              <span class="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200/80 px-3 py-1.5 rounded-md">
                <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-brand-500"></i>
                ${tag}
              </span>
            `).join('');
            if (typeof lucide !== 'undefined') lucide.createIcons();
          }
        });
      });
    } catch (e) {
      console.error('Error parsing services data', e);
    }
  }

  // 6. Interactive Work Filter Pills (Work Page)
  const filterButtons = document.querySelectorAll('.work-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedFilter = btn.getAttribute('data-filter');

        // Update button states
        filterButtons.forEach((b) => {
          const countSpan = b.querySelector('span:last-child');
          if (b === btn) {
            b.className = 'work-filter-btn px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 bg-brand-500 text-white shadow-md shadow-brand-500/25 scale-[1.02]';
            if (countSpan) countSpan.className = 'px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-white/20 text-white';
          } else {
            b.className = 'work-filter-btn px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900';
            if (countSpan) countSpan.className = 'px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-slate-200 text-slate-600';
          }
        });

        // Filter projects
        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (selectedFilter === 'all' || (category && category.toLowerCase().includes(selectedFilter.toLowerCase()))) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 7. WorkVisual Telemetry Simulation
  const dataRateEl = document.getElementById('metric-data-rate');
  if (dataRateEl) {
    let tick = 0;
    setInterval(() => {
      tick += 1;
      const rate = (1.38 + Math.sin(tick * 0.5) * 0.08 + Math.random() * 0.04).toFixed(2);
      dataRateEl.innerText = `${rate} GB/s`;
    }, 1200);
  }

  // 8. Contact Form AJAX Submission
  const contactForm = document.getElementById('contact-form');
  const successBanner = document.getElementById('form-success-banner');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const btnText = document.getElementById('btn-text');
      if (btnText) btnText.innerText = 'Transmitting Data...';
      if (submitBtn) submitBtn.disabled = true;

      const formData = new FormData(contactForm);
      const payload = Object.fromEntries(formData.entries());

      try {
        const res = await fetch('/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          if (successBanner) {
            successBanner.classList.remove('hidden');
            successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          contactForm.reset();
        } else {
          alert('Submission failed. Please try again or email us directly.');
        }
      } catch (err) {
        console.error('Contact submit error', err);
        // Fallback simulate success for client demo
        if (successBanner) {
          successBanner.classList.remove('hidden');
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        contactForm.reset();
      } finally {
        if (btnText) btnText.innerText = 'Transmit Technical Request';
        if (submitBtn) submitBtn.disabled = false;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    });
  }
});
