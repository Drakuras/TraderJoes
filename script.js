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

// Benefit Estimator Elements
const statusBtns = document.querySelectorAll('.status-btn');
const householdSlider = document.getElementById('household-slider');
const householdVal = document.getElementById('household-val');
const estimatedAmount = document.getElementById('estimated-amount');

const AFFILIATE_LINK = "https://glctrk.org/aff_c?offer_id=2358&aff_id=32911";

let currentStep = 1;
let baseAmount = 100;

// Initialize Estimator
function updateEstimation() {
    const members = parseInt(householdSlider.value);
    const multiplier = 50; // $50 per extra person

    // Formula: Base (from Status) + (HouseholdSize * 50)
    let total = baseAmount + (members * multiplier);

    // Cap at $500
    if (total > 500) total = 500;

    // Animate nicely? For now just set text
    estimatedAmount.textContent = `$${total.toFixed(2)}`;
}

// Status Button Click
statusBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        statusBtns.forEach(b => b.classList.remove('active'));
        // Add to clicked
        btn.classList.add('active');

        // Update Base Amount
        baseAmount = parseInt(btn.getAttribute('data-val'));

        updateEstimation();
    });
});

// Slider Input
householdSlider.addEventListener('input', (e) => {
    householdVal.textContent = e.target.value;
    updateEstimation();
});

// Initial Calculation
updateEstimation();


// --- Modal Logic ---

// Open Modal
checkBtn.addEventListener('click', () => {
    resetModal();
    modalOverlay.classList.remove('hidden');
});

function resetModal() {
    currentStep = 1;
    modalTitle.textContent = "Eligibility Check";
    modalQuestion.textContent = "Are you over 18 years of age?";
    modalActions.classList.remove('hidden');
    ineligibleMsg.classList.add('hidden');
    btnYes.textContent = "YES";
    btnYes.disabled = false;
}

btnYes.addEventListener('click', () => {
    if (currentStep === 1) {
        currentStep = 2;
        modalQuestion.textContent = "Do you live in the USA, Canada, UK, or Australia?";
    } else if (currentStep === 2) {
        btnYes.textContent = "Verifying...";
        btnYes.disabled = true;
        setTimeout(() => {
            window.location.href = AFFILIATE_LINK;
        }, 800);
    }
});

btnNo.addEventListener('click', () => {
    modalActions.classList.add('hidden');
    modalTitle.textContent = "Not Eligible";
    modalQuestion.textContent = "";
    ineligibleMsg.classList.remove('hidden');
});

btnClose.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.add('hidden');
    }
});
