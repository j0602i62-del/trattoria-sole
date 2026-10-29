/**
 * Trattoria SOLE - Main JavaScript
 * Handles navigation, animations, smooth scroll, page transitions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Page load fade-in
  setTimeout(() => {
    document.body.classList.add('is-loaded');
  }, 50);

  // Header scroll detection
  const siteHeader = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu drawer
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    const toggleMenu = () => {
      const isOpen = mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        mobileDrawer.classList.remove('is-open');
        mobileToggle.classList.remove('is-active');
        document.body.style.overflow = '';
      } else {
        mobileDrawer.classList.add('is-open');
        mobileToggle.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      }
    };

    mobileToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
        mobileToggle.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }

  // Active navigation highlight based on current path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Smooth page transition when clicking internal links
  const internalLinks = document.querySelectorAll('a[href$=".html"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetUrl = link.getAttribute('href');
      // If it's the current page or opening in new tab or with modifier keys, let it be default
      if (!targetUrl || targetUrl.startsWith('#') || link.target === '_blank' || e.metaKey || e.ctrlKey) {
        return;
      }
      if (targetUrl === currentPath) return;

      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 300);
    });
  });

  // Intersection Observer for scroll animations (.fade-up)
  const revealElements = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // Menu tab switching (for menu.html)
  const tabBtns = document.querySelectorAll('.menu-nav-tabs .tab-btn');
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-target');
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (targetId) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            const offset = 140;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = targetEl.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }
});
