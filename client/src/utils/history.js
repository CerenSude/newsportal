export const addToHistory = (caption) => {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    const updated = [caption, ...history.filter(item => item !== caption)].slice(0, 10);
    localStorage.setItem('history', JSON.stringify(updated));
};

export const getHistory = () => {
    return JSON.parse(localStorage.getItem('history')) || [];
};