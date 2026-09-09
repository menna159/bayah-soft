function openWindow(customer) {
  // Store the customer's own data (not just the department/activity name)
  localStorage.setItem('selectedCustomer', JSON.stringify(customer));
  window.location.href = 'department.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('departmentAccordion');
  const spinner = document.getElementById('spinner');
  const searchInput = document.getElementById('departmentSearch');
  const noResults = document.getElementById('noDepartmentsResult');

  if (container) {
    fetch('departments_full_data.json')
      .then(res => res.json())
      .then(data => {
        // Flatten: pull every customer out of every department into one list
        const allCustomers = [];
        data.forEach(dep => {
          (dep.customers || []).forEach(customer => {
            if (!customer || !customer.name) return; // skip empty/malformed entries
            allCustomers.push({
              ...customer,
              department: dep.name,
              icon: dep.icon || ''
            });
          });
        });

    
allCustomers.forEach((customer, index) => {
  const col = document.createElement('div');
  col.className = 'col-12 col-sm-6 col-lg-4 col-xl-3 customer-col';

  const placeText = Array.isArray(customer.place)
    ? customer.place.join('، ')
    : (customer.place || '');

  // Search data
  col.dataset.name = [
    customer.name,
    customer.activity,
    placeText
  ]
    .filter(Boolean)
    .join(' ');

  const section = document.createElement('article');
  section.className = 'customer-card';

  // section.onclick = () => openWindow(customer);

  section.innerHTML = `
    <div class="customer-card-inner">

      <!-- Top -->
      <div class="customer-card-top">
        <span class="customer-number">
          ${String(index + 1).padStart(2, '0')}
        </span>

        <div class="customer-icon">
          <i class="fas fa-building"></i>
        </div>
      </div>

      <!-- Content -->
      <div class="customer-content">

        <h5 class="customer-name">
          ${customer.name}
        </h5>

        ${
          customer.activity
            ? `
              <p class="customer-activity">
                ${customer.activity}
              </p>
            `
            : ''
        }

        ${
          placeText
            ? `
              <div class="customer-location">
                <i class="fas fa-location-dot"></i>
                <span>${placeText}</span>
              </div>
            `
            : ''
        }

      </div>



    </div>
  `;

  col.appendChild(section);
  container.appendChild(col);
});



        if (spinner) spinner.classList.remove('show');
        filterDepartments(); // apply current search value, if any, once cards exist
      })
      .catch(err => {
        console.error('Failed to load data:', err);
        container.innerHTML = '<div class="text-danger text-center">حدث خطأ في تحميل العملاء</div>';
        if (spinner) spinner.classList.remove('show');
      });
  }

  function filterDepartments() {
    if (!container || !searchInput) return;

    const query = searchInput.value.trim().toLowerCase();
    const cols = container.querySelectorAll(':scope > [data-name]');
    let visibleCount = 0;

    cols.forEach(col => {
      const matches = col.dataset.name.toLowerCase().includes(query);
      col.classList.toggle('d-none', !matches);
      if (matches) visibleCount += 1;
    });

    if (noResults) {
      noResults.classList.toggle('d-none', visibleCount !== 0 || cols.length === 0);
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterDepartments);
  }
});