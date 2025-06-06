document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form) {
    async function handleSubmit(event) {
      event.preventDefault();
      const data = new FormData(form);
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          status.textContent = 'Thanks for your submission!';
          form.reset();
        } else {
          status.textContent = 'Oops! There was a problem submitting your form';
        }
      } catch (error) {
        status.textContent = 'Oops! There was a problem submitting your form';
      }
    }
    form.addEventListener('submit', handleSubmit);
  }

  const searchInput = document.getElementById('project-search');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const term = this.value.toLowerCase();
      document.querySelectorAll('.card').forEach(card => {
        const heading = card.querySelector('.card__heading').textContent.toLowerCase();
        card.style.display = heading.includes(term) ? '' : 'none';
      });
    });
  }

  const sections = document.querySelectorAll('.fade-in-section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));
});
