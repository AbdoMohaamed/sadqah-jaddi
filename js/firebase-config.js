/**
 * إعدادات Firebase لتخزين ومزامنة الأدعية بين جميع الزوار حول العالم لحظياً
 * 
 * للحصول على هذه البيانات مجاناً في دقيقتين:
 * 1. ادخل على https://console.firebase.google.com/
 * 2. أنشئ مشروعاً جديداً باسم sadqah-jaddi
 * 3. اختر Realtime Database واضغط Create Database (في وضع Test mode)
 * 4. من إعدادات المشروع (Project Settings) أضف Web App واانسخ كود firebaseConfig والصقه هنا
 */

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAgp_rzi7QhFrNRHpy3D7TU0OEyrCsWjBg",
    authDomain: "sadqah-jaddi.firebaseapp.com",
    databaseURL: "https://sadqah-jaddi-default-rtdb.firebaseio.com",
    projectId: "sadqah-jaddi",
    storageBucket: "sadqah-jaddi.firebasestorage.app",
    messagingSenderId: "649618994454",
    appId: "1:649618994454:web:ebaa20bcb0722818874c37"
};

// فحص هل تم تفعيل ووضع الإعدادات
function isFirebaseConfigured() {
    return FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.apiKey.trim() !== "" &&
           FIREBASE_CONFIG.databaseURL && FIREBASE_CONFIG.databaseURL.trim() !== "";
}
