function openWindow(departmentName) {
  localStorage.setItem('selectedDepartment', departmentName);
  window.open('department.html', '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('departmentAccordion');
  const spinner = document.getElementById('spinner');

  fetch('departments_full_data.json')
    .then(res => res.json())
    .then(data => {
      data.forEach((dep, index) => {
        const collapseId = `collapse${index}`;

        // Build customers list
        const customersList = (dep.customers || []).map(c => {
          const name = typeof c === 'string' ? c : c.name || '';
          const activity = typeof c === 'object' && c.activity ? `<br><small class="text-muted">${c.activity}</small>` : '';
          return `<li class="bg-light p-2 rounded">${name}${activity}</li>`;
        }).join('');

        const section = document.createElement('div');
        section.className = 'accordion-item mb-3';
        section.innerHTML = `
          <h2 class="accordion-header" id="heading${index}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
              <i class="fa ${dep.icon || 'fa-question'} text-primary me-2"></i> ${dep.name}
            </button>
          </h2>
          <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#departmentAccordion">
            <div class="accordion-body">
              <button class="btn btn-outline-primary mb-3" onclick="openWindow('${dep.name.replace(/'/g, "\\'")}')">
                عرض عملاء هذا القسم
              </button>
              <ul class="list-unstyled row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2">
                ${customersList || '<li class="text-muted">لا يوجد عملاء</li>'}
              </ul>
            </div>
          </div>
        `;
        container.appendChild(section);
      });

      spinner.classList.remove('show');
    })
    .catch(err => {
      console.error('Failed to load data:', err);
      container.innerHTML = '<div class="text-danger text-center">حدث خطأ في تحميل العملاء</div>';
      spinner.classList.remove('show');
    });
});
