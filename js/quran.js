/**
 * مصحف الصدقة الجارية - القارئ القرآني
 */

// قائمة السور الفاضلة المجهزة مسبقاً للقراءة الفورية
const FEATURED_SURAHS = [
    {
        id: "surah-mulk",
        number: 67,
        name: "سورة الملك",
        title: "سُورَةُ المُلْكِ (المَانِعَةُ مِن عَذَابِ القَبْرِ)",
        versesCount: 30,
        audioUrl: "https://server8.mp3quran.net/afs/067.mp3",
        text: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ ﴿١﴾ الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ ﴿٢﴾ الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ ﴿٣﴾ ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ ﴿٤﴾ وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ ﴿٥﴾ وَلِلَّذِينَ كَفَرُوا بِرَبِّهِمْ عَذَابُ جَهَنَّمَ ۖ وَبِئْسَ الْمَصِيرُ ﴿٦﴾ إِذَا أُلْقُوا فِيهَا سَمِعُوا لَهَا شَهِيقًا وَهِيَ تَفُورُ ﴿٧﴾ تَكَادُ تَمَيَّزُ مِنَ الْغَيْظِ ۖ كُلَّمَا أُلْقِيَ فِيهَا فَوْجٌ سَأَلَهُمْ خَزَنَتُهَا أَلَمْ يَأْتِكُمْ نَذِيرٌ ﴿٨﴾ قَالُوا بَلَىٰ قَدْ جَاءَنَا نَذِيرٌ فَكَذَّبْنَا وَقُلْنَا مَا نَزَّلَ اللَّهُ مِن شَيْءٍ إِنْ أَنتُمْ إِلَّا فِي ضَلَالٍ كَبِيرٍ ﴿٩﴾ وَقَالُوا لَوْ كُنَّا نَسْمَعُ أَوْ نَعْقِلُ مَا كُنَّا فِي أَصْحَابِ السَّعِيرِ ﴿١٠﴾ فَاعْتَرَفُوا بِذَنبِهِمْ فَسُحْقًا لِّأَصْحَابِ السَّعِيرِ ﴿١١﴾ إِنَّ الَّذِينَ يَخْشَوْنَ رَبَّهُم بِالْغَيْبِ لَهُم مَّغْفِرَةٌ وَأَجْرٌ كَبِيرٌ ﴿١٢﴾ وَأَسِرُّوا قَوْلَكُمْ أَوِ اجْهَرُوا بِهِ ۖ إِنَّهُ عَلِيمٌ بِذَاتِ الصُّدُورِ ﴿١٣﴾ أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ اللَّطِيفُ الْخَبِيرُ ﴿١٤﴾ هُوَ الَّذِي جَعَلَ لَكُمُ الْأَرْضَ ذَلُولًا فَامْشُوا فِي مَنَاكِبِهَا وَكُلُوا مِن رِّزْقِهِ ۖ وَإِلَيْهِ النُّشُورُ ﴿١٥﴾ أَأَمِنتُم مَّن فِي السَّمَاءِ أَن يَخْسِفَ بِكُمُ الْأَرْضَ فَإِذَا هِيَ تَمُورُ ﴿١٦﴾ أَمْ أَمِنتُم مَّن فِي السَّمَاءِ أَن يُرْسِلَ عَلَيْكُمْ حَاصِبًا ۖ فَسَتَعْلَمُونَ كَيْفَ نَذِيرِ ﴿١٧﴾ وَلَقَدْ كَذَّبَ الَّذِينَ مِن قَبْلِهِمْ فَكَيْفَ كَانَ نَكِيرِ ﴿١٨﴾ أَوَلَمْ يَرَوْا إِلَى الطَّيْرِ فَوْقَهُمْ صَافَّاتٍ وَيَقْبِضْنَ ۚ مَا يُمْسِكُهُنَّ إِلَّا الرَّحْمَٰنُ ۚ إِنَّهُ بِكُلِّ شَيْءٍ بَصِيرٌ ﴿١٩﴾ أَمَّنْ هَٰذَا الَّذِي هُوَ جُندٌ لَّكُمْ يَنصُرُكُم مِّن دُونِ الرَّحْمَٰنِ ۚ إِنِ الْكَافِرُونَ إِلَّا فِي غُرُورٍ ﴿٢٠﴾ أَمَّنْ هَٰذَا الَّذِي يَرْزُقُكُمْ إِنْ أَمْسَكَ رِزْقَهُ ۚ بَل لَّجُّوا فِي عُتُوٍّ وَنُفُورٍ ﴿٢١﴾ أَفَمَن يَمْشِي مُكِبًّا عَلَىٰ وَجْهِهِ أَهْدَىٰ أَمَّن يَمْشِي سَوِيًّا عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ ﴿٢٢﴾ قُلْ هُوَ الَّذِي أَنشَأَكُمْ وَجَعَلَ لَكُمُ السَّمْعَ وَالْأَبْصَارَ وَالْأَفْئِدَةَ ۖ قَلِيلًا مَّا تَشْكُرُونَ ﴿٢٣﴾ قُلْ هُوَ الَّذِي ذَرَأَكُمْ فِي الْأَرْضِ وَإِلَيْهِ تُحْشَرُونَ ﴿٢٤﴾ وَيَقُولُونَ مَتَىٰ هَٰذَا الْوَعْدُ إِن كُنتُمْ صَادِقِينَ ﴿٢٥﴾ قُلْ إِنَّمَا الْعِلْمُ عِندَ اللَّهِ وَإِنَّمَا أَنَا نَذِيرٌ مُّبِينٌ ﴿٢٦﴾ فَلَمَّا رَأَوْهُ زُلْفَةً سِيئَتْ وُجُوهُ الَّذِينَ كَفَرُوا وَقِيلَ هَٰذَا الَّذِي كُنتُم بِهِ تَدَّعُونَ ﴿٢٧﴾ قُلْ أَرَأَيْتُمْ إِنْ أَهْلَكَنِيَ اللَّهُ وَمَن مَّعِيَ أَوْ رَحِمَنَا فَمَن يُجِيرُ الْكَافِرِينَ مِنْ عَذَابٍ أَلِيمٍ ﴿٢٨﴾ قُلْ هُوَ الرَّحْمَٰنُ آمَنَّا بِهِ وَعَلَيْهِ تَوَكَّلْنَا ۖ فَسَتَعْلَمُونَ مَنْ هُوَ فِي ضَلَالٍ مُّبِينٍ ﴿٢٩﴾ قُلْ أَرَأَيْتُمْ إِنْ أَصْبَحَ مَاؤُكُمْ غَوْرًا فَمَن يَأْتِيكُم بِمَاءٍ مَّعِينٍ ﴿٣٠﴾`
    },
    {
        id: "surah-fatihah",
        number: 1,
        name: "سورة الفاتحة",
        title: "سُورَةُ الفَاتِحَةِ (أُمُّ الكِتَابِ وَالشَّافِيَةُ)",
        versesCount: 7,
        audioUrl: "https://server8.mp3quran.net/afs/001.mp3",
        text: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾`
    },
    {
        id: "surah-yasin",
        number: 36,
        name: "سورة يس",
        title: "سُورَةُ يس (قَلْبُ القُرْآنِ)",
        versesCount: 83,
        audioUrl: "https://server8.mp3quran.net/afs/036.mp3",
        text: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
يس ﴿١﴾ وَالْقُرْآنِ الْحَكِيمِ ﴿٢﴾ إِنَّكَ لَمِنَ الْمُرْسَلِينَ ﴿٣﴾ عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ ﴿٤﴾ تَنزِيلَ الْعَزِيزِ الرَّحِيمِ ﴿٥﴾ لِتُنذِرَ قَوْمًا مَّا أُنذِرَ آبَاؤُهُمْ فَهُمْ غَافِلُونَ ﴿٦﴾ لَقَدْ حَقَّ الْقَوْلُ عَلَىٰ أَكْثَرِهِمْ فَهُمْ لَا يُؤْمِنُونَ ﴿٧﴾ إِنَّا جَعَلْنَا فِي أَعْنَاقِهِمْ أَغْلَالًا فَهِيَ إِلَى الْأَذْقَانِ فَهُم مُّقْمَحُونَ ﴿٨﴾ وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَاهُمْ فَهُمْ لَا يُبْصِرُونَ ﴿٩﴾ وَسَوَاءٌ عَلَيْهِمْ أَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ ﴿١٠﴾ إِنَّمَا تُنذِرُ مَنِ اتَّبَعَ الذِّكْرَ وَخَشِيَ الرَّحْمَٰنَ بِالْغَيْبِ ۖ فَبَشِّرْهُ بِمَغْفِرَةٍ وَأَجْرٍ كَرِيمٍ ﴿١١﴾ إِنَّا نَحْنُ نُحْيِي الْمَوْتَىٰ وَنَكْتُبُ مَا قَدَّمُوا وَآثَارَهُمْ ۚ وَكُلَّ شَيْءٍ أَحْصَيْنَاهُ فِي إِمَامٍ مُّبِينٍ ﴿١٢﴾ وَاضْرِبْ لَهُم مَّثَلًا أَصْحَابَ الْقَرْيَةِ إِذْ جَاءَهَا الْمُرْسَلُونَ ﴿١٣﴾ إِذْ أَرْسَلْنَا إِلَيْهِمُ اثْنَيْنِ فَكَذَّبُوهُمَا فَعَزَّزْنَا بِثَالِثٍ فَقَالُوا إِنَّا إِلَيْكُم مُّرْسَلُونَ ﴿١٤﴾ قَالُوا مَا أَنتُمْ إِلَّا بَشَرٌ مِّثْلُنَا وَمَا أَنزَلَ الرَّحْمَٰنُ مِن شَيْءٍ إِنْ أَنتُمْ إِلَّا تَكْذِبُونَ ﴿١٥﴾ قَالُوا رَبُّنَا يَعْلَمُ إِنَّا إِلَيْكُمْ لَمُرْسَلُونَ ﴿١٦﴾ وَمَا عَلَيْنَا إِلَّا الْبَلَاغُ الْمُبِينُ ﴿١٧﴾ قَالُوا إِنَّا تَطَيَّرْنَا بِكُمْ ۖ لَئِن لَّمْ تَنتَهُوا لَنَرْجُمَنَّكُمْ وَلَيَمَسَّنَّكُم مِّنَّا عَذَابٌ أَلِيمٌ ﴿١٨﴾ قَالُوا طَائِرُكُم مَّعَكُمْ ۚ أَئِن ذُكِّرْتُم ۚ بَلْ أَنتُمْ قَوْمٌ مُّسْرِفُونَ ﴿١٩﴾ وَجَاءَ مِنْ أَقْصَى الْمَدِينَةِ رَجُلٌ يَسْعَىٰ قَالَ يَا قَوْمِ اتَّبِعُوا الْمُرْسَلِينَ ﴿٢٠﴾ اتَّبِعُوا مَن لَّا يَسْأَلُكُمْ أَجْرًا وَهُم مُّهْتَدُونَ ﴿٢١﴾ وَمَا لِيَ لَا أَعْبُدُ الَّذِي فَطَرَنِي وَإِلَيْهِ تُرْجَعُونَ ﴿٢٢﴾ أَأَتَّخِذُ مِن دُونِهِ آلِهَةً إِن يُرِدْنِ الرَّحْمَٰنُ بِضُرٍّ لَّا تُغْنِ عَنِّي شَفَاعَتُهُمْ شَيْئًا وَلَا يُنقِذُونِ ﴿٢٣﴾ إِنِّي إِذًا لَّفِي ضَلَالٍ مُّبِينٍ ﴿٢٤﴾ إِنِّي آمَنتُ بِرَبِّكُمْ فَاسْمَعُونِ ﴿٢٥﴾ قِيلَ ادْخُلِ الْجَنَّةَ ۖ قَالَ يَا لَيْتَ قَوْمِي يَعْلَمُونَ ﴿٢٦﴾ بِمَا غَفَرَ لِي رَبِّي وَجَعَلَنِي مِنَ الْمُكْرَمِينَ ﴿٢٧﴾... [وَاضْغَطْ عَلَى القَارِئ لِإِكْمَالِ بَاقِي السُّورَةِ كَامِلَةً]`
    },
    {
        id: "surah-muawidhat",
        number: 112,
        name: "الإخلاص والمعوذتين",
        title: "الإِخْلَاصُ وَالفَلَقُ وَالنَّاسُ",
        versesCount: 15,
        audioUrl: "https://server8.mp3quran.net/afs/112.mp3",
        text: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾

بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِن شَرِّ مَا خَلَقَ ﴿٢﴾ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾

بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ مَلِكِ النَّاسِ ﴿٢﴾ إِلَٰهِ النَّاسِ ﴿٣﴾ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾ مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾`
    },
    {
        id: "ayat-kursi",
        number: 2,
        name: "آية الكرسي وخواتيم البقرة",
        title: "آيَةُ الكُرْسِيِّ وَخَوَاتِيمُ سُورَةِ البَقَرَةِ",
        versesCount: 3,
        audioUrl: "https://server8.mp3quran.net/afs/002.mp3",
        text: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ ﴿٢٥٥﴾

آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ ﴿٢٨٥﴾ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ ﴿٢٨٦﴾`
    }
];

// أسماء الـ 114 سورة كاملة للبحث والاختيار
const ALL_SURAHS_NAMES = [
    "الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال","التوبة","يونس",
    "هود","يوسف","الرعد","إبراهيم","الحجر","النحل","الإسراء","الكهف","مريم","طه",
    "الأنبياء","الحج","المؤمنون","النور","الفرقان","الشعراء","النمل","القصص","العنكبوت","الروم",
    "لقمان","السجدة","الأحزاب","سبأ","فاطر","يس","الصافات","ص","الزمر","غافر",
    "فصلت","الشورى","الزخرف","الدخان","الجاثية","الأحقاف","محمد","الفتح","الحجرات","ق",
    "الذاريات","الطور","النجم","القمر","الرحمن","الواقعة","الحديد","المجادلة","الحشر","الممتحنة",
    "الصف","الجمعة","المنافقون","التغابن","الطلاق","التحريم","الملك","القلم","الحاقة","المعارج",
    "نوح","الجن","المزمل","المدثر","القيامة","الإنسان","المرسلات","النبأ","النازعات","عبس",
    "التكوير","الانفطار","المطففين","الانشقاق","البروج","الطارق","الأعلى","الغاشية","الفجر","البلد",
    "الشمس","الليل","الضحى","الشرح","التين","العلق","القدر","البينة","الزلزلة","العاديات",
    "القارعة","التكاثر","العصر","الهمزة","الفيل","قريش","الماعون","الكوثر","الكافرون","النصر",
    "المسد","الإخلاص","الفلق","الناس"
];

// المتغيرات العامة للقارئ
let currentSurahIndex = 0;
let currentFontSize = parseInt(localStorage.getItem("quran_font_size") || "24", 10);
let quranAudio = new Audio();
let isSurahAudioPlaying = false;

document.addEventListener("DOMContentLoaded", () => {
    initQuranReader();
});

function initQuranReader() {
    renderFeaturedSurahButtons();
    populateAllSurahsDropdown();
    loadSurah(0);
    applyFontSize();

    // التحكم في حجم الخط
    const btnIncrease = document.getElementById("btn-font-increase");
    const btnDecrease = document.getElementById("btn-font-decrease");

    if (btnIncrease) {
        btnIncrease.addEventListener("click", () => {
            if (currentFontSize < 38) {
                currentFontSize += 2;
                applyFontSize();
            }
        });
    }

    if (btnDecrease) {
        btnDecrease.addEventListener("click", () => {
            if (currentFontSize > 16) {
                currentFontSize -= 2;
                applyFontSize();
            }
        });
    }

    // زر مشغل تلاوة السورة
    const btnPlayAudio = document.getElementById("btn-surah-audio");
    if (btnPlayAudio) {
        btnPlayAudio.addEventListener("click", toggleSurahAudio);
    }

    // زر إهداء ثواب القراءة لروح الجد
    const btnGiftReward = document.getElementById("btn-gift-quran-reward");
    if (btnGiftReward) {
        btnGiftReward.addEventListener("click", handleGiftReward);
    }

    // قائمة جميع السور
    const selectAllSurahs = document.getElementById("select-all-surahs");
    if (selectAllSurahs) {
        selectAllSurahs.addEventListener("change", (e) => {
            const surahNumber = parseInt(e.target.value, 10);
            if (surahNumber) {
                fetchSurahFromAPI(surahNumber);
            }
        });
    }
}

function renderFeaturedSurahButtons() {
    const container = document.getElementById("featured-surahs-pills");
    if (!container) return;

    container.innerHTML = "";
    FEATURED_SURAHS.forEach((surah, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `surah-pill ${idx === currentSurahIndex ? 'active' : ''}`;
        btn.textContent = surah.name;
        btn.onclick = () => {
            currentSurahIndex = idx;
            renderFeaturedSurahButtons();
            loadSurah(idx);
        };
        container.appendChild(btn);
    });
}

function populateAllSurahsDropdown() {
    const select = document.getElementById("select-all-surahs");
    if (!select) return;

    select.innerHTML = '<option value="">📖 تصفح جميع سور القرآن الكريم (114 سورة)...</option>';
    ALL_SURAHS_NAMES.forEach((name, idx) => {
        const option = document.createElement("option");
        option.value = idx + 1;
        option.textContent = `${idx + 1}. سورة ${name}`;
        select.appendChild(option);
    });
}

function loadSurah(index) {
    const surah = FEATURED_SURAHS[index];
    if (!surah) return;

    stopSurahAudio();

    const titleEl = document.getElementById("quran-surah-title");
    const countEl = document.getElementById("quran-verses-count");
    const contentEl = document.getElementById("quran-mushaf-text");

    if (titleEl) titleEl.textContent = surah.title || surah.name;
    if (countEl) countEl.textContent = `${surah.versesCount} آية`;
    if (contentEl) contentEl.textContent = surah.text;

    // تجهيز الصوت
    if (surah.audioUrl) {
        quranAudio.src = surah.audioUrl;
    }
}

function applyFontSize() {
    const contentEl = document.getElementById("quran-mushaf-text");
    if (contentEl) {
        contentEl.style.fontSize = `${currentFontSize}px`;
        localStorage.setItem("quran_font_size", currentFontSize.toString());
    }
    const indicator = document.getElementById("font-size-indicator");
    if (indicator) {
        indicator.textContent = `${currentFontSize}px`;
    }
}

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
        }).catch(err => {
            console.warn("Audio play blocked:", err);
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

// جلب أي سورة من الـ 114 عبر API الرسمي المفتوح
async function fetchSurahFromAPI(surahNumber) {
    const contentEl = document.getElementById("quran-mushaf-text");
    const titleEl = document.getElementById("quran-surah-title");
    const countEl = document.getElementById("quran-verses-count");

    if (!contentEl) return;

    stopSurahAudio();
    contentEl.innerHTML = '<div style="text-align:center; padding: 2rem; color: var(--gold-300);"><i class="fa-solid fa-spinner fa-spin"></i> جاري تحميل السورة الكريمة...</div>';

    try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`);
        const data = await response.json();

        if (data.code === 200 && data.data) {
            const surahData = data.data;
            if (titleEl) titleEl.textContent = `سُورَةُ ${surahData.name}`;
            if (countEl) countEl.textContent = `${surahData.numberOfAyahs} آية`;

            let formattedText = "";
            surahData.ayahs.forEach(ayah => {
                formattedText += `${ayah.text} ﴿${ayah.numberInSurah}﴾ `;
            });

            contentEl.textContent = formattedText;

            // رابط الصوت لسورة الشيخ مشاري العفاسي
            const paddedNumber = String(surahNumber).padStart(3, '0');
            quranAudio.src = `https://server8.mp3quran.net/afs/${paddedNumber}.mp3`;

            // إلغاء تفعيل أزرار السور الفاضلة لإظهار أن السورة المختارة من القائمة
            document.querySelectorAll(".surah-pill").forEach(p => p.classList.remove("active"));
        } else {
            throw new Error("API Error");
        }
    } catch (e) {
        contentEl.innerHTML = '<div style="text-align:center; padding: 2rem; color: #ef4444;">تعذر تحميل السورة حالياً، يرجى اختيار إحدى السور الفاضلة المجهزة أعلاه.</div>';
    }
}

// التفاعل مع زر إهداء الثواب لروح الجد
function handleGiftReward() {
    playCompletionChime();
    const deceasedName = (typeof DECEASED_INFO !== "undefined" && DECEASED_INFO.name) ? DECEASED_INFO.name : "فقيدنا الغالي";

    showToast(`تقبل الله تلاوتكم، وجعل ثوابها نوراً وفسحة في قبر ${deceasedName} 🌿🤲`);

    // إشعار شكر وتأكيد
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
