document.addEventListener('DOMContentLoaded', () => {

  const services = {
    vpn: {
      title: 'VPN',
      brief: 'نؤمّن اتصال شبكي مشفّر بين فروع شركتك المختلفة، فتتعامل مع كل الفروع كأنها شبكة داخلية واحدة، بغض النظر عن موقعها الجغرافي.'
    },
    it: {
      title: 'IT',
      brief: 'إدارة وتشغيل وصيانة الأنظمة التقنية عندك، من الأجهزة والشبكات والبرامج، وربط الفروع الداخلية في بنية واحدة مستقرة.'
    },
    erp: {
      title: 'ERP System (IPSAR)',
      brief: 'نظام ERP يغطي دورة عمل الشركة الكاملة، ومبني على ثلاث طرق عمل رئيسية:',
      modules: ['بيع مباشر', 'بيع غير مباشر', 'تصنيع'],
      link: 'media.html?service=erp'
    },
    cashier: {
      title: 'Cashier',
      brief: 'تسجيل وإدارة عمليات البيع والشراء في المتاجر والمطاعم وغيرها من الأنشطة التجارية، بواجهة سريعة مناسبة لضغط العمل اليومي.'
    },
    website: {
      title: 'Website',
      brief: 'تصميم وتطوير مواقع إلكترونية احترافية تعكس هوية الشركة وتحقق أهدافها التسويقية، مبنية للسرعة ولتجربة استخدام واضحة.'
    },
    software: {
      title: 'Software Design & Development',
      brief: 'تحليل، وتصميم، وإنشاء، واختبار، ونشر برمجيات مخصصة لتلبية احتياجات محددة لشركتك أو مؤسستك، من الفكرة للتشغيل.'
    },
    hr: {
      title: 'HR System',
      brief: 'حلول HR متكاملة تسهّل إدارة الموظفين والعمليات الإدارية، من الحضور والانصراف إلى الرواتب والإجازات، وتساعد في تحسين أداء الشركة.',
      link: 'media.html?service=hr'
    },
    crm: {
      title: 'CRM System',
      brief: 'إدارة علاقات العملاء ومتابعة المبيعات وتحليل بيانات العملاء، لبناء علاقات أقوى وزيادة المبيعات واتخاذ قرارات تسويقية أدق.',
      link: 'media.html?service=crm'
    }
  };

  const modalEl = document.getElementById('serviceModal');
  if (!modalEl || typeof bootstrap === 'undefined') return;

  const modal = new bootstrap.Modal(modalEl);
  const titleEl = document.getElementById('serviceModalTitle');
  const briefEl = document.getElementById('serviceModalBrief');
  const modulesEl = document.getElementById('serviceModalModules');
  const linkEl = document.getElementById('serviceModalLink');
  const contactEl = document.getElementById('serviceModalContact');

  function openService(key) {
    const data = services[key];
    if (!data) return;

    titleEl.textContent = data.title;
    briefEl.textContent = data.brief;

    if (data.modules && data.modules.length) {
      modulesEl.innerHTML = data.modules.map(m => `<li>${m}</li>`).join('');
      modulesEl.classList.remove('d-none');
    } else {
      modulesEl.innerHTML = '';
      modulesEl.classList.add('d-none');
    }

    if (data.link) {
      linkEl.href = data.link;
      linkEl.classList.remove('d-none');
      contactEl.classList.add('d-none');
    } else {
      linkEl.classList.add('d-none');
      contactEl.classList.remove('d-none');
    }

    modal.show();
  }

  document.querySelectorAll('.service-card[data-service]').forEach(card => {
    card.addEventListener('click', () => openService(card.dataset.service));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openService(card.dataset.service);
      }
    });
  });

});