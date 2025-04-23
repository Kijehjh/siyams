document.addEventListener('DOMContentLoaded', function() {
    // Get all DOM elements
    const generateEmailsBtn = document.getElementById('generateEmails');
    const clearEmailsBtn = document.getElementById('clearEmails');
    const copyEmailsBtn = document.getElementById('copyEmails');
    const extractNumbersBtn = document.getElementById('extractNumbers');
    const clearNumbersBtn = document.getElementById('clearNumbers');
    const copyNumbersBtn = document.getElementById('copyNumbers');
    
    // Email Variation Generator
    generateEmailsBtn.addEventListener('click', generateEmailVariations);
    clearEmailsBtn.addEventListener('click', clearEmailSection);
    copyEmailsBtn.addEventListener('click', () => copyResult('emailResult'));
    
    // Number Extractor
    extractNumbersBtn.addEventListener('click', extractNumbers);
    clearNumbersBtn.addEventListener('click', clearNumberSection);
    copyNumbersBtn.addEventListener('click', () => copyResult('numberResult'));
});

function generateEmailVariations() {
    const baseEmail = document.getElementById('baseEmail').value.trim();
    const count = parseInt(document.getElementById('variationCount').value);
    const resultBox = document.getElementById('emailResult');
    
    if (!baseEmail || !baseEmail.includes('@')) {
        resultBox.textContent = "Please enter a valid email address!";
        resultBox.style.color = "red";
        return;
    }

    const [namePart, domain] = baseEmail.split('@');
    const variations = new Set();
    const maxVariations = Math.min(count, Math.pow(2, namePart.length));
    
    while (variations.size < maxVariations) {
        let variation = '';
        for (const char of namePart) {
            variation += Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
        }
        variations.add(`${variation}@${domain}`);
    }

    resultBox.textContent = Array.from(variations).join('\n');
    resultBox.style.color = "#333";
}

function extractNumbers() {
    const inputData = document.getElementById('simData').value;
    const separator = document.querySelector('input[name="separator"]:checked').value;
    const numbers = inputData.match(/\d{10,}/g) || [];
    const uniqueNumbers = [...new Set(numbers)];
    
    const sep = separator === 'comma' ? ', ' : '/';
    document.getElementById('numberResult').textContent = uniqueNumbers.join(sep);
}

function copyResult(elementId) {
    const resultText = document.getElementById(elementId).textContent;
    if (!resultText.trim()) {
        alert('No content to copy!');
        return;
    }
    
    navigator.clipboard.writeText(resultText).then(() => {
        showCopyFeedback(elementId);
    }).catch(err => {
        alert('Failed to copy: ' + err);
    });
}

function showCopyFeedback(elementId) {
    const feedback = document.createElement('div');
    feedback.className = 'copy-feedback';
    feedback.textContent = 'Copied!';
    feedback.id = `${elementId}Feedback`;
    
    const resultBox = document.getElementById(elementId);
    resultBox.appendChild(feedback);
    
    feedback.style.display = 'block';
    setTimeout(() => {
        feedback.style.display = 'none';
        setTimeout(() => feedback.remove(), 300);
    }, 2000);
}

function clearEmailSection() {
    document.getElementById('baseEmail').value = '';
    document.getElementById('variationCount').value = '10';
    document.getElementById('emailResult').textContent = '';
}

function clearNumberSection() {
    document.getElementById('simData').value = '';
    document.getElementById('numberResult').textContent = '';
}
