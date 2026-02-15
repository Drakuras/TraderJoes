// Professional Redesign - JavaScript

// Element References
const primaryCta = document.getElementById('primary-cta');
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalQuestion = document.getElementById('modal-question');
const modalActions = document.getElementById('modal-actions');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const ineligibleMsg = document.getElementById('ineligible-msg');
const btnClose = document.getElementById('btn-close');

// Calculator Elements
const statusButtons = document.querySelectorAll('.radio-btn');
const householdSlider = document.getElementById('household-slider');
const householdVal = document.getElementById('household-val');
const estimatedAmount = document.getElementById('estimated-amount');

const AFFILIATE_LINK = "https://glctrk.org/aff_c?offer_id=2358&aff_id=32911";

let currentStep = 1;
let baseAmount = 500;

// Initialize Estimator
function updateEstimation() {
    const members = parseInt(householdSlider.value);
    const multiplier = 50; // $50 per extra person

    // Formula: Base (from Status) + (HouseholdSize * 50)
    let total = baseAmount + (members * multiplier);

    // No cap - scales up based on household size and status

    // Update display
    estimatedAmount.textContent = `$${total.toFixed(2)}`;
}

// Status Button Click
statusButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all
        statusButtons.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');
        // Update base amount
        baseAmount = parseInt(btn.getAttribute('data-val'));
        // Recalculate
        updateEstimation();
    });
});

// Slider Change
householdSlider.addEventListener('input', () => {
    householdVal.textContent = householdSlider.value;
    updateEstimation();
});

// Initialize on load
updateEstimation();

// Modal Logic
primaryCta.addEventListener('click', () => {
    currentStep = 1;
    showQuestion1();
    modalOverlay.classList.remove('hidden');
});

function showQuestion1() {
    modalTitle.textContent = "Eligibility Verification";
    modalQuestion.textContent = "Are you 18 years of age or older?";
    modalActions.classList.remove('hidden');
    ineligibleMsg.classList.add('hidden');
}

function showQuestion2() {
    modalTitle.textContent = "Eligibility Verification";
    modalQuestion.textContent = "Do you currently reside in the USA, Canada, UK, or Australia?";
    modalActions.classList.remove('hidden');
    ineligibleMsg.classList.add('hidden');
}

function showIneligible() {
    modalActions.classList.add('hidden');
    ineligibleMsg.classList.remove('hidden');
}

function showVerifying() {
    modalTitle.textContent = "Verifying Eligibility";
    modalQuestion.textContent = "Please wait while we verify your eligibility...";
    modalActions.classList.add('hidden');

    // Simulate verification delay
    setTimeout(() => {
        window.location.href = AFFILIATE_LINK;
    }, 1500);
}

btnYes.addEventListener('click', () => {
    if (currentStep === 1) {
        currentStep = 2;
        showQuestion2();
    } else if (currentStep === 2) {
        showVerifying();
    }
});

btnNo.addEventListener('click', () => {
    showIneligible();
});

btnClose.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
    currentStep = 1;
});

// Close modal on overlay click
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.add('hidden');
        currentStep = 1;
    }
});
