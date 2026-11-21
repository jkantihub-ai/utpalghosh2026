(() => {
  // Mobile Navigation
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // YouTube Click-to-Play Embed (T-Hub Founder Talks)
  const ytTrigger = document.getElementById('yt-play-trigger');
  const ytContainer = document.getElementById('yt-player-container');
  if (ytTrigger && ytContainer) {
    ytTrigger.addEventListener('click', () => {
      const id = ytTrigger.getAttribute('data-youtube-id');
      if (!id) return;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      iframe.title = 'T-Hub Founder Talks Series — Protein Box';
      iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      ytContainer.innerHTML = '';
      ytContainer.appendChild(iframe);
    });
  }

  // Native Uploaded .mov Video Reels
  document.querySelectorAll('[data-reel-play]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('[data-reel-card]');
      if (!card) return;
      const stage = card.querySelector('[data-reel-stage]');
      const src = card.getAttribute('data-video-src');
      const poster = card.getAttribute('data-poster-src');
      if (!stage || !src) return;

      const video = document.createElement('video');
      video.src = src;
      if (poster) video.poster = poster;
      video.controls = true;
      video.playsInline = true;
      video.autoplay = true;
      stage.innerHTML = '';
      stage.appendChild(video);
      video.play().catch(() => {});
    });
  });

  // Gallery Filter Tabs & Lightbox
  const filterButtons = Array.from(document.querySelectorAll('[data-gallery-filter]'));
  const galleryCards = Array.from(document.querySelectorAll('[data-gallery-card]'));
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbTitle = document.getElementById('lightbox-title');
  const lbCaption = document.getElementById('lightbox-caption');
  const lbMeta = document.getElementById('lightbox-meta');
  const lbClose = document.getElementById('lightbox-close');
  const lbPrev = document.getElementById('lightbox-prev');
  const lbNext = document.getElementById('lightbox-next');

  let visibleCards = galleryCards.slice();
  let activeIndex = -1;

  const renderLightbox = () => {
    if (!lightbox || !lbImg || !lbTitle || !lbCaption || !lbMeta) return;
    const card = visibleCards[activeIndex];
    if (!card) return;
    lbImg.setAttribute('src', card.getAttribute('data-src') || '');
    lbImg.setAttribute('alt', card.getAttribute('data-title') || '');
    lbTitle.textContent = card.getAttribute('data-title') || '';
    lbCaption.textContent = card.getAttribute('data-caption') || '';
    const num = String(activeIndex + 1).padStart(2, '0');
    const total = String(visibleCards.length).padStart(2, '0');
    lbMeta.textContent = `${num} / ${total} · ${card.getAttribute('data-category') || ''}`;
  };

  const openLightbox = (index) => {
    if (!lightbox || index < 0 || index >= visibleCards.length) return;
    activeIndex = index;
    renderLightbox();
    lightbox.classList.add('open');
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    activeIndex = -1;
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-gallery-filter') || 'All';
      filterButtons.forEach((b) => {
        const isCurrent = b === btn;
        b.classList.toggle('active', isCurrent);
        b.setAttribute('aria-selected', String(isCurrent));
      });
      visibleCards = [];
      galleryCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        const show = target === 'All' || cat === target;
        card.style.display = show ? 'flex' : 'none';
        if (show) visibleCards.push(card);
      });
    });
  });

  galleryCards.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = visibleCards.indexOf(card);
      if (idx !== -1) openLightbox(idx);
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) {
    lbPrev.addEventListener('click', () => {
      if (visibleCards.length < 2) return;
      activeIndex = (activeIndex - 1 + visibleCards.length) % visibleCards.length;
      renderLightbox();
    });
  }
  if (lbNext) {
    lbNext.addEventListener('click', () => {
      if (visibleCards.length < 2) return;
      activeIndex = (activeIndex + 1) % visibleCards.length;
      renderLightbox();
    });
  }
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Copy-to-Clipboard Buttons
  document.querySelectorAll('[data-copy-value]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const val = btn.getAttribute('data-copy-value');
      if (!val) return;
      try {
        await navigator.clipboard.writeText(val);
        const orig = btn.textContent;
        btn.textContent = 'Copied';
        window.setTimeout(() => {
          btn.textContent = orig;
        }, 1800);
      } catch {
        // Clipboard unavailable
      }
    });
  });

  // Contact Modal (Static Mailto Composer)
  const contactModal = document.getElementById('contact-modal');
  const openModalBtns = document.querySelectorAll('[data-open-contact]');
  const closeModalBtns = document.querySelectorAll('[data-close-contact]');
  const contactForm = document.getElementById('contact-form');

  const closeContact = () => {
    if (contactModal) contactModal.classList.remove('open');
  };

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.remove('open');
      if (contactModal) contactModal.classList.add('open');
    });
  });

  closeModalBtns.forEach((btn) => btn.addEventListener('click', closeContact));

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) closeContact();
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('c-name');
      const topicInput = document.getElementById('c-topic');
      const msgInput = document.getElementById('c-message');
      const name = nameInput ? nameInput.value.trim() : '';
      const topic = topicInput ? topicInput.value : 'General Correspondence';
      const msg = msgInput ? msgInput.value.trim() : '';
      const subject = encodeURIComponent(
        `[utpalghoshofficial] ${topic}${name ? ` — ${name}` : ''}`
      );
      const body = encodeURIComponent(`${msg}\n\n— ${name || 'Sent via utpalghoshofficial.com'}`);
      window.location.href = `mailto:utpalghoshofficial@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeContact();
      if (mobileMenu) mobileMenu.classList.remove('open');
    } else if (activeIndex !== -1 && e.key === 'ArrowRight' && visibleCards.length > 1) {
      activeIndex = (activeIndex + 1) % visibleCards.length;
      renderLightbox();
    } else if (activeIndex !== -1 && e.key === 'ArrowLeft' && visibleCards.length > 1) {
      activeIndex = (activeIndex - 1 + visibleCards.length) % visibleCards.length;
      renderLightbox();
    }
  });
})();
