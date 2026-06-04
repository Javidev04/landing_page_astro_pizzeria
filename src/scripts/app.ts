interface CartItem {
    name: string;
    price: number;
    qty: number;
}

document.addEventListener('DOMContentLoaded', () => {
    initNavigation()
    initScrollEfects()
    initMenuFilters()
    initRevealAnimation()
    initTestimonialsSlider()
    initContactForm()
    initCart()
})

const initNavigation = () => {
    const header = document.querySelector('header')
    const navMenu = document.getElementById('navMenu')
    const navToggle = document.getElementById('navToggle')
    const navClose = document.getElementById('navClose')
    const navLinks = document.querySelectorAll('#navLink')

    navToggle?.addEventListener('click', (link) => {
        navMenu?.classList.add('right-0')
        navMenu?.classList.remove('-right-full')
    })
    navClose?.addEventListener('click', (link) => {
        navMenu?.classList.remove('right-0')
        navMenu?.classList.add('-right-full')
    })

    navLinks.forEach(link => link.addEventListener('click', () => {
        navMenu?.classList.remove('right-0')
        navMenu?.classList.add('-right-full')
    }))

    window.addEventListener('scroll', () => {
        header?.classList.toggle('bg-black', window.scrollY > 50);
        updateActiveNavLink(navLinks)
    })
}

const updateActiveNavLink = (links: NodeListOf<Element>) => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    const scrollPos = window.scrollY + 100

    sections.forEach( (section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if(scrollPos >= top && scrollPos < top + height) {
            links.forEach(link => {
                const isActive = link.getAttribute('href') === `#${id}`
                link.classList.toggle('after:w-11/12', isActive)

            })
        }
    } )
}

const initScrollEfects = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href')!);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        });
    });
}

const initMenuFilters = () => {
    const filters = document.querySelectorAll<HTMLElement>('#menuFilter')
    const cards = document.querySelectorAll<HTMLElement>('.menuCard')

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('bg-amber-800'));
            filter.classList.add('bg-amber-800');
        
            const category = filter.dataset.filter
        
            cards.forEach(card => {
                const match = category === 'all' || card.dataset.category === category;
                card.classList.toggle('hidden', !match);
        
                if (match) {
                card.style.animation = 'none';
                card.offsetHeight;
                card.style.animation = '';
                }
            });
        });
    });
}

const initTestimonialsSlider = () => {
    const track = document.querySelector<HTMLElement>('.testimonials-track');
    const prevBtn = document.querySelector<HTMLButtonElement>('.testimonial-prev');
    const nextBtn = document.querySelector<HTMLButtonElement>('.testimonial-next');
    const dotsContainer = document.querySelector<HTMLElement>('.testimonials-dots');
  
    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;
  
    const cards = track.querySelectorAll<HTMLElement>('.testimonial__card');
  
    let current = 0;
    let autoplay: number;
  
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
  
      dot.classList.add('testimonials__dot', 'w-2.5', 'h-2.5', 'rounded-full', 'bg-[rgba(255,255,255,0.25)]', 'cursor-pointer', 'duration-300', 'ease-in-out');
  
      if (i === 0) {
        dot.classList.add('w-7', 'bg-orange-400');
      }
  
      dot.setAttribute('aria-label', `Testimonio ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
  
      dotsContainer.appendChild(dot);
    });
  
    const dots = dotsContainer.querySelectorAll<HTMLButtonElement>('.testimonials__dot');
  
    const goTo = (index: number): void => {
      current = (index + cards.length) % cards.length;
  
      track.style.transform = `translateX(-${current * 100}%)`;
  
      dots.forEach((dot, i) => {
        dot.classList.toggle('w-7', i === current);
        dot.classList.toggle('bg-orange-400', i === current);
      });
    };
  
    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));
  
    const startAutoplay = (): void => {
      autoplay = window.setInterval(() => {
        goTo(current + 1);
      }, 5000);
    };
  
    const resetAutoplay = (): void => {
      clearInterval(autoplay);
      startAutoplay();
    };
  
    prevBtn.addEventListener('click', resetAutoplay);
    nextBtn.addEventListener('click', resetAutoplay);
  
    dots.forEach(dot => {
      dot.addEventListener('click', resetAutoplay);
    });
  
    startAutoplay();
  };

const initContactForm = (): void => {
    const form = document.querySelector<HTMLFormElement>('.contact-form');
    const dateInput = document.querySelector<HTMLInputElement>('.date');
  
    if (!form || !dateInput) return;
  
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  
    form.addEventListener('submit', (e: SubmitEvent) => {
      e.preventDefault();
  
      const nameInput = form.elements.namedItem('name') as HTMLInputElement;
      const emailInput = form.elements.namedItem('email') as HTMLInputElement;
  
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
  
      if (!name || !email) {
        showToast(
          'Por favor completa todos los campos requeridos',
          'error'
        );
        return;
      }
  
      showToast(
        `¡Gracias ${name}! Tu reserva ha sido registrada. Te contactaremos pronto ;D`,
        'success'
      );
  
      form.reset();
    });
};

const initCart = () => {
    const cart: CartItem[] = [];

    const cartToggle = document.getElementById('cart-toggle');
    const cartPanel = document.getElementById('cart-panel');
    const cartClose = document.getElementById('cart-close');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('cart-checkout');
  
    if (
      !cartToggle ||
      !cartPanel ||
      !cartClose ||
      !cartItems ||
      !cartCount ||
      !cartTotal ||
      !checkoutBtn
    ) {
      return;
    }
  
    cartToggle.addEventListener('click', () => {
        cartPanel.classList.toggle('opacity-100');
        cartPanel.classList.toggle('visible');
        cartPanel.classList.toggle('scale-100');
        cartPanel.classList.toggle('translate-y-0');
    });
  
    cartClose.addEventListener('click', () => {
        cartPanel.classList.remove('opacity-100', 'visible', 'scale-100', 'translate-y-0');
    });
  
    const buttons =
      document.querySelectorAll<HTMLButtonElement>('.add-to-cart');
  
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const price = Number(btn.dataset.price);
  
        if (!name || Number.isNaN(price)) return;
  
        const existing = cart.find(item => item.name === name);
  
        if (existing) {
          existing.qty++;
        } else {
          cart.push({
            name,
            price,
            qty: 1,
          });
        }
  
        updateCartUI();
  
        showToast(`${name} agregada al pedido`, 'success');
  
        btn.textContent = '✓ Agregada';
        btn.disabled = true;
  
        setTimeout(() => {
          btn.textContent = 'Agregar';
          btn.disabled = false;
        }, 1500);
      });
    });
  
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Tu carrito está vacío', 'error');
        return;
      }
  
      const total = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
  
      showToast(
        `¡Pedido realizado! Total: S/${total.toFixed(
          2
        )}. Te llamaremos para confirmar.`,
        'success'
      );
  
      cart.length = 0;
  
      updateCartUI();
  
      cartPanel.classList.remove('open');
    });
  
    const updateCartUI = (): void => {
      const totalItems = cart.reduce(
        (sum, item) => sum + item.qty,
        0
      );
  
      const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
  
      cartCount.textContent = totalItems.toString();
      cartTotal.textContent = `S/${totalPrice.toFixed(2)}`;
  
      if (cart.length === 0) {
        cartItems.innerHTML =
          '<li class="cart__empty">No hay items en tu pedido</li>';
        return;
      }
  
      cartItems.innerHTML = cart
        .map(
          item => `
            <li class="cart__item flex justify-between items-center">
              <span class="cart__item-name">
                ${item.name} × ${item.qty}
              </span>
              <span class="cart__item-price text-red-500 font-semibold">
                S/${(item.price * item.qty).toFixed(2)}
              </span>
            </li>
          `
        )
        .join('');
    };
  
    updateCartUI();
}

const initRevealAnimation = () => {
    const reveals = document.querySelectorAll('#reveal')
    const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('opacity-100', 'translate-y-[0]');
              entry.target.classList.remove('opacity-0', 'translate-y-[30px]');
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
      );
    
      reveals.forEach(el => observer.observe(el));
}

function showToast(message:string, type = 'info') {
    const toast = document.getElementById('toast')!;
    toast.textContent = message;
    toast.classList.remove('translate-y-[100px]', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    if (type === 'success') toast.classList.add('bg-orange-400');
  
    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100')
        toast.classList.add('translate-y-[100px]', 'opacity-0')
    }, 3500);
  }