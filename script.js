// Simplified Registration Page - JavaScript

const claimBtn = document.getElementById('claim-btn');
const faqItems = document.querySelectorAll('.faq-item');

const AFFILIATE_LINK = "https://glctrk.org/aff_c?offer_id=2358&aff_id=32911";

// Claim button click - direct to affiliate
claimBtn.addEventListener('click', () => {
    window.location.href = AFFILIATE_LINK;
});

// FAQ accordion functionality
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});
