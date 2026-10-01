/**
 * المنطق البرمجي لموقع صدقة جارية على روح جدي
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. تهيئة اسم الجد والمعلومات الرئيسية
    initDeceasedInfo();

    // 2. تهيئة الأدعية وسلايدر Swiper
    initPrayersSwiper();

    // 3. تهيئة السبحة الإلكترونية والعداد الموحد
    initTasbeeh();

    // 4. تهيئة ختمة القرآن الكريم الجماعية
    initKhatma();

    // 5. تهيئة أذكار الصباح والمساء التفاعلية
    initSmartAzkar();

    // 6. تهيئة نافذة إضافة دعاء
    initAddPrayerModal();

    // 7. تهيئة أزرار المشاركة والنسخ
    initShareButtons();

    // 8. تهيئة مشغل التلاوة الخاشعة وإذاعة القرآن الكريم
    initAudioPlayer();
    initLiveRadio();

    // 9. تهيئة تطبيق الهاتف التقدمي (PWA)
    initPWA();
});

/* ==========================================================================
   1. معلومات المتوفى
   ========================================================================== */
function initDeceasedInfo() {
    const nameElements = document.querySelectorAll(".deceased-name");
    nameElements.forEach(el => {
        el.textContent = DECEASED_INFO.name;
    });

    const bioElement = document.getElementById("deceased-bio");
    if (bioElement) {
        bioElement.textContent = DECEASED_INFO.shortBio;
    }
}

/* ==========================================================================
   2. سلايدر الأدعية (Swiper.js) والمزامنة السحابية (Firebase Realtime)
   ========================================================================== */
let prayersSwiperInstance = null;
let allPrayers = [];
let firebaseDb = null;
let prayersRef = null;

/**
 * تحويل الطابع الزمني (Timestamp) إلى نص نسبي عربي بليغ ودقيق
 * (الآن، منذ دقيقة، منذ دقيقتين، منذ 5 دقائق، منذ ساعتين، منذ يوم، إلخ)
 */
function formatArabicRelativeTime(timestamp) {
    if (!timestamp || isNaN(timestamp)) return null;
    const now = Date.now();
    const diff = Math.max(0, now - Number(timestamp));

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return "الآن";
    } else if (minutes === 1) {
        return "منذ دقيقة";
    } else if (minutes === 2) {
        return "منذ دقيقتين";
    } else if (minutes >= 3 && minutes <= 10) {
        return `منذ ${minutes} دقائق`;
    } else if (minutes < 60) {
        return `منذ ${minutes} دقيقة`;
    } else if (hours === 1) {
        return "منذ ساعة";
    } else if (hours === 2) {
        return "منذ ساعتين";
    } else if (hours >= 3 && hours <= 10) {
        return `منذ ${hours} ساعات`;
    } else if (hours < 24) {
        return `منذ ${hours} ساعة`;
    } else if (days === 1) {
        return "منذ يوم";
    } else if (days === 2) {
        return "منذ يومين";
    } else if (days >= 3 && days <= 10) {
        return `منذ ${days} أيام`;
    } else if (days < 30) {
        return `منذ ${days} يوماً`;
    } else if (months === 1) {
        return "منذ شهر";
    } else if (months === 2) {
        return "منذ شهرين";
    } else if (months >= 3 && months <= 10) {
        return `منذ ${months} أشهر`;
    } else if (months < 12) {
        return `منذ ${months} شهراً`;
    } else if (years === 1) {
        return "منذ عام";
    } else if (years === 2) {
        return "منذ عامين";
    } else {
        return `منذ ${years} أعوام`;
    }
}

/**
 * فك تشفير الطابع الزمني من معرف Firebase Push ID تلقائياً
 */
function decodeFirebasePushIdTimestamp(id) {
    if (!id || typeof id !== 'string' || id.length < 8) return 0;
    const PUSH_CHARS = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
    let time = 0;
    for (let i = 0; i < 8; i++) {
        const c = id.charAt(i);
        const idx = PUSH_CHARS.indexOf(c);
        if (idx === -1) return 0;
        time = (time * 64) + idx;
    }
    return time;
}

/**
 * استخراج الطابع الزمني وتحديد النص المعروض لتاريخ الدعاء
 */
function getPrayerDisplayDate(prayer) {
    let ts = prayer.timestamp;

    // استخراج الطابع الزمني من user_TIMESTAMP للأدعية المحلية السابقة
    if (!ts && typeof prayer.id === "string" && prayer.id.startsWith("user_")) {
        const extracted = parseInt(prayer.id.replace("user_", ""), 10);
        if (!isNaN(extracted) && extracted > 1600000000000) {
            ts = extracted;
            prayer.timestamp = ts;
        }
    }

    // استخراج الطابع الزمني من معرف فيربيز push id إن لم يكن مسجلاً كخاصية
    if (!ts && typeof prayer.id === "string" && prayer.id.startsWith("-")) {
        const decoded = decodeFirebasePushIdTimestamp(prayer.id);
        if (decoded > 1600000000000) {
            ts = decoded;
            prayer.timestamp = ts;
        }
    }

    if (ts) {
        const formatted = formatArabicRelativeTime(ts);
        if (formatted) return formatted;
    }

    // إذا كان محفوظاً كنص "الآن" قديماً ولا يوجد وقت محدد
    if (prayer.date === "الآن") {
        return "منذ قليل";
    }

    return prayer.date || "مؤخراً";
}

/**
 * تحديث تواريخ الأدعية المعروضة تلقائياً كل 30 ثانية لتتحول "الآن" إلى "منذ دقيقة" ثم "منذ 5 دقائق" وهكذا
 */
function updateAllPrayerRelativeDates() {
    const dateElements = document.querySelectorAll(".prayer-date[data-timestamp]");
    dateElements.forEach(el => {
        const ts = Number(el.getAttribute("data-timestamp"));
        if (ts && !isNaN(ts)) {
            const formatted = formatArabicRelativeTime(ts);
            if (formatted && el.textContent !== formatted) {
                el.textContent = formatted;
            }
        }
    });
}

function initPrayersSwiper() {
    // 1. تحميل الأدعية المحلية أو الافتراضية أولاً لضمان سرعة الفتح الفوري
    const storedPrayers = localStorage.getItem("user_prayers_list");
    if (storedPrayers) {
        try {
            const parsed = JSON.parse(storedPrayers);
            allPrayers = [...parsed, ...DEFAULT_PRAYERS];
        } catch (e) {
            allPrayers = [...DEFAULT_PRAYERS];
        }
    } else {
        allPrayers = [...DEFAULT_PRAYERS];
    }

    renderPrayerSlides();

    // تهيئة مكتبة Swiper مع دعم كامل لاتجاه اليمين لليسار (RTL)
    prayersSwiperInstance = new Swiper(".swiper-prayers", {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 28
            }
        }
    });

    // تحديث التواريخ النسبية للأدعية تلقائياً كل 30 ثانية
    setInterval(updateAllPrayerRelativeDates, 30000);

    // 2. إذا تم تفعيل Firebase، ابدأ المزامنة السحابية اللحظية مع جميع الزوار في العالم
    initFirebaseRealtimeSync();
}

function getFirebaseDb() {
    if (firebaseDb) return firebaseDb;
    if (typeof firebase !== "undefined" && typeof isFirebaseConfigured === "function" && isFirebaseConfigured()) {
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(FIREBASE_CONFIG);
            }
            firebaseDb = firebase.database();
            return firebaseDb;
        } catch (e) {
            console.warn("Firebase init error:", e);
        }
    }
    return null;
}

function initFirebaseRealtimeSync() {
    const db = getFirebaseDb();
    if (!db) {
        console.log("Firebase not configured yet; using local storage mode.");
        return;
    }

    try {
        prayersRef = db.ref("prayers");

        // استماع لحظي لأي أدعية جديدة يضيفها أي شخص حول العالم
        prayersRef.limitToLast(60).on("value", (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const cloudPrayers = [];
                Object.keys(data).forEach((key) => {
                    let ts = data[key].timestamp || 0;
                    if (!ts && typeof key === "string" && key.startsWith("-")) {
                        ts = decodeFirebasePushIdTimestamp(key);
                    }
                    cloudPrayers.push({
                        id: key,
                        isCloud: true,
                        author: data[key].author || "فاعل خير",
                        text: data[key].text || "",
                        date: data[key].date || "",
                        amenCount: data[key].amenCount || 0,
                        timestamp: ts
                    });
                });

                // ترتيب الأدعية من الأحدث للأقدم
                cloudPrayers.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

                // دمج الأدعية السحابية مع الأدعية المأثورة الافتراضية
                allPrayers = [...cloudPrayers, ...DEFAULT_PRAYERS];
                renderPrayerSlides();

                if (prayersSwiperInstance) {
                    prayersSwiperInstance.update();
                }
            }
        });
        console.log("Firebase Realtime Database connected successfully! 🌍✨");
    } catch (err) {
        console.warn("Firebase sync error:", err);
    }
}

function renderPrayerSlides() {
    const wrapper = document.getElementById("prayers-swiper-wrapper");
    if (!wrapper) return;

    wrapper.innerHTML = "";

    // جلب الأدعية التي أمّن عليها المستخدم سابقاً
    const amenState = JSON.parse(localStorage.getItem("amen_prayers_voted") || "{}");

    allPrayers.forEach(prayer => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";

        const hasVoted = !!amenState[prayer.id];
        const displayDate = getPrayerDisplayDate(prayer);
        const tsAttr = prayer.timestamp ? ` data-timestamp="${prayer.timestamp}"` : "";

        slide.innerHTML = `
            <div class="prayer-card">
                <div class="prayer-card-header">
                    <div class="prayer-author">
                        <div class="author-avatar">
                            <i class="fa-solid fa-hands-praying"></i>
                        </div>
                        <span class="author-name">${escapeHTML(prayer.author)}</span>
                    </div>
                    <span class="prayer-date"${tsAttr}>${escapeHTML(displayDate)}</span>
                </div>
                <div class="prayer-body">
                    "${escapeHTML(prayer.text)}"
                </div>
                <div class="prayer-card-footer">
                    <button class="btn-amen ${hasVoted ? 'active' : ''}" 
                            data-prayer-id="${prayer.id}" 
                            onclick="handleAmenClick('${prayer.id}')">
                        <i class="fa-solid fa-heart"></i>
                        <span>اللهم آمين</span>
                        (<span class="amen-count" id="amen-count-${prayer.id}">${prayer.amenCount || 0}</span>)
                    </button>
                    <span style="font-size: 0.8rem; color: var(--text-muted)">أثابكم الله</span>
                </div>
            </div>
        `;
        wrapper.appendChild(slide);
    });
}

// التفاعل مع زر التأمين (اللهم آمين)
window.handleAmenClick = function(prayerId) {
    const amenState = JSON.parse(localStorage.getItem("amen_prayers_voted") || "{}");
    const countEl = document.getElementById(`amen-count-${prayerId}`);
    const buttonEl = document.querySelector(`button[data-prayer-id="${prayerId}"]`);

    if (amenState[prayerId]) {
        showToast("لقد أمّنت على هذا الدعاء مسبقاً، تقبل الله منك ✨");
        return;
    }

    // زيادة العداد
    const prayer = allPrayers.find(p => p.id === prayerId);
    if (prayer) {
        prayer.amenCount = (prayer.amenCount || 0) + 1;
        if (countEl) countEl.textContent = prayer.amenCount;
        if (buttonEl) buttonEl.classList.add("active");
        
        amenState[prayerId] = true;
        localStorage.setItem("amen_prayers_voted", JSON.stringify(amenState));

        // إذا كان الدعاء سحابياً في Firebase، حدّث العداد عالمياً ليراه الجميع
        if (prayer.isCloud && firebaseDb) {
            try {
                firebaseDb.ref(`prayers/${prayerId}/amenCount`).transaction(curr => (curr || 0) + 1);
            } catch (e) {
                console.warn("Amen transaction error:", e);
            }
        }

        // تأثير صوتي خفيف
        playBeadSound(650);
        showToast("آمين يا رب العالمين، كُتب لك أجر التأمين 🤲");
    }
};

/* ==========================================================================
   3. السبحة الإلكترونية للتسبيح على روحه والعداد الموحد
   ========================================================================== */
let activeZkrIndex = 0;
let currentZkrCount = 0;
let totalTasbeehSession = 0;
let globalTasbeehCount = 0;
let pendingTasbeehBatch = 0;
let tasbeehBatchTimer = null;
const RADIUS = 110;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function initTasbeeh() {
    renderAzkarList();
    loadActiveZkr(0);

    // استرجاع الإجمالي التاريخي المخزن
    const storedTotal = localStorage.getItem("tasbeeh_lifetime_total") || "0";
    totalTasbeehSession = parseInt(storedTotal, 10);
    updateTotalDisplays();

    // إعداد المزامنة السحابية للعداد العالمي الموحد
    initGlobalTasbeehSync();

    // إعداد دائرة شريط التقدم SVG
    const circle = document.querySelector(".progress-ring__circle");
    if (circle) {
        circle.style.strokeDasharray = `${CIRCUMFERENCE} ${CIRCUMFERENCE}`;
        circle.style.strokeDashoffset = CIRCUMFERENCE;
    }

    // الاستماع لنقر مساحة التسبيح
    const clickArea = document.getElementById("tasbeeh-click-area");
    if (clickArea) {
        clickArea.addEventListener("click", incrementTasbeeh);
    }

    // زر التصفير
    const resetBtn = document.getElementById("btn-reset-tasbeeh");
    if (resetBtn) {
        resetBtn.addEventListener("click", resetCurrentZkr);
    }
}

function initGlobalTasbeehSync() {
    const db = getFirebaseDb();
    if (!db) return;

    try {
        const statsRef = db.ref("stats/globalTasbeehCount");
        statsRef.on("value", snapshot => {
            const val = snapshot.val();
            if (typeof val === "number") {
                globalTasbeehCount = val;
                updateGlobalTasbeehDisplays();
            } else if (val === null) {
                db.ref("stats/globalTasbeehCount").set(24530);
                globalTasbeehCount = 24530;
                updateGlobalTasbeehDisplays();
            }
        });
    } catch (e) {
        console.warn("Global tasbeeh sync error:", e);
    }
}

function updateGlobalTasbeehDisplays() {
    const statEl = document.getElementById("global-tasbeeh-stat");
    const tasbeehEl = document.getElementById("total-global-tasbeeh-count");
    const formatted = (globalTasbeehCount + pendingTasbeehBatch).toLocaleString("ar-EG");

    if (statEl) statEl.textContent = formatted;
    if (tasbeehEl) tasbeehEl.textContent = formatted;
}

function syncTasbeehBatchToCloud() {
    if (pendingTasbeehBatch <= 0) return;
    const db = getFirebaseDb();
    const batchToPush = pendingTasbeehBatch;
    pendingTasbeehBatch = 0;

    if (db) {
        try {
            db.ref("stats/globalTasbeehCount").transaction(curr => (curr || 0) + batchToPush);
        } catch (e) {
            console.warn("Error incrementing global tasbeeh:", e);
        }
    }
}

function renderAzkarList() {
    const listContainer = document.getElementById("azkar-list");
    if (!listContainer) return;

    listContainer.innerHTML = "";
    TASBEEH_ITEMS.forEach((zkr, idx) => {
        const item = document.createElement("div");
        item.className = `zkr-btn ${idx === activeZkrIndex ? 'active' : ''}`;
        item.onclick = () => selectZkr(idx);
        item.innerHTML = `
            <div class="zkr-text">${zkr.text}</div>
            <div class="zkr-target">${zkr.target} مرة</div>
        `;
        listContainer.appendChild(item);
    });
}

function selectZkr(index) {
    if (index === activeZkrIndex) return;
    activeZkrIndex = index;
    currentZkrCount = 0;
    renderAzkarList();
    loadActiveZkr(index);
    updateCounterDisplay();
}

function loadActiveZkr(index) {
    const zkr = TASBEEH_ITEMS[index];
    const nameEl = document.getElementById("active-zkr-name");
    const virtueEl = document.getElementById("active-zkr-virtue");
    const targetEl = document.getElementById("zkr-target-display");

    if (nameEl) nameEl.textContent = zkr.text;
    if (virtueEl) virtueEl.textContent = zkr.virtue;
    if (targetEl) targetEl.textContent = zkr.target;

    updateCounterDisplay();
}

function incrementTasbeeh() {
    const zkr = TASBEEH_ITEMS[activeZkrIndex];
    currentZkrCount++;
    totalTasbeehSession++;

    // حفظ الإجمالي المحلي
    localStorage.setItem("tasbeeh_lifetime_total", totalTasbeehSession.toString());

    // تحديث العداد السحابي العالمي الموحد بالدفع المجمع
    pendingTasbeehBatch++;
    updateGlobalTasbeehDisplays();

    if (tasbeehBatchTimer) clearTimeout(tasbeehBatchTimer);
    tasbeehBatchTimer = setTimeout(syncTasbeehBatchToCloud, 1200);

    // اهتزاز خفيف للموبايل إن كان مدعوماً
    if ("vibrate" in navigator) {
        navigator.vibrate(30);
    }

    // نغمة صوتية هادئة تمثل خرزة السبحة
    playBeadSound(480 + (currentZkrCount % 10) * 15);

    updateCounterDisplay();
    updateTotalDisplays();

    // فحص إتمام الهدف
    if (currentZkrCount >= zkr.target) {
        playCompletionChime();
        showToast(`هنيئاً لك! أتممت ${zkr.target} تسبيحة، وننتقل الآن للذكر التالي 🌿`);
        currentZkrCount = 0;
        
        // الانتقال التلقائي للذكر التالي في القائمة
        const nextIndex = (activeZkrIndex + 1) % TASBEEH_ITEMS.length;
        setTimeout(() => {
            selectZkr(nextIndex);
            // تحريك التمرير ليظهر الذكر النشط الجديد
            const activeBtn = document.querySelectorAll(".zkr-btn")[nextIndex];
            if (activeBtn) {
                activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }, 700);
    }
}

function resetCurrentZkr() {
    currentZkrCount = 0;
    updateCounterDisplay();
    showToast("تم تصفير عداد الذكر الحالي.");
}

function updateCounterDisplay() {
    const numberEl = document.getElementById("counter-number");
    if (numberEl) {
        numberEl.textContent = currentZkrCount;
    }

    const zkr = TASBEEH_ITEMS[activeZkrIndex];
    const circle = document.querySelector(".progress-ring__circle");
    if (circle && zkr) {
        const percent = Math.min(currentZkrCount / zkr.target, 1);
        const offset = CIRCUMFERENCE - (percent * CIRCUMFERENCE);
        circle.style.strokeDashoffset = offset;
    }
}

function updateTotalDisplays() {
    const totalEl = document.getElementById("total-tasbeeh-count");
    if (totalEl) {
        totalEl.textContent = totalTasbeehSession.toLocaleString("ar-EG");
    }
}

/* ==========================================================================
   4. نافذة إضافة دعاء (Modal & Form)
   ========================================================================== */
function initAddPrayerModal() {
    const modal = document.getElementById("add-prayer-modal");
    const openBtns = document.querySelectorAll(".btn-open-prayer-modal");
    const closeBtn = document.getElementById("btn-close-modal");
    const form = document.getElementById("add-prayer-form");
    const quickPillsContainer = document.getElementById("quick-pills-container");
    const textarea = document.getElementById("prayer-input-text");

    // ملء قوالب الأدعية السريعة
    if (quickPillsContainer && textarea) {
        QUICK_PRAYER_TEMPLATES.forEach(template => {
            const pill = document.createElement("button");
            pill.type = "button";
            pill.className = "quick-pill";
            pill.textContent = template;
            pill.onclick = () => {
                textarea.value = template;
                textarea.focus();
            };
            quickPillsContainer.appendChild(pill);
        });
    }

    openBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            modal.classList.add("open");
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("open");
        });
    }

    // إغلاق عند النقر بالخلفية
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("open");
        }
    });

    // إرسال النموذج
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const authorInput = document.getElementById("prayer-input-author");
            const author = authorInput.value.trim() || "فاعل خير";
            const text = textarea.value.trim();

            if (!text) {
                alert("يرجى كتابة نص الدعاء");
                return;
            }

            const now = Date.now();
            const newPrayer = {
                id: "user_" + now,
                author: author,
                text: text,
                timestamp: now,
                amenCount: 1
            };

            // 1. إذا كان Firebase متصلاً، ارفع الدعاء للسحابة ليظهر فوراً لجميع الزوار حول العالم
            if (prayersRef) {
                try {
                    prayersRef.push({
                        author: author,
                        text: text,
                        timestamp: (typeof firebase !== 'undefined' && firebase.database && firebase.database.ServerValue) ? firebase.database.ServerValue.TIMESTAMP : now,
                        amenCount: 1
                    }).then(() => {
                        console.log("Prayer published to cloud successfully!");
                    }).catch(err => {
                        console.error("Firebase push error:", err);
                    });
                } catch (e) {
                    console.warn("Could not push to Firebase:", e);
                }
            }

            // 2. حفظ محلياً أيضاً لضمان ظهوره الفوري دائماً
            const stored = JSON.parse(localStorage.getItem("user_prayers_list") || "[]");
            stored.unshift(newPrayer);
            localStorage.setItem("user_prayers_list", JSON.stringify(stored));

            // تحديث القائمة المحلية إن لم يكن فيربيز متصلاً
            if (!prayersRef) {
                allPrayers.unshift(newPrayer);
                renderPrayerSlides();
                if (prayersSwiperInstance) {
                    prayersSwiperInstance.update();
                    prayersSwiperInstance.slideToLoop(0, 500);
                }
            }

            // إغلاق وتفريغ
            modal.classList.remove("open");
            form.reset();

            playCompletionChime();
            showToast("جزاك الله خيراً! تم نشر دعائك وسيظهر للجميع في السلايدر 🤲");
        });
    }
}

/* ==========================================================================
   5. أزرار المشاركة والنسخ
   ========================================================================== */
function initShareButtons() {
    const copyBtns = document.querySelectorAll(".btn-copy-link");
    const whatsappBtns = document.querySelectorAll(".btn-share-whatsapp");
    const twitterBtns = document.querySelectorAll(".btn-share-twitter");

    const pageUrl = window.location.href;
    const shareMessage = `شاركنا بالدعاء والتسبيح لروحه الطاهرة: ${DECEASED_INFO.name}\n${pageUrl}`;

    copyBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            navigator.clipboard.writeText(pageUrl).then(() => {
                showToast("تم نسخ رابط الموقع بنجاح، شاركه لتنال الأجر 🔗");
            }).catch(() => {
                // بديل للمتصفحات القديمة
                const input = document.createElement("input");
                input.value = pageUrl;
                document.body.appendChild(input);
                input.select();
                document.execCommand("copy");
                document.body.removeChild(input);
                showToast("تم نسخ رابط الموقع بنجاح 🔗");
            });
        });
    });

    whatsappBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
            window.open(url, "_blank");
        });
    });

    twitterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;
            window.open(url, "_blank");
        });
    });
}

/* ==========================================================================
   6. التلاوة الخاشعة (Audio Player)
   ========================================================================== */
function initAudioPlayer() {
    const audioBtn = document.getElementById("btn-toggle-audio");
    const audioEl = document.getElementById("quran-audio");
    if (!audioBtn || !audioEl) return;

    let isPlaying = false;

    audioBtn.addEventListener("click", () => {
        if (isPlaying) {
            audioEl.pause();
            audioBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i> <span>تشغيل تلاوة خاشعة</span>`;
            isPlaying = false;
        } else {
            audioEl.play().then(() => {
                audioBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i> <span>إيقاف التلاوة</span>`;
                isPlaying = true;
            }).catch(e => {
                console.log("Audio play error", e);
                showToast("تعذر تشغيل الصوت تلقائياً، يرجى التفاعل مع الصفحة أولاً");
            });
        }
    });
}

/* ==========================================================================
   7. ختمة القرآن الكريم الجماعية (Live Quran Khatma)
   ========================================================================== */
let currentKhatmaData = {
    cycle: 1,
    parts: {}
};
let activeKhatmaFilter = "all";

function initKhatma() {
    initDefaultKhatmaParts();
    renderKhatmaGrid();
    initKhatmaFirebaseSync();
    initKhatmaFilters();
    initKhatmaModal();
}

function initDefaultKhatmaParts() {
    const stored = localStorage.getItem("local_khatma_cache");
    if (stored) {
        try {
            currentKhatmaData = JSON.parse(stored);
        } catch (e) {
            buildDefaultKhatmaObject();
        }
    } else {
        buildDefaultKhatmaObject();
    }
}

function buildDefaultKhatmaObject() {
    currentKhatmaData.cycle = currentKhatmaData.cycle || 1;
    currentKhatmaData.parts = {};
    if (typeof QURAN_PARTS_INFO !== "undefined") {
        QURAN_PARTS_INFO.forEach(p => {
            currentKhatmaData.parts[p.id] = {
                id: p.id,
                status: "available",
                reader: "",
                time: 0
            };
        });
    }
}

function initKhatmaFirebaseSync() {
    const db = getFirebaseDb();
    if (!db) return;

    try {
        const khatmaRef = db.ref("khatma");
        khatmaRef.on("value", snapshot => {
            const data = snapshot.val();
            if (data && data.parts) {
                currentKhatmaData = data;
                localStorage.setItem("local_khatma_cache", JSON.stringify(currentKhatmaData));
                updateKhatmaUI();
            } else if (!data) {
                buildDefaultKhatmaObject();
                khatmaRef.set(currentKhatmaData);
                updateKhatmaUI();
            }
        });
    } catch (e) {
        console.warn("Khatma Firebase error:", e);
    }
}

function updateKhatmaUI() {
    const cycle = currentKhatmaData.cycle || 1;
    let completedCount = 0;

    Object.keys(currentKhatmaData.parts || {}).forEach(k => {
        if (currentKhatmaData.parts[k].status === "completed") {
            completedCount++;
        }
    });

    const percent = Math.round((completedCount / 30) * 100);

    const cycleDisplay = document.getElementById("khatma-cycle-display");
    const completedCountEl = document.getElementById("khatma-completed-count");
    const percentEl = document.getElementById("khatma-percent-display");
    const fillEl = document.getElementById("khatma-progress-fill");
    const globalKhatmaStat = document.getElementById("global-khatma-stat");

    if (cycleDisplay) cycleDisplay.textContent = `رقم ${cycle}`;
    if (completedCountEl) completedCountEl.textContent = completedCount;
    if (percentEl) percentEl.textContent = `${percent}%`;
    if (fillEl) fillEl.style.width = `${percent}%`;
    if (globalKhatmaStat) globalKhatmaStat.textContent = cycle;

    renderKhatmaGrid();

    // فحص اكتمال الختمة بالكامل
    if (completedCount === 30) {
        handleKhatmaCompleted(cycle);
    }
}

function handleKhatmaCompleted(currentCycle) {
    const celebrationKey = `khatma_cycle_${currentCycle}_celebrated`;
    if (!sessionStorage.getItem(celebrationKey)) {
        sessionStorage.setItem(celebrationKey, "true");
        playCompletionChime();
        showToast(`مبارك! اكتملت الختمة رقم ${currentCycle} كاملة بحمد الله، ونبدأ الآن ختمة جديدة لروحه 🌿✨`);

        const db = getFirebaseDb();
        if (db) {
            setTimeout(() => {
                const nextCycle = currentCycle + 1;
                buildDefaultKhatmaObject();
                currentKhatmaData.cycle = nextCycle;
                db.ref("khatma").set(currentKhatmaData);
            }, 3000);
        }
    }
}

function renderKhatmaGrid() {
    const container = document.getElementById("khatma-grid-container");
    if (!container || typeof QURAN_PARTS_INFO === "undefined") return;

    container.innerHTML = "";
    const myReserved = JSON.parse(localStorage.getItem("my_reserved_parts") || "{}");

    QURAN_PARTS_INFO.forEach(partInfo => {
        const partState = (currentKhatmaData.parts && currentKhatmaData.parts[partInfo.id]) || {
            status: "available",
            reader: ""
        };

        if (activeKhatmaFilter !== "all" && partState.status !== activeKhatmaFilter) {
            return;
        }

        const card = document.createElement("div");
        card.className = `juz-card status-${partState.status}`;

        let statusText = "متاح للقراءة";
        let actionBtnHTML = "";

        if (partState.status === "available") {
            statusText = "متاح للقراءة";
            actionBtnHTML = `
                <button type="button" class="juz-btn juz-btn-reserve" onclick="openReserveModal(${partInfo.id})">
                    <i class="fa-solid fa-bookmark"></i>
                    <span>احجز لقراءته</span>
                </button>
            `;
        } else if (partState.status === "reading") {
            statusText = "قيد القراءة";
            const isMine = !!myReserved[partInfo.id];
            actionBtnHTML = `
                <button type="button" class="juz-btn juz-btn-complete" onclick="markPartCompleted(${partInfo.id})">
                    <i class="fa-solid fa-check"></i>
                    <span>${isMine ? "أتممت القراءة بحمد الله" : "تأكيد إتمام الجزء"}</span>
                </button>
            `;
        } else if (partState.status === "completed") {
            statusText = "تمت القراءة";
            actionBtnHTML = `
                <div class="juz-btn juz-btn-done">
                    <i class="fa-solid fa-circle-check"></i>
                    <span>تمت القراءة بحمد الله</span>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="juz-header">
                <span class="juz-number-badge">${partInfo.id}</span>
                <span class="juz-badge-tag">${statusText}</span>
            </div>
            <div class="juz-title">${partInfo.name}</div>
            <div class="juz-meta">
                <i class="fa-regular fa-compass text-gold"></i> يبدأ من: ${escapeHTML(partInfo.start)}
                <br>
                <i class="fa-regular fa-file text-muted"></i> الصفحات: ${escapeHTML(partInfo.pages)}
            </div>
            ${partState.reader ? `
                <div class="juz-reader-info">
                    <i class="fa-solid fa-user-check"></i>
                    <span>القارئ: ${escapeHTML(partState.reader)}</span>
                </div>
            ` : ''}
            <div class="juz-actions">
                ${actionBtnHTML}
            </div>
        `;

        container.appendChild(card);
    });
}

function initKhatmaFilters() {
    const filterBtns = document.querySelectorAll(".khatma-filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeKhatmaFilter = btn.dataset.filter || "all";
            renderKhatmaGrid();
        });
    });
}

window.openReserveModal = function(partId) {
    if (typeof QURAN_PARTS_INFO === "undefined") return;
    const partInfo = QURAN_PARTS_INFO.find(p => p.id === partId);
    if (!partInfo) return;

    const modal = document.getElementById("reserve-part-modal");
    const idInput = document.getElementById("khatma-selected-part-id");
    const titleEl = document.getElementById("khatma-modal-title");
    const descEl = document.getElementById("khatma-modal-desc");

    if (idInput) idInput.value = partId;
    if (titleEl) titleEl.textContent = `حجز ${partInfo.name} لروحه الطاهرة`;
    if (descEl) descEl.textContent = `يبدأ من ${partInfo.start} (صفحات ${partInfo.pages}). اكتب اسمك لتأكيد الحجز ونيل الأجر بإذن الله.`;

    if (modal) modal.classList.add("open");
};

function initKhatmaModal() {
    const modal = document.getElementById("reserve-part-modal");
    const closeBtn = document.getElementById("btn-close-khatma-modal");
    const form = document.getElementById("reserve-part-form");
    const readNowBtn = document.getElementById("btn-read-now-in-mushaf");

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("open");
        });
    }

    if (readNowBtn) {
        readNowBtn.addEventListener("click", () => {
            const partId = parseInt(document.getElementById("khatma-selected-part-id").value, 10);
            if (typeof QURAN_PARTS_INFO !== "undefined") {
                const partInfo = QURAN_PARTS_INFO.find(p => p.id === partId);
                if (partInfo && typeof window.goToQuranPage === "function") {
                    const startPage = parseInt(partInfo.pages.split("-")[0].trim(), 10);
                    if (startPage) {
                        window.goToQuranPage(startPage);
                    }
                }
            }
            if (modal) modal.classList.remove("open");
            const readerSection = document.getElementById("quran-reader");
            if (readerSection) readerSection.scrollIntoView({ behavior: "smooth" });
        });
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const partId = parseInt(document.getElementById("khatma-selected-part-id").value, 10);
            const nameInput = document.getElementById("khatma-reader-name");
            const readerName = (nameInput && nameInput.value.trim()) || "فاعل خير";

            reservePart(partId, readerName);
            if (modal) modal.classList.remove("open");
            if (nameInput) nameInput.value = "";
        });
    }
}

function reservePart(partId, readerName) {
    if (!currentKhatmaData.parts) currentKhatmaData.parts = {};
    currentKhatmaData.parts[partId] = {
        id: partId,
        status: "reading",
        reader: readerName,
        time: Date.now()
    };

    const myReserved = JSON.parse(localStorage.getItem("my_reserved_parts") || "{}");
    myReserved[partId] = true;
    localStorage.setItem("my_reserved_parts", JSON.stringify(myReserved));

    const db = getFirebaseDb();
    if (db) {
        db.ref(`khatma/parts/${partId}`).set(currentKhatmaData.parts[partId]);
    } else {
        localStorage.setItem("local_khatma_cache", JSON.stringify(currentKhatmaData));
    }

    updateKhatmaUI();
    playBeadSound(600);
    showToast(`تم حجز الجزء ${partId} باسم (${readerName})، تقبل الله منك ونفع بك 🤲`);
}

window.markPartCompleted = function(partId) {
    if (!currentKhatmaData.parts || !currentKhatmaData.parts[partId]) return;

    const currentReader = currentKhatmaData.parts[partId].reader || "فاعل خير";
    currentKhatmaData.parts[partId].status = "completed";
    currentKhatmaData.parts[partId].time = Date.now();

    const db = getFirebaseDb();
    if (db) {
        db.ref(`khatma/parts/${partId}`).set(currentKhatmaData.parts[partId]);
    } else {
        localStorage.setItem("local_khatma_cache", JSON.stringify(currentKhatmaData));
    }

    updateKhatmaUI();
    playCompletionChime();
    showToast(`هنيئاً لك! كُتبت تلاوة الجزء ${partId} نوراً لروح فقيدنا وفي ميزان حسنات (${currentReader}) 🌿✨`);
};

/* ==========================================================================
   8. أذكار الصباح والمساء التفاعلية (Smart Azkar)
   ========================================================================== */
let currentAzkarMode = "morning";
let azkarProgressMap = {};

function initSmartAzkar() {
    const currentHour = new Date().getHours();
    if (currentHour >= 3 && currentHour < 12) {
        currentAzkarMode = "morning";
    } else {
        currentAzkarMode = "evening";
    }

    updateAzkarModeUI();

    const morningBtn = document.getElementById("tab-morning");
    const eveningBtn = document.getElementById("tab-evening");

    if (morningBtn) {
        morningBtn.addEventListener("click", () => {
            currentAzkarMode = "morning";
            updateAzkarModeUI();
        });
    }

    if (eveningBtn) {
        eveningBtn.addEventListener("click", () => {
            currentAzkarMode = "evening";
            updateAzkarModeUI();
        });
    }
}

function updateAzkarModeUI() {
    const morningBtn = document.getElementById("tab-morning");
    const eveningBtn = document.getElementById("tab-evening");
    const hintText = document.getElementById("azkar-time-hint-text");

    if (currentAzkarMode === "morning") {
        if (morningBtn) morningBtn.classList.add("active");
        if (eveningBtn) eveningBtn.classList.remove("active");
        if (hintText) hintText.textContent = "حان الآن وقت أذكار الصباح وسؤال العافية ☀️";
    } else {
        if (eveningBtn) eveningBtn.classList.add("active");
        if (morningBtn) morningBtn.classList.remove("active");
        if (hintText) hintText.textContent = "حان الآن وقت أذكار المساء وحفظ الليل 🌙";
    }

    renderAzkarCards();
}

function renderAzkarCards() {
    const container = document.getElementById("azkar-cards-container");
    if (!container || typeof MORNING_AZKAR === "undefined") return;

    const list = currentAzkarMode === "morning" ? MORNING_AZKAR : EVENING_AZKAR;
    container.innerHTML = "";

    const cacheKey = `azkar_progress_${currentAzkarMode}_${new Date().toDateString()}`;
    azkarProgressMap = JSON.parse(localStorage.getItem(cacheKey) || "{}");

    let completedCount = 0;

    list.forEach((item) => {
        const remaining = (typeof azkarProgressMap[item.id] === "number") ? azkarProgressMap[item.id] : item.count;
        const isFinished = remaining <= 0;
        if (isFinished) completedCount++;

        const card = document.createElement("div");
        card.className = `azkar-card ${isFinished ? 'is-finished' : ''}`;
        card.id = `azkar-card-${item.id}`;

        card.innerHTML = `
            <div class="azkar-text">"${escapeHTML(item.text)}"</div>
            <div class="azkar-virtue">
                <i class="fa-solid fa-award text-gold"></i>
                <span>${escapeHTML(item.virtue)}</span>
            </div>
            <div class="azkar-footer">
                <div class="azkar-count-badge">
                    <span>التكرار المستحب: <strong>${item.count} مرات</strong></span>
                </div>
                <button type="button" class="azkar-tap-btn" onclick="handleAzkarTap('${item.id}', ${item.count})">
                    <i class="fa-solid ${isFinished ? 'fa-check-double' : 'fa-hand-pointer'}"></i>
                    <span>${isFinished ? 'تم الذكر بنجاح' : `تبقى: ${remaining}`}</span>
                </button>
            </div>
        `;

        container.appendChild(card);
    });

    updateAzkarSummary(completedCount, list.length);
}

window.handleAzkarTap = function(itemId, totalCount) {
    if (typeof MORNING_AZKAR === "undefined") return;
    const list = currentAzkarMode === "morning" ? MORNING_AZKAR : EVENING_AZKAR;
    const cacheKey = `azkar_progress_${currentAzkarMode}_${new Date().toDateString()}`;

    let remaining = (typeof azkarProgressMap[itemId] === "number") ? azkarProgressMap[itemId] : totalCount;
    if (remaining <= 0) return;

    remaining--;
    azkarProgressMap[itemId] = remaining;
    localStorage.setItem(cacheKey, JSON.stringify(azkarProgressMap));

    if ("vibrate" in navigator) navigator.vibrate(25);
    playBeadSound(520 + (remaining * 20));

    const card = document.getElementById(`azkar-card-${itemId}`);
    if (card) {
        const btn = card.querySelector(".azkar-tap-btn span");
        const icon = card.querySelector(".azkar-tap-btn i");
        if (remaining > 0) {
            if (btn) btn.textContent = `تبقى: ${remaining}`;
        } else {
            card.classList.add("is-finished");
            if (btn) btn.textContent = "تم الذكر بنجاح";
            if (icon) icon.className = "fa-solid fa-check-double";
            playCompletionChime();

            // انتقال سلس وتلقائي للذكر التالي
            setTimeout(() => {
                const nextCard = card.nextElementSibling;
                if (nextCard && typeof nextCard.scrollIntoView === "function") {
                    nextCard.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                }
            }, 450);
        }
    }

    let completedCount = 0;
    list.forEach(i => {
        if (azkarProgressMap[i.id] === 0) completedCount++;
    });

    updateAzkarSummary(completedCount, list.length);

    if (completedCount === list.length) {
        showToast("هنيئاً لك! أتممت أذكار يومك كاملة، جعله الله حصناً لك ونوراً لروح فقيدنا 🌿✨");
    }
};

function updateAzkarSummary(completed, total) {
    const completedEl = document.getElementById("azkar-completed-count");
    const totalEl = document.getElementById("azkar-total-count");
    const fillEl = document.getElementById("azkar-progress-fill");

    if (completedEl) completedEl.textContent = completed;
    if (totalEl) totalEl.textContent = total;
    if (fillEl) {
        const pct = total > 0 ? (completed / total) * 100 : 0;
        fillEl.style.width = `${pct}%`;
    }
}

/* ==========================================================================
   9. إذاعة القرآن الكريم المباشرة 24/7 (Live Radio)
   ========================================================================== */
let radioAudio = null;
let isRadioPlaying = false;

function initLiveRadio() {
    radioAudio = document.getElementById("live-radio-audio");
    const fabBtn = document.getElementById("radio-fab-btn");
    const navBtn = document.getElementById("btn-toggle-radio-nav");
    const panel = document.getElementById("radio-panel");
    const closeBtn = document.getElementById("btn-close-radio");
    const playBtn = document.getElementById("btn-radio-play");
    const playIcon = document.getElementById("radio-play-icon");
    const select = document.getElementById("radio-station-select");
    const volumeSlider = document.getElementById("radio-volume-slider");
    const nameEl = document.getElementById("current-station-name");
    const descEl = document.getElementById("current-station-desc");

    if (!radioAudio || typeof RADIO_STATIONS === "undefined") return;

    if (select) {
        select.innerHTML = "";
        RADIO_STATIONS.forEach(st => {
            const opt = document.createElement("option");
            opt.value = st.id;
            opt.textContent = st.name;
            select.appendChild(opt);
        });

        select.addEventListener("change", () => {
            const st = RADIO_STATIONS.find(s => s.id === select.value) || RADIO_STATIONS[0];
            if (nameEl) nameEl.textContent = st.name;
            if (descEl) descEl.textContent = st.desc;
            radioAudio.src = st.url;
            if (isRadioPlaying) {
                radioAudio.play().catch(e => console.warn(e));
            }
        });
    }

    const defaultStation = RADIO_STATIONS[0];
    radioAudio.src = defaultStation.url;

    if (fabBtn && panel) {
        fabBtn.addEventListener("click", () => {
            panel.classList.toggle("open");
        });
    }

    if (closeBtn && panel) {
        closeBtn.addEventListener("click", () => {
            panel.classList.remove("open");
        });
    }

    if (navBtn && panel) {
        navBtn.addEventListener("click", () => {
            panel.classList.toggle("open");
            if (!isRadioPlaying) {
                toggleRadioPlayback();
            }
        });
    }

    function toggleRadioPlayback() {
        if (!isRadioPlaying) {
            const legacyAudio = document.getElementById("quran-audio");
            if (legacyAudio && !legacyAudio.paused) {
                legacyAudio.pause();
                const btnToggleAudio = document.getElementById("btn-toggle-audio");
                if (btnToggleAudio) btnToggleAudio.classList.remove("active");
            }

            radioAudio.play().then(() => {
                isRadioPlaying = true;
                if (fabBtn) fabBtn.classList.add("is-playing");
                if (navBtn) navBtn.classList.add("active");
                if (playIcon) playIcon.className = "fa-solid fa-pause";
                showToast("جاري الاستماع لإذاعة القرآن الكريم 📻🌿");
            }).catch(err => {
                console.warn("Radio play error:", err);
                showToast("تعذر تشغيل البث المباشر حالياً، يرجى المحاولة بعد قليل");
            });
        } else {
            radioAudio.pause();
            isRadioPlaying = false;
            if (fabBtn) fabBtn.classList.remove("is-playing");
            if (navBtn) navBtn.classList.remove("active");
            if (playIcon) playIcon.className = "fa-solid fa-play";
        }
    }

    if (playBtn) {
        playBtn.addEventListener("click", toggleRadioPlayback);
    }

    if (volumeSlider) {
        volumeSlider.addEventListener("input", (e) => {
            radioAudio.volume = parseFloat(e.target.value);
        });
    }
}

/* ==========================================================================
   10. تطبيق الهاتف التقدمي (PWA Service Worker)
   ========================================================================== */
function initPWA() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("./sw.js").then(reg => {
                console.log("PWA Service Worker registered successfully! Scope:", reg.scope);
            }).catch(err => {
                console.warn("PWA Service Worker registration failed:", err);
            });
        });
    }
}

/* ==========================================================================
   أدوات مساعدة: الصوت التخليقي والإشعارات (Web Audio Synth & Toast)
   ========================================================================== */
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }
    return audioCtx;
}

// صوت خرزة السبحة اللطيف
function playBeadSound(frequency = 500) {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.09);
    } catch (e) {
        // تجاهل في حالة حظر الصوت
    }
}

// نغمة اكتمال الورد
function playCompletionChime() {
    try {
        const ctx = getAudioContext();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // نغمات مريحة C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const startTime = ctx.currentTime + idx * 0.1;

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, startTime);

            gain.gain.setValueAtTime(0.25, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(startTime);
            osc.stop(startTime + 0.45);
        });
    } catch (e) {
        // تجاهل
    }
}

// إشعار التوست المنبثق
function showToast(message) {
    let container = document.querySelector(".toast-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="fa-solid fa-moon text-gold"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.4s ease";
        setTimeout(() => toast.remove(), 400);
    }, 3800);
}

// حماية من حقن النصوص (XSS)
function escapeHTML(str) {
    if (!str) return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// تمرير شبكة أجزاء الختمة أفقياً في شاشات الجوال
window.scrollKhatmaGrid = function(direction) {
    const grid = document.getElementById("khatma-grid-container");
    if (!grid) return;
    const scrollAmount = 270;
    const delta = direction === "left" ? -scrollAmount : scrollAmount;
    grid.scrollBy({ left: delta, behavior: "smooth" });
};

// تمرير بطاقات الأذكار أفقياً في شاشات الجوال
window.scrollAzkarContainer = function(direction) {
    const container = document.getElementById("azkar-cards-container");
    if (!container) return;
    const card = container.querySelector(".azkar-card");
    const scrollAmount = card ? (card.offsetWidth + 20) : 320;
    const delta = direction === "left" ? -scrollAmount : scrollAmount;
    container.scrollBy({ left: delta, behavior: "smooth" });
};


