
export function pluralize(word: string, count: number) {
    if (count === 1) return word

    const trimmed = word.trim()
    if (trimmed === '') return word

    const last = trimmed.charAt(trimmed.length - 1).toLowerCase()
    const vowels = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú', 'ü']

    return vowels.includes(last) ? `${trimmed}s` : `${trimmed}es`
}