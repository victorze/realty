// Prevent Double Submits
document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    if (form.classList.contains('is-submitting')) {
      e.preventDefault();
    }
    form.classList.add('is-submitting');
  });
});
