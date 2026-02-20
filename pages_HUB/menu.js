/**
 * Mobile menu — HUB static pages
 * - Hamburger toggle for main nav
 * - Accordion sub-menus for nav items with dropdowns
 * - Auto-close when resizing to desktop
 */

const MOBILE_BP = 899;

function initMobileMenu() {
  const toggle = document.querySelector('.hub-header__toggle');
  const nav = document.getElementById('header-nav');
  if (!toggle || !nav) return;

  // --- Hamburger toggle ---------------------------------------------------
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));

    // Close all open sub-menus when closing the nav
    if (!isOpen) closeAllDropdowns(nav);
  });

  // --- Accordion sub-menus (mobile only) ----------------------------------
  const navItems = nav.querySelectorAll('.hub-header__nav-item');

  navItems.forEach((item) => {
    const link = item.querySelector('.hub-header__link--has-sub');
    const dropdown = item.querySelector('.hub-dropdown');
    if (!link || !dropdown) return;

    link.addEventListener('click', (e) => {
      // Only intercept in mobile viewport
      if (window.innerWidth > MOBILE_BP) return;

      e.preventDefault();

      const wasOpen = item.classList.contains('is-expanded');

      // Close siblings first
      navItems.forEach((sibling) => {
        if (sibling !== item) {
          sibling.classList.remove('is-expanded');
          const sibDrop = sibling.querySelector('.hub-dropdown');
          if (sibDrop) sibDrop.classList.remove('is-open');
        }
      });

      // Toggle current
      item.classList.toggle('is-expanded', !wasOpen);
      dropdown.classList.toggle('is-open', !wasOpen);
    });
  });

  // --- Close on resize to desktop -----------------------------------------
  window.addEventListener('resize', () => {
    if (window.innerWidth > MOBILE_BP) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      closeAllDropdowns(nav);
    }
  });

  // --- Close on click outside header or nav --------------------------------
  document.addEventListener('click', (e) => {
    if (window.innerWidth > MOBILE_BP) return;
    const header = document.querySelector('.hub-header');
    if (!header.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      closeAllDropdowns(nav);
    }
  });

  // --- Lock body scroll when mobile nav is open ----------------------------
  const observer = new MutationObserver(() => {
    document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
  });
  observer.observe(nav, { attributes: true, attributeFilter: ['class'] });
}

function closeAllDropdowns(nav) {
  nav.querySelectorAll('.hub-header__nav-item').forEach((item) => {
    item.classList.remove('is-expanded');
    const drop = item.querySelector('.hub-dropdown');
    if (drop) drop.classList.remove('is-open');
  });
}

// Init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
  initMobileMenu();
}
