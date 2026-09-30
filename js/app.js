/**
 * المنطق البرمجي لموقع صدقة جارية على روح جدي
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. تهيئة اسم الجد والمعلومات الرئيسية
    initDeceasedInfo();

    // 2. تهيئة الأدعية وسلايدر Swiper
    initPrayersSwiper();

    // 3. تهيئة السبحة الإلكترونية
    initTasbeeh();

    // 4. تهيئة نافذة إضافة دعاء
    initAddPrayerModal();

    // 5. تهيئة أزرار المشاركة والنسخ
    initShareButtons();

    // 6. تهيئة مشغل التلاوة الخاشعة
    initAudioPlayer();
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

    // 2. إذا تم تفعيل Firebase، ابدأ المزامنة السحابية اللحظية مع جميع الزوار في العالم
    initFirebaseRealtimeSync();
}

function initFirebaseRealtimeSync() {
    if (typeof firebase === "undefined" || typeof isFirebaseConfigured !== "function" || !isFirebaseConfigured()) {
        console.log("Firebase not configured yet; using local storage mode.");
        return;
    }

    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(FIREBASE_CONFIG);
        }
        firebaseDb = firebase.database();
        prayersRef = firebaseDb.ref("prayers");

        // استماع لحظي لأي أدعية جديدة يضيفها أي شخص حول العالم
        prayersRef.limitToLast(60).on("value", (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const cloudPrayers = [];
                Object.keys(data).forEach((key) => {
                    cloudPrayers.push({
                        id: key,
                        isCloud: true,
                        author: data[key].author || "فاعل خير",
                        text: data[key].text || "",
                        date: data[key].date || "مؤخراً",
                        amenCount: data[key].amenCount || 0,
                        timestamp: data[key].timestamp || 0
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

        slide.innerHTML = `
            <div class="prayer-card">
                <div class="prayer-card-header">
                    <div class="prayer-author">
                        <div class="author-avatar">
                            <i class="fa-solid fa-hands-praying"></i>
                        </div>
                        <span class="author-name">${escapeHTML(prayer.author)}</span>
                    </div>
                    <span class="prayer-date">${escapeHTML(prayer.date)}</span>
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
   3. السبحة الإلكترونية للتسبيح على روحه
   ========================================================================== */
let activeZkrIndex = 0;
let currentZkrCount = 0;
let totalTasbeehSession = 0;
const RADIUS = 110;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function initTasbeeh() {
    renderAzkarList();
    loadActiveZkr(0);

    // استرجاع الإجمالي التاريخي المخزن
    const storedTotal = localStorage.getItem("tasbeeh_lifetime_total") || "0";
    totalTasbeehSession = parseInt(storedTotal, 10);
    updateTotalDisplays();

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

    // حفظ الإجمالي
    localStorage.setItem("tasbeeh_lifetime_total", totalTasbeehSession.toString());

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
        showToast(`هنيئاً لك! أتممت ${zkr.target} تسبيحة، جعلها الله في ميزان حسنات فقيدنا 🌿`);
        currentZkrCount = 0;
        setTimeout(updateCounterDisplay, 700);
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

            const newPrayer = {
                id: "user_" + Date.now(),
                author: author,
                text: text,
                date: "الآن",
                amenCount: 1
            };

            // 1. إذا كان Firebase متصلاً، ارفع الدعاء للسحابة ليظهر فوراً لجميع الزوار حول العالم
            if (prayersRef) {
                try {
                    prayersRef.push({
                        author: author,
                        text: text,
                        date: "الآن",
                        timestamp: (typeof firebase !== 'undefined' && firebase.database && firebase.database.ServerValue) ? firebase.database.ServerValue.TIMESTAMP : Date.now(),
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
