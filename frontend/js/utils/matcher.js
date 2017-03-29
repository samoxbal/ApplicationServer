export default function matcher(value, pattern) {
    if (Array.isArray(pattern) && ~pattern.indexOf(value)) {
        return true;
    }
    if (typeof value == 'string' && typeof pattern == 'string') {
        return value == pattern;
    }
}