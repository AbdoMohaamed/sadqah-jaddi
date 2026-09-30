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
