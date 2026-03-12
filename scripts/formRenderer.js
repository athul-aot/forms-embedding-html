/**
 * Form Renderer - Handles Form.io form loading and submission
 */

const FORM_URL = "https://forms-flow-forms-prod.aot-technologies.com/ffpocmobile-healthcarepocpatientintakevirtualcareregistration";
// const FORM_URL = "https://trial.formsflow.cloud/formio/kares-ontariotrilliumdrugprogramapplication"

/**
 * Initialize and render the Form.io form
 */
function initForm() {
    const formElement = document.getElementById('formio');
    const loadingState = document.getElementById('loading-state');

    if (!formElement) return;

    // Use the Form.io library directly
    Formio.createForm(formElement, FORM_URL, {
        readOnly: false,
        noAlerts: false,
        buttonSettings: {
            showCancel: false
        },
        i18n: {
            en: {
                submit: "Complete Registration"
            }
        }
    }).then((form) => {
        // Form is successfully loaded and rendered
        console.log("Form.io: Patient intake form rendered.");

        // Hide loader after a tiny buffer for smooth appearance
        setTimeout(() => {
            if (loadingState) {
                loadingState.style.display = 'none';
            }
            formElement.style.opacity = '1';
        }, 300);

        // Handle submission - formsflow automatically calls submission and application creation APIs
        form.on('submit', (submission) => {
            console.log("Form submitted - waiting for APIs...", submission);
        });

        // Listen for submitDone event which fires after submission API completes
        form.on('submitDone', (submission) => {
            console.log("Submission API completed:", submission);
            // Wait a bit for create API to be called, then redirect regardless
            setTimeout(() => {
                console.log("Redirecting to feedback page...");
                window.location.href = 'pages/feedback.html';
            }, 2000);
        });

        // Listen for error events
        form.on('submitError', (error) => {
            console.error("Submission error:", error);
            // Redirect even on error
            setTimeout(() => {
                window.location.href = 'pages/feedback.html';
            }, 1000);
        });

        // Optional: track field changes
        form.on('change', () => {
            // console.log('Field changed');
        });

    }).catch((err) => {
        console.error("Form.io Error:", err);
        if (loadingState) {
            loadingState.innerHTML = `
                <div style="text-align:center; padding: 2rem;">
                    <p style="color:#ef4444; font-weight:600;">System unavailable</p>
                    <p style="color:#64748b; font-size: 0.9rem;">We're unable to load the registration form right now. Please refresh or contact support.</p>
                </div>
            `;
        }
    });
}

// Initialize form when page loads
window.addEventListener('load', () => {
    initForm();
});
