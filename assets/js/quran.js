/**
 * مصحف الصدقة الجارية - المصحف الشريف الحقيقي (طبعة مجمع الملك فهد بالمدينة المنورة)
 * صفحات مصحف المدينة المنورة الحقيقية برواية حفص عن عاصم (604 صفحات بدقة فيكتور فائقة)
 */

// خريطة سور القرآن الكريم والصفحة الأولى لكل سورة
const SURAHS_INDEX = [
    { id: 1, name: "الفاتحة", page: 1, ayahs: 7, type: "مكية" },
    { id: 2, name: "البقرة", page: 2, ayahs: 286, type: "مدنية" },
    { id: 3, name: "آل عمران", page: 50, ayahs: 200, type: "مدنية" },
    { id: 4, name: "النساء", page: 77, ayahs: 176, type: "مدنية" },
    { id: 5, name: "المائدة", page: 106, ayahs: 120, type: "مدنية" },
    { id: 6, name: "الأنعام", page: 128, ayahs: 165, type: "مكية" },
    { id: 7, name: "الأعراف", page: 151, ayahs: 206, type: "مكية" },
    { id: 8, name: "الأنفال", page: 177, ayahs: 75, type: "مدنية" },
    { id: 9, name: "التوبة", page: 187, ayahs: 129, type: "مدنية" },
    { id: 10, name: "يونس", page: 208, ayahs: 109, type: "مكية" },
    { id: 11, name: "هود", page: 221, ayahs: 123, type: "مكية" },
    { id: 12, name: "يوسف", page: 235, ayahs: 111, type: "مكية" },
    { id: 13, name: "الرعد", page: 249, ayahs: 43, type: "مدنية" },
    { id: 14, name: "إبراهيم", page: 255, ayahs: 52, type: "مكية" },
    { id: 15, name: "الحجر", page: 262, ayahs: 99, type: "مكية" },
    { id: 16, name: "النحل", page: 267, ayahs: 128, type: "مكية" },
    { id: 17, name: "الإسراء", page: 282, ayahs: 111, type: "مكية" },
    { id: 18, name: "الكهف", page: 293, ayahs: 110, type: "مكية" },
    { id: 19, name: "مريم", page: 305, ayahs: 98, type: "مكية" },
    { id: 20, name: "طه", page: 312, ayahs: 135, type: "مكية" },
    { id: 21, name: "الأنبياء", page: 322, ayahs: 112, type: "مكية" },
    { id: 22, name: "الحج", page: 332, ayahs: 78, type: "مدنية" },
    { id: 23, name: "المؤمنون", page: 342, ayahs: 118, type: "مكية" },
    { id: 24, name: "النور", page: 350, ayahs: 64, type: "مدنية" },
    { id: 25, name: "الفرقان", page: 359, ayahs: 77, type: "مكية" },
    { id: 26, name: "الشعراء", page: 367, ayahs: 227, type: "مكية" },
    { id: 27, name: "النمل", page: 377, ayahs: 93, type: "مكية" },
    { id: 28, name: "القصص", page: 385, ayahs: 88, type: "مكية" },
    { id: 29, name: "العنكبوت", page: 396, ayahs: 69, type: "مكية" },
    { id: 30, name: "الروم", page: 404, ayahs: 60, type: "مكية" },
    { id: 31, name: "لقمان", page: 411, ayahs: 34, type: "مكية" },
    { id: 32, name: "السجدة", page: 415, ayahs: 30, type: "مكية" },
    { id: 33, name: "الأحزاب", page: 418, ayahs: 73, type: "مدنية" },
    { id: 34, name: "سبأ", page: 428, ayahs: 54, type: "مكية" },
    { id: 35, name: "فاطر", page: 434, ayahs: 45, type: "مكية" },
    { id: 36, name: "يس", page: 440, ayahs: 83, type: "مكية" },
    { id: 37, name: "الصافات", page: 446, ayahs: 182, type: "مكية" },
    { id: 38, name: "ص", page: 453, ayahs: 88, type: "مكية" },
    { id: 39, name: "الزمر", page: 458, ayahs: 75, type: "مكية" },
    { id: 40, name: "غافر", page: 467, ayahs: 85, type: "مكية" },
    { id: 41, name: "فصلت", page: 477, ayahs: 54, type: "مكية" },
    { id: 42, name: "الشورى", page: 483, ayahs: 53, type: "مكية" },
    { id: 43, name: "الزخرف", page: 489, ayahs: 89, type: "مكية" },
    { id: 44, name: "الدخان", page: 496, ayahs: 59, type: "مكية" },
    { id: 45, name: "الجاثية", page: 499, ayahs: 37, type: "مكية" },
    { id: 46, name: "الأحقاف", page: 502, ayahs: 35, type: "مكية" },
    { id: 47, name: "محمد", page: 507, ayahs: 38, type: "مدنية" },
    { id: 48, name: "الفتح", page: 511, ayahs: 29, type: "مدنية" },
    { id: 49, name: "الحجرات", page: 515, ayahs: 18, type: "مدنية" },
    { id: 50, name: "ق", page: 518, ayahs: 45, type: "مكية" },
    { id: 51, name: "الذاريات", page: 520, ayahs: 60, type: "مكية" },
    { id: 52, name: "الطور", page: 523, ayahs: 49, type: "مكية" },
    { id: 53, name: "النجم", page: 526, ayahs: 62, type: "مكية" },
    { id: 54, name: "القمر", page: 528, ayahs: 55, type: "مكية" },
    { id: 55, name: "الرحمن", page: 531, ayahs: 78, type: "مدنية" },
    { id: 56, name: "الواقعة", page: 534, ayahs: 96, type: "مكية" },
    { id: 57, name: "الحديد", page: 537, ayahs: 29, type: "مدنية" },
    { id: 58, name: "المجادلة", page: 542, ayahs: 22, type: "مدنية" },
    { id: 59, name: "الحشر", page: 545, ayahs: 24, type: "مدنية" },
    { id: 60, name: "الممتحنة", page: 549, ayahs: 13, type: "مدنية" },
    { id: 61, name: "الصف", page: 551, ayahs: 14, type: "مدنية" },
    { id: 62, name: "الجمعة", page: 553, ayahs: 11, type: "مدنية" },
    { id: 63, name: "المنافقون", page: 554, ayahs: 11, type: "مدنية" },
    { id: 64, name: "التغابن", page: 556, ayahs: 18, type: "مدنية" },
    { id: 65, name: "الطلاق", page: 558, ayahs: 12, type: "مدنية" },
    { id: 66, name: "التحريم", page: 560, ayahs: 12, type: "مدنية" },
    { id: 67, name: "الملك", page: 562, ayahs: 30, type: "مكية" },
    { id: 68, name: "القلم", page: 564, ayahs: 52, type: "مكية" },
    { id: 69, name: "الحاقة", page: 566, ayahs: 52, type: "مكية" },
    { id: 70, name: "المعارج", page: 568, ayahs: 44, type: "مكية" },
    { id: 71, name: "نوح", page: 570, ayahs: 28, type: "مكية" },
    { id: 72, name: "الجن", page: 572, ayahs: 28, type: "مكية" },
    { id: 73, name: "المزمل", page: 574, ayahs: 20, type: "مكية" },
    { id: 74, name: "المدثر", page: 575, ayahs: 56, type: "مكية" },
    { id: 75, name: "القيامة", page: 577, ayahs: 40, type: "مكية" },
    { id: 76, name: "الإنسان", page: 578, ayahs: 31, type: "مدنية" },
    { id: 77, name: "المرسلات", page: 580, ayahs: 50, type: "مكية" },
    { id: 78, name: "النبأ", page: 582, ayahs: 40, type: "مكية" },
    { id: 79, name: "النازعات", page: 583, ayahs: 46, type: "مكية" },
    { id: 80, name: "عبس", page: 585, ayahs: 42, type: "مكية" },
    { id: 81, name: "التكوير", page: 586, ayahs: 29, type: "مكية" },
    { id: 82, name: "الانفطار", page: 587, ayahs: 19, type: "مكية" },
    { id: 83, name: "المطففين", page: 587, ayahs: 36, type: "مكية" },
    { id: 84, name: "الانشقاق", page: 589, ayahs: 25, type: "مكية" },
    { id: 85, name: "البروج", page: 590, ayahs: 22, type: "مكية" },
    { id: 86, name: "الطارق", page: 591, ayahs: 17, type: "مكية" },
    { id: 87, name: "الأعلى", page: 591, ayahs: 19, type: "مكية" },
    { id: 88, name: "الغاشية", page: 592, ayahs: 26, type: "مكية" },
    { id: 89, name: "الفجر", page: 593, ayahs: 30, type: "مكية" },
    { id: 90, name: "البلد", page: 594, ayahs: 20, type: "مكية" },
    { id: 91, name: "الشمس", page: 595, ayahs: 15, type: "مكية" },
    { id: 92, name: "الليل", page: 595, ayahs: 21, type: "مكية" },
    { id: 93, name: "الضحى", page: 596, ayahs: 11, type: "مكية" },
    { id: 94, name: "الشرح", page: 596, ayahs: 8, type: "مكية" },
    { id: 95, name: "التين", page: 597, ayahs: 8, type: "مكية" },
    { id: 96, name: "العلق", page: 597, ayahs: 19, type: "مكية" },
    { id: 97, name: "القدر", page: 598, ayahs: 5, type: "مكية" },
    { id: 98, name: "البينة", page: 598, ayahs: 8, type: "مدنية" },
    { id: 99, name: "الزلزلة", page: 599, ayahs: 8, type: "مدنية" },
    { id: 100, name: "العاديات", page: 599, ayahs: 11, type: "مكية" },
    { id: 101, name: "القارعة", page: 600, ayahs: 11, type: "مكية" },
    { id: 102, name: "التكاثر", page: 600, ayahs: 8, type: "مكية" },
    { id: 103, name: "العصر", page: 601, ayahs: 3, type: "مكية" },
    { id: 104, name: "الهمزة", page: 601, ayahs: 9, type: "مكية" },
    { id: 105, name: "الفيل", page: 601, ayahs: 5, type: "مكية" },
    { id: 106, name: "قريش", page: 602, ayahs: 4, type: "مكية" },
    { id: 107, name: "الماعون", page: 602, ayahs: 7, type: "مكية" },
    { id: 108, name: "الكوثر", page: 602, ayahs: 3, type: "مكية" },
    { id: 109, name: "الكافرون", page: 603, ayahs: 6, type: "مكية" },
    { id: 110, name: "النصر", page: 603, ayahs: 3, type: "مدنية" },
    { id: 111, name: "المسد", page: 603, ayahs: 5, type: "مكية" },
    { id: 112, name: "الإخلاص", page: 604, ayahs: 4, type: "مكية" },
    { id: 113, name: "الفلق", page: 604, ayahs: 5, type: "مكية" },
    { id: 114, name: "الناس", page: 604, ayahs: 6, type: "مكية" }
];

// السور الفاضلة السريعة
const MUSHAF_QUICK_JUMPS = [
    { name: "سورة الملك", page: 562, surahId: 67 },
    { name: "سورة يس", page: 440, surahId: 36 },
    { name: "سورة الفاتحة", page: 1, surahId: 1 },
    { name: "سورة الواقعة", page: 534, surahId: 56 },
    { name: "سورة الرحمن", page: 531, surahId: 55 },
    { name: "سورة الكهف", page: 293, surahId: 18 },
    { name: "الإخلاص والمعوذات", page: 604, surahId: 112 }
];

// المتغيرات العامة
let currentPageNumber = 562; // البداية الافتراضية مع سورة الملك
const TOTAL_MUSHAF_PAGES = 604;
let mushafAudio = new Audio();
let isAudioPlaying = false;

document.addEventListener("DOMContentLoaded", () => {
    initRealMushaf();
});

function initRealMushaf() {
    renderQuickJumpButtons();
    populateSurahsDropdown();
    setupMushafNavigation();
    initReadingTrackerButton();
    initTafsirModal();
    initMushafComfortTools();
    initQuranSearchEngine();
    restoreMushafPreferences();
    
    // تحميل الصفحة الافتراضية الأولى
    goToMushafPage(currentPageNumber);
}

function renderQuickJumpButtons() {
    const container = document.getElementById("featured-surahs-pills");
    if (!container) return;

    container.innerHTML = "";
    MUSHAF_QUICK_JUMPS.forEach((item) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "surah-pill";
        btn.setAttribute("data-page", item.page);
        btn.innerHTML = `<i class="fa-solid fa-book-quran"></i> <span>${item.name}</span>`;
        btn.onclick = () => {
            goToMushafPage(item.page, item.surahId);
        };
        container.appendChild(btn);
    });
}

function populateSurahsDropdown() {
    const select = document.getElementById("select-all-surahs");
    if (!select) return;

    select.innerHTML = '<option value="">📖 تصفح فهرس المصحف الشريف (114 سورة - 604 صفحات)...</option>';
    SURAHS_INDEX.forEach((surah) => {
        const option = document.createElement("option");
        option.value = surah.page;
        option.setAttribute("data-surah-id", surah.id);
        option.textContent = `${surah.id}. سورة ${surah.name} (صفحة ${surah.page}) - ${surah.type} (${surah.ayahs} آية)`;
        select.appendChild(option);
    });

    select.addEventListener("change", (e) => {
        const page = parseInt(e.target.value, 10);
        if (page) {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const surahId = selectedOption ? parseInt(selectedOption.getAttribute("data-surah-id"), 10) : null;
            goToMushafPage(page, surahId);
        }
    });
}

function setupMushafNavigation() {
    // أزرار التنقل بين الصفحات
    const btnNext = document.getElementById("btn-mushaf-next");
    const btnPrev = document.getElementById("btn-mushaf-prev");
    const pageInput = document.getElementById("mushaf-page-input");
    const btnAudio = document.getElementById("btn-surah-audio");
    const btnGift = document.getElementById("btn-gift-quran-reward");

    // في المصحف العربي: التالي يتقدم بالصفحة (أو لليسار في اتجاه القراءة)
    if (btnNext) {
        btnNext.addEventListener("click", () => {
            if (currentPageNumber < TOTAL_MUSHAF_PAGES) {
                goToMushafPage(currentPageNumber + 1);
            } else {
                showToast("أنت الآن في الصفحة الأخيرة من المصحف الشريف 🌿");
            }
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            if (currentPageNumber > 1) {
                goToMushafPage(currentPageNumber - 1);
            } else {
                showToast("أنت الآن في أول صفحة من المصحف الشريف (سورة الفاتحة) 🌿");
            }
        });
    }

    // إدخال رقم الصفحة يدوياً
    if (pageInput) {
        pageInput.addEventListener("change", (e) => {
            let val = parseInt(e.target.value, 10);
            if (isNaN(val) || val < 1) val = 1;
            if (val > TOTAL_MUSHAF_PAGES) val = TOTAL_MUSHAF_PAGES;
            goToMushafPage(val);
        });
    }

    // تشغيل تلاوة السورة
    if (btnAudio) {
        btnAudio.addEventListener("click", toggleAudioRecitation);
    }

    // زر إهداء الثواب لروح الجد
    if (btnGift) {
        btnGift.addEventListener("click", handleGiftReward);
    }

    // دعم مفاتيح الأسهم للتنقل السريع
    document.addEventListener("keydown", (e) => {
        // إذا كان المستخدم لا يكتب في حقل نصي
        if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
            if (e.key === "ArrowLeft") {
                if (currentPageNumber < TOTAL_MUSHAF_PAGES) goToMushafPage(currentPageNumber + 1);
            } else if (e.key === "ArrowRight") {
                if (currentPageNumber > 1) goToMushafPage(currentPageNumber - 1);
            }
        }
    });
}

// الانتقال لصفحة المصحف المحددة
function goToMushafPage(pageNumber, surahId = null) {
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > TOTAL_MUSHAF_PAGES) pageNumber = TOTAL_MUSHAF_PAGES;

    currentPageNumber = pageNumber;

    // معرفة السورة الحالية المتواجدة في هذه الصفحة
    const currentSurah = findSurahForPage(pageNumber);
    const targetSurahId = surahId || (currentSurah ? currentSurah.id : 67);

    // تحديث رابط الصورة الرسمية لصفحة المصحف (Vector SVG عالي الدقة)
    const pagePadded = String(pageNumber).padStart(3, "0");
    const pageUrl = `https://cdn.quran.ws/svg/pages/v1.1.1/hafs-kfqc/${pagePadded}.svg`;

    // تحديث العناصر في الواجهة
    const imgEl = document.getElementById("mushaf-real-page-img");
    const loaderEl = document.getElementById("mushaf-page-loader");
    const inputEl = document.getElementById("mushaf-page-input");
    const titleEl = document.getElementById("quran-surah-title");
    const countEl = document.getElementById("quran-verses-count");
    const selectEl = document.getElementById("select-all-surahs");

    if (inputEl) inputEl.value = pageNumber;

    if (titleEl && currentSurah) {
        titleEl.textContent = `سُورَةُ ${currentSurah.name}`;
    }

    if (countEl && currentSurah) {
        // حساب رقم الجزء تقريبياً
        const juzNumber = Math.ceil(pageNumber / 20.13);
        countEl.textContent = `الجزء ${juzNumber} • صفحة ${pageNumber} من ${TOTAL_MUSHAF_PAGES}`;
    }

    // تحديث شريط متابع القراءة والختمة
    updateReadingTrackerUI(pageNumber, currentSurah);
    localStorage.setItem("mushaf_last_page", String(pageNumber));

    // تسجيل تقدم القراءة في حديقة الحسنات
    const todayKey = `quran_pages_read_${new Date().toISOString().slice(0, 10)}`;
    const visitedKey = `quran_p_${pageNumber}_${new Date().toISOString().slice(0, 10)}`;
    if (!sessionStorage.getItem(visitedKey)) {
        sessionStorage.setItem(visitedKey, "1");
        const currentCount = parseInt(localStorage.getItem(todayKey) || "0", 10) + 1;
        localStorage.setItem(todayKey, String(currentCount));
        const todayPagesEl = document.getElementById("tracker-today-pages-count");
        if (todayPagesEl) todayPagesEl.textContent = currentCount;
        if (typeof window.addSpiritualGardenDeed === "function") {
            window.addSpiritualGardenDeed("quran", 5);
        }
    }

    // إظهار اللودر ريثما تنتهي الصورة من التحميل
    if (loaderEl) loaderEl.style.display = "flex";
    if (imgEl) {
        imgEl.style.opacity = "0.2";
        imgEl.src = pageUrl;
        imgEl.onload = () => {
            imgEl.style.opacity = "1";
            if (loaderEl) loaderEl.style.display = "none";
        };
        imgEl.onerror = () => {
            if (loaderEl) loaderEl.style.display = "none";
            imgEl.style.opacity = "1";
        };
    }

    // ضبط رابط التلاوة الصوتية
    const paddedSurah = String(targetSurahId).padStart(3, "0");
    mushafAudio.src = `https://server8.mp3quran.net/afs/${paddedSurah}.mp3`;
    if (isAudioPlaying) {
        mushafAudio.play();
    }

    // تحديث زر السورة في الشريط
    document.querySelectorAll(".surah-pill").forEach(btn => {
        const p = parseInt(btn.getAttribute("data-page"), 10);
        if (p === pageNumber) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // تحديث القائمة المنسدلة
    if (selectEl && currentSurah) {
        selectEl.value = currentSurah.page;
    }
}

// استخراج السورة بناءً على رقم الصفحة
function findSurahForPage(pageNumber) {
    for (let i = SURAHS_INDEX.length - 1; i >= 0; i--) {
        if (pageNumber >= SURAHS_INDEX[i].page) {
            return SURAHS_INDEX[i];
        }
    }
    return SURAHS_INDEX[0];
}

// التحكم في الصوت
function toggleAudioRecitation() {
    const btn = document.getElementById("btn-surah-audio");
    if (!btn) return;

    if (isAudioPlaying) {
        mushafAudio.pause();
        isAudioPlaying = false;
        btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>استماع للتلاوة</span>';
        btn.classList.remove("active");
    } else {
        mushafAudio.play().then(() => {
            isAudioPlaying = true;
            btn.innerHTML = '<i class="fa-solid fa-pause"></i> <span>إيقاف التلاوة</span>';
            btn.classList.add("active");
        }).catch(() => {
            showToast("يرجى النقر أولاً في الصفحة لتفعيل الصوت");
        });
    }
}

// إهداء ثواب القراءة لروح الجد
function handleGiftReward() {
    playCompletionChime();
    const deceasedName = (typeof DECEASED_INFO !== "undefined" && DECEASED_INFO.name) ? DECEASED_INFO.name : "فقيدنا الغالي";

    showToast(`تقبل الله تلاوتكم، وجعل ثوابها نوراً وأُنساً وبركة في قبر ${deceasedName} 🌿🤲`);

    const btn = document.getElementById("btn-gift-quran-reward");
    if (btn) {
        btn.classList.add("gifted");
        btn.innerHTML = '<i class="fa-solid fa-check-double"></i> <span>تم إهداء الثواب بحمد الله</span>';
        setTimeout(() => {
            btn.classList.remove("gifted");
            btn.innerHTML = '<i class="fa-solid fa-gift"></i> <span>أهديت ثواب هذه القراءة لروحه</span>';
        }, 5000);
    }
}

// إتاحة التنقل لصفحة المصحف من خارج الملف (لقسم الختمة القرآنية)
window.goToQuranPage = function(pageNumber) {
    if (typeof goToMushafPage === "function") {
        goToMushafPage(pageNumber);
    }
};

/* ==========================================================================
   نافذة التفسير الميسر لصفحة المصحف الشريف
   ========================================================================== */
let currentTafsirFontSize = 1.1;

function initTafsirModal() {
    const modal = document.getElementById("tafsir-modal");
    const btnOpen = document.getElementById("btn-page-tafsir");
    const btnClose = document.getElementById("btn-close-tafsir-modal");
    const btnZoomIn = document.getElementById("btn-zoom-in");
    const btnZoomOut = document.getElementById("btn-zoom-out");
    const contentBox = document.getElementById("tafsir-content-box");

    if (btnOpen) {
        btnOpen.addEventListener("click", () => {
            openTafsirModal();
        });
    }

    if (btnClose && modal) {
        btnClose.addEventListener("click", () => modal.classList.remove("open"));
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("open");
        });
    }

    if (btnZoomIn && contentBox) {
        btnZoomIn.addEventListener("click", () => {
            if (currentTafsirFontSize < 1.6) {
                currentTafsirFontSize += 0.1;
                contentBox.style.fontSize = `${currentTafsirFontSize}rem`;
            }
        });
    }

    if (btnZoomOut && contentBox) {
        btnZoomOut.addEventListener("click", () => {
            if (currentTafsirFontSize > 0.85) {
                currentTafsirFontSize -= 0.1;
                contentBox.style.fontSize = `${currentTafsirFontSize}rem`;
            }
        });
    }
}

function openTafsirModal() {
    const modal = document.getElementById("tafsir-modal");
    const titleEl = document.getElementById("tafsir-modal-title");
    const pageBadge = document.getElementById("tafsir-page-badge");
    const contentBox = document.getElementById("tafsir-content-box");

    if (!modal || !contentBox) return;

    modal.classList.add("open");
    if (pageBadge) pageBadge.textContent = `صفحة ${currentPageNumber}`;
    if (titleEl) {
        const surahInfo = findSurahForPage(currentPageNumber);
        titleEl.textContent = `التفسير الميسر - ${surahInfo ? 'سورة ' + surahInfo.name : ''}`;
    }

    loadTafsirForPage(currentPageNumber);
}

function loadTafsirForPage(pageNum) {
    const contentBox = document.getElementById("tafsir-content-box");
    if (!contentBox) return;

    const cacheKey = `tafsir_cache_p${pageNum}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        try {
            const data = JSON.parse(cached);
            renderTafsirData(data);
            return;
        } catch(e) {}
    }

    contentBox.innerHTML = `
        <div class="tafsir-loader">
            <i class="fa-solid fa-spinner fa-spin fa-2x"></i>
            <span>جاري جلب التفسير الميسر لصفحة ${pageNum}...</span>
        </div>
    `;

    fetch(`https://api.alquran.cloud/v1/page/${pageNum}/ar.muyassar`)
        .then(res => res.json())
        .then(result => {
            if (result && result.code === 200 && result.data && result.data.ayahs) {
                localStorage.setItem(cacheKey, JSON.stringify(result.data.ayahs));
                renderTafsirData(result.data.ayahs);
            } else {
                contentBox.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: var(--gold-300);">
                        <i class="fa-solid fa-triangle-exclamation fa-2x"></i>
                        <p style="margin-top: 1rem;">تعذر جلب التفسير حالياً، يرجى التأكد من اتصال الإنترنت والمحاولة مرة أخرى.</p>
                    </div>
                `;
            }
        })
        .catch(() => {
            contentBox.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--gold-300);">
                    <i class="fa-solid fa-triangle-exclamation fa-2x"></i>
                    <p style="margin-top: 1rem;">تعذر جلب التفسير حالياً، يرجى المحاولة لاحقاً.</p>
                </div>
            `;
        });
}

function renderTafsirData(ayahs) {
    const contentBox = document.getElementById("tafsir-content-box");
    if (!contentBox) return;

    if (!ayahs || ayahs.length === 0) {
        contentBox.innerHTML = "<p>لا يوجد تفسير متاح لهذه الصفحة.</p>";
        return;
    }

    contentBox.innerHTML = "";
    ayahs.forEach(item => {
        const div = document.createElement("div");
        div.className = "tafsir-ayah-item";
        div.innerHTML = `
            <div class="tafsir-ayah-header">
                <span class="ayah-badge">الآية ${item.numberInSurah}</span>
                <span class="ayah-quran-text">${item.surah ? 'سورة ' + item.surah.name : ''}</span>
            </div>
            <div class="ayah-tafsir-text">${item.text}</div>
        `;
        contentBox.appendChild(div);
    });
}

/* ==========================================================================
   أدوات راحة القراءة وتخصيص المصحف (Reading Comfort, Zoom, Sepia & Bookmark)
   ========================================================================== */
let mushafZoomLevel = 1.0;

function initMushafComfortTools() {
    const btnZoomIn = document.getElementById("btn-mushaf-zoom-in");
    const btnZoomOut = document.getElementById("btn-mushaf-zoom-out");
    const btnTheme = document.getElementById("btn-mushaf-theme");
    const btnBookmark = document.getElementById("btn-mushaf-bookmark");
    const btnGotoBookmark = document.getElementById("btn-mushaf-goto-bookmark");
    const mushafCard = document.querySelector(".real-mushaf-card");
    const pageImg = document.getElementById("mushaf-real-page-img");

    // 1. تكبير صفحة المصحف
    if (btnZoomIn) {
        btnZoomIn.addEventListener("click", () => {
            if (mushafZoomLevel < 1.6) {
                mushafZoomLevel = Math.min(1.6, +(mushafZoomLevel + 0.15).toFixed(2));
                applyMushafZoom();
                if (typeof showToast === "function") {
                    showToast(`تم تكبير صفحة المصحف (${Math.round(mushafZoomLevel * 100)}%) 🔍`);
                }
            }
        });
    }

    // 2. تصغير صفحة المصحف
    if (btnZoomOut) {
        btnZoomOut.addEventListener("click", () => {
            if (mushafZoomLevel > 0.8) {
                mushafZoomLevel = Math.max(0.8, +(mushafZoomLevel - 0.15).toFixed(2));
                applyMushafZoom();
                if (typeof showToast === "function") {
                    showToast(`تم تصغير صفحة المصحف (${Math.round(mushafZoomLevel * 100)}%) 🔍`);
                }
            }
        });
    }

    // 3. نمط القراءة الورقي الدافئ (Sepia Theme)
    if (btnTheme && mushafCard) {
        btnTheme.addEventListener("click", () => {
            const isSepia = mushafCard.classList.toggle("theme-sepia");
            localStorage.setItem("mushaf_theme_sepia", isSepia ? "1" : "0");
            btnTheme.classList.toggle("active", isSepia);
            
            const label = btnTheme.querySelector("span");
            if (label) {
                label.textContent = isSepia ? "الوضع الليلي" : "الوضع المريح";
            }
            
            if (typeof showToast === "function") {
                showToast(isSepia ? "تم تفعيل وضع القراءة الورقي المريح للعين 📜" : "تم الرجوع للوضع الليلي الملكي 🌙");
            }
        });
    }

    // 4. حفظ علامة القراءة (Bookmark)
    if (btnBookmark) {
        btnBookmark.addEventListener("click", () => {
            localStorage.setItem("mushaf_saved_bookmark", String(currentPageNumber));
            updateBookmarkButtonUI(currentPageNumber);
            if (typeof playCompletionChime === "function") playCompletionChime();
            if (typeof showToast === "function") {
                showToast(`تم حفظ صفحة ${currentPageNumber} في علامتك المرجعية بنجاح 🔖`);
            }
        });
    }

    // 5. الانتقال إلى العلامة المحفوظة
    if (btnGotoBookmark) {
        btnGotoBookmark.addEventListener("click", () => {
            const saved = localStorage.getItem("mushaf_saved_bookmark");
            if (saved) {
                const page = parseInt(saved, 10);
                if (!isNaN(page) && page >= 1 && page <= TOTAL_MUSHAF_PAGES) {
                    goToMushafPage(page);
                    if (typeof showToast === "function") {
                        showToast(`تم الانتقال إلى علامتك المحفوظة (صفحة ${page}) 📖`);
                    }
                }
            }
        });
    }
}

function applyMushafZoom() {
    const pageImg = document.getElementById("mushaf-real-page-img");
    if (pageImg) {
        pageImg.style.transform = `scale(${mushafZoomLevel})`;
        pageImg.style.transformOrigin = "top center";
        pageImg.style.transition = "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)";
    }
}

function restoreMushafPreferences() {
    // استعادة وضع Sepia المحفوظ
    const savedSepia = localStorage.getItem("mushaf_theme_sepia");
    const mushafCard = document.querySelector(".real-mushaf-card");
    const btnTheme = document.getElementById("btn-mushaf-theme");
    if (savedSepia === "1" && mushafCard) {
        mushafCard.classList.add("theme-sepia");
        if (btnTheme) {
            btnTheme.classList.add("active");
            const label = btnTheme.querySelector("span");
            if (label) label.textContent = "الوضع الليلي";
        }
    }

    // استعادة العلامة المحفوظة
    const savedBookmark = localStorage.getItem("mushaf_saved_bookmark");
    if (savedBookmark) {
        const page = parseInt(savedBookmark, 10);
        if (!isNaN(page)) {
            updateBookmarkButtonUI(page);
        }
    }
}

function updateBookmarkButtonUI(pageNumber) {
    const btnGotoBookmark = document.getElementById("btn-mushaf-goto-bookmark");
    const labelText = document.getElementById("bookmark-label-text");
    if (btnGotoBookmark) {
        btnGotoBookmark.style.display = "inline-flex";
        if (labelText) {
            labelText.textContent = `العلامة (ص ${pageNumber})`;
        }
    }
}

function updateReadingTrackerUI(pageNumber, currentSurah) {
    const trackerText = document.getElementById("tracker-bookmark-text");
    const khatmaPercent = document.getElementById("tracker-khatma-percent");
    const currentPageEl = document.getElementById("tracker-current-page-num");
    const progressFill = document.getElementById("tracker-progress-fill");
    const todayPagesEl = document.getElementById("tracker-today-pages-count");

    const pct = Math.min(100, Math.max(1, Math.round((pageNumber / TOTAL_MUSHAF_PAGES) * 100)));
    
    if (khatmaPercent) khatmaPercent.textContent = `${pct}%`;
    if (currentPageEl) currentPageEl.textContent = pageNumber;
    if (progressFill) progressFill.style.width = `${pct}%`;

    // استعادة العلامة المرجعية أو آخر صفحة
    const savedBookmark = localStorage.getItem("mushaf_saved_bookmark");
    if (trackerText) {
        if (savedBookmark) {
            const bPage = parseInt(savedBookmark, 10);
            const bSurah = findSurahForPage(bPage);
            trackerText.textContent = `سورة ${bSurah ? bSurah.name : ''} • صفحة ${bPage}`;
        } else if (currentSurah) {
            trackerText.textContent = `سورة ${currentSurah.name} • صفحة ${pageNumber}`;
        }
    }

    // تتبع عدد صفحات اليوم
    const todayKey = `quran_pages_read_${new Date().toISOString().slice(0, 10)}`;
    const todayCount = parseInt(localStorage.getItem(todayKey) || "0", 10);
    if (todayPagesEl) todayPagesEl.textContent = todayCount;
}

function initReadingTrackerButton() {
    const btnResume = document.getElementById("btn-tracker-resume-reading");
    if (btnResume) {
        btnResume.addEventListener("click", () => {
            const savedBookmark = localStorage.getItem("mushaf_saved_bookmark") || localStorage.getItem("mushaf_last_page");
            const page = savedBookmark ? parseInt(savedBookmark, 10) : 562;
            goToMushafPage(page);
            const mushafCard = document.querySelector(".real-mushaf-card");
            if (mushafCard) {
                mushafCard.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            if (typeof showToast === "function") {
                showToast(`تم الانتقال لعلامتك المرجعية (صفحة ${page}) 📖✨`);
            }
        });
    }
}

/* ==========================================================================
   محرك البحث الفوري في القرآن الكريم (Quran Search Engine)
   ========================================================================== */
function initQuranSearchEngine() {
    const modal = document.getElementById("quran-search-modal");
    const btnOpen = document.getElementById("btn-open-quran-search");
    const btnClose = document.getElementById("btn-close-quran-search-modal");
    const input = document.getElementById("quran-search-input");
    const btnSubmit = document.getElementById("btn-submit-quran-search");

    if (btnOpen && modal) {
        btnOpen.addEventListener("click", () => {
            modal.classList.add("open");
            setTimeout(() => {
                if (input) input.focus();
            }, 100);
        });
    }

    if (btnClose && modal) {
        btnClose.addEventListener("click", () => {
            modal.classList.remove("open");
        });
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("open");
        });
    }

    if (btnSubmit) {
        btnSubmit.addEventListener("click", () => {
            if (input) handleQuranSearch(input.value.trim());
        });
    }

    if (input) {
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleQuranSearch(input.value.trim());
            }
        });
    }
}

// تنظيف وتوحيد الحروف العربية للبحث الدقيق
function normalizeArabicText(str) {
    if (!str) return "";
    return str
        .replace(/[\u064B-\u065F\u0670]/g, "") // إزالة حركات التشكيل والتنوين
        .replace(/[إأآا]/g, "ا")
        .replace(/ى/g, "ي")
        .replace(/ؤ/g, "و")
        .replace(/ئ/g, "ي")
        .replace(/ة/g, "ه")
        .replace(/[ـ]/g, "") // إزالة التطويل (الكشيدة)
        .trim();
}

function handleQuranSearch(query) {
    const resultsContainer = document.getElementById("quran-search-results");
    const statusEl = document.getElementById("quran-search-status");

    if (!query || query.length < 2) {
        if (statusEl) statusEl.innerHTML = '<span style="color: var(--gold-400);">يرجى كتابة كلمة من حرفين أو أكثر للبحث في القرآن الكريم 🔍</span>';
        return;
    }

    if (statusEl) {
        statusEl.innerHTML = `<span>جاري البحث عن "<strong>${escapeHtml(query)}</strong>" في المصحف الشريف... <i class="fa-solid fa-spinner fa-spin"></i></span>`;
    }

    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div style="text-align: center; padding: 2.5rem; color: var(--gold-300);">
                <i class="fa-solid fa-spinner fa-spin fa-2x"></i>
                <p style="margin-top: 0.8rem; font-size: 0.95rem;">جاري البحث في آيات الذكر الحكيم...</p>
            </div>
        `;
    }

    const cleanQuery = normalizeArabicText(query);
    const cacheKey = `q_search_${cleanQuery}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
        try {
            const data = JSON.parse(cached);
            renderQuranSearchResults(data, query);
            return;
        } catch(e) {}
    }

    // استعلام محرك البحث عبر واجهة AlQuran Cloud
    fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(cleanQuery)}/all/ar.muyassar`)
        .then(res => res.json())
        .then(res => {
            if (res && res.code === 200 && res.data && res.data.matches && res.data.matches.length > 0) {
                sessionStorage.setItem(cacheKey, JSON.stringify(res.data));
                renderQuranSearchResults(res.data, query);
            } else {
                // محاولة بحث احتياطية بنص بسيط
                fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/all/quran-simple-clean`)
                    .then(r => r.json())
                    .then(fallbackRes => {
                        if (fallbackRes && fallbackRes.code === 200 && fallbackRes.data && fallbackRes.data.matches && fallbackRes.data.matches.length > 0) {
                            sessionStorage.setItem(cacheKey, JSON.stringify(fallbackRes.data));
                            renderQuranSearchResults(fallbackRes.data, query);
                        } else {
                            renderEmptySearchResults(query);
                        }
                    })
                    .catch(() => renderEmptySearchResults(query));
            }
        })
        .catch(() => {
            renderEmptySearchResults(query);
        });
}

function renderQuranSearchResults(data, rawQuery) {
    const resultsContainer = document.getElementById("quran-search-results");
    const statusEl = document.getElementById("quran-search-status");
    if (!resultsContainer) return;

    const matches = data.matches || [];
    const count = data.count || matches.length;

    if (statusEl) {
        statusEl.innerHTML = `<span>تم العثور على <strong>${count}</strong> ${count === 1 ? 'آية كريمة' : 'آيات كريمة'} مطابقة لكلمة "<strong>${escapeHtml(rawQuery)}</strong>":</span>`;
    }

    resultsContainer.innerHTML = "";
    const cleanTokens = normalizeArabicText(rawQuery).split(/\s+/).filter(Boolean);

    matches.slice(0, 50).forEach(match => {
        const surah = match.surah || {};
        const surahName = surah.name ? surah.name.replace(/^سُورَةُ\s+/, "") : "";
        const ayahNum = match.numberInSurah || 1;
        const pageNum = match.page || calculateEstimatedPage(surah.number, ayahNum);

        const card = document.createElement("div");
        card.className = "quran-search-item";
        card.setAttribute("title", "اضغط للانتقال الفوري إلى صفحة الآية في المصحف");

        // تمييز الكلمة المبحوث عنها
        let displayText = match.text || "";
        cleanTokens.forEach(token => {
            if (token.length >= 2) {
                const regex = new RegExp(`(${escapeRegex(token)})`, "gi");
                displayText = displayText.replace(regex, "<mark>$1</mark>");
            }
        });

        card.innerHTML = `
            <div class="quran-match-header">
                <span class="quran-match-surah"><i class="fa-solid fa-quran text-gold"></i> سورة ${surahName} (آية ${ayahNum})</span>
                <span class="quran-match-page-badge"><i class="fa-solid fa-file-lines"></i> صفحة ${pageNum}</span>
            </div>
            <div class="quran-match-text">" ${displayText} "</div>
        `;

        card.addEventListener("click", () => {
            const modal = document.getElementById("quran-search-modal");
            if (modal) modal.classList.remove("open");

            goToMushafPage(pageNum, surah.number);

            // تمرير سلس لقسم المصحف
            const quranSec = document.getElementById("quran-khatma");
            if (quranSec) {
                quranSec.scrollIntoView({ behavior: "smooth", block: "start" });
            }

            if (typeof showToast === "function") {
                showToast(`تم الانتقال لصفحة ${pageNum} (سورة ${surahName} - آية ${ayahNum}) 📖`);
            }
        });

        resultsContainer.appendChild(card);
    });
}

function renderEmptySearchResults(query) {
    const resultsContainer = document.getElementById("quran-search-results");
    const statusEl = document.getElementById("quran-search-status");

    if (statusEl) {
        statusEl.innerHTML = `<span style="color: var(--gold-400);">لم يتم العثور على نتائج لكلمة "<strong>${escapeHtml(query)}</strong>"</span>`;
    }

    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
                <i class="fa-solid fa-magnifying-glass fa-2x text-gold" style="margin-bottom: 0.8rem; opacity: 0.7;"></i>
                <p style="margin-bottom: 0.5rem; color: #fff; font-weight: 600;">لا توجد آيات مطابقة للبحث</p>
                <p style="font-size: 0.85rem;">تأكد من كتابة الكلمة بصورة صحيحة (مثال: الصابرين، الرحمن، الجنة، النور)</p>
            </div>
        `;
    }
}

function calculateEstimatedPage(surahNumber, ayahNumber) {
    if (!surahNumber) return 1;
    const surahData = SURAHS_INDEX.find(s => s.id === surahNumber);
    if (!surahData) return 1;

    // تقدير الصفحة بناءً على رقم الآية
    const nextSurah = SURAHS_INDEX.find(s => s.id === surahNumber + 1);
    const endPage = nextSurah ? nextSurah.page : 604;
    const totalPagesInSurah = Math.max(1, endPage - surahData.page);
    const progress = Math.min(1, Math.max(0, (ayahNumber - 1) / (surahData.ayahs || 1)));
    const estimated = Math.round(surahData.page + progress * (totalPagesInSurah - 1));
    return Math.min(604, Math.max(1, estimated));
}

function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

