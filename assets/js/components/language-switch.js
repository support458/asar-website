/**
 * Language Switcher logic
 */
export const initLanguageSwitch = () => {
    const langSelectors = document.querySelectorAll('.lang-selector');
    langSelectors.forEach(select => {
        select.addEventListener('change', (e) => {
            const lang = e.target.value;
            // logic to redirect to /en/ /uz/ etc
        });
    });
};
