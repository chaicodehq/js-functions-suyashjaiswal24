/**
 * 🎨 Mehndi Pattern Maker - Recursion
 *
 * Mehndi artist hai tu! Intricate patterns banane hain using RECURSION.
 * Yahan loops use karna MANA hai — sirf function khud ko call karega
 * (recursive calls). Har function mein base case aur recursive case hoga.
 *
 * Functions:
 *
 *   1. repeatChar(char, n)
 *      - Repeat char n times using recursion (NO loops, NO .repeat())
 *      - Base case: n <= 0 => return ""
 *      - Recursive: char + repeatChar(char, n - 1)
 *      - Agar char not a string or empty, return ""
 *
 *   2. sumNestedArray(arr)
 *      - Sum all numbers in an arbitrarily nested array
 *      - e.g., [1, [2, [3, 4]], 5] => 15
 *      - Skip non-number values
 *      - Base case: empty array => 0
 *      - Agar input not array, return 0
 *
 *   3. flattenArray(arr)
 *      - Flatten an arbitrarily nested array into a single flat array
 *      - e.g., [1, [2, [3, 4]], 5] => [1, 2, 3, 4, 5]
 *      - Agar input not array, return []
 *
 *   4. isPalindrome(str)
 *      - Check if string is palindrome using recursion
 *      - Case-insensitive comparison
 *      - Base case: string length <= 1 => true
 *      - Compare first and last chars, recurse on middle
 *      - Agar input not string, return false
 *
 *   5. generatePattern(n)
 *      - Generate symmetric mehndi border pattern
 *      - n = 1 => ["*"]
 *      - n = 2 => ["*", "**", "*"]
 *      - n = 3 => ["*", "**", "***", "**", "*"]
 *      - Pattern goes from 1 star up to n stars, then back down to 1
 *      - Use recursion to build the ascending part, then mirror it
 *      - Agar n <= 0, return []
 *      - Agar n is not a positive integer, return []
 *
 * Hint: Every recursive function needs a BASE CASE (when to stop) and a
 *   RECURSIVE CASE (calling itself with a smaller/simpler input).
 *
 * @example
 *   repeatChar("*", 4)        // => "****"
 *   sumNestedArray([1, [2, [3]]]) // => 6
 *   flattenArray([1, [2, [3]]]) // => [1, 2, 3]
 *   isPalindrome("madam")     // => true
 *   generatePattern(3)        // => ["*", "**", "***", "**", "*"]
 */
export function repeatChar(char, n) {
  // Your code here
    if (typeof char !== "string" || char.length === 0 || n <= 0) {
        return "";
    }
    return char + repeatChar(char, n - 1);
}

export function sumNestedArray(arr) {
  // Your code here
    if (!Array.isArray(arr)) {
        return 0;
    }
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            sum += sumNestedArray(arr[i]);
        } else if (typeof arr[i] === "number") {
            sum += arr[i];
        }
    }
    return sum;
}

export function flattenArray(arr) {
  // Your code here
    if (!Array.isArray(arr)) {
        return [];
    }
    let flattened = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            flattened = flattened.concat(flattenArray(arr[i]));
        } else {
            flattened.push(arr[i]);
        }
    }
    return flattened;
}

export function isPalindrome(str) {
  // Your code here
    if (typeof str !== "string") {
        return false;
    }
    const cleanStr = str.toLowerCase().replace(/[^a-z]/g, "");
    function checkPalindrome(s, start, end) {
        if (start >= end) return true;
        if (s[start] !== s[end]) return false;
        return checkPalindrome(s, start + 1, end - 1);
    }
    return checkPalindrome(cleanStr, 0, cleanStr.length - 1);
}

export function generatePattern(n) {
  // Your code here
    if (typeof n !== "number" || n <= 0 || !Number.isInteger(n)) {
        return [];
    }
    function buildPattern(current, max, isAscending) {
        if (current === 0 && !isAscending) return [];
        if (current > max && isAscending) {
            return buildPattern(max, max, false);
        }
        const line = repeatChar("*", current);
        if (isAscending) {
            if (current === max) {
                return [line].concat(buildPattern(current - 1, max, false));
            }
            return [line].concat(buildPattern(current + 1, max, true));
        } else {
            return [line].concat(buildPattern(current - 1, max, false));
        }
    }
    return buildPattern(1, n, true);
}
