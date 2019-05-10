function swapArrayElements(a, i, j) {
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
}

function getRandomInt(min, max) {
    // Got this one from Mozilla because I'm lazy lol
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mangleText(text_to_mangle) {
    const mangle_array = Array.from(text_to_mangle);
    for (let pivot = 0; pivot < text_to_mangle.length-1; pivot++) {
        let swapchar = getRandomInt(pivot, text_to_mangle.length);
        swapArrayElements(mangle_array, pivot, swapchar);
    }
    return mangle_array.join("");
}

function mangleElement(element_to_mangle) {
    if (element_to_mangle.childElementCount != 0) {
        for (let i = 0; i < element_to_mangle.childNodes.length; i++) {
            let node = element_to_mangle.childNodes[i];
            let trimmed_node = node.textContent.trim();
            if (node.nodeType === 3 && trimmed_node != "") {
                let mangled_text = mangleText(trimmed_node);
                element_to_mangle.childNodes[i].nodeValue = mangled_text;
            }
        }
    } else {
        let text_content = element_to_mangle.textContent.trim();
        if (text_content.replace(/\s/g, "") != "") {
            let trimmed_node = element_to_mangle.textContent.trim();
            let mangled_text = mangleText(trimmed_node);
            element_to_mangle.textContent = mangled_text;
        }
    }
}

function recursivelyMangleElement(element_to_mangle) {
    for (let i = 0; i < element_to_mangle.childElementCount; i++) {
        let child_element = element_to_mangle.children[i];
        mangleElement(child_element);
        if (child_element.childElementCount > 0) {
            recursivelyMangleElement(child_element);
        }
    }
}

function mangleDocument() {
    recursivelyMangleElement(document.body);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function mangleDocumentContinuously() {
    while(true) {
        await sleep(100);
        mangleDocument();
    }
}
