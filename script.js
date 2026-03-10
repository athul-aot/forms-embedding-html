/**
 * Modern Business Portal | Direct Form.io Integration
 */

const FORM_URL = "https://trial.formsflow.cloud/formio/kares-ontariotrilliumdrugprogramapplication";

window.addEventListener('load', () => {
    initForm();
});

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

        // Custom branding or post-render adjustments could go here

        // Hide loader after a tiny buffer for smooth appearance
        setTimeout(() => {
            if (loadingState) {
                loadingState.style.display = 'none';
            }
            formElement.style.opacity = '1';
        }, 300);

        // Handle submission
        form.on('submit', (submission) => {
            console.log("Submission successful:", submission);
            // You can redirect or show a custom success message here
        });

        // Optional: track field changes
        form.on('change', (changed) => {
            // console.log('Field changed:', changed);
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
