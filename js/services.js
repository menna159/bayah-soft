function openWindow(departmentName) {
  localStorage.setItem('selectedDepartment', departmentName);
window.location.href = 'department.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('departmentAccordion');
  const spinner = document.getElementById('spinner');

  fetch('departments_full_data.json')
    .then(res => res.json())
    .then(data => {
      data.forEach((dep, index) => {
        const section = document.createElement('div');
        section.className = 'card h-100 shadow-sm department-card text-center border-0';
        section.style.cursor = 'pointer';

        // تطبيق الألوان بالتناوب من لوحة الألوان
        const colorClass = `bg-card-palette-${(index % 5) + 1}`;
        section.classList.add(colorClass);

        // Click handler
        section.onclick = () => openWindow(dep.name.replace(/'/g, "\\'"));

        // Card content
        section.innerHTML = `
          <div class="card-body py-4">
            <h5 class="card-title fw-semibold">
              ${dep.name}
            </h5>
          </div>
        `;

        // Wrap in Bootstrap column
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-3 mb-4 d-flex justify-content-center';
        col.appendChild(section);
        container.appendChild(col);
      });

      spinner.classList.remove('show');
    })
    .catch(err => {
      console.error('Failed to load data:', err);
      container.innerHTML = '<div class="text-danger text-center">حدث خطأ في تحميل العملاء</div>';
      spinner.classList.remove('show');
    });
});
