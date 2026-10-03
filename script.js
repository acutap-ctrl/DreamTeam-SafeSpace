const navLinks = document.querySelectorAll('.nav-link[data-section]');
const pages = document.querySelectorAll('.page');
const pageName = document.getElementById('pageName');

function showPage(id){
  pages.forEach(p => p.classList.toggle('active', p.id === id));
  navLinks.forEach(a => a.classList.toggle('active', a.dataset.section === id));
  const active = document.querySelector(`.nav-link[data-section="${id}"]`);
  pageName.textContent = active ? active.querySelector('span')?.textContent || 'Dashboard' : 'Dashboard';
  history.replaceState(null,'','#'+id);
  window.scrollTo({top:0,behavior:'smooth'});
  document.querySelector('.sidebar')?.classList.remove('open');
}

navLinks.forEach(link => link.addEventListener('click', e => {
  e.preventDefault();
  showPage(link.dataset.section);
}));

document.querySelectorAll('[data-go]').forEach(btn => btn.addEventListener('click', e => {
  e.preventDefault();
  showPage(btn.dataset.go);
}));

window.addEventListener('load', () => {
  const id = location.hash.replace('#','');
  showPage(document.getElementById(id) ? id : 'dashboard');
});

document.getElementById('mobileMenu')?.addEventListener('click', () => {
  document.querySelector('.sidebar').classList.toggle('open');
});

document.querySelector('.close-notice')?.addEventListener('click', e => e.currentTarget.closest('.notice').remove());

const textarea = document.querySelector('textarea');
const counter = document.querySelector('.char-count');
textarea?.addEventListener('input', () => {
  if (textarea.value.length > 1000) textarea.value = textarea.value.slice(0,1000);
  counter.textContent = `${textarea.value.length} / 1000 characters`;
});

const evidence = document.getElementById('evidence');
const fileList = document.getElementById('fileList');
evidence?.addEventListener('change', () => {
  fileList.innerHTML = '';
  [...evidence.files].forEach(file => {
    const item = document.createElement('div');
    item.textContent = `✓ ${file.name} (${Math.ceil(file.size/1024)} KB)`;
    item.style.cssText = 'margin-top:8px;color:#527187;font-size:10px;';
    fileList.appendChild(item);
  });
});

const modal = document.getElementById('successModal');
document.getElementById('reportForm')?.addEventListener('submit', e => {
  e.preventDefault();
  modal.classList.add('show');
  e.target.reset();
  if(counter) counter.textContent = '0 / 1000 characters';
  if(fileList) fileList.innerHTML = '';
});
document.querySelectorAll('.modal-close,.modal-close-btn').forEach(btn => btn.addEventListener('click', () => modal.classList.remove('show')));
modal?.addEventListener('click', e => { if(e.target === modal) modal.classList.remove('show'); });

const statusFilter = document.getElementById('statusFilter');
const searchReports = document.getElementById('searchReports');
function filterReports(){
  const status = statusFilter.value;
  const term = searchReports.value.toLowerCase();
  document.querySelectorAll('#reportTable tr').forEach(row => {
    const matchesStatus = status === 'All Status' || row.dataset.status === status;
    const matchesText = row.textContent.toLowerCase().includes(term);
    row.style.display = matchesStatus && matchesText ? '' : 'none';
  });
}
statusFilter?.addEventListener('change', filterReports);
searchReports?.addEventListener('input', filterReports);

document.querySelectorAll('.view-btn').forEach(btn => btn.addEventListener('click', () => {
  alert('Demo only: report details would open here. In the final system, this page can be connected to PHP/MySQL.');
}));

document.getElementById('emergencyBtn')?.addEventListener('click', () => {
  alert('If there is immediate danger, contact campus security and appropriate emergency services immediately.');
});

document.getElementById('logout')?.addEventListener('click', e => {
  e.preventDefault();
  alert('Demo logout. Connect this button to your PHP session logout in the backend.');
});
