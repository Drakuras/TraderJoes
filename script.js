const checkBtn = document.getElementById('check-eligibility-btn');
const modalOverlay = document.getElementById('modal-overlay');

// Modal Elements
const modalTitle = document.getElementById('modal-title');
const modalQuestion = document.getElementById('modal-question');
const modalActions = document.getElementById('modal-actions');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');

const ineligibleMsg = document.getElementById('ineligible-msg');
const btnClose = document.getElementById('btn-close');

const AFFILIATE_LINK = "https://glctrk.org/aff_c?offer_id=2358&aff_id=32911";

let currentStep = 1;

// Open Modal
checkBtn.addEventListener('click', () => {
    resetModal();
    modalOverlay.classList.remove('hidden');
});

// Reset State
function resetModal() {
    currentStep = 1;
    modalTitle.textContent = "Eligibility Check";
    modalQuestion.textContent = "Are you over 18 years of age?";
    modalActions.classList.remove('hidden');
    ineligibleMsg.classList.add('hidden');
    btnYes.textContent = "YES";
    btnYes.disabled = false;
}

// Handle YES
btnYes.addEventListener('click', () => {
    if (currentStep === 1) {
        // Move to Step 2
        currentStep = 2;
        modalQuestion.textContent = "Do you live in the USA, Canada, UK, or Australia?";
    } else if (currentStep === 2) {
        // Success -> Redirect
        btnYes.textContent = "Verifying...";
        btnYes.disabled = true;
        setTimeout(() => {
            window.location.href = AFFILIATE_LINK;
        }, 800);
    }
});

// Handle NO
btnNo.addEventListener('click', () => {
    modalActions.classList.add('hidden');
    modalTitle.textContent = "Not Eligible";
    modalQuestion.textContent = "";
    ineligibleMsg.classList.remove('hidden');
});

// Close Modal
btnClose.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
});

// Click outside
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.add('hidden');
    }
});
