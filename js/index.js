// كل سكشن في الصفحة
const sections = document.querySelectorAll("section");
// كل لينك في الناف بار
const navLinks = document.querySelectorAll(".nav-links a");
// كل أزرار الفلترة
const filterButtons = document.querySelectorAll('.portfolio-filter');
// كل الكاردات
const portfolioItems = document.querySelectorAll('.portfolio-item');

//*******************active navbar
document.addEventListener('scroll' , function(){
    let currentSection = "";

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        //offsetTop = المسافة من أعلى الصفحة لبداية السكشن (أول نقطة فيه).
        //-100 = تعويض لأن عندك Navbar ثابتة فوق وبتغطي جزء من السكشن.
        /*
        offsetTop لا يحسب الـ margin
        لكنه يحسب:
        padding
        border
        ويُحسب بالنسبة لأقرب عنصر عنده position: relative
        */

        const sectionTop = section.offsetTop - 100;
        /*
        🔹 الارتفاع الكامل للعنصر بالبكسل ويشمل:
        المحتوى
        padding
        border
        ❌ لا يشمل:
        margin
        */
        const sectionHeight = section.offsetHeight;

        if (
           window.scrollY >= sectionTop &&
           window.scrollY < sectionTop + sectionHeight
        ) {
        currentSection = section.getAttribute("id");
        }
    } 

    for (let i = 0; i < navLinks.length; i++) {
        const link = navLinks[i];
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
        }
    }
});


//********************light and dark mood

var toggleBtn = document.getElementById("theme-toggle-button");
var html = document.documentElement;

// ✅ الافتراضي Dark
html.classList.add("dark");
toggleBtn.setAttribute("aria-pressed", "true");

// لو في اختيار مخزّن
var savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  html.classList.remove("dark");
  toggleBtn.setAttribute("aria-pressed", "false");
}

// عند الضغط على الزر
toggleBtn.addEventListener("click", function () {
  var isDark = html.classList.contains("dark");

  if (isDark) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
    toggleBtn.setAttribute("aria-pressed", "false");
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
    toggleBtn.setAttribute("aria-pressed", "true");
  }
});


//*******************nav responsive
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', (e) => {
  mobileMenu.classList.toggle('open'); // فتح/إغلاق القائمة
  e.stopPropagation();
});

document.body.addEventListener('click' , function(){
  mobileMenu.classList.remove('open')
})


//********************nav and tabs
filterButtonsClick();

function filterButtonsClick(){       
    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener('click', function (e) {
        // الزر اللي انضغط
            let clickedButton = e.target;
            let filterValue = clickedButton.getAttribute('data-filter');

            // إزالة active من الكل
            //بشيل الactive عن العنصر الي قبل الي بصير عليه كليك 
        for (let j = 0; j < filterButtons.length; j++) {
            filterButtons[j].classList.remove('active');
        }
            // إضافة active للزر المضغوط
            clickedButton.classList.add('active');

            // فلترة الكروت
        for (let k = 0; k < portfolioItems.length; k++) {
                let categoryValue = portfolioItems[k].getAttribute('data-category');

            if (filterValue === 'all' || categoryValue === filterValue) {
                    portfolioItems[k].style.display = 'block';
            } else {
                    portfolioItems[k].style.display = 'none';
            }
        }
    });
    }
}


//***********************top btn

var scrollBtn = document.getElementById("scroll-to-top");
// تخزين اخر مكان للسكرول
var lastScrollY = window.scrollY;

var footer = document.querySelector("footer"); 
// الفوتر
// لو ما عندك footer حقيقي غيرها لآخر سكشن

window.addEventListener("scroll", function () {
  var currentScroll = window.scrollY;

  // 1️⃣ أول الصفحة → مخفي
  if (currentScroll < 400) {
    hideBtn();
    lastScrollY = currentScroll;
    return;
  }

  // حساب قرب الفوتر
  var footerTop = footer.offsetTop;
  var windowBottom = currentScroll + window.innerHeight;

  // 2️⃣ قرب الفوتر → يظهر
  if ( windowBottom >= footerTop ) {
    showBtn();
  }

  // 3️⃣ طالع لفوق → يظهر  لو مكانك الحالي أقل من المكان السابق يعني المستخدم بيسحب لفوق
  else if (currentScroll < lastScrollY) {
    showBtn();
  } else if(currentScroll > lastScrollY){
    hideBtn();
  }

  lastScrollY = currentScroll;
});

// عند الضغط
scrollBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

function showBtn() {
  scrollBtn.classList.remove("opacity-0", "invisible");
  scrollBtn.classList.add("opacity-100", "visible");
}

function hideBtn() {
  scrollBtn.classList.add("opacity-0", "invisible");
  scrollBtn.classList.remove("opacity-100", "visible");
}



//*************************SETTINGS SIDEBAR

var settingsBtn = document.getElementById("settings-toggle");
var settingsSidebar = document.getElementById("settings-sidebar");
var closeSettingsBtn = document.getElementById("close-settings");
var body = document.body;

settingsBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  settingsSidebar.classList.remove("translate-x-full");
  body.classList.add("overflow-hidden");
});

closeSettingsBtn.addEventListener("click", closeSidebar);

document.addEventListener("click", function (e) {
  if (
    !settingsSidebar.contains(e.target) &&
    !settingsBtn.contains(e.target)
  ) {
    closeSidebar();
  }
});

function closeSidebar() {
  settingsSidebar.classList.add("translate-x-full");
  body.classList.remove("overflow-hidden");
}


// *****************FONT & COLOR SETTINGS (FULL - WORKING)
var fontButtons = document.getElementsByClassName("font-option");
var colorsGrid = document.getElementById("theme-colors-grid");
var resetBtn = document.getElementById("reset-settings");

var DEFAULT_FONT = "tajawal";

/* ========= ORIGINAL THEME ========= */
var ORIGINAL_THEME = {
  primary: "#7c6cff",
  primaryLight: "#a78bfa",
  primaryDark: "#5b21b6",
  secondary: "#7c6cff",
  secondaryLight: "#a78bfa",
  accent: "#7c6cff",
};

//THEMES
var themes = [
  ORIGINAL_THEME,
  {
    primary: "#2563eb",
    primaryLight: "#60a5fa",
    primaryDark: "#1e40af",
    secondary: "#38bdf8",
    secondaryLight: "#7dd3fc",
    accent: "#0ea5e9",
  },
  {
    primary: "#16a34a",
    primaryLight: "#4ade80",
    primaryDark: "#14532d",
    secondary: "#22c55e",
    secondaryLight: "#86efac",
    accent: "#10b981",
  },
  {
    primary: "#f97316",
    primaryLight: "#fdba74",
    primaryDark: "#c2410c",
    secondary: "#fb923c",
    secondaryLight: "#fed7aa",
    accent: "#f59e0b",
  },
  {
    primary: "#ef4444",
    primaryLight: "#fca5a5",
    primaryDark: "#991b1b",
    secondary: "#f87171",
    secondaryLight: "#fecaca",
    accent: "#fb7185",
  },
];

//CREATE COLOR BUTTONS 
colorsGrid.innerHTML = "";

for (var i = 0; i < themes.length; i++) {
  var btn = document.createElement("button");
  btn.className =
    "theme-color w-12 h-12 rounded-full border-2 border-white shadow transition-transform hover:scale-110";
  btn.style.backgroundColor = themes[i].primary;
  btn.setAttribute("data-index", i);
  colorsGrid.appendChild(btn);
}

//APPLY THEME 
function applyTheme(theme) {
  var root = document.documentElement;
  root.style.setProperty("--color-primary", theme.primary);
  root.style.setProperty("--color-primary-light", theme.primaryLight);
  root.style.setProperty("--color-primary-dark", theme.primaryDark);
  root.style.setProperty("--color-secondary", theme.secondary);
  root.style.setProperty("--color-secondary-light", theme.secondaryLight);
  root.style.setProperty("--color-accent", theme.accent);
}

//SYNC ACTIVE COLOR
function syncActiveTheme(index) {
  var buttons = document.getElementsByClassName("theme-color");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("ring-4", "ring-[var(--color-primary)]");
  }

  buttons[index].classList.add("ring-4", "ring-[var(--color-primary)]");
}

//COLOR CLICK
var colorButtons = document.getElementsByClassName("theme-color");

for (var i = 0; i < colorButtons.length; i++) {
  (function (index) {
    colorButtons[index].addEventListener("click", function () {
      applyTheme(themes[index]);
      syncActiveTheme(index);
      localStorage.setItem("siteTheme", index);
    });
  })(i);
}

//FONT
function applyFont(font) {
  document.body.classList.remove(
    "font-tajawal",
    "font-cairo",
    "font-alexandria"
  );
  document.body.classList.add("font-" + font);

  for (var i = 0; i < fontButtons.length; i++) {
    fontButtons[i].classList.remove("active");
    if (fontButtons[i].dataset.font === font) {
      fontButtons[i].classList.add("active");
    }
  }
}

for (var i = 0; i < fontButtons.length; i++) {
  fontButtons[i].addEventListener("click", function () {
    applyFont(this.dataset.font);
    localStorage.setItem("siteFont", this.dataset.font);
  });
}

//INIT 
var savedFont = localStorage.getItem("siteFont") || DEFAULT_FONT;
var savedThemeIndex = parseInt(localStorage.getItem("siteTheme"), 10);

if (isNaN(savedThemeIndex)) savedThemeIndex = 0;

applyFont(savedFont);
applyTheme(themes[savedThemeIndex]);
syncActiveTheme(savedThemeIndex);

// RESET
resetBtn.addEventListener("click", function () {
  applyFont(DEFAULT_FONT);
  applyTheme(ORIGINAL_THEME);
  syncActiveTheme(0);

  localStorage.removeItem("siteFont");
  localStorage.removeItem("siteTheme");
});


//**********CUSTOM SELECT  Form

var wrappers = document.getElementsByClassName("custom-select-wrapper");

for (var i = 0; i < wrappers.length; i++) {
  (function (wrapper) {
    var select = wrapper.querySelector(".custom-select");
    var options = wrapper.querySelector(".custom-options");
    var text = select.querySelector(".selected-text");
    var icon = select.querySelector("i");

    select.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllSelects(wrapper);

      options.classList.toggle("hidden");
      icon.classList.toggle("rotate-180");
    });

    var optionItems = options.getElementsByClassName("custom-option");
    for (var j = 0; j < optionItems.length; j++) {
      optionItems[j].addEventListener("click", function (e) {
        e.stopPropagation();
        text.textContent = this.dataset.value;
        options.classList.add("hidden");
        icon.classList.remove("rotate-180");
      });
    }
  })(wrappers[i]);
}

function closeAllSelects(current) {
  for (var i = 0; i < wrappers.length; i++) {
    if (wrappers[i] !== current) {
      wrappers[i]
        .querySelector(".custom-options")
        .classList.add("hidden");
      wrappers[i]
        .querySelector(".custom-select i")
        .classList.remove("rotate-180");
    }
  }
}

document.addEventListener("click", function () {
  closeAllSelects();
});


//****************CONTACT FORM VALIDATION (ON SUBMIT)

const contactForm = document.getElementById("contact-form");

const nameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const detailsInput = document.getElementById("project-details");

// error spans
const errName = document.getElementById("err-name");
const errEmail = document.getElementById("err-email");
const errPhone = document.getElementById("err-phone");
const errDetails = document.getElementById("err-details");

function show(el) {
  if (!el) return;
  el.classList.remove("hidden");
}
function hide(el) {
  if (!el) return;
  el.classList.add("hidden");
}

function setInvalid(input, isInvalid) {
  if (!input) return;
  // حدود حمراء عند الخطأ
  if (isInvalid) {
    input.classList.add("border-red-500");
    input.classList.remove("border-slate-300", "dark:border-slate-600");
  } else {
    input.classList.remove("border-red-500");
    input.classList.add("border-slate-300", "dark:border-slate-600");
  }
}

function isValidEmail(email) {
  // Regex بسيط وعملي
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isValidPhone(phone) {
  // يسمح + وأرقام ومسافات و-، ويشترط 8-15 رقم فعلي
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

function validateContactForm() {
  // اخفاء كل الرسائل أولاً
  hide(errName);
  hide(errEmail);
  hide(errEmailFormat);
  hide(errPhone);
  hide(errDetails);

  let ok = true;

  const nameVal = (nameInput.value || "").trim();
  const emailVal = (emailInput.value || "").trim();
  const phoneVal = (phoneInput.value || "").trim();
  const detailsVal = (detailsInput.value || "").trim();

  // الاسم
  if (nameVal.length < 3) {
    show(errName);
    setInvalid(nameInput, true);
    ok = false;
  } else {
    setInvalid(nameInput, false);
  }

  // الإيميل
  if (!emailVal) {
    show(errEmail);
    setInvalid(emailInput, true);
    ok = false;
  } else {
    setInvalid(emailInput, false);
  }

  // الهاتف
  if (!phoneVal || !isValidPhone(phoneVal)) {
    show(errPhone);
    setInvalid(phoneInput, true);
    ok = false;
  } else {
    setInvalid(phoneInput, false);
  }

  // التفاصيل
  if (detailsVal.length < 10) {
    show(errDetails);
    setInvalid(detailsInput, true);
    ok = false;
  } else {
    setInvalid(detailsInput, false);
  }

  return ok;
}

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    const ok = validateContactForm();
    if (!ok) {
      e.preventDefault();

      // يطلع المستخدم لأول خطأ
      const firstInvalid =
        contactForm.querySelector(".border-red-500") ||
        contactForm.querySelector(".error-msg:not(.hidden)");
      if (firstInvalid) {
        firstInvalid.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  });
}


//SUCCESS MODAL (AFTER VALIDATION)

const successModal = document.getElementById("success-modal");
const closeSuccessBtn = document.getElementById("close-success-modal");
const contactForm2 = document.getElementById("contact-form");

if (contactForm2) {
  contactForm2.addEventListener("submit", function (e) {
    e.preventDefault();

    // استخدم نفس الفاليديشن تبعك
    const ok = validateContactForm();
    if (!ok) return;

    // ✅ فتح المودال
    successModal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");

    // تفريغ الفورم
    contactForm2.reset();
  });
}

// زر الإغلاق
if (closeSuccessBtn) {
  closeSuccessBtn.addEventListener("click", function () {
    successModal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  });
}

// إغلاق عند الضغط خارج الصندوق
if (successModal) {
  successModal.addEventListener("click", function (e) {
    if (e.target === successModal) {
      successModal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    }
  });
}

// إغلاق بزر ESC
document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    successModal &&
    !successModal.classList.contains("hidden")
  ) {
    successModal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
});


//**********Carusal

const testimonialsCarousel = document.getElementById('testimonials-carousel');
const testimonialCards = document.getElementsByClassName('testimonial-card');
const nextBtn = document.getElementById('next-testimonial');
const prevBtn = document.getElementById('prev-testimonial');

const cardWidth = testimonialCards[0].offsetWidth;

const maxIndex = testimonialCards.length - 3;

let currentIndex = 0;

function updateCarousel() {
  testimonialsCarousel.style.transform = `translateX(${currentIndex * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < maxIndex) {
    currentIndex++;
  } else {
    currentIndex = 0; 
  }
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = maxIndex;  
  }
  updateCarousel();
});

const indicators = document.querySelectorAll('.carousel-indicator');

  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.classList.add('bg-accent', 'scale-125');
      indicator.classList.remove('bg-slate-400');
    
    } else {
      indicator.classList.remove('bg-accent', 'scale-125');
      indicator.classList.add('bg-slate-400');
    
    }
  });

indicators.forEach(indicator => {
  indicator.addEventListener('click', () => {
    currentIndex = Number(indicator.dataset.index);
    updateCarousel();
  });});