document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('truckReportForm');
    const sections = document.querySelectorAll('.form-section');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const submitButton = document.getElementById('submitReport');
    const modal = document.getElementById('confirmationModal');
    const modalClose = document.getElementById('modalClose');
    const modalMessage = document.getElementById('modalMessage');
    const reportIdMessage = document.getElementById('reportIdMessage');
    let currentSection = 0;

    showSection(currentSection);
    setupEventListeners();

    function setupEventListeners() {
        nextButtons.forEach(button => button.addEventListener('click', nextSection));
        prevButtons.forEach(button => button.addEventListener('click', prevSection));

        const truckNumberInput = document.getElementById('truckNumber');
        truckNumberInput.addEventListener('input', validateTruckNumber);

        form.addEventListener('submit', submitForm);

        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    function showSection(index) {
        sections.forEach((section, i) => {
            section.classList.toggle('active', i === index);
        });
        progressSteps.forEach((step, i) => {
            step.classList.toggle('active', i <= index);
        });

        if (index === 2) {
            prepareReview();
        }
    }

    function nextSection() {
        if (validateCurrentSection()) {
            currentSection++;
            showSection(currentSection);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function prevSection() {
        currentSection--;
        showSection(currentSection);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function validateCurrentSection() {
        let isValid = true;

        if (currentSection === 0) {
            const operatorName = document.getElementById('operatorName').value.trim();
            const truckNumber = document.getElementById('truckNumber').value.trim();
            const reportType = document.getElementById('reportType').value;

            if (!operatorName) {
                showError(document.getElementById('operatorName'), 'Por favor ingrese su nombre');
                isValid = false;
            }

            if (!validateTruckNumber()) {
                isValid = false;
            }

            if (!reportType) {
                showError(document.getElementById('reportType'), 'Por favor seleccione un tipo de reporte');
                isValid = false;
            }
        }

        if (currentSection === 1) {
            const checkboxes = document.querySelectorAll('input[name="checks"]:checked');
            if (checkboxes.length === 0) {
                alert('Por favor seleccione al menos un ítem del checklist');
                isValid = false;
            }
        }

        return isValid;
    }

    function validateTruckNumber() {
        const input = document.getElementById('truckNumber');
        const errorElement = document.getElementById('truckNumberError');
        const value = input.value.trim();

        if (!value) {
            showError(input, 'Por favor ingrese el número del camión');
            return false;
        }

        if (!/^\d{4}$/.test(value)) {
            showError(input, 'El número de camión debe tener exactamente 4 dígitos');
            return false;
        }

        clearError(input);
        return true;
    }

    function showError(input, message) {
        const errorElement = input.nextElementSibling?.nextElementSibling;
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        input.style.borderColor = '#e74c3c';
    }

    function clearError(input) {
        const errorElement = input.nextElementSibling?.nextElementSibling;
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        input.style.borderColor = '#ddd';
    }

    function prepareReview() {
        document.getElementById('reviewOperator').textContent = document.getElementById('operatorName').value;
        document.getElementById('reviewTruck').textContent = document.getElementById('truckNumber').value;
        document.getElementById('reviewType').textContent = document.getElementById('reportType').value;

        const checksList = document.getElementById('reviewChecks');
        checksList.innerHTML = '';
        document.querySelectorAll('input[name="checks"]:checked').forEach(checkbox => {
            const li = document.createElement('li');
            li.textContent = checkbox.value;
            checksList.appendChild(li);
        });

        const otherChecks = document.getElementById('otherChecks').value;
        const otherChecksContainer = document.getElementById('reviewOtherChecksContainer');
        if (otherChecks) {
            document.getElementById('reviewOtherChecks').textContent = otherChecks;
            otherChecksContainer.style.display = 'block';
        } else {
            otherChecksContainer.style.display = 'none';
        }

        const comments = document.getElementById('comments').value;
        const commentsContainer = document.getElementById('reviewCommentsContainer');
        if (comments) {
            document.getElementById('reviewComments').textContent = comments;
            commentsContainer.style.display = 'block';
        } else {
            commentsContainer.style.display = 'none';
        }
    }

    function submitForm(event) {
        event.preventDefault();

        if (!validateCurrentSection()) {
            return;
        }

        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="submit-icon">⏳</span><span class="submit-text">Enviando...</span>';

        const formData = new FormData();

        formData.append('operatorName', document.getElementById('operatorName').value);
        formData.append('truckNumber', document.getElementById('truckNumber').value);
        formData.append('reportType', document.getElementById('reportType').value);

        const checks = Array.from(document.querySelectorAll('input[name="checks"]:checked')).map(cb => cb.value);
        formData.append('checks', checks.join(', '));
        formData.append('otherChecks', document.getElementById('otherChecks').value);
        formData.append('comments', document.getElementById('comments').value);

        const scriptUrl = 'https://script.google.com/macros/s/AKfycbyVR0Ah6ISrwLs9Owi9_BonC9XFfm2HEW_YTZf1bdZBokBuqglFW2O35BlYtlKMUnMi/exec';

        fetch(scriptUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            showConfirmationModal(data.reportId);
            form.reset();
            currentSection = 0;
            showSection(currentSection);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al enviar el reporte. Por favor intente nuevamente.');
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = '<span class="submit-icon">🚛</span><span class="submit-text">Enviar Reporte</span>';
        });
    }

    function showConfirmationModal(reportId) {
        modalMessage.textContent = 'El reporte ha sido registrado exitosamente.';
        reportIdMessage.textContent = `🆔 ID del reporte: ${reportId}`;
        modal.style.display = 'flex';
    }
});