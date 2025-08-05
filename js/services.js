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
         
        // Apply background & text color
        if(index==data.length-1){
          section.style.borderRadius='1.5rem';
          section.classList.add('bg-card-dark');
        } 
       else if (index % 4 === 0) {
          section.classList.add('bg-card-dark');
          section.style.borderTopLeftRadius = '1.5rem';
          section.style.borderBottomLeftRadius = '1.5rem';
        } else if (index % 4 === 1||index%4===2) {
          section.classList.add('bg-card-light');
          section.style.borderRadius = '0';
        } 
        else {
          section.classList.add('bg-card-dark');
          section.style.borderTopRightRadius = '1.5rem';
          section.style.borderBottomRightRadius = '1.5rem';
        }

        // Click handler
        section.onclick = () => openWindow(dep.name.replace(/'/g, "\\'"));

        // Card content
        section.innerHTML = `
          <div class="card-body py-4">
            <h5 class="card-title  ${index%4!==1&&index%4!==2?'text-light':"text-card-dark"} fw-semibold">
              ${dep.name}
            </h5>
          </div>
        `;

        // Wrap in Bootstrap column
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-3 mb-4';
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
