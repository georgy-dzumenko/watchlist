const language = localStorage.getItem('language')

export const translate = (options) => (options[language || "en"] )
