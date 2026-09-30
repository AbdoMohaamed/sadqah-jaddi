/**
 * مصحف الصدقة الجارية - القارئ القرآني برسم المصحف الشريف
 */

// السور الفاضلة الأكثر قراءة وإهداءً للميت
const QUICK_SURAHS = [
    { id: 67, name: "سورة الملك", subtitle: "المانعة من عذاب القبر" },
    { id: 36, name: "سورة يس", subtitle: "قلب القرآن" },
    { id: 1, name: "سورة الفاتحة", subtitle: "أم الكتاب والشافية" },
    { id: 56, name: "سورة الواقعة", subtitle: "سورة الغنى والبركة" },
    { id: 55, name: "سورة الرحمن", subtitle: "عروس القرآن" },
    { id: 18, name: "سورة الكهف", subtitle: "نور ما بين الجمعتين" },
    { id: "muawidhat", name: "الإخلاص والمعوذتين", subtitle: "تعدل ثلث القرآن والمعوذات" },
    { id: "ayat_kursi", name: "آية الكرسي وخواتيم البقرة", subtitle: "أعظم آية في كتاب الله" }
];

// قائمة الـ 114 سورة كاملة بالترتيب المصحفي
const ALL_SURAHS_CATALOG = [
    { number: 1, name: "الفاتحة", type: "مَكِّيَّةٌ", ayahs: 7 },
    { number: 2, name: "البقرة", type: "مَدَنِيَّةٌ", ayahs: 286 },
    { number: 3, name: "آل عمران", type: "مَدَنِيَّةٌ", ayahs: 200 },
    { number: 4, name: "النساء", type: "مَدَنِيَّةٌ", ayahs: 176 },
    { number: 5, name: "المائدة", type: "مَدَنِيَّةٌ", ayahs: 120 },
    { number: 6, name: "الأنعام", type: "مَكِّيَّةٌ", ayahs: 165 },
    { number: 7, name: "الأعراف", type: "مَكِّيَّةٌ", ayahs: 206 },
    { number: 8, name: "الأنفال", type: "مَدَنِيَّةٌ", ayahs: 75 },
    { number: 9, name: "التوبة", type: "مَدَنِيَّةٌ", ayahs: 129 },
    { number: 10, name: "يونس", type: "مَكِّيَّةٌ", ayahs: 109 },
    { number: 11, name: "هود", type: "مَكِّيَّةٌ", ayahs: 123 },
    { number: 12, name: "يوسف", type: "مَكِّيَّةٌ", ayahs: 111 },
    { number: 13, name: "الرعد", type: "مَدَنِيَّةٌ", ayahs: 43 },
    { number: 14, name: "إبراهيم", type: "مَكِّيَّةٌ", ayahs: 52 },
    { number: 15, name: "الحجر", type: "مَكِّيَّةٌ", ayahs: 99 },
    { number: 16, name: "النحل", type: "مَكِّيَّةٌ", ayahs: 128 },
    { number: 17, name: "الإسراء", type: "مَكِّيَّةٌ", ayahs: 111 },
    { number: 18, name: "الكهف", type: "مَكِّيَّةٌ", ayahs: 110 },
    { number: 19, name: "مريم", type: "مَكِّيَّةٌ", ayahs: 98 },
    { number: 20, name: "طه", type: "مَكِّيَّةٌ", ayahs: 135 },
    { number: 21, name: "الأنبياء", type: "مَكِّيَّةٌ", ayahs: 112 },
    { number: 22, name: "الحج", type: "مَدَنِيَّةٌ", ayahs: 78 },
    { number: 23, name: "المؤمنون", type: "مَكِّيَّةٌ", ayahs: 118 },
    { number: 24, name: "النور", type: "مَدَنِيَّةٌ", ayahs: 64 },
    { number: 25, name: "الفرقان", type: "مَكِّيَّةٌ", ayahs: 77 },
    { number: 26, name: "الشعراء", type: "مَكِّيَّةٌ", ayahs: 227 },
    { number: 27, name: "النمل", type: "مَكِّيَّةٌ", ayahs: 93 },
    { number: 28, name: "القصص", type: "مَكِّيَّةٌ", ayahs: 88 },
    { number: 29, name: "العنكبوت", type: "مَكِّيَّةٌ", ayahs: 69 },
    { number: 30, name: "الروم", type: "مَكِّيَّةٌ", ayahs: 60 },
    { number: 31, name: "لقمان", type: "مَكِّيَّةٌ", ayahs: 34 },
    { number: 32, name: "السجدة", type: "مَكِّيَّةٌ", ayahs: 30 },
    { number: 33, name: "الأحزاب", type: "مَدَنِيَّةٌ", ayahs: 73 },
    { number: 34, name: "سبأ", type: "مَكِّيَّةٌ", ayahs: 54 },
    { number: 35, name: "فاطر", type: "مَكِّيَّةٌ", ayahs: 45 },
    { number: 36, name: "يس", type: "مَكِّيَّةٌ", ayahs: 83 },
    { number: 37, name: "الصافات", type: "مَكِّيَّةٌ", ayahs: 182 },
    { number: 38, name: "ص", type: "مَكِّيَّةٌ", ayahs: 88 },
    { number: 39, name: "الزمر", type: "مَكِّيَّةٌ", ayahs: 75 },
    { number: 40, name: "غافر", type: "مَكِّيَّةٌ", ayahs: 85 },
    { number: 41, name: "فصلت", type: "مَكِّيَّةٌ", ayahs: 54 },
    { number: 42, name: "الشورى", type: "مَكِّيَّةٌ", ayahs: 53 },
    { number: 43, name: "الزخرف", type: "مَكِّيَّةٌ", ayahs: 89 },
    { number: 44, name: "الدخان", type: "مَكِّيَّةٌ", ayahs: 59 },
    { number: 45, name: "الجاثية", type: "مَكِّيَّةٌ", ayahs: 37 },
    { number: 46, name: "الأحقاف", type: "مَكِّيَّةٌ", ayahs: 35 },
    { number: 47, name: "محمد", type: "مَدَنِيَّةٌ", ayahs: 38 },
    { number: 48, name: "الفتح", type: "مَدَنِيَّةٌ", ayahs: 29 },
    { number: 49, name: "الحجرات", type: "مَدَنِيَّةٌ", ayahs: 18 },
    { number: 50, name: "ق", type: "مَكِّيَّةٌ", ayahs: 45 },
    { number: 51, name: "الذاريات", type: "مَكِّيَّةٌ", ayahs: 60 },
    { number: 52, name: "الطور", type: "مَكِّيَّةٌ", ayahs: 49 },
    { number: 53, name: "النجم", type: "مَكِّيَّةٌ", ayahs: 62 },
    { number: 54, name: "القمر", type: "مَكِّيَّةٌ", ayahs: 55 },
    { number: 55, name: "الرحمن", type: "مَدَنِيَّةٌ", ayahs: 78 },
    { number: 56, name: "الواقعة", type: "مَكِّيَّةٌ", ayahs: 96 },
    { number: 57, name: "الحديد", type: "مَدَنِيَّةٌ", ayahs: 29 },
    { number: 58, name: "المجادلة", type: "مَدَنِيَّةٌ", ayahs: 22 },
    { number: 59, name: "الحشر", type: "مَدَنِيَّةٌ", ayahs: 24 },
    { number: 60, name: "الممتحنة", type: "مَدَنِيَّةٌ", ayahs: 13 },
    { number: 61, name: "الصف", type: "مَدَنِيَّةٌ", ayahs: 14 },
    { number: 62, name: "الجمعة", type: "مَدَنِيَّةٌ", ayahs: 11 },
    { number: 63, name: "المنافقون", type: "مَدَنِيَّةٌ", ayahs: 11 },
    { number: 64, name: "التغابن", type: "مَدَنِيَّةٌ", ayahs: 18 },
    { number: 65, name: "الطلاق", type: "مَدَنِيَّةٌ", ayahs: 12 },
    { number: 66, name: "التحريم", type: "مَدَنِيَّةٌ", ayahs: 12 },
    { number: 67, name: "الملك", type: "مَكِّيَّةٌ", ayahs: 30 },
    { number: 68, name: "القلم", type: "مَكِّيَّةٌ", ayahs: 52 },
    { number: 69, name: "الحاقة", type: "مَكِّيَّةٌ", ayahs: 52 },
    { number: 70, name: "المعارج", type: "مَكِّيَّةٌ", ayahs: 44 },
    { number: 71, name: "نوح", type: "مَكِّيَّةٌ", ayahs: 28 },
    { number: 72, name: "الجن", type: "مَكِّيَّةٌ", ayahs: 28 },
    { number: 73, name: "المزمل", type: "مَكِّيَّةٌ", ayahs: 20 },
    { number: 74, name: "المدثر", type: "مَكِّيَّةٌ", ayahs: 56 },
    { number: 75, name: "القيامة", type: "مَكِّيَّةٌ", ayahs: 40 },
    { number: 76, name: "الإنسان", type: "مَدَنِيَّةٌ", ayahs: 31 },
    { number: 77, name: "المرسلات", type: "مَكِّيَّةٌ", ayahs: 50 },
    { number: 78, name: "النبأ", type: "مَكِّيَّةٌ", ayahs: 40 },
    { number: 79, name: "النازعات", type: "مَكِّيَّةٌ", ayahs: 46 },
    { number: 80, name: "عبس", type: "مَكِّيَّةٌ", ayahs: 42 },
    { number: 81, name: "التكوير", type: "مَكِّيَّةٌ", ayahs: 29 },
    { number: 82, name: "الانفطار", type: "مَكِّيَّةٌ", ayahs: 19 },
    { number: 83, name: "المطففين", type: "مَكِّيَّةٌ", ayahs: 36 },
    { number: 84, name: "الانشقاق", type: "مَكِّيَّةٌ", ayahs: 25 },
    { number: 85, name: "البروج", type: "مَكِّيَّةٌ", ayahs: 22 },
    { number: 86, name: "الطارق", type: "مَكِّيَّةٌ", ayahs: 17 },
    { number: 87, name: "الأعلى", type: "مَكِّيَّةٌ", ayahs: 19 },
    { number: 88, name: "الغاشية", type: "مَكِّيَّةٌ", ayahs: 26 },
    { number: 89, name: "الفجر", type: "مَكِّيَّةٌ", ayahs: 30 },
    { number: 90, name: "البلد", type: "مَكِّيَّةٌ", ayahs: 20 },
    { number: 91, name: "الشمس", type: "مَكِّيَّةٌ", ayahs: 15 },
    { number: 92, name: "الليل", type: "مَكِّيَّةٌ", ayahs: 21 },
    { number: 93, name: "الضحى", type: "مَكِّيَّةٌ", ayahs: 11 },
    { number: 94, name: "الشرح", type: "مَكِّيَّةٌ", ayahs: 8 },
    { number: 95, name: "التين", type: "مَكِّيَّةٌ", ayahs: 8 },
    { number: 96, name: "العلق", type: "مَكِّيَّةٌ", ayahs: 19 },
    { number: 97, name: "القدر", type: "مَكِّيَّةٌ", ayahs: 5 },
    { number: 98, name: "البينة", type: "مَدَنِيَّةٌ", ayahs: 8 },
    { number: 99, name: "الزلزلة", type: "مَدَنِيَّةٌ", ayahs: 8 },
    { number: 100, name: "العاديات", type: "مَكِّيَّةٌ", ayahs: 11 },
    { number: 101, name: "القارعة", type: "مَكِّيَّةٌ", ayahs: 11 },
    { number: 102, name: "التكاثر", type: "مَكِّيَّةٌ", ayahs: 8 },
    { number: 103, name: "العصر", type: "مَكِّيَّةٌ", ayahs: 3 },
    { number: 104, name: "الهمزة", type: "مَكِّيَّةٌ", ayahs: 9 },
    { number: 105, name: "الفيل", type: "مَكِّيَّةٌ", ayahs: 5 },
    { number: 106, name: "قريش", type: "مَكِّيَّةٌ", ayahs: 4 },
    { number: 107, name: "الماعون", type: "مَكِّيَّةٌ", ayahs: 7 },
    { number: 108, name: "الكوثر", type: "مَكِّيَّةٌ", ayahs: 3 },
    { number: 109, name: "الكافرون", type: "مَكِّيَّةٌ", ayahs: 6 },
    { number: 110, name: "النصر", type: "مَدَنِيَّةٌ", ayahs: 3 },
    { number: 111, name: "المسد", type: "مَكِّيَّةٌ", ayahs: 5 },
    { number: 112, name: "الإخلاص", type: "مَكِّيَّةٌ", ayahs: 4 },
    { number: 113, name: "الفلق", type: "مَكِّيَّةٌ", ayahs: 5 },
    { number: 114, name: "الناس", type: "مَكِّيَّةٌ", ayahs: 6 }
];

// المتغيرات العامة
let currentSurahTarget = 67; // سورة الملك افتراضياً
let quranAudio = new Audio();
let isSurahAudioPlaying = false;
let currentFontSize = parseInt(localStorage.getItem("quran_font_size") || "24", 10);
const surahCache = {};

document.addEventListener("DOMContentLoaded", () => {
    initQuranReader();
});

function initQuranReader() {
    renderFeaturedSurahButtons();
    populateAllSurahsDropdown();
    applyFontSize();
    setupControls();

    // تحميل سورة الملك كاملة 100% بالرسم العثماني فور فتح الصفحة
    loadSurahByNumber(67);
}

function renderFeaturedSurahButtons() {
    const container = document.getElementById("featured-surahs-pills");
    if (!container) return;

    container.innerHTML = "";
    QUICK_SURAHS.forEach((item) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `surah-pill ${item.id === currentSurahTarget ? 'active' : ''}`;
        btn.setAttribute("data-surah-id", item.id);
        btn.innerHTML = `<i class="fa-solid fa-book-quran"></i> <span>${item.name}</span>`;
        btn.title = item.subtitle;
        btn.onclick = () => {
            currentSurahTarget = item.id;
            updateActivePill();
            if (item.id === "muawidhat") {
                loadMuawidhat();
            } else if (item.id === "ayat_kursi") {
                loadAyatKursi();
            } else {
                loadSurahByNumber(item.id);
            }
        };
        container.appendChild(btn);
    });
}

function updateActivePill() {
    document.querySelectorAll(".surah-pill").forEach(btn => {
        const id = btn.getAttribute("data-surah-id");
        if (id == currentSurahTarget) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

function populateAllSurahsDropdown() {
    const select = document.getElementById("select-all-surahs");
    if (!select) return;

    select.innerHTML = '<option value="">📖 تصفح جميع سور القرآن الكريم (114 سورة كاملة من المصحف)...</option>';
    ALL_SURAHS_CATALOG.forEach((surah) => {
        const option = document.createElement("option");
        option.value = surah.number;
        option.textContent = `${surah.number}. سورة ${surah.name} (${surah.type} - ${surah.ayahs} آية)`;
        select.appendChild(option);
    });

    select.addEventListener("change", (e) => {
        const num = parseInt(e.target.value, 10);
        if (num) {
            currentSurahTarget = num;
            updateActivePill();
            loadSurahByNumber(num);
        }
    });
}

function setupControls() {
    // تكبير وتصغير الخط
    const btnInc = document.getElementById("btn-font-increase");
    const btnDec = document.getElementById("btn-font-decrease");
    if (btnInc) btnInc.onclick = () => changeFontSize(2);
    if (btnDec) btnDec.onclick = () => changeFontSize(-2);

    // مشغل الصوت
    const btnAudio = document.getElementById("btn-surah-audio");
    if (btnAudio) btnAudio.onclick = toggleSurahAudio;

    // زر إهداء الثواب لروح الجد
    const btnGift = document.getElementById("btn-gift-quran-reward");
    if (btnGift) btnGift.onclick = handleGiftReward;
}

function changeFontSize(delta) {
    const newSize = currentFontSize + delta;
    if (newSize >= 16 && newSize <= 38) {
        currentFontSize = newSize;
        applyFontSize();
    }
}

function applyFontSize() {
    const contentEl = document.getElementById("quran-mushaf-text");
    if (contentEl) {
        contentEl.style.fontSize = `${currentFontSize}px`;
        localStorage.setItem("quran_font_size", currentFontSize.toString());
    }
    const indicator = document.getElementById("font-size-indicator");
    if (indicator) indicator.textContent = `${currentFontSize}px`;
}

// تحميل وعرض السورة كاملة بالرسم العثماني من المصحف
async function loadSurahByNumber(surahNumber) {
    const contentEl = document.getElementById("quran-mushaf-text");
    const titleEl = document.getElementById("quran-surah-title");
    const countEl = document.getElementById("quran-verses-count");

    if (!contentEl) return;
    stopSurahAudio();

    // ضبط رابط الصوت للشيخ مشاري العفاسي
    const padded = String(surahNumber).padStart(3, "0");
    quranAudio.src = `https://server8.mp3quran.net/afs/${padded}.mp3`;

    // فحص الكاش
    if (surahCache[surahNumber]) {
        renderSurahData(surahCache[surahNumber]);
        return;
    }

    contentEl.innerHTML = `
        <div style="text-align:center; padding: 3rem 1rem; color: var(--gold-300);">
            <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 1rem;"></i>
            <div style="font-size: 1.1rem; font-family: var(--font-body);">جاري فتح السورة كاملة من المصحف الشريف...</div>
        </div>
    `;

    try {
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`);
        const json = await res.json();

        if (json.code === 200 && json.data) {
            surahCache[surahNumber] = json.data;
            renderSurahData(json.data);
        } else {
            throw new Error("API failed");
        }
    } catch (err) {
        contentEl.innerHTML = `
            <div style="text-align:center; padding: 2rem; color: #f87171;">
                <p>تعذر الاتصال بالمصحف الإلكتروني حالياً. تأكد من اتصال الإنترنت وحاول ثانية.</p>
            </div>
        `;
    }
}

// تشكيل وعرض السورة تماماً كالمصحف الشريف
function renderSurahData(surahData) {
    const contentEl = document.getElementById("quran-mushaf-text");
    const titleEl = document.getElementById("quran-surah-title");
    const countEl = document.getElementById("quran-verses-count");

    const surahNumber = surahData.number;
    const surahName = surahData.name; // مثل "سُورَةُ يسٓ"
    const versesCount = surahData.numberOfAyahs;
    const typeAr = surahData.revelationType === "Meccan" ? "مَكِّيَّةٌ" : "مَدَنِيَّةٌ";

    if (titleEl) titleEl.textContent = surahName;
    if (countEl) countEl.textContent = `${typeAr} • ${versesCount} آية`;

    // إعداد البسملة والآيات
    const hasBasmalah = (surahNumber !== 1 && surahNumber !== 9);
    const basmalahPattern = /^بِسْمِ\s+اللَّهِ\s+الرَّحْمَٰنِ\s+الرَّحِيمِ\s*/;

    let ayahsHTML = "";

    surahData.ayahs.forEach((ayah, index) => {
        let text = ayah.text;

        // إزالة البسملة الملتصقة بأول آية لوضعها في برواز البسملة المخصص
        if (index === 0 && hasBasmalah) {
            text = text.replace(basmalahPattern, "").trim();
        }

        ayahsHTML += `${text} <span class="ayah-symbol">﴿${ayah.numberInSurah}﴾</span> `;
    });

    contentEl.innerHTML = `
        <div class="mushaf-surah-frame">
            <div class="mushaf-frame-side">آيَاتُهَا ${versesCount}</div>
            <div class="mushaf-frame-center">${surahName}</div>
            <div class="mushaf-frame-side">${typeAr}</div>
        </div>

        ${hasBasmalah ? `
            <div class="mushaf-basmalah-banner">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
            </div>
        ` : ''}

        <div class="mushaf-verses-flow">
            ${ayahsHTML}
        </div>
    `;

    applyFontSize();
}

// عرض الإخلاص والمعوذتين معاً كالمصحف
async function loadMuawidhat() {
    const contentEl = document.getElementById("quran-mushaf-text");
    const titleEl = document.getElementById("quran-surah-title");
    const countEl = document.getElementById("quran-verses-count");

    if (titleEl) titleEl.textContent = "الإِخْلَاصُ وَالمُعَوِّذَتَانِ";
    if (countEl) countEl.textContent = "سورة الإخلاص • الفلق • الناس";
    stopSurahAudio();
    quranAudio.src = "https://server8.mp3quran.net/afs/112.mp3";

    contentEl.innerHTML = '<div style="text-align:center; padding: 2rem;"><i class="fa-solid fa-spinner fa-spin"></i> جاري فتح السور...</div>';

    try {
        const [r112, r113, r114] = await Promise.all([
            fetch("https://api.alquran.cloud/v1/surah/112/quran-uthmani").then(r => r.json()),
            fetch("https://api.alquran.cloud/v1/surah/113/quran-uthmani").then(r => r.json()),
            fetch("https://api.alquran.cloud/v1/surah/114/quran-uthmani").then(r => r.json())
        ]);

        let html = "";
        [r112.data, r113.data, r114.data].forEach(s => {
            const basmalahPattern = /^بِسْمِ\s+اللَّهِ\s+الرَّحْمَٰنِ\s+الرَّحِيمِ\s*/;
            let ayahs = "";
            s.ayahs.forEach((a, i) => {
                let t = a.text;
                if (i === 0) t = t.replace(basmalahPattern, "").trim();
                ayahs += `${t} <span class="ayah-symbol">﴿${a.numberInSurah}﴾</span> `;
            });

            html += `
                <div class="mushaf-surah-frame" style="margin-top: 2rem;">
                    <div class="mushaf-frame-side">آيَاتُهَا ${s.numberOfAyahs}</div>
                    <div class="mushaf-frame-center">${s.name}</div>
                    <div class="mushaf-frame-side">مَكِّيَّةٌ</div>
                </div>
                <div class="mushaf-basmalah-banner">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</div>
                <div class="mushaf-verses-flow">${ayahs}</div>
            `;
        });

        contentEl.innerHTML = html;
        applyFontSize();
    } catch (e) {
        contentEl.innerHTML = '<p style="text-align:center; color:#f87171;">حدث خطأ في تحميل السور.</p>';
    }
}

// عرض آية الكرسي وخواتيم سورة البقرة
async function loadAyatKursi() {
    const contentEl = document.getElementById("quran-mushaf-text");
    const titleEl = document.getElementById("quran-surah-title");
    const countEl = document.getElementById("quran-verses-count");

    if (titleEl) titleEl.textContent = "آيَةُ الكُرْسِيِّ وَخَوَاتِيمُ سُورَةِ البَقَرَةِ";
    if (countEl) countEl.textContent = "من سورة البقرة (الآيات 255 و 284-286)";
    stopSurahAudio();
    quranAudio.src = "https://server8.mp3quran.net/afs/002.mp3";

    contentEl.innerHTML = '<div style="text-align:center; padding: 2rem;"><i class="fa-solid fa-spinner fa-spin"></i> جاري التحميل...</div>';

    try {
        const res = await fetch("https://api.alquran.cloud/v1/ayah/2:255/quran-uthmani");
        const json = await res.json();
        const resEnd = await fetch("https://api.alquran.cloud/v1/surah/2/quran-uthmani");
        const jsonEnd = await resEnd.json();

        const a255 = json.data.text;
        const last3 = jsonEnd.data.ayahs.slice(-3);

        let lastAyahsText = "";
        last3.forEach(a => {
            lastAyahsText += `${a.text} <span class="ayah-symbol">﴿${a.numberInSurah}﴾</span> `;
        });

        contentEl.innerHTML = `
            <div class="mushaf-surah-frame">
                <div class="mushaf-frame-side">سورة البقرة</div>
                <div class="mushaf-frame-center">آيَةُ الكُرْسِيِّ</div>
                <div class="mushaf-frame-side">آية ٢٥٥</div>
            </div>
            <div class="mushaf-basmalah-banner">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</div>
            <div class="mushaf-verses-flow" style="margin-bottom: 2.5rem;">
                ${a255} <span class="ayah-symbol">﴿٢٥٥﴾</span>
            </div>

            <div class="mushaf-surah-frame">
                <div class="mushaf-frame-side">سورة البقرة</div>
                <div class="mushaf-frame-center">خَوَاتِيمُ سُورَةِ البَقَرَةِ</div>
                <div class="mushaf-frame-side">الآيات ٢٨٤-٢٨٦</div>
            </div>
            <div class="mushaf-verses-flow">
                ${lastAyahsText}
            </div>
        `;
        applyFontSize();
    } catch (e) {
        contentEl.innerHTML = '<p style="text-align:center; color:#f87171;">حدث خطأ في التحميل.</p>';
    }
}

// التحكم في الصوت
function toggleSurahAudio() {
    const btn = document.getElementById("btn-surah-audio");
    if (!btn) return;

    if (isSurahAudioPlaying) {
        stopSurahAudio();
    } else {
        quranAudio.play().then(() => {
            isSurahAudioPlaying = true;
            btn.innerHTML = '<i class="fa-solid fa-pause"></i> <span>إيقاف التلاوة</span>';
            btn.classList.add("active");
        }).catch(() => {
            showToast("يرجى النقر أولاً في الصفحة للسماح بتشغيل الصوت");
        });
    }
}

function stopSurahAudio() {
    quranAudio.pause();
    isSurahAudioPlaying = false;
    const btn = document.getElementById("btn-surah-audio");
    if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>استماع للتلاوة</span>';
        btn.classList.remove("active");
    }
}

// إهداء ثواب القراءة لروح الجد
function handleGiftReward() {
    playCompletionChime();
    const deceasedName = (typeof DECEASED_INFO !== "undefined" && DECEASED_INFO.name) ? DECEASED_INFO.name : "فقيدنا الغالي";

    showToast(`تقبل الله تلاوتكم، وجعل ثوابها نوراً وفسحة في قبر ${deceasedName} 🌿🤲`);

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
