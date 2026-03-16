// Target Rewards Program - JavaScript Logic

const claimBtn = document.getElementById('claim-btn');
const faqItems = document.querySelectorAll('.faq-item');

const AFFILIATE_LINK = "https://linkthem.net/aff_c?offer_id=317&aff_id=32911";

// Handle Claim Button Click
claimBtn.addEventListener('click', () => {
    // Add a slight delay for the button press animation to finish before redirecting
    setTimeout(() => {
        window.location.href = AFFILIATE_LINK;
    }, 150);
});

// Handle FAQ Accordion Toggle
let openFaq = null;

faqItems.forEach((item, index) => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    // Make sure elements exist
    if (!questionBtn || !answer || !icon) return;

    questionBtn.addEventListener('click', () => {
        if (openFaq === index) {
            // Close currently open FAQ
            answer.classList.remove('open');
            icon.classList.remove('open');
            openFaq = null;
        } else {
            // Close previously open FAQ if one exists
            if (openFaq !== null) {
                const prevItem = faqItems[openFaq];
                if (prevItem) {
                    prevItem.querySelector('.faq-answer').classList.remove('open');
                    prevItem.querySelector('.faq-icon').classList.remove('open');
                }
            }
            // Open this FAQ
            answer.classList.add('open');
            icon.classList.add('open');
            openFaq = index;
        }
    });
});

// Trigger progress bar animation on load
document.addEventListener('DOMContentLoaded', () => {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        // Start at 0, animate to 20%
        progressFill.style.width = '0%';
        setTimeout(() => {
            progressFill.style.width = '20%';
        }, 300);
    }
});
