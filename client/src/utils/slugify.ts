
export const slugDict: Record<string, string> = {};

export const slugify = (text: string | undefined | null) => {
    if (!text) return '';
    const convertedText= text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ğ/g, 'g')
    .replace(/Ğ/g, 'G')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'I')
    .replace(/ö/g, 'o')
    .replace(/Ö/g, 'O')
    .replace(/ş/g, 's')
    .replace(/Ş/g, 'S')
    .replace(/ç/g, 'c')
    .replace(/Ç/g, 'C')
    .replace(/[^a-z0-9 -]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
    slugDict[convertedText]=text
    return convertedText
};

const sources= ["Evrim Ağacı", "Sözcü","Euronews"]
const categories= ["Gündem","Bilim","Ekonomi","Yazılım"]

sources.forEach((source) => {
    slugify(source);
});

categories.forEach((category) => {
    slugify(category);
});

