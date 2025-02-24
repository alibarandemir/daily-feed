export const convertDateToString = (date: string): string => {
    const inputDate = new Date(date);
    const now = new Date();

    // Zaman farkını milisaniye cinsinden hesapla
    const diff = now.getTime() - inputDate.getTime();

    // Milisaniyeleri uygun birimlere dönüştür
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return "1 dakikadan az";
    if (minutes < 60) return `${minutes} dakika önce`;
    if (hours < 24) return `${hours} saat önce`;
    if (days < 30) return `${days} gün önce`;
    if (months < 12) return `${months} ay önce`;
    return `${years} yıl önce`;
};
