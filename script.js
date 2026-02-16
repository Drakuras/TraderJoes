// Professional Redesign - JavaScript

// Element References
const primaryCta = document.getElementById('primary-cta');

// Calculator Elements
const statusButtons = document.querySelectorAll('.radio-btn');
const householdSlider = document.getElementById('household-slider');
const householdVal = document.getElementById('household-val');
const estimatedAmount = document.getElementById('estimated-amount');

const AFFILIATE_LINK = "https://glctrk.org/aff_c?offer_id=2358&aff_id=32911";

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

// Direct link on CTA click - no modal
primaryCta.addEventListener('click', () => {
    window.location.href = AFFILIATE_LINK;
});
