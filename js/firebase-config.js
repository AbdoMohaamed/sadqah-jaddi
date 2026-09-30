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
    apiKey: "", // ضع apiKey هنا
    authDomain: "",
    databaseURL: "", // رابط قاعدة البيانات (ينتهي بـ firebasedatabase.app)
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// فحص هل تم تفعيل ووضع الإعدادات
function isFirebaseConfigured() {
    return FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.apiKey.trim() !== "" &&
           FIREBASE_CONFIG.databaseURL && FIREBASE_CONFIG.databaseURL.trim() !== "";
}
