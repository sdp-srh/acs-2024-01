export const formatUtcDate = (utcDate) => {
    const date = new Date(utcDate);
    return date.toLocaleDateString('de-DE', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

