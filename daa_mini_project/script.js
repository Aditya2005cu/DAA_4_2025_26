const container = document.getElementById("bars_container");
const sizeSlider = document.getElementById("size_slider");
const speedSlider = document.getElementById("speed_slider");
const algoSelect = document.getElementById("algo_select");
const generateBtn = document.getElementById("generate_btn");
const sortBtn = document.getElementById("sort_btn");

let array = [];
let delay = 50;
let isSorting = false;

// Initialize
window.onload = generateArray;
sizeSlider.addEventListener("input", generateArray);
speedSlider.addEventListener("input", () => {
    delay = 101 - speedSlider.value; // Invert speed slider logic
});
generateBtn.addEventListener("click", generateArray);
sortBtn.addEventListener("click", startSort);

// --- UTILITIES ---

function generateArray() {
    if (isSorting) return;
    container.innerHTML = "";
    array = [];
    const size = sizeSlider.value;
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 100) + 10;
        array.push(value);
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 4}px`; // Scale height for visibility
        container.appendChild(bar);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function toggleControls(disabled) {
    isSorting = disabled;
    sizeSlider.disabled = disabled;
    generateBtn.disabled = disabled;
    sortBtn.disabled = disabled;
    algoSelect.disabled = disabled;
}

// --- ALGORITHM ROUTER ---

async function startSort() {
    toggleControls(true);
    const bars = document.querySelectorAll(".bar");
    const algo = algoSelect.value;

    if (algo === "bubble") await bubbleSort(bars);
    if (algo === "selection") await selectionSort(bars);
    if (algo === "insertion") await insertionSort(bars);
    if (algo === "merge") await mergeSort(bars, 0, array.length - 1);
    if (algo === "quick") await quickSort(bars, 0, array.length - 1);
    if (algo === "heap") await heapSort(bars);
    if (algo === "counting") await countingSort(bars);
    if (algo === "radix") await radixSort(bars);

    // Green flash on completion
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "#4caf50";
        await sleep(10);
    }
    toggleControls(false);
}

// --- 1. BUBBLE SORT ---
async function bubbleSort(bars) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = "#ff5252";
            bars[j + 1].style.backgroundColor = "#ff5252";
            await sleep(delay);

            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                bars[j].style.height = `${array[j] * 4}px`;
                bars[j + 1].style.height = `${array[j + 1] * 4}px`;
            }
            bars[j].style.backgroundColor = "#03dac6";
            bars[j + 1].style.backgroundColor = "#03dac6";
        }
    }
}

// --- 2. SELECTION SORT ---
async function selectionSort(bars) {
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        bars[minIdx].style.backgroundColor = "#ff5252";
        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = "#ffeb3b";
            await sleep(delay);
            if (array[j] < array[minIdx]) {
                bars[minIdx].style.backgroundColor = "#03dac6";
                minIdx = j;
                bars[minIdx].style.backgroundColor = "#ff5252";
            } else {
                bars[j].style.backgroundColor = "#03dac6";
            }
        }
        let temp = array[minIdx];
        array[minIdx] = array[i];
        array[i] = temp;
        bars[minIdx].style.height = `${array[minIdx] * 4}px`;
        bars[i].style.height = `${array[i] * 4}px`;
        bars[minIdx].style.backgroundColor = "#03dac6";
        bars[i].style.backgroundColor = "#bb86fc"; // sorted portion
    }
}

// --- 3. INSERTION SORT ---
async function insertionSort(bars) {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        bars[i].style.backgroundColor = "#ff5252";
        await sleep(delay);

        while (j >= 0 && array[j] > key) {
            bars[j].style.backgroundColor = "#ffeb3b";
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1] * 4}px`;
            await sleep(delay);
            bars[j].style.backgroundColor = "#03dac6";
            j = j - 1;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 4}px`;
        bars[i].style.backgroundColor = "#03dac6";
    }
}

// --- 4. MERGE SORT ---
async function mergeSort(bars, l, r) {
    if (l >= r) return;
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(bars, l, m);
    await mergeSort(bars, m + 1, r);
    await merge(bars, l, m, r);
}

async function merge(bars, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = array[l + i];
    for (let j = 0; j < n2; j++) R[j] = array[m + 1 + j];

    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        bars[k].style.backgroundColor = "#ff5252";
        await sleep(delay);
        if (L[i] <= R[j]) {
            array[k] = L[i];
            i++;
        } else {
            array[k] = R[j];
            j++;
        }
        bars[k].style.height = `${array[k] * 4}px`;
        bars[k].style.backgroundColor = "#03dac6";
        k++;
    }
    while (i < n1) {
        bars[k].style.backgroundColor = "#ff5252";
        await sleep(delay);
        array[k] = L[i];
        bars[k].style.height = `${array[k] * 4}px`;
        bars[k].style.backgroundColor = "#03dac6";
        i++; k++;
    }
    while (j < n2) {
        bars[k].style.backgroundColor = "#ff5252";
        await sleep(delay);
        array[k] = R[j];
        bars[k].style.height = `${array[k] * 4}px`;
        bars[k].style.backgroundColor = "#03dac6";
        j++; k++;
    }
}

// --- 5. QUICK SORT ---
async function quickSort(bars, low, high) {
    if (low < high) {
        let pi = await partition(bars, low, high);
        await quickSort(bars, low, pi - 1);
        await quickSort(bars, pi + 1, high);
    }
}

async function partition(bars, low, high) {
    let pivot = array[high];
    bars[high].style.backgroundColor = "#bb86fc"; // Pivot color
    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
        bars[j].style.backgroundColor = "#ffeb3b";
        await sleep(delay);
        if (array[j] < pivot) {
            i++;
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            bars[i].style.height = `${array[i] * 4}px`;
            bars[j].style.height = `${array[j] * 4}px`;
        }
        bars[j].style.backgroundColor = "#03dac6";
    }
    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    bars[i + 1].style.height = `${array[i + 1] * 4}px`;
    bars[high].style.height = `${array[high] * 4}px`;
    bars[high].style.backgroundColor = "#03dac6";
    return (i + 1);
}

// --- 6. HEAP SORT ---
async function heapSort(bars) {
    let n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(bars, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        let temp = array[0];
        array[0] = array[i];
        array[i] = temp;
        bars[0].style.height = `${array[0] * 4}px`;
        bars[i].style.height = `${array[i] * 4}px`;
        bars[i].style.backgroundColor = "#bb86fc";
        await heapify(bars, i, 0);
    }
}

async function heapify(bars, n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && array[l] > array[largest]) largest = l;
    if (r < n && array[r] > array[largest]) largest = r;

    if (largest !== i) {
        bars[i].style.backgroundColor = "#ff5252";
        bars[largest].style.backgroundColor = "#ff5252";
        await sleep(delay);
        let swap = array[i];
        array[i] = array[largest];
        array[largest] = swap;
        bars[i].style.height = `${array[i] * 4}px`;
        bars[largest].style.height = `${array[largest] * 4}px`;
        bars[i].style.backgroundColor = "#03dac6";
        bars[largest].style.backgroundColor = "#03dac6";
        await heapify(bars, n, largest);
    }
}

// --- 7. COUNTING SORT ---
async function countingSort(bars) {
    let max = Math.max(...array);
    let count = new Array(max + 1).fill(0);
    let output = new Array(array.length).fill(0);

    for (let i = 0; i < array.length; i++) {
        count[array[i]]++;
        bars[i].style.backgroundColor = "#ffeb3b";
        await sleep(delay);
        bars[i].style.backgroundColor = "#03dac6";
    }

    for (let i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }

    for (let i = array.length - 1; i >= 0; i--) {
        output[count[array[i]] - 1] = array[i];
        count[array[i]]--;
    }

    for (let i = 0; i < array.length; i++) {
        array[i] = output[i];
        bars[i].style.height = `${array[i] * 4}px`;
        bars[i].style.backgroundColor = "#ff5252";
        await sleep(delay);
        bars[i].style.backgroundColor = "#03dac6";
    }
}

// --- 8. RADIX SORT ---
async function radixSort(bars) {
    let max = Math.max(...array);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        await countSortForRadix(bars, exp);
    }
}

async function countSortForRadix(bars, exp) {
    let output = new Array(array.length).fill(0);
    let count = new Array(10).fill(0);

    for (let i = 0; i < array.length; i++) {
        count[Math.floor(array[i] / exp) % 10]++;
    }
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    for (let i = array.length - 1; i >= 0; i--) {
        output[count[Math.floor(array[i] / exp) % 10] - 1] = array[i];
        count[Math.floor(array[i] / exp) % 10]--;
    }
    for (let i = 0; i < array.length; i++) {
        array[i] = output[i];
        bars[i].style.height = `${array[i] * 4}px`;
        bars[i].style.backgroundColor = "#bb86fc";
        await sleep(delay);
        bars[i].style.backgroundColor = "#03dac6";
    }
}