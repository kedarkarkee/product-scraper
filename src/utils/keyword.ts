import { removeStopwords, eng } from 'stopword';

export const generateKeywords = (name: string, maxLength = 3) => {
    // Remove punctuation and lowercase the product name.
    let productName = name.toLowerCase();
    productName = productName.replace(/[^\w\s]/g, '');

    // Split the product name into individual words.
    let words = productName.split(' ');

    // Removing double spaces
    words = words.filter(w => w.trim().length > 1);

    // Remove the English stop words.
    words = removeStopwords(words, [...eng, 'upto', 'onto']);

    // Generate all possible combinations of words, limiting the keywords to a maximum of 3 words.
    const keywords = [];
    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j <= words.length; j++) {
            if (j - i <= maxLength && j - i > 1) {
                const k: string = words.slice(i, j).join(' ').trim();
                // if (k.split(' ').length > 1) {
                keywords.push(k);
                // }
            }
        }
    }

    // Return the list of keywords.
    return keywords;
}