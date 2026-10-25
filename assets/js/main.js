/* BONA VISTA - comportamiento */
const WA = "51939017959";
const MAPS_QUERY =
  "Recreo campestre Bona Vista, Q9F8+QC, Jr. Colonos Fundadores, Satipo 12261, Perú";
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;
const MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&t=k&z=17&output=embed`;
const $ = (s, c = document) => c.querySelector(s),
  $$ = (s, c = document) => [...c.querySelectorAll(s)];
const page = location.pathname.split("/").pop() || "index.html";
const LOADER_DURATION = 1000;
const LOADER_FADE_DURATION = 260;
const transitionStartedAt = Number(sessionStorage.getItem("bv-loader-start"));
sessionStorage.removeItem("bv-loader-start");

function createPageLoader() {
  const overlay = document.createElement("div");
  overlay.className = "page-loader";
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "polite");
  overlay.innerHTML = `
    <div class="page-loader__content">
      <div class="page-loader__scene">
        <span class="page-loader__glow" aria-hidden="true"></span>
        <img class="page-loader__toucan" src="assets/img/paj.png" alt="El tucán pide un momento">
        <span class="page-loader__spark page-loader__spark--one" aria-hidden="true"></span>
        <span class="page-loader__spark page-loader__spark--two" aria-hidden="true"></span>
      </div>
      <p class="page-loader__message">Un momento, por favor</p>
      <div class="page-loader__progress" aria-hidden="true"><span></span></div>
    </div>
  `;
  document.body.append(overlay);
  document.body.setAttribute("aria-busy", "true");
  return overlay;
}

let pageLoader = createPageLoader();
function closePageLoader() {
  if (!pageLoader) return;
  pageLoader.classList.add("is-closing");
  window.setTimeout(() => {
    pageLoader?.remove();
    pageLoader = null;
    document.body.removeAttribute("aria-busy");
  }, LOADER_FADE_DURATION);
}

function showPageLoader() {
  if (!pageLoader?.isConnected) pageLoader = createPageLoader();
}

const loaderElapsed = transitionStartedAt
  ? Date.now() - transitionStartedAt
  : 0;
const loaderRemaining = Math.max(0, LOADER_DURATION - loaderElapsed);
window.setTimeout(
  closePageLoader,
  Math.max(0, loaderRemaining - LOADER_FADE_DURATION),
);

document.addEventListener("click", (e) => {
  const link =
    e.target instanceof Element ? e.target.closest("#menu a") : null;
  if (
    !link ||
    e.defaultPrevented ||
    e.button !== 0 ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey
  )
    return;
  const destination = new URL(link.href, location.href);
  if (
    destination.origin !== location.origin ||
    destination.pathname === location.pathname
  )
    return;
  sessionStorage.setItem("bv-loader-start", String(Date.now()));
  showPageLoader();
});
document.addEventListener(
  "dragstart",
  (e) => {
    if (e.target instanceof HTMLImageElement) e.preventDefault();
  },
  true,
);
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (
    e.key === "F12" ||
    ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "j", "c"].includes(key)) ||
    ((e.ctrlKey || e.metaKey) && key === "u")
  )
    e.preventDefault();
});
const P = {
  pool: '<path d="M3 17c2 0 2-1.5 4.5-1.5S10 17 12 17s2-1.5 4.5-1.5S19 17 21 17M3 21c2 0 2-1.5 4.5-1.5S10 21 12 21s2-1.5 4.5-1.5S19 21 21 21M8 14V6a2 2 0 0 1 4 0M14 14V6a2 2 0 0 1 4 0M8 9h6"/>',
  food: '<path d="M6 3v8M9 3v8M6 7h3M7.5 11v10M17 3c-2 2-2 6 0 8v10"/>',
  house: '<path d="M3 11 12 3l9 8M5 10v10h14V10M10 20v-6h4v6"/>',
  cal: '<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>',
  leaf: '<path d="M5 19C5 9 12 4 20 4c0 9-5 16-15 15ZM5 19 14 10"/>',
  family:
    '<circle cx="8" cy="7" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 20c0-4 3-6 6-6s6 2 6 6M14 20c0-3 2-5 5-5s3 2 3 5"/>',
  smile:
    '<circle cx="12" cy="12" r="9"/><path d="M8 14c1 2 7 2 8 0M9 9h.01M15 9h.01"/>',
  cam: '<path d="M4 8h3l2-3h6l2 3h3v11H4Z"/><circle cx="12" cy="13" r="3.5"/>',
  pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  fb: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z"/>',
  ig: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.8"/><path d="M17 7h.01"/>',
  tt: '<path d="M14 4v10a4 4 0 1 1-4-4M14 4c0 3 2 5 5 5"/>',
  wa: '<path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 19ZM9 9c0 3 3 6 6 6l1.2-1.4-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2Z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chl: '<path d="M15 6l-6 6 6 6"/>',
  chr: '<path d="M9 6l6 6-6 6"/>',
  down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  chef: '<path d="M7 14a4 4 0 1 1 1-7.8A4 4 0 0 1 16 6a4 4 0 0 1 1 8v5H7Z"/>',
  phone:
    '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2C10 21 3 14 3 6a2 2 0 0 1 2-2Z"/>',
};
document.body.insertAdjacentHTML(
  "afterbegin",
  `<svg class="sprite" aria-hidden="true">${Object.entries(P)
    .map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24">${v}</symbol>`)
    .join("")}</svg>`,
);
const I = (n) => `<svg class="i"><use href="#i-${n}"/></svg>`;
$$("[data-i]").forEach((e) => (e.innerHTML = I(e.dataset.i) + e.innerHTML));

/* navegacion: cada boton = un html */
const L = [
  ["index.html", "Inicio", "leaf"],
  ["nosotros.html", "Nosotros", "family"],
  ["servicios.html", "Servicios", "pool"],
  ["galeria.html", "Galería", "cam"],
  ["carta.html", "Carta", "food"],
  ["eventos.html", "Eventos", "cal"],
  ["contacto.html", "Contacto", "pin"],
];
$("#nav").outerHTML = `<header class="nav" id="navbar">
    <a class="logo" href="index.html" aria-label="Bona Vista">
      <img src="assets/img/emblema.png" alt="">
      <span>
        <b>BONA VISTA</b>
        <small>CENTRO RECREACIONAL TURÍSTICO CAMPESTRE</small>
      </span>
    </a>
    <ul class="menu" id="menu">
      ${L.map(
        (l) => `
          <li>
            <a href="${l[0]}" class="${l[0] == page ? "on" : ""}">
              ${I(l[2]).replace('class="i"', 'class="i nav-icon" aria-hidden="true"')}
              <span>${l[1]}</span>
            </a>
          </li>
        `,
      ).join("")}
    </ul>
    <a class="btn ghost" href="contacto.html#reserva">
      ${I("cal")} Reservar ahora
    </a>
    <button
      class="burger"
      id="burger"
      aria-label="Menú"
      aria-controls="menu"
      aria-expanded="false"
    >
      ${I("menu")}
    </button>
  </header>`;
const burger = $("#burger"),
  menu = $("#menu");
const centerActiveMenuItem = () => {
  if (innerWidth > 980) return;
  const activeLink = $("a.on", menu);
  if (!activeLink) return;
  const menuRect = menu.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();
  const targetScrollLeft =
    menu.scrollLeft +
    linkRect.left -
    (menuRect.left + (menu.clientWidth - linkRect.width) / 2);
  menu.scrollLeft = Math.max(
    0,
    Math.min(targetScrollLeft, menu.scrollWidth - menu.clientWidth),
  );
};
centerActiveMenuItem();
window.setTimeout(centerActiveMenuItem, LOADER_DURATION);
addEventListener("pageshow", () => requestAnimationFrame(centerActiveMenuItem));
addEventListener("resize", () => requestAnimationFrame(centerActiveMenuItem));
const toggleMenu = (open) => {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
};
burger.onclick = () => toggleMenu(!menu.classList.contains("open"));
$$("#menu a").forEach((a) =>
  a.addEventListener("click", () => toggleMenu(false)),
);
addEventListener("keydown", (e) => {
  if (e.key === "Escape") toggleMenu(false);
});
const nb = $("#navbar");
const sc = () => nb.classList.toggle("sc", scrollY > 40);
addEventListener("scroll", sc, { passive: true });
sc();

/* cta + pie */
const f = $("#foot");
const homeMap = page === "index.html";
if (f) {
  const howToBlock = homeMap
    ? `
      <div class="how rv r">
        <div class="how__heading">
          <i>${I("pin")}</i>
          <div>
            <b>¿Cómo llegar?</b>
            <p>Recreo campestre Bona Vista · Satipo</p>
          </div>
        </div>
        <div class="inline-map">
          <iframe
            src="${MAPS_EMBED}"
            title="Mapa satelital de Recreo campestre Bona Vista en Satipo"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>`
    : "";
  f.outerHTML = `
    <section class="cta ${homeMap ? "cta--map" : "cta--simple"}" style="--bg:url(../img/palmeras.jpg)">
      <div class="ven script rv l">¡Ven y vive<b>BONA VISTA!</b></div>
      ${howToBlock}
    </section>
    <footer class="foot">
      <div class="fr">
        <a class="logo" href="index.html">
          <img src="assets/img/emblema.png" alt="">
          <span>
            <b>BONA VISTA</b>
            <small>CENTRO RECREACIONAL TURÍSTICO CAMPESTRE</small>
          </span>
        </a>
        <div class="fv">
          <span><i>${I("leaf")}</i>Naturaleza</span>
          <span><i>${I("family")}</i>Familia</span>
          <span><i>${I("smile")}</i>Diversión</span>
          <span><i>${I("food")}</i>Buena comida</span>
        </div>
        <div class="soc">
          <a href="#" aria-label="Facebook">${I("fb")}</a>
          <a href="#" aria-label="Instagram">${I("ig")}</a>
          <a href="#" aria-label="TikTok">${I("tt")}</a>
          <a
            href="https://wa.me/${WA}"
            aria-label="WhatsApp"
            target="_blank"
            rel="noopener"
          >${I("wa")}</a>
        </div>
        <div class="addr">
          <i>${I("pin")}</i>
          <span>Satipo, Junín<br>Perú</span>
        </div>
      </div>
      <div class="fb">
        <span>© ${new Date().getFullYear()} Bona Vista. Todos los derechos reservados.</span>
        <span class="script">Naturaleza que se disfruta</span>
      </div>
    </footer>
  `;
}

/* titulo letra por letra */
$$(".ttl>span").forEach((w) => {
  w.innerHTML = [...w.textContent]
    .map(
      (c, i) => `<span style="--i:${i + (w.dataset.o || 0) * 4}">${c}</span>`,
    )
    .join("");
});

/* revelado */
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.15 },
);
$$(".rv").forEach((e, i) => {
  e.style.setProperty("--d", (e.dataset.d || 0) + "s");
  io.observe(e);
});

/* hero slider */
const sl = $$(".slide"),
  dt = $(".dots");
let si = 0,
  st;
if (sl.length) {
  dt.innerHTML =
    sl
      .map((_, i) => `<button aria-label="Imagen ${i + 1}"></button>`)
      .join("") +
    `<a class="dn" href="#inst" aria-label="Bajar">${I("down")}</a>`;
  const go = (i) => {
    si = (i + sl.length) % sl.length;
    sl.forEach((s, j) => s.classList.toggle("on", j == si));
    $$(".dots button").forEach((b, j) => b.classList.toggle("on", j == si));
  };
  $$(".dots button").forEach(
    (b, j) =>
      (b.onclick = () => {
        go(j);
        clearInterval(st);
        st = setInterval(() => go(si + 1), 6000);
      }),
  );
  go(0);
  st = setInterval(() => go(si + 1), 6000);
}

/* carrusel */
$$(".car").forEach((c) => {
  const t = $(".trk", c),
    w = () => $(".card", t).offsetWidth + 18;
  $(".ar.l", c).onclick = () => t.scrollBy({ left: -w(), behavior: "smooth" });
  $(".ar.r", c).onclick = () => {
    t.scrollBy({ left: w(), behavior: "smooth" });
    if (t.scrollLeft + t.clientWidth >= t.scrollWidth - 10)
      t.scrollTo({ left: 0, behavior: "smooth" });
  };
});

/* parallax: scroll + mouse */
const pz = $$("[data-k]");
let tk = 0,
  mx = 0,
  my = 0;
const par = () => {
  pz.forEach((e) => {
    const r = e.parentElement.getBoundingClientRect(),
      k = +e.dataset.k;
    e.style.translate = `${mx * k * -260}px ${(r.top + r.height / 2 - innerHeight / 2) * k + my * k * -200}px`;
  });
  tk = 0;
};
const rq = () => {
  if (!tk) {
    tk = 1;
    requestAnimationFrame(par);
  }
};
if (
  !matchMedia("(pointer: coarse)").matches &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  addEventListener("scroll", rq, { passive: true });
  addEventListener("mousemove", (e) => {
    mx = e.clientX / innerWidth - 0.5;
    my = e.clientY / innerHeight - 0.5;
    rq();
  });
  par();
}

/* ondas al pulsar botones */
document.addEventListener("click", (e) => {
  const b = e.target.closest(".btn");
  if (!b) return;
  const r = b.getBoundingClientRect(),
    s = document.createElement("span"),
    d = Math.max(r.width, r.height);
  s.className = "rip";
  s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
  b.append(s);
  setTimeout(() => s.remove(), 700);
});

/* lightbox */
const lb = document.createElement("div");
lb.className = "lb";
lb.innerHTML = '<img alt="">';
document.body.append(lb);
lb.onclick = () => lb.classList.remove("on");
$$(".mg img").forEach(
  (i) =>
    (i.onclick = () => {
      $("img", lb).src = i.src;
      lb.classList.add("on");
    }),
);
addEventListener(
  "keydown",
  (e) => e.key == "Escape" && lb.classList.remove("on"),
);

/* reserva por WhatsApp */
function toast(m) {
  let t = $(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    document.body.append(t);
  }
  t.textContent = m;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2600);
}
const fm = $("#reserva");
if (fm)
  fm.onsubmit = (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(fm));
    const m = `Hola Bona Vista, quiero reservar.%0ANombre: ${d.nombre}%0AFecha: ${d.fecha}%0APersonas: ${d.personas}%0AServicio: ${d.servicio}%0A${d.mensaje || ""}`;
    toast("Abriendo WhatsApp...");
    setTimeout(() => open(`https://wa.me/${WA}?text=${m}`, "_blank"), 600);
  };
