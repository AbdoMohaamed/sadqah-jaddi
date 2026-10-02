/**
 * الوحدات الإضافية الشاملة لتطبيق زاد المسلم
 * 1. روابط الصدقة الجارية المخصصة (Custom Memorial Links)
 * 2. الأربعون النووية كاملة (42 Hadiths)
 * 3. أسماء الله الحسنى الـ 99 (99 Names of Allah)
 * 4. مواسم الطاعات والتقويم الهجري والعد التنازلي (Seasons of Worship)
 * 5. دليل وفتاوى أحكام الجنائز والصدقة الجارية (Islamic FAQ)
 * 6. نظام التنبيهات والإشعارات الذكية (Smart Notifications)
 */

document.addEventListener("DOMContentLoaded", () => {
    initMobileNavDrawer();
    initCustomShareLink();
    initNawawiHadiths();
    initAsmaaAllah();
    initSeasonsOfWorship();
    initIslamicGuideFaq();
    initSmartNotifications();
    initEnhancedCardGenerator();
    initEnhancedCategorizedDuas();
    initDailySpiritualMessage();
    initIslamicStories();
    initIslamicQuiz();
    initLiveRadioWidgetWithSleepTimer();
    initGlobalCommunityCounter();
});

/* ==========================================================================
   1. ميزة إنشاء رابط صدقة جارية مخصص لفقيد الزائر (Custom Memorial Links)
   ========================================================================== */
function initCustomShareLink() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const customName = urlParams.get("name");
        const customRel = urlParams.get("rel") || "فقيدنا الغالي";

        if (customName && customName.trim()) {
            const formattedName = `${customRel} (${decodeURIComponent(customName.trim())})`;
            if (typeof DECEASED_INFO !== "undefined") {
                DECEASED_INFO.name = formattedName;
            }
            
            document.querySelectorAll(".deceased-name").forEach(el => {
                el.textContent = formattedName;
            });

            const charityBanner = document.querySelector(".charity-memorial-text");
            if (charityBanner) {
                charityBanner.innerHTML = `تطبيق إسلامي متاح مجاناً لوجه الله تعالى • <strong>صدقة جارية على روح ${formattedName} وموتى المسلمين جميعاً</strong> — نسألكم الفاتحة وصالح الدعاء.`;
            }
        }
    } catch(e) {
        console.error("Error parsing URL params:", e);
    }

    const modal = document.getElementById("custom-share-modal");
    const openBtns = document.querySelectorAll("#btn-open-custom-share-nav, #btn-open-custom-share-hero, .btn-open-custom-share");
    const closeBtn = document.getElementById("btn-close-custom-share-modal");
    const nameInput = document.getElementById("custom-deceased-name-input");
    const relSelect = document.getElementById("custom-deceased-relation-select");
    const urlOutput = document.getElementById("generated-share-url");
    const copyBtn = document.getElementById("btn-copy-custom-url");
    const whatsappBtn = document.getElementById("btn-share-custom-whatsapp");

    openBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener("click", () => {
                if (modal) modal.classList.add("open");
                updateGeneratedUrl();
            });
        }
    });

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("open");
        });
    }

    function updateGeneratedUrl() {
        if (!urlOutput) return;
        const nameVal = nameInput ? nameInput.value.trim() : "";
        const relVal = relSelect ? relSelect.value : "فقيدنا الغالي";
        const baseUrl = window.location.origin + window.location.pathname;

        if (nameVal) {
            const fullUrl = `${baseUrl}?name=${encodeURIComponent(nameVal)}&rel=${encodeURIComponent(relVal)}`;
            urlOutput.value = fullUrl;
        } else {
            urlOutput.value = baseUrl;
        }
    }

    if (nameInput) nameInput.addEventListener("input", updateGeneratedUrl);
    if (relSelect) relSelect.addEventListener("change", updateGeneratedUrl);

    if (copyBtn && urlOutput) {
        copyBtn.addEventListener("click", () => {
            copyTextToClipboard(urlOutput.value);
            showToast("تم نسخ رابط الصدقة المخصص بنجاح 📋");
        });
    }

    if (whatsappBtn && urlOutput) {
        whatsappBtn.addEventListener("click", () => {
            const nameVal = nameInput ? nameInput.value.trim() : "فقيدنا الغالي";
            const relVal = relSelect ? relSelect.value : "فقيدنا الغالي";
            const msg = `🌿 *صدقة جارية ودعاء لروح ${relVal} (${nameVal})*\n\nأهديكم هذا التطبيق الإسلامي الشامل (زاد المسلم): للقرآن الكريم ومواقيت الصلاة والأذكار والسبحة الإلكترونية ليكون صدقة جارية ونوراً على روحه.\n\n📲 ادخل واكسب الأجر وادعُ له:\n${urlOutput.value}`;
            const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
            window.open(waUrl, "_blank");
        });
    }
}

/* ==========================================================================
   2. قسم الأربعين النووية الشاملة (42 Hadiths)
   ========================================================================== */
let currentNawawiAudio = null;
let currentPlayingHadithId = null;

function initNawawiHadiths() {
    const grid = document.getElementById("nawawi-grid");
    const searchInput = document.getElementById("nawawi-search-input");
    const filterPills = document.querySelectorAll("#nawawi-filter-bar .nawawi-filter-pill");

    if (!grid || typeof NAWAWI_HADITHS === "undefined") return;

    let activeCat = "all";
    let searchQuery = "";

    function renderHadiths() {
        grid.innerHTML = "";
        const filtered = NAWAWI_HADITHS.filter(h => {
            const matchCat = activeCat === "all" || h.category === activeCat;
            const matchQuery = !searchQuery || 
                h.title.includes(searchQuery) || 
                h.text.includes(searchQuery) || 
                h.narrator.includes(searchQuery) || 
                h.explanation.includes(searchQuery);
            return matchCat && matchQuery;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                    <i class="fa-solid fa-book-open" style="font-size: 2.5rem; color: var(--gold-400); margin-bottom: 1rem;"></i>
                    <p style="font-size: 1.1rem;">لا توجد أحاديث تطابق بحثك، جرّب كلمة أخرى.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(h => {
            const card = document.createElement("div");
            card.className = "hadith-card";
            const isPlaying = currentPlayingHadithId === h.id;

            card.innerHTML = `
                <div class="hadith-card-header">
                    <span class="hadith-number-badge">الحديث ${h.id}</span>
                    <span class="hadith-category-tag">${h.category}</span>
                </div>
                <h3 class="hadith-title">${h.title}</h3>
                <div class="hadith-narrator"><i class="fa-solid fa-user-pen text-gold"></i> عن ${h.narrator}</div>
                <div class="hadith-text">${h.text}</div>
                
                <button type="button" class="hadith-details-toggle">
                    <i class="fa-solid fa-chevron-down text-gold"></i>
                    <span>الشرح والفوائد التربوية</span>
                </button>
                
                <div class="hadith-details-body">
                    <div style="margin-bottom: 0.75rem;">
                        <strong style="color: var(--gold-300);"><i class="fa-solid fa-lightbulb"></i> الشرح الميسر:</strong>
                        <p style="margin: 0.3rem 0 0.6rem 0;">${h.explanation}</p>
                    </div>
                    <div>
                        <strong style="color: var(--gold-300);"><i class="fa-solid fa-check-double"></i> من فوائد الحديث:</strong>
                        <ul style="padding-right: 1.2rem; margin: 0.3rem 0 0 0;">
                            ${h.benefits.map(b => `<li>${b}</li>`).join("")}
                        </ul>
                    </div>
                </div>

                <div class="hadith-actions">
                    <button type="button" class="btn-hadith-audio ${isPlaying ? 'playing' : ''}" data-id="${h.id}" data-audio="${h.audioUrl}">
                        <i class="fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}"></i>
                        <span>${isPlaying ? 'إيقاف' : 'استماع صوتي'}</span>
                    </button>

                    <div class="hadith-card-btns">
                        <button type="button" class="btn btn-outline btn-sm btn-copy-hadith" title="نسخ الحديث">
                            <i class="fa-solid fa-copy"></i>
                        </button>
                        <button type="button" class="btn btn-outline btn-sm btn-share-hadith" title="مشاركة لواتساب">
                            <i class="fa-brands fa-whatsapp" style="color: #25D366;"></i>
                        </button>
                    </div>
                </div>
            `;

            const toggleBtn = card.querySelector(".hadith-details-toggle");
            const detailsBody = card.querySelector(".hadith-details-body");
            if (toggleBtn && detailsBody) {
                toggleBtn.addEventListener("click", () => {
                    const isOpen = detailsBody.classList.toggle("open");
                    toggleBtn.querySelector("i").style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
                });
            }

            const audioBtn = card.querySelector(".btn-hadith-audio");
            if (audioBtn) {
                audioBtn.addEventListener("click", () => {
                    playHadithAudio(h.id, h.audioUrl, h.text);
                });
            }

            const copyBtn = card.querySelector(".btn-copy-hadith");
            if (copyBtn) {
                copyBtn.addEventListener("click", () => {
                    const textToCopy = `📖 *الحديث ${h.id} من الأربعين النووية:* [${h.title}]\n\nعن ${h.narrator}:\n${h.text}\n\n💡 *الشرح:* ${h.explanation}\n\n🕊️ زاد المسلم: https://abdomohaamed.github.io/sadqah-jaddi/`;
                    copyTextToClipboard(textToCopy);
                    showToast("تم نسخ الحديث بنجاح 📋");
                });
            }

            const shareBtn = card.querySelector(".btn-share-hadith");
            if (shareBtn) {
                shareBtn.addEventListener("click", () => {
                    const deceasedName = (typeof DECEASED_INFO !== "undefined" && DECEASED_INFO.name) ? DECEASED_INFO.name : "فقيدنا الغالي";
                    const msg = `📖 *الحديث ${h.id} من الأربعين النووية:* [${h.title}]\n\nعن ${h.narrator}:\n${h.text}\n\n🤍 صدقة جارية لروح (${deceasedName})\n📲 للمزيد من الأحاديث والتلاوات: https://abdomohaamed.github.io/sadqah-jaddi/`;
                    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
                    window.open(waUrl, "_blank");
                });
            }

            grid.appendChild(card);
        });
    }

    function updateAudioButtonsState() {
        document.querySelectorAll(".btn-hadith-audio").forEach(btn => {
            const btnId = parseInt(btn.getAttribute("data-id"), 10);
            if (btnId === currentPlayingHadithId) {
                btn.classList.add("playing");
                btn.style.background = "var(--gold-400)";
                btn.style.color = "#070d18";
                btn.innerHTML = '<i class="fa-solid fa-pause"></i> <span>إيقاف التلاوة</span>';
            } else {
                btn.classList.remove("playing");
                btn.style.background = "rgba(212, 175, 55, 0.15)";
                btn.style.color = "var(--gold-300)";
                btn.innerHTML = '<i class="fa-solid fa-play"></i> <span>استماع صوتي</span>';
            }
        });
    }

    function playHadithAudio(id, url, hadithText) {
        if (currentPlayingHadithId === id && currentNawawiAudio && !currentNawawiAudio.paused) {
            currentNawawiAudio.pause();
            currentPlayingHadithId = null;
            updateAudioButtonsState();
            return;
        }

        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }

        if (currentNawawiAudio) {
            currentNawawiAudio.pause();
            currentNawawiAudio = null;
        }

        currentPlayingHadithId = id;
        updateAudioButtonsState();

        currentNawawiAudio = new Audio(url);
        currentNawawiAudio.play().then(() => {
            showToast("جاري الاستماع للحديث النبوي الشريف 🎧");
        }).catch(e => {
            console.warn("Audio play error, trying speech synthesis fallback:", e);
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(hadithText);
                utterance.lang = 'ar-SA';
                utterance.rate = 0.9;
                utterance.onend = () => {
                    currentPlayingHadithId = null;
                    updateAudioButtonsState();
                };
                window.speechSynthesis.speak(utterance);
                showToast("جاري تلاوة الحديث 🔊");
            } else {
                showToast("تعذر تشغيل التسجيل الصوتي.");
                currentPlayingHadithId = null;
                updateAudioButtonsState();
            }
        });

        currentNawawiAudio.onended = () => {
            currentPlayingHadithId = null;
            updateAudioButtonsState();
        };

        currentNawawiAudio.onerror = () => {
            console.warn("Audio file error, falling back to speech synthesis.");
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(hadithText);
                utterance.lang = 'ar-SA';
                utterance.rate = 0.9;
                utterance.onend = () => {
                    currentPlayingHadithId = null;
                    updateAudioButtonsState();
                };
                window.speechSynthesis.speak(utterance);
            } else {
                showToast("تعذر تشغيل الصوت.");
                currentPlayingHadithId = null;
                updateAudioButtonsState();
            }
        };
    }

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.trim();
            renderHadiths();
        });
    }

    filterPills.forEach(pill => {
        pill.addEventListener("click", () => {
            filterPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            activeCat = pill.getAttribute("data-cat");
            renderHadiths();
        });
    });

    renderHadiths();
}

/* ==========================================================================
   3. قسم ومكتبة أسماء الله الحسنى الـ 99 (Asmaa Allah)
   ========================================================================== */
function initAsmaaAllah() {
    const grid = document.getElementById("asmaa-grid");
    const filterPills = document.querySelectorAll("#asmaa-filter-bar .nawawi-filter-pill");
    const modal = document.getElementById("asmaa-detail-modal");
    const closeBtn = document.getElementById("btn-close-asmaa-modal");

    const modalNum = document.getElementById("modal-asmaa-num");
    const modalName = document.getElementById("modal-asmaa-name");
    const modalCat = document.getElementById("modal-asmaa-cat");
    const modalMeaning = document.getElementById("modal-asmaa-meaning");
    const modalVirtue = document.getElementById("modal-asmaa-virtue");
    const copyBtn = document.getElementById("btn-copy-asmaa");
    const shareBtn = document.getElementById("btn-share-asmaa");

    let currentSelectedName = null;

    if (!grid || typeof ASMAA_ALLAH === "undefined") return;

    let activeCat = "all";

    function renderAsmaa() {
        grid.innerHTML = "";
        const filtered = ASMAA_ALLAH.filter(item => {
            return activeCat === "all" || item.category === activeCat;
        });

        filtered.forEach(item => {
            const card = document.createElement("div");
            card.className = "asmaa-card";
            card.innerHTML = `
                <div class="asmaa-card-num">${item.id}</div>
                <div class="asmaa-card-name">${item.name}</div>
                <div class="asmaa-card-cat">${item.category}</div>
                <div class="asmaa-card-meaning">${item.meaning}</div>
            `;

            card.addEventListener("click", () => {
                openAsmaaDetail(item);
            });

            grid.appendChild(card);
        });
    }

    function openAsmaaDetail(item) {
        currentSelectedName = item;
        if (modalNum) modalNum.textContent = item.id;
        if (modalName) modalName.textContent = item.name;
        if (modalCat) modalCat.textContent = `أسماء ${item.category}`;
        if (modalMeaning) modalMeaning.textContent = item.meaning;
        if (modalVirtue) modalVirtue.textContent = item.virtue;

        if (modal) modal.classList.add("open");
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("open");
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            if (!currentSelectedName) return;
            const textToCopy = `✨ *اسم الله الأعظم:* [${currentSelectedName.name}]\n\n📖 *المعنى:* ${currentSelectedName.meaning}\n\n🤲 *الثمرة الإيمانية:* ${currentSelectedName.virtue}\n\n🕊️ زاد المسلم: https://abdomohaamed.github.io/sadqah-jaddi/`;
            copyTextToClipboard(textToCopy);
            showToast(`تم نسخ اسم (${currentSelectedName.name}) ومعناه بنجاح 📋`);
        });
    }

    if (shareBtn) {
        shareBtn.addEventListener("click", () => {
            if (!currentSelectedName) return;
            const deceasedName = (typeof DECEASED_INFO !== "undefined" && DECEASED_INFO.name) ? DECEASED_INFO.name : "فقيدنا الغالي";
            const msg = `✨ *اسم الله الأعظم:* [${currentSelectedName.name}]\n\n📖 *المعنى:* ${currentSelectedName.meaning}\n\n🤲 *الثمرة والدعاء به:* ${currentSelectedName.virtue}\n\n🤍 صدقة جارية لروح (${deceasedName})\n📲 مكتبة أسماء الله الحسنى: https://abdomohaamed.github.io/sadqah-jaddi/`;
            const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
            window.open(waUrl, "_blank");
        });
    }

    filterPills.forEach(pill => {
        pill.addEventListener("click", () => {
            filterPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            activeCat = pill.getAttribute("data-cat");
            renderAsmaa();
        });
    });

    renderAsmaa();
}

/* ==========================================================================
   4. مواسم الطاعات والتقويم والعد التنازلي للمناسبات الإسلامية
   ========================================================================== */
function initSeasonsOfWorship() {
    const grid = document.getElementById("seasons-grid");
    if (!grid) return;

    function getHijriDateDetails(date) {
        try {
            const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
            });
            const parts = formatter.formatToParts(date);
            let day = 1, month = 1, year = 1448;
            for (const p of parts) {
                if (p.type === 'day') day = parseInt(p.value, 10);
                if (p.type === 'month') month = parseInt(p.value, 10);
                if (p.type === 'year') year = parseInt(p.value, 10);
            }
            return { day, month, year };
        } catch (e) {
            const jd = Math.floor(date.getTime() / 86400000) + 2440587.5;
            const l = Math.floor(jd - 1948440 + 10632);
            const n = Math.floor((l - 1) / 10631);
            const l2 = l - 10631 * n + 354;
            const j = (Math.floor((10985 - l2) / 5316)) * (Math.floor((50 * l2) / 17719)) + (Math.floor(l2 / 5670)) * (Math.floor((43 * l2) / 15238));
            const l3 = l2 - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
            const m = Math.floor((24 * l3) / 709);
            const d = l3 - Math.floor((709 * m) / 24);
            const y = 30 * n + j - 30;
            return { day: d, month: m, year: y };
        }
    }

    function findNextHijriEventDate(targetMonth, targetDay) {
        const now = new Date();
        const testDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        for (let i = 0; i <= 400; i++) {
            const h = getHijriDateDetails(testDate);
            if (h.month === targetMonth && h.day === targetDay) {
                return testDate;
            }
            testDate.setDate(testDate.getDate() + 1);
        }
        return new Date(now.getTime() + 180 * 86400000);
    }

    function getNextWhiteDaysDate() {
        const now = new Date();
        const testDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        for (let i = 0; i <= 35; i++) {
            const h = getHijriDateDetails(testDate);
            if (h.day === 13) {
                return testDate;
            }
            testDate.setDate(testDate.getDate() + 1);
        }
        return new Date(now.getTime() + 14 * 86400000);
    }

    function getNextMondayOrThursday() {
        const now = new Date();
        const testDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        testDate.setDate(testDate.getDate() + 1);
        for (let i = 0; i < 7; i++) {
            const day = testDate.getDay();
            if (day === 1 || day === 4) { // 1: الاثنين، 4: الخميس
                return testDate;
            }
            testDate.setDate(testDate.getDate() + 1);
        }
        return testDate;
    }

    function getSeasonsList() {
        const list = [
            {
                title: "صيام الإثنين والخميس القادم 🌿",
                icon: "fa-hands-praying",
                dateStr: "سنة نبوية مؤكدة",
                targetDate: getNextMondayOrThursday(),
                virtue: "تعرض الأعمال على الله تعالى يومي الإثنين والخميس، وأحب أن يعرض عملي وأنا صائم."
            },
            {
                title: "الأيام البيض القادمة 🌕",
                icon: "fa-circle",
                dateStr: "13، 14، 15 من كل شهر هجري",
                targetDate: getNextWhiteDaysDate(),
                virtue: "صيام ثلاثة أيام من كل شهر تعدل صيام الدهر كله كما جاء في الحديث الصحيح."
            },
            {
                title: "شهر رمضان المبارك 🌙",
                icon: "fa-moon",
                dateStr: "1 رمضان المبارك",
                targetDate: findNextHijriEventDate(9, 1),
                virtue: "شهر الصيام والقرآن، فيه ليلة القدر خير من ألف شهر، وتفتح فيه أبواب الجنان."
            },
            {
                title: "وقفة عرفات المباركة 🕋",
                icon: "fa-kaaba",
                dateStr: "9 ذو الحجة",
                targetDate: findNextHijriEventDate(12, 9),
                virtue: "أعظم أيام الدهر، وصيامه لغير الحاج يكفر ذنوب سنة ماضية وسنة باقية."
            },
            {
                title: "عيد الأضحى المبارك 🐑",
                icon: "fa-heart",
                dateStr: "10 ذو الحجة",
                targetDate: findNextHijriEventDate(12, 10),
                virtue: "يوم النحر، أعظم الأيام عند الله، يوم فرح وشكر وإطعام الطعام وصلة الأرحام."
            },
            {
                title: "يوم عاشوراء المبارك 🌊",
                icon: "fa-water",
                dateStr: "10 محرم",
                targetDate: findNextHijriEventDate(1, 10),
                virtue: "اليوم الذي نجى الله فيه موسى عليه السلام، وصيامه يكفر ذنوب السنة الماضية."
            }
        ];

        // ترتيب المواسم تصاعدياً بحسب الأقرب تاريخاً
        list.sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime());
        return list;
    }

    function renderSeasons() {
        grid.innerHTML = "";
        const now = new Date().getTime();
        const seasons = getSeasonsList();

        seasons.forEach(season => {
            const diff = season.targetDate.getTime() - now;
            const isToday = diff <= 0 && diff > -86400000;
            const validDiff = Math.max(0, diff);

            const days = Math.floor(validDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((validDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((validDiff % (1000 * 60 * 60)) / (1000 * 60));

            const card = document.createElement("div");
            card.className = "season-card";
            card.innerHTML = `
                <div class="season-card-icon"><i class="fa-solid ${season.icon}"></i></div>
                <h3 class="season-card-title">${season.title}</h3>
                <div class="season-card-date"><i class="fa-solid fa-calendar-day text-gold"></i> ${season.dateStr}</div>
                
                <div class="season-countdown-box">
                    ${isToday ? `
                        <div style="width: 100%; color: var(--emerald-400); font-weight: 700; font-size: 1.05rem; text-align: center; padding: 0.3rem;">
                            <i class="fa-solid fa-star"></i> اليوم هو الموعد المبارك! تقبل الله طاعتكم
                        </div>
                    ` : `
                        <div class="countdown-unit">
                            <span class="countdown-val">${days}</span>
                            <span class="countdown-label">يوم</span>
                        </div>
                        <div class="countdown-unit">
                            <span class="countdown-val">${hours}</span>
                            <span class="countdown-label">ساعة</span>
                        </div>
                        <div class="countdown-unit">
                            <span class="countdown-val">${minutes}</span>
                            <span class="countdown-label">دقيقة</span>
                        </div>
                    `}
                </div>

                <div class="season-card-virtue">
                    ${season.virtue}
                </div>
            `;
            grid.appendChild(card);
        });
    }

    renderSeasons();
    setInterval(renderSeasons, 60000);
}

/* ==========================================================================
   5. دليل وفتاوى أحكام الجنائز والصدقة الجارية (Islamic FAQ)
   ========================================================================== */
function initIslamicGuideFaq() {
    const list = document.getElementById("islamic-faq-list");
    if (!list || typeof ISLAMIC_DECEASED_GUIDE === "undefined") return;

    list.innerHTML = "";
    ISLAMIC_DECEASED_GUIDE.forEach((item, index) => {
        const faqItem = document.createElement("div");
        faqItem.className = `faq-item ${index === 0 ? 'active' : ''}`;
        faqItem.innerHTML = `
            <div class="faq-header">
                <h4 class="faq-question">
                    <i class="fa-solid fa-circle-question text-gold"></i>
                    <span>${item.title}</span>
                </h4>
                <i class="fa-solid fa-chevron-down faq-icon-arrow"></i>
            </div>
            <div class="faq-body">
                ${item.content}
            </div>
        `;

        const header = faqItem.querySelector(".faq-header");
        if (header) {
            header.addEventListener("click", () => {
                faqItem.classList.toggle("active");
            });
        }

        list.appendChild(faqItem);
    });
}

/* ==========================================================================
   6. نظام التنبيهات والإشعارات الذكية للطاعات (Smart Notifications)
   ========================================================================== */
function initSmartNotifications() {
    const modal = document.getElementById("notifications-modal");
    const openBtns = document.querySelectorAll("#btn-open-notifications-nav, #btn-open-notifications-hero, .btn-open-notifications");
    const closeBtn = document.getElementById("btn-close-notifications-modal");
    const requestBtn = document.getElementById("btn-request-notification-perm");

    const chkMorning = document.getElementById("notify-morning-azkar");
    const chkEvening = document.getElementById("notify-evening-azkar");
    const chkFriday = document.getElementById("notify-friday-kahf");
    const chkFasting = document.getElementById("notify-fasting-days");
    const chkAdhan = document.getElementById("notify-adhan-calls");

    try {
        const savedSettings = JSON.parse(localStorage.getItem("smart_notify_settings") || "{}");
        if (chkMorning && savedSettings.morning !== undefined) chkMorning.checked = savedSettings.morning;
        if (chkEvening && savedSettings.evening !== undefined) chkEvening.checked = savedSettings.evening;
        if (chkFriday && savedSettings.friday !== undefined) chkFriday.checked = savedSettings.friday;
        if (chkFasting && savedSettings.fasting !== undefined) chkFasting.checked = savedSettings.fasting;
        if (chkAdhan && savedSettings.adhan !== undefined) chkAdhan.checked = savedSettings.adhan;
    } catch(e) {}

    openBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener("click", () => {
                if (modal) modal.classList.add("open");
            });
        }
    });

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("open");
        });
    }

    if (requestBtn) {
        requestBtn.addEventListener("click", async () => {
            const settings = {
                morning: chkMorning ? chkMorning.checked : true,
                evening: chkEvening ? chkEvening.checked : true,
                friday: chkFriday ? chkFriday.checked : true,
                fasting: chkFasting ? chkFasting.checked : true,
                adhan: chkAdhan ? chkAdhan.checked : true
            };
            localStorage.setItem("smart_notify_settings", JSON.stringify(settings));

            if ("Notification" in window) {
                if (Notification.permission === "granted") {
                    showToast("تم تفعيل وتحديث إعدادات التنبيهات بنجاح 🔔✨");
                    if (modal) modal.classList.remove("open");
                } else if (Notification.permission !== "denied") {
                    const permission = await Notification.requestPermission();
                    if (permission === "granted") {
                        showToast("تم تفعيل إشعارات المتصفح بنجاح! جزاكم الله خيراً 🌿");
                        new Notification("زاد المسلم • صدقة جارية", {
                            body: "أهلاً بك! تم تفعيل تنبيهات الأذكار والصلوات بنجاح لتنال الأجر دائماً 🤲",
                            icon: "assets/icon.svg"
                        });
                        if (modal) modal.classList.remove("open");
                    } else {
                        showToast("يرجى السماح بالإشعارات من إعدادات المتصفح لتصلك التنبيهات.");
                    }
                } else {
                    showToast("الإشعارات محظورة في متصفحك. يرجى تفعيلها من إعدادات الموقع.");
                }
            } else {
                showToast("متصفحك لا يدعم الإشعارات، لكن تم حفظ التفضيلات محلياً.");
                if (modal) modal.classList.remove("open");
            }
        });
    }
}

/* ==========================================================================
   7. ترقية صانع بطاقات الأدعية والمشاركات الاجتماعية (Enhanced Card Generator)
   ========================================================================== */
let currentCardFormat = "story"; // 'story' | 'card' | 'post'
let currentCardTheme = "royal-navy"; // 'royal-navy' | 'emerald' | 'burgundy' | 'parchment'

function initEnhancedCardGenerator() {
    const formatPills = document.querySelectorAll("#dua-format-pills .theme-pill");
    const themePills = document.querySelectorAll(".dua-theme-pills .theme-pill[data-theme]");

    formatPills.forEach(pill => {
        pill.addEventListener("click", () => {
            formatPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            currentCardFormat = pill.getAttribute("data-format") || "story";
            if (typeof drawEnhancedDuaCard === "function") {
                drawEnhancedDuaCard();
            }
        });
    });

    themePills.forEach(pill => {
        pill.addEventListener("click", () => {
            themePills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            currentCardTheme = pill.getAttribute("data-theme") || "royal-navy";
            if (typeof drawEnhancedDuaCard === "function") {
                drawEnhancedDuaCard();
            }
        });
    });

    // إعادة توجيه أزرار التحميل والمشاركة
    const downloadBtn = document.getElementById("btn-download-dua-image");
    const shareBtn = document.getElementById("btn-share-dua-image");

    if (downloadBtn) {
        downloadBtn.onclick = downloadEnhancedDuaCard;
    }

    if (shareBtn) {
        shareBtn.onclick = shareEnhancedDuaCard;
    }

    // ربط الحقول بإعادة الرسم
    const recipientInput = document.getElementById("dua-card-recipient-input");
    const templateSelect = document.getElementById("dua-template-select");
    const customInput = document.getElementById("custom-dua-input");

    if (recipientInput) recipientInput.addEventListener("input", drawEnhancedDuaCard);
    if (templateSelect) templateSelect.addEventListener("change", drawEnhancedDuaCard);
    if (customInput) customInput.addEventListener("input", drawEnhancedDuaCard);

    // الرسم المبدئي
    setTimeout(drawEnhancedDuaCard, 300);
}

function drawEnhancedDuaCard() {
    const canvas = document.getElementById("dua-card-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = 1080;
    let height = 1920; // Default: Story 9:16

    if (currentCardFormat === "post") {
        height = 1080; // 1:1
    } else if (currentCardFormat === "card") {
        height = 1350; // 4:5
    }

    canvas.width = width;
    canvas.height = height;

    // 1. إعداد الخلفية بحسب السمة
    let bgGradient;
    let borderColor = "#d4af37";
    let textColor = "#ffffff";
    let subTextColor = "#e5e7eb";
    let accentGold = "#d4af37";

    if (currentCardTheme === "emerald") {
        bgGradient = ctx.createLinearGradient(0, 0, 0, height);
        bgGradient.addColorStop(0, "#064e3b");
        bgGradient.addColorStop(0.5, "#022c22");
        bgGradient.addColorStop(1, "#064e3b");
        borderColor = "#34d399";
        accentGold = "#6ee7b7";
    } else if (currentCardTheme === "burgundy") {
        bgGradient = ctx.createLinearGradient(0, 0, 0, height);
        bgGradient.addColorStop(0, "#4a0e17");
        bgGradient.addColorStop(0.5, "#25050a");
        bgGradient.addColorStop(1, "#4a0e17");
        borderColor = "#d4af37";
        accentGold = "#fbbf24";
    } else if (currentCardTheme === "parchment") {
        bgGradient = ctx.createLinearGradient(0, 0, 0, height);
        bgGradient.addColorStop(0, "#fbf8ee");
        bgGradient.addColorStop(0.5, "#f3eedd");
        bgGradient.addColorStop(1, "#fbf8ee");
        borderColor = "#aa820a";
        textColor = "#1f2937";
        subTextColor = "#4b5563";
        accentGold = "#b45309";
    } else {
        // royal-navy
        bgGradient = ctx.createLinearGradient(0, 0, 0, height);
        bgGradient.addColorStop(0, "#0b172a");
        bgGradient.addColorStop(0.5, "#030712");
        bgGradient.addColorStop(1, "#0b172a");
        borderColor = "#d4af37";
        accentGold = "#f59e0b";
    }

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // 2. إطار إسلامي مزخرف
    ctx.lineWidth = 4;
    ctx.strokeStyle = borderColor;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    ctx.lineWidth = 1.5;
    ctx.strokeRect(55, 55, width - 110, height - 110);

    // زخارف الأركان
    const cornerSize = 40;
    const drawCorner = (x, y) => {
        ctx.save();
        ctx.strokeStyle = accentGold;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, cornerSize, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    };
    drawCorner(55, 55);
    drawCorner(width - 55, 55);
    drawCorner(55, height - 55);
    drawCorner(width - 55, height - 55);

    // 3. نصوص البطاقة
    ctx.textAlign = "center";
    ctx.direction = "rtl";

    // البسملة
    ctx.fillStyle = accentGold;
    ctx.font = "bold 38px 'Amiri', 'Traditional Arabic', serif";
    ctx.fillText("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", width / 2, height * 0.12);

    // شريط الإهداء
    const recipientInput = document.getElementById("dua-card-recipient-input");
    const recipientName = (recipientInput && recipientInput.value.trim()) || ((typeof DECEASED_INFO !== "undefined" && DECEASED_INFO.name) ? DECEASED_INFO.name : "فقيدنا الغالي");

    ctx.fillStyle = subTextColor;
    ctx.font = "32px 'Tajawal', sans-serif";
    ctx.fillText(`صدقة جارية ودعاء لروح`, width / 2, height * 0.18);

    ctx.fillStyle = accentGold;
    ctx.font = "bold 44px 'Tajawal', sans-serif";
    ctx.fillText(recipientName, width / 2, height * 0.23);

    // خط فاصل مزخرف
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 220, height * 0.26);
    ctx.lineTo(width / 2 + 220, height * 0.26);
    ctx.stroke();

    // نص الدعاء
    let duaText = "اللهم اغفر له وارحمه، وعافه واعف عنه، وأكرم نزله، ووسع مدخله، واغسله بالماء والثلج والبرد، ونقه من الذنوب والخطايا كما ينقى الثوب الأبيض من الدنس.";
    const templateSelect = document.getElementById("dua-template-select");
    const customInput = document.getElementById("custom-dua-input");

    if (templateSelect && templateSelect.value === "custom" && customInput && customInput.value.trim()) {
        duaText = customInput.value.trim();
    } else if (templateSelect && templateSelect.value && templateSelect.value !== "custom") {
        duaText = templateSelect.value;
    }

    ctx.fillStyle = textColor;
    ctx.font = "bold 42px 'Amiri', 'Traditional Arabic', serif";

    // رسم النص مع التفاف الأسطر
    const maxWidth = width - 200;
    const lineHeight = 68;
    const words = duaText.split(" ");
    let line = "";
    const lines = [];

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + " ";
        } else {
            line = testLine;
        }
    }
    lines.push(line);

    let startY = height * 0.38;
    if (currentCardFormat === "story") startY = height * 0.42;
    if (currentCardFormat === "post") startY = height * 0.35;

    lines.forEach((l, i) => {
        ctx.fillText(l.trim(), width / 2, startY + (i * lineHeight));
    });

    // دعاء التثبيت والختام
    const footerY = height - 120;
    ctx.fillStyle = accentGold;
    ctx.font = "bold 32px 'Tajawal', sans-serif";
    ctx.fillText("اللهم استجب واجعل ثواب هذا العمل نوراً في قبره 🤲", width / 2, footerY - 40);

    ctx.fillStyle = subTextColor;
    ctx.font = "24px 'Tajawal', sans-serif";
    ctx.fillText("زاد المسلم • تطبيق إسلامي شامل", width / 2, footerY);
}

function downloadEnhancedDuaCard() {
    const canvas = document.getElementById("dua-card-canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `dua-card-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("تم تنزيل البطاقة بنجاح، تقبل الله منكم 🌿🖼️");
}

async function shareEnhancedDuaCard() {
    const canvas = document.getElementById("dua-card-canvas");
    if (!canvas) return;

    // استخدام Web Share API لمشاركة الصورة مباشرة للموبايل إن أمكن
    if (navigator.share && navigator.canShare) {
        canvas.toBlob(async (blob) => {
            if (!blob) return;
            const file = new File([blob], "dua-card.png", { type: "image/png" });
            if (navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        files: [file],
                        title: "زاد المسلم • بطاقة دعاء",
                        text: "نسألكم الدعاء لفقيدنا الغالي وجميع موتى المسلمين 🤲"
                    });
                    return;
                } catch(e) {}
            }
            fallbackShareWhatsApp();
        });
    } else {
        fallbackShareWhatsApp();
    }
}

function fallbackShareWhatsApp() {
    const recipientInput = document.getElementById("dua-card-recipient-input");
    const nameVal = (recipientInput && recipientInput.value.trim()) || "فقيدنا الغالي";
    const msg = `🌿 *بطاقة دعاء لروح (${nameVal})*\n\nاللهم اغفر له وارحمه وعافه واعف عنه واجعل قبره روضة من رياض الجنة.\n\n📲 صمم بطاقة لفقيدك واكسب الأجر: https://abdomohaamed.github.io/sadqah-jaddi/`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
    showToast("جاري فتح واتساب للمشاركة 📲");
}

/* ==========================================================================
   7. القائمة الجانبية للشاشات الصغيرة (Mobile Navigation Drawer)
   ========================================================================== */
function initMobileNavDrawer() {
    const toggleBtn = document.getElementById("btn-mobile-menu-toggle");
    const drawer = document.getElementById("mobile-nav-drawer");
    const overlay = document.getElementById("mobile-nav-overlay");
    const closeBtn = document.getElementById("btn-close-mobile-nav");
    const navLinks = document.querySelectorAll(".mobile-nav-link");
    const customShareBtn = document.getElementById("btn-mobile-custom-share");

    if (!drawer) return;

    function openDrawer() {
        drawer.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
        drawer.classList.remove("open");
        document.body.style.overflow = "";
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (drawer.classList.contains("open")) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeDrawer);
    }

    if (overlay) {
        overlay.addEventListener("click", closeDrawer);
    }

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeDrawer();
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    if (customShareBtn) {
        customShareBtn.addEventListener("click", () => {
            closeDrawer();
            const modal = document.getElementById("custom-share-modal");
            if (modal) modal.classList.add("open");
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && drawer.classList.contains("open")) {
            closeDrawer();
        }
    });
}

/* ==========================================================================
   8. ترقية موسوعة الأدعية النبوية لتطابق تصميم وتجربة قسم أذكار اليوم
   ========================================================================== */
function initEnhancedCategorizedDuas() {
    function safeEscape(str) {
        if (typeof escapeHTML === "function") return escapeHTML(str);
        if (typeof escapeHtml === "function") return escapeHtml(str);
        if (!str) return "";
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // ترقية دالة رسم بطاقات الأدعية لتطابق بطاقات الأذكار
    window.renderDuasCardsList = function(duasList) {
        const gridContainer = document.getElementById("categorized-duas-grid");
        if (!gridContainer) return;

        gridContainer.innerHTML = "";

        if (!duasList || duasList.length === 0) {
            gridContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                    <i class="fa-solid fa-magnifying-glass fa-2x text-gold" style="margin-bottom: 0.8rem; opacity: 0.7;"></i>
                    <p style="color: #fff; font-weight: 700; font-size: 1.1rem; margin-bottom: 0.4rem;">لا توجد أدعية مطابقة</p>
                    <p style="font-size: 0.88rem;">يرجى اختيار تصنيف آخر أو تجربة كلمة بحث مختلفة</p>
                </div>
            `;
            return;
        }

        duasList.forEach((dua, idx) => {
            const card = document.createElement("div");
            const duaId = dua.id || `dua_${idx}`;
            const targetRepeat = dua.repeat || 1;
            card.className = "azkar-card cat-dua-card";
            card.id = `cat-dua-card-${duaId}`;
            card.setAttribute("data-dua-id", duaId);

            card.innerHTML = `
                <div class="cat-dua-header">
                    <h3 class="cat-dua-title">${safeEscape(dua.title)}</h3>
                    <span class="cat-dua-category-badge"><i class="fa-solid fa-hands-praying text-gold"></i> دعاء نبوي مأثور</span>
                </div>
                <div class="azkar-text">"${safeEscape(dua.text)}"</div>
                <div class="azkar-virtue">
                    <i class="fa-solid fa-award text-gold"></i>
                    <span>${safeEscape(dua.source)}</span>
                </div>
                <div class="azkar-footer">
                    <div class="azkar-count-badge">
                        <span>التكرار المستحب: <strong>${targetRepeat} مرات</strong></span>
                    </div>
                    <div class="cat-dua-actions-wrapper">
                        <button type="button" class="azkar-tap-btn btn-repeat-dua" data-remaining="${targetRepeat}" title="انقر لتكرار الدعاء ونيل الأجر">
                            <i class="fa-solid fa-hand-pointer"></i>
                            <span class="btn-repeat-text">تبقى: ${targetRepeat}</span>
                        </button>
                        <button type="button" class="btn btn-outline btn-sm btn-icon-round btn-copy-cat-dua" title="نسخ الدعاء">
                            <i class="fa-solid fa-copy"></i>
                        </button>
                        <button type="button" class="btn btn-outline btn-sm btn-icon-round btn-share-cat-dua" title="مشاركة الدعاء لواتساب">
                            <i class="fa-brands fa-whatsapp" style="color: #25D366;"></i>
                        </button>
                    </div>
                </div>
            `;

            // 1. زر النسخ
            const copyBtn = card.querySelector(".btn-copy-cat-dua");
            if (copyBtn) {
                copyBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const textToCopy = `🤲 *${dua.title}*\n"${dua.text}"\n📍 [${dua.source}]\n\n🕊️ صدقة جارية: https://abdomohaamed.github.io/sadqah-jaddi/`;
                    copyTextToClipboard(textToCopy);
                    showToast("تم نسخ الدعاء بنجاح 📋");
                });
            }

            // 2. زر المشاركة لواتساب
            const shareBtn = card.querySelector(".btn-share-cat-dua");
            if (shareBtn) {
                shareBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const deceasedName = (typeof DECEASED_INFO !== "undefined" && DECEASED_INFO.name) ? DECEASED_INFO.name : "فقيدنا الغالي";
                    const msg = `🤲 *${dua.title}*\n"${dua.text}"\n📍 [${dua.source}]\n\n🤍 صدقة جارية لروح (${deceasedName})\n📲 زاد المسلم: https://abdomohaamed.github.io/sadqah-jaddi/`;
                    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
                    window.open(url, "_blank");
                });
            }

            // 3. زر التكرار التفاعلي بالصوت والاهتزاز وحالة الإتمام
            const repeatBtn = card.querySelector(".btn-repeat-dua");
            if (repeatBtn) {
                repeatBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    let rem = parseInt(repeatBtn.getAttribute("data-remaining"), 10);
                    if (rem > 1) {
                        rem--;
                        repeatBtn.setAttribute("data-remaining", rem);
                        const textEl = repeatBtn.querySelector(".btn-repeat-text");
                        if (textEl) textEl.textContent = `تبقى: ${rem}`;
                        if ("vibrate" in navigator) navigator.vibrate(25);
                        if (typeof playTasbeehClickTone === "function") playTasbeehClickTone();
                    } else if (rem === 1) {
                        rem = 0;
                        repeatBtn.setAttribute("data-remaining", 0);
                        card.classList.add("is-finished");
                        repeatBtn.classList.add("all-done");
                        repeatBtn.innerHTML = '<i class="fa-solid fa-check-double"></i> <span>تم الدعاء بنجاح</span>';
                        if ("vibrate" in navigator) navigator.vibrate([40, 60, 40]);
                        if (typeof playCompletionChime === "function") playCompletionChime();
                        showToast(`تقبل الله دعاءك وذكرك، وجعله في ميزان حسناتك 🌿🤲`);
                    } else {
                        // إعادة التعيين
                        repeatBtn.setAttribute("data-remaining", targetRepeat);
                        card.classList.remove("is-finished");
                        repeatBtn.classList.remove("all-done");
                        repeatBtn.innerHTML = `<i class="fa-solid fa-hand-pointer"></i> <span class="btn-repeat-text">تبقى: ${targetRepeat}</span>`;
                    }
                });
            }

            gridContainer.appendChild(card);
        });
    };

    window.scrollDuasContainer = function(direction) {
        const container = document.getElementById("categorized-duas-grid");
        if (!container) return;
        const card = container.querySelector(".cat-dua-card, .azkar-card");
        const scrollAmount = card ? (card.offsetWidth + 20) : 320;
        const delta = direction === "left" ? -scrollAmount : scrollAmount;
        container.scrollBy({ left: delta, behavior: "smooth" });
    };

    window.scrollNawawiContainer = function(direction) {
        const container = document.getElementById("nawawi-grid");
        if (!container) return;
        const card = container.querySelector(".hadith-card");
        const scrollAmount = card ? (card.offsetWidth + 20) : 320;
        const delta = direction === "left" ? -scrollAmount : scrollAmount;
        container.scrollBy({ left: delta, behavior: "smooth" });
    };

    window.scrollAsmaaContainer = function(direction) {
        const container = document.getElementById("asmaa-grid");
        if (!container) return;
        const card = container.querySelector(".asmaa-card");
        const scrollAmount = card ? (card.offsetWidth + 16) : 260;
        const delta = direction === "left" ? -scrollAmount : scrollAmount;
        container.scrollBy({ left: delta, behavior: "smooth" });
    };

    // إعادة رسم القسم المفتوح حالياً بالتصميم المحدث فور التحميل
    if (typeof CATEGORIZED_DUAS !== "undefined") {
        const activeTab = document.querySelector(".duas-tab-btn.active");
        const catKey = activeTab ? activeTab.getAttribute("data-cat") : "karb_debt";
        if (CATEGORIZED_DUAS[catKey]) {
            window.renderDuasCardsList(CATEGORIZED_DUAS[catKey].duas || []);
        }
    }
}

/* ==========================================================================
   7. رسالة وتدبر آية اليوم لقلبك (Daily Spiritual Message & Story Share)
   ========================================================================== */
function initDailySpiritualMessage() {
    const dailyWisdomCard = document.getElementById("daily-wisdom-card");
    const dailyMsgModal = document.getElementById("daily-message-modal");
    const closeBtn = document.getElementById("btn-close-daily-msg-modal");
    const shareStoryBtn = document.getElementById("btn-share-wisdom-story");
    const copyBtn = document.getElementById("btn-copy-daily-msg");
    const shareWaBtn = document.getElementById("btn-share-daily-msg-wa");

    if (typeof getDailyMessageOfTheDay !== "function") return;
    const todayMsg = getDailyMessageOfTheDay();
    if (!todayMsg) return;

    // تحديث المحتوى في البطاقة الرئيسية بالصفحة
    const ayahSurahEl = document.getElementById("wisdom-ayah-surah");
    const ayahTextEl = document.getElementById("wisdom-ayah-text");
    const ayahTadabburEl = document.getElementById("wisdom-ayah-tadabbur");

    if (ayahSurahEl) ayahSurahEl.textContent = todayMsg.surah;
    if (ayahTextEl) ayahTextEl.textContent = todayMsg.verse;
    if (ayahTadabburEl) ayahTadabburEl.textContent = todayMsg.reflection;

    const openModal = () => {
        if (!dailyMsgModal) return;
        const tagEl = document.getElementById("modal-msg-tag");
        const titleEl = document.getElementById("modal-msg-title");
        const verseEl = document.getElementById("modal-msg-verse");
        const surahEl = document.getElementById("modal-msg-surah");
        const reflectionEl = document.getElementById("modal-msg-reflection");
        const duaEl = document.getElementById("modal-msg-dua");

        if (tagEl) tagEl.textContent = todayMsg.tag || "قبس إيماني متجدد";
        if (titleEl) titleEl.textContent = todayMsg.title || "رسالة لقلبك اليوم";
        if (verseEl) verseEl.textContent = todayMsg.verse;
        if (surahEl) surahEl.textContent = todayMsg.surah;
        if (reflectionEl) reflectionEl.textContent = todayMsg.reflection;
        if (duaEl) duaEl.textContent = todayMsg.dua;

        dailyMsgModal.classList.add("open");
        dailyMsgModal.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        if (!dailyMsgModal) return;
        dailyMsgModal.classList.remove("open");
        dailyMsgModal.classList.remove("active");
        document.body.style.overflow = "";
    };

    if (dailyWisdomCard) {
        dailyWisdomCard.addEventListener("click", (e) => {
            if (e.target.closest("#btn-share-wisdom-story")) return;
            openModal();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    if (dailyMsgModal) {
        dailyMsgModal.addEventListener("click", (e) => {
            if (e.target === dailyMsgModal) closeModal();
        });
    }

    const formatShareText = () => {
        const deceasedName = (typeof DECEASED_INFO !== "undefined" && DECEASED_INFO.name) ? DECEASED_INFO.name : "جدي الغالي (عبدالمعبود أمين سعيد)";
        return `✨ *${todayMsg.title}* ✨\n\n` +
               `📖 ${todayMsg.verse}\n` +
               `📌 (${todayMsg.surah})\n\n` +
               `💡 *الخاطرة والتدبر:*\n${todayMsg.reflection}\n\n` +
               `🤲 *دعاء اليوم:*\n${todayMsg.dua}\n\n` +
               `🌿 _صدقة جارية عن روح ${deceasedName}_\n` +
               `📲 تصفح المزيد وتدبر القرآن كاملاً:\n${window.location.origin + window.location.pathname}`;
    };

    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(formatShareText()).then(() => {
                showToast("تم نسخ رسالة اليوم بنجاح 📋");
            }).catch(() => {
                showToast("تعذر النسخ تلقائياً");
            });
        });
    }

    const handleWhatsAppShare = (e) => {
        if (e) e.stopPropagation();
        const text = encodeURIComponent(formatShareText());
        window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    };

    if (shareStoryBtn) shareStoryBtn.addEventListener("click", handleWhatsAppShare);
    if (shareWaBtn) shareWaBtn.addEventListener("click", handleWhatsAppShare);
}

/* ==========================================================================
   8. مكتبة قصص الأنبياء وسير الصحابة الكرام (Islamic Stories)
   ========================================================================== */
function initIslamicStories() {
    const storiesGrid = document.getElementById("stories-grid");
    const filterPills = document.querySelectorAll("#stories-filter-bar .nawawi-filter-pill");
    const storyModal = document.getElementById("story-details-modal");
    const closeBtn = document.getElementById("btn-close-story-modal");
    const copyBtn = document.getElementById("btn-copy-story");
    const shareWaBtn = document.getElementById("btn-share-story-wa");

    if (!storiesGrid || typeof ISLAMIC_STORIES_DATA === "undefined") return;

    let activeStory = null;

    // استخراج كافة القصص في مصفوفة مسطحة مع تصنيفاتها
    const getAllStories = () => {
        if (Array.isArray(ISLAMIC_STORIES_DATA)) {
            return ISLAMIC_STORIES_DATA;
        }
        let list = [];
        if (ISLAMIC_STORIES_DATA.prophets && Array.isArray(ISLAMIC_STORIES_DATA.prophets)) {
            list = list.concat(ISLAMIC_STORIES_DATA.prophets.map(s => ({ ...s, category: "prophets" })));
        }
        if (ISLAMIC_STORIES_DATA.sahaba && Array.isArray(ISLAMIC_STORIES_DATA.sahaba)) {
            list = list.concat(ISLAMIC_STORIES_DATA.sahaba.map(s => ({ ...s, category: "sahaba" })));
        }
        return list;
    };

    const allStories = getAllStories();

    const renderStories = (cat = "all") => {
        storiesGrid.innerHTML = "";
        const filtered = cat === "all" ? allStories : allStories.filter(s => s.category === cat);

        filtered.forEach(story => {
            const card = document.createElement("div");
            card.className = "story-card";
            const storyTitle = story.name || story.title || "قصة مباركة";
            const storyTag = story.tag || (story.category === 'prophets' ? 'قصص الأنبياء' : 'سير الصحابة');
            const storyVerse = story.keyVerse || story.verse || '';
            const storySummary = story.summary || '';
            const firstLesson = (story.lessons && story.lessons[0]) ? story.lessons[0] : 'عبرة إيمانية ملهمة';

            card.innerHTML = `
                <div class="story-card-header">
                    <div class="story-header-info">
                        <div class="story-icon-badge"><i class="${story.icon || 'fa-solid fa-book-open'}"></i></div>
                        <div class="story-title-group">
                            <h3>${storyTitle}</h3>
                            <span class="story-card-tag">${storyTag}</span>
                        </div>
                    </div>
                </div>

                <div class="story-card-body">
                    ${storyVerse ? `<div class="story-verse-preview">${storyVerse}</div>` : ''}
                    <p class="story-card-summary">${storySummary}</p>
                    <div class="story-lesson-preview">
                        <i class="fa-solid fa-lightbulb"></i>
                        <span>${firstLesson}</span>
                    </div>
                </div>

                <div class="story-card-footer">
                    <button type="button" class="btn btn-gold btn-read-story" data-story-id="${story.id}">
                        <i class="fa-solid fa-book-open-reader"></i>
                        <span>اقرأ القصة كاملة والعِبر</span>
                    </button>
                </div>
            `;

            const readBtn = card.querySelector(".btn-read-story");
            if (readBtn) {
                readBtn.addEventListener("click", () => {
                    openStoryModal(story);
                });
            }

            storiesGrid.appendChild(card);
        });
    };

    const openStoryModal = (story) => {
        activeStory = story;
        if (!storyModal) return;

        const iconEl = document.getElementById("modal-story-icon");
        const titleEl = document.getElementById("modal-story-title");
        const tagEl = document.getElementById("modal-story-tag");
        const verseEl = document.getElementById("modal-story-verse");
        const textEl = document.getElementById("modal-story-text");
        const lessonsEl = document.getElementById("modal-story-lessons");

        const storyTitle = story.name || story.title || "قصة مباركة";
        const storyTag = story.tag || (story.category === "prophets" ? "قصص الأنبياء عليهم السلام" : "العشرة المبشرون وسير الصحابة");
        const storyVerse = story.keyVerse || story.verse || "";
        const storyFullText = story.fullStory || story.summary || "";

        if (iconEl) iconEl.innerHTML = `<i class="${story.icon || 'fa-solid fa-book-open'}"></i>`;
        if (titleEl) titleEl.textContent = storyTitle;
        if (tagEl) tagEl.textContent = storyTag;
        if (verseEl) verseEl.textContent = storyVerse;
        if (textEl) textEl.textContent = storyFullText;

        if (lessonsEl) {
            lessonsEl.innerHTML = "";
            if (story.lessons && Array.isArray(story.lessons)) {
                story.lessons.forEach(lesson => {
                    const li = document.createElement("li");
                    li.style.marginBottom = "0.4rem";
                    li.textContent = lesson;
                    lessonsEl.appendChild(li);
                });
            }
        }

        storyModal.classList.add("open");
        storyModal.classList.add("active");
        document.body.style.overflow = "hidden";
    };

    const closeStoryModal = () => {
        if (!storyModal) return;
        storyModal.classList.remove("open");
        storyModal.classList.remove("active");
        document.body.style.overflow = "";
    };

    if (closeBtn) closeBtn.addEventListener("click", closeStoryModal);
    if (storyModal) {
        storyModal.addEventListener("click", (e) => {
            if (e.target === storyModal) closeStoryModal();
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            if (!activeStory) return;
            const title = activeStory.name || activeStory.title;
            const verse = activeStory.keyVerse || activeStory.verse || '';
            const text = `📜 *${title}*\n\n${verse}\n\n💡 *أهم العبر والدروس:*\n` +
                         (activeStory.lessons ? activeStory.lessons.map(l => `• ${l}`).join('\n') : '') +
                         `\n\n🌿 موقع زاد المسلم: ${window.location.origin + window.location.pathname}`;
            navigator.clipboard.writeText(text).then(() => {
                showToast("تم نسخ قصة وعبر اليوم بنجاح 📋");
            });
        });
    }

    if (shareWaBtn) {
        shareWaBtn.addEventListener("click", () => {
            if (!activeStory) return;
            const title = activeStory.name || activeStory.title;
            const verse = activeStory.keyVerse || activeStory.verse || '';
            const text = encodeURIComponent(
                `📜 *${title}*\n\n` +
                `${verse}\n\n` +
                `💡 *الدروس المستفادة:*\n` +
                (activeStory.lessons ? activeStory.lessons.map(l => `• ${l}`).join('\n') : '') +
                `\n\n🌿 اقرأ المزيد من القصص والسير المباركة:\n${window.location.origin + window.location.pathname}`
            );
            window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
        });
    }

    // تبديل التصنيفات
    filterPills.forEach(pill => {
        pill.addEventListener("click", () => {
            filterPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            const cat = pill.getAttribute("data-cat") || "all";
            renderStories(cat);
        });
    });

    window.scrollStoriesContainer = function(direction) {
        const container = document.getElementById("stories-grid");
        if (!container) return;
        const card = container.querySelector(".story-card");
        const scrollAmount = card ? (card.offsetWidth + 20) : 340;
        const delta = direction === "left" ? -scrollAmount : scrollAmount;
        container.scrollBy({ left: delta, behavior: "smooth" });
    };

    renderStories("all");
}

/* ==========================================================================
   9. مسابقة واختبر معلوماتك الإسلامية (Islamic Quiz & Trivia)
   ========================================================================== */
function initIslamicQuiz() {
    const quizContainer = document.getElementById("quiz-container-card");
    if (!quizContainer || typeof ISLAMIC_QUIZ_QUESTIONS === "undefined") return;

    let roundQuestions = [];
    let currentIndex = 0;
    let score = 0;
    let isAnswered = false;

    const startQuizRound = () => {
        // خلط واختيار 5 أسئلة عشوائية في كل جولة
        const shuffled = [...ISLAMIC_QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
        roundQuestions = shuffled.slice(0, 5);
        currentIndex = 0;
        score = 0;
        isAnswered = false;
        renderQuestion();
    };

    const renderQuestion = () => {
        const q = roundQuestions[currentIndex];
        if (!q) {
            renderQuizResult();
            return;
        }

        isAnswered = false;
        const progressPct = ((currentIndex + 1) / roundQuestions.length) * 100;
        const correctIdx = (typeof q.correctIndex !== "undefined") ? q.correctIndex : ((typeof q.correct !== "undefined") ? q.correct : 0);

        quizContainer.innerHTML = `
            <div class="quiz-header-bar">
                <span class="quiz-progress-text">السؤال ${currentIndex + 1} من ${roundQuestions.length}</span>
                <span class="quiz-score-pill"><i class="fa-solid fa-star text-gold"></i> النقاط: ${score}</span>
            </div>

            <div class="quiz-progress-track">
                <div class="quiz-progress-fill" style="width: ${progressPct}%;"></div>
            </div>

            <div class="quiz-question-box">
                <div class="quiz-question-category"><i class="fa-solid fa-tag"></i> ${q.category || 'معلومات إسلامية'}</div>
                <h3 class="quiz-question-title">${q.question}</h3>
            </div>

            <div class="quiz-options-list" id="quiz-options-list">
                ${q.options.map((opt, idx) => `
                    <button type="button" class="quiz-option-btn" data-opt-index="${idx}">
                        <span>${opt}</span>
                        <i class="fa-regular fa-circle-check opt-icon"></i>
                    </button>
                `).join('')}
            </div>

            <div id="quiz-feedback-container"></div>
        `;

        const optionButtons = quizContainer.querySelectorAll(".quiz-option-btn");
        optionButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                if (isAnswered) return;
                isAnswered = true;
                const selectedIdx = parseInt(btn.getAttribute("data-opt-index"), 10);
                const isCorrect = selectedIdx === correctIdx;

                optionButtons.forEach((b, idx) => {
                    b.disabled = true;
                    if (idx === correctIdx) {
                        b.classList.add("correct");
                        const icon = b.querySelector(".opt-icon");
                        if (icon) icon.className = "fa-solid fa-circle-check opt-icon";
                    } else if (idx === selectedIdx && !isCorrect) {
                        b.classList.add("wrong");
                        const icon = b.querySelector(".opt-icon");
                        if (icon) icon.className = "fa-solid fa-circle-xmark opt-icon";
                    }
                });

                if (isCorrect) {
                    score++;
                    const scorePill = quizContainer.querySelector(".quiz-score-pill");
                    if (scorePill) scorePill.innerHTML = `<i class="fa-solid fa-star text-gold"></i> النقاط: ${score}`;
                    if ("vibrate" in navigator) navigator.vibrate(30);
                    if (typeof playCompletionChime === "function") playCompletionChime();
                } else {
                    if ("vibrate" in navigator) navigator.vibrate([60, 40, 60]);
                }

                // إظهار الشرح وزر الانتقال
                const feedbackBox = document.getElementById("quiz-feedback-container");
                if (feedbackBox) {
                    const isLast = currentIndex === roundQuestions.length - 1;
                    feedbackBox.innerHTML = `
                        <div class="quiz-explanation-box">
                            <div style="font-size: 0.95rem; color: ${isCorrect ? 'var(--emerald-400)' : '#f87171'}; font-weight: 700; margin-bottom: 0.4rem;">
                                ${isCorrect ? '🎉 إجابة صحيحة وممتازة!' : '❌ إجابة غير صحيحة، والإجابة الصواب موضحة بالأخضر.'}
                            </div>
                            <p style="font-size: 0.92rem; color: #e5e7eb; line-height: 1.6; margin: 0 0 1rem 0;">${q.explanation || ''}</p>
                            <button type="button" class="btn btn-gold" id="btn-next-question" style="width: 100%;">
                                <span>${isLast ? 'عرض النتيجة النهائية 🏆' : 'السؤال التالي ➡️'}</span>
                            </button>
                        </div>
                    `;

                    const nextBtn = document.getElementById("btn-next-question");
                    if (nextBtn) {
                        nextBtn.addEventListener("click", () => {
                            currentIndex++;
                            renderQuestion();
                        });
                    }
                }
            });
        });
    };

    const renderQuizResult = () => {
        let message = "ما شاء الله! بداية مباركة للعلم النافع 🌿";
        if (score === 5) message = "ما شاء الله تبارك الله! علامة كاملة ومستوى متميز في العلوم الإسلامية 🌟👑";
        else if (score >= 3) message = "أحسنت! إجابات رائعة ومستوى طيب جداً، داوم على الاستزادة 🌸";

        quizContainer.innerHTML = `
            <div class="quiz-result-view">
                <div class="quiz-result-score-circle">
                    <div>${score}/5</div>
                    <span class="quiz-result-score-label">النتيجة النهائية</span>
                </div>
                <h3 class="quiz-result-title">اكتملت الجولة الإيمانية بنجاح!</h3>
                <p class="quiz-result-desc">${message}</p>

                <div class="quiz-result-actions">
                    <button type="button" class="btn btn-outline" id="btn-retry-quiz">
                        <i class="fa-solid fa-rotate-right"></i>
                        <span>جولة جديدة بأسئلة مختلفة</span>
                    </button>
                    <button type="button" class="btn btn-gold" id="btn-share-quiz-score">
                        <i class="fa-brands fa-whatsapp"></i>
                        <span>تحدَّ أصدقاءك بنتيجتك</span>
                    </button>
                </div>
            </div>
        `;

        const retryBtn = document.getElementById("btn-retry-quiz");
        const shareScoreBtn = document.getElementById("btn-share-quiz-score");

        if (retryBtn) retryBtn.addEventListener("click", startQuizRound);
        if (shareScoreBtn) {
            shareScoreBtn.addEventListener("click", () => {
                const text = encodeURIComponent(
                    `🎯 حصلت على (${score} من 5) في مسابقة المعلومات الإسلامية على موقع زاد المسلم!\n` +
                    `اختبر معلوماتك الدينية وتحدَّ أصدقاءك في القرآن والسيرة العطرة:\n` +
                    `${window.location.origin + window.location.pathname}#islamic-quiz`
                );
                window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
            });
        }
    };

    startQuizRound();
}

/* ==========================================================================
   10. ويدجت إذاعة القرآن الكريم ومؤقت النوم الذكي (Live Radio & Sleep Timer)
   ========================================================================== */
function initLiveRadioWidgetWithSleepTimer() {
    const radioAudio = document.getElementById("live-radio-audio");
    const fabBtn = document.getElementById("radio-fab-btn");
    const panel = document.getElementById("radio-panel");
    const closeBtn = document.getElementById("btn-close-radio");
    const playBtn = document.getElementById("btn-radio-play");
    const playIcon = document.getElementById("radio-play-icon");
    const select = document.getElementById("radio-station-select");
    const volumeSlider = document.getElementById("radio-volume-slider");
    const nameEl = document.getElementById("current-station-name");
    const descEl = document.getElementById("current-station-desc");
    const sleepSelect = document.getElementById("radio-sleep-timer-select");
    const countdownEl = document.getElementById("radio-timer-countdown");
    const remTimeEl = document.getElementById("radio-timer-rem-time");
    const wavesEl = document.getElementById("radio-waves");

    if (!radioAudio) return;

    const stations = (typeof RADIO_STATIONS_LIST !== "undefined" && RADIO_STATIONS_LIST.length > 0)
        ? RADIO_STATIONS_LIST
        : (typeof RADIO_STATIONS !== "undefined" ? RADIO_STATIONS : []);

    if (stations.length === 0) return;

    let isPlaying = false;
    let sleepTimerInterval = null;

    // ملء قائمة المحطات
    if (select) {
        select.innerHTML = "";
        stations.forEach(st => {
            const opt = document.createElement("option");
            opt.value = st.id;
            opt.textContent = st.name;
            select.appendChild(opt);
        });

        select.addEventListener("change", () => {
            const st = stations.find(s => s.id === select.value) || stations[0];
            if (nameEl) nameEl.textContent = st.name;
            if (descEl) descEl.textContent = st.desc;
            radioAudio.src = st.url;
            if (isPlaying) {
                radioAudio.play().catch(e => console.warn(e));
            }
        });
    }

    const defaultStation = stations[0];
    radioAudio.src = defaultStation.url;
    if (nameEl) nameEl.textContent = defaultStation.name;
    if (descEl) descEl.textContent = defaultStation.desc;

    // تشغيل / إيقاف
    const updatePlayState = (playing) => {
        isPlaying = playing;
        if (playIcon) {
            playIcon.className = playing ? "fa-solid fa-pause" : "fa-solid fa-play";
        }
        if (fabBtn) {
            if (playing) fabBtn.classList.add("is-playing");
            else fabBtn.classList.remove("is-playing");
        }
        if (wavesEl) {
            wavesEl.style.display = playing ? "flex" : "none";
        }
    };

    if (playBtn) {
        playBtn.addEventListener("click", () => {
            if (isPlaying) {
                radioAudio.pause();
                updatePlayState(false);
            } else {
                radioAudio.play().then(() => {
                    updatePlayState(true);
                }).catch(e => {
                    console.warn(e);
                    showToast("جاري الاتصال بالبث المباشر للإذاعة...");
                });
            }
        });
    }

    if (volumeSlider) {
        radioAudio.volume = parseFloat(volumeSlider.value) || 0.8;
        volumeSlider.addEventListener("input", () => {
            radioAudio.volume = parseFloat(volumeSlider.value);
        });
    }

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

    // التحكم بمؤقت النوم الذكي (Sleep Timer)
    if (sleepSelect) {
        sleepSelect.addEventListener("change", () => {
            if (sleepTimerInterval) {
                clearInterval(sleepTimerInterval);
                sleepTimerInterval = null;
            }

            const minutes = parseInt(sleepSelect.value, 10);
            if (minutes > 0) {
                const targetTime = Date.now() + minutes * 60 * 1000;
                if (countdownEl) countdownEl.style.display = "block";

                const updateTimer = () => {
                    const remMs = targetTime - Date.now();
                    if (remMs <= 0) {
                        clearInterval(sleepTimerInterval);
                        sleepTimerInterval = null;
                        if (countdownEl) countdownEl.style.display = "none";
                        sleepSelect.value = "0";
                        radioAudio.pause();
                        updatePlayState(false);
                        showToast("تم إيقاف تلاوة القرآن الكريم بموجب مؤقت النوم 🌙 تقبل الله طاعتكم");
                        return;
                    }

                    const totalSec = Math.floor(remMs / 1000);
                    const m = Math.floor(totalSec / 60);
                    const s = totalSec % 60;
                    if (remTimeEl) {
                        remTimeEl.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
                    }
                };

                updateTimer();
                sleepTimerInterval = setInterval(updateTimer, 1000);
                showToast(`تم ضبط مؤقت إيقاف التلاوة بعد ${minutes} دقيقة ⏱️`);
            } else {
                if (countdownEl) countdownEl.style.display = "none";
            }
        });
    }
}

/* ==========================================================================
   11. العداد الإيماني التفاعلي الشامل (Global Community Counter)
   ========================================================================== */
function initGlobalCommunityCounter() {
    const statCards = document.querySelectorAll(".stat-card");
    statCards.forEach(card => {
        card.addEventListener("click", () => {
            if ("vibrate" in navigator) navigator.vibrate(20);
            if (typeof playTasbeehClickTone === "function") playTasbeehClickTone();
        });
    });
}




