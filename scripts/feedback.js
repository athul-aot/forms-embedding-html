/**
 * Feedback Form Handler - Manages feedback collection and submission
 */

/**
 * Show feedback form after main form submission
 */
function showFeedbackForm() {
    const formioContainer = document.getElementById('formio');
    const feedbackSection = document.getElementById('feedback-section');
    
    // Hide the main form
    if (formioContainer) {
        formioContainer.style.display = 'none';
    }
    
    // Show feedback form with smooth transition
    if (feedbackSection) {
        feedbackSection.style.display = 'block';
        setTimeout(() => {
            feedbackSection.style.opacity = '1';
        }, 50);
    }
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Handle feedback form submission
 */
document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedback-form');
    const thankYouPopup = document.getElementById('thank-you-popup');
    const closePopupBtn = document.getElementById('close-popup');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(feedbackForm);
            const feedbackData = {
                satisfaction: formData.get('satisfaction'),
                easeOfUse: formData.get('ease-of-use'),
                comments: formData.get('comments')
            };
            
            console.log('Feedback submitted:', feedbackData);
            
            // Here you can send the feedback to your backend
            // Example: fetch('/api/feedback', { method: 'POST', body: JSON.stringify(feedbackData) })
            
            // Show thank you popup
            showThankYouPopup();
        });
    }
    
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            hideThankYouPopup();
        });
    }
    
    // Close popup when clicking outside
    if (thankYouPopup) {
        thankYouPopup.addEventListener('click', (e) => {
            if (e.target === thankYouPopup) {
                hideThankYouPopup();
            }
        });
    }
});

/**
 * Show thank you popup
 */
function showThankYouPopup() {
    const popup = document.getElementById('thank-you-popup');
    if (popup) {
        popup.style.display = 'flex';
        setTimeout(() => {
            popup.classList.add('show');
        }, 50);
    }
}

/**
 * Hide thank you popup and redirect to home
 */
function hideThankYouPopup() {
    const popup = document.getElementById('thank-you-popup');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.style.display = 'none';
            // Redirect to home page (reload the page to show the form again)
            window.location.reload();
        }, 300);
    }
}
