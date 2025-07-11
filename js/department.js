const deptName = localStorage.getItem('selectedDepartment');
    // document.getElementById('deptTitle').innerText = 'العملاء لقسم: ' + deptName;

    fetch('departments_full_data.json')
      .then(res => res.json())
      .then(data => {
        const dept = data.find(d => d.name === deptName);
        const tbody = document.querySelector('#customersTable tbody');

        if (!dept) {
          tbody.innerHTML = '<tr><td colspan="3">القسم غير موجود</td></tr>';
          return;
        }

        dept.customers.forEach(cust => {
          let name = '';
          let depNumbers = '-';
          let places = '-';
          let activity="-";
          if (typeof cust === 'string') {
            name = cust;
          } else {
            name = cust.name;
            depNumbers = cust.depNumbers || '-';
            places = cust.place ? cust.place.join(', ') : '-';
             activity=cust.activity|| '-';
          }

          tbody.innerHTML += `
            <tr>
               <td>${places}</td>
               <td>${depNumbers}</td>
               <td>${activity}</td>
               <td>${name}</td>
            </tr>
          `;
        });
      });