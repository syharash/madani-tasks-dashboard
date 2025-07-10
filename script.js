fetch('data/baltimore.json')
  .then(res => res.json())
  .then(data => renderDashboard(data));

function renderDashboard(tasks) {
  const container = document.getElementById('dashboard');

  tasks.forEach(task => {
    const { taskName, avg2024, avg2025, performanceChange } = task;

    const box = document.createElement('div');
    box.className = 'task-box';

    const title = document.createElement('h3');
    title.textContent = taskName;

    const description = document.createElement('p');
    description.innerHTML = `2024: <strong>${avg2024}</strong> | 2025: <strong>${avg2025}</strong> | Change: <strong style="color:${performanceChange < 0 ? '#b00020' : '#4caf50'}">${performanceChange.toFixed(2)}%</strong>`;

    const progressWrap = document.createElement('div');
    progressWrap.className = 'progress-container';

    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    bar.style.width = Math.min(Math.abs(performanceChange), 100) + '%';
    if (performanceChange < 0) bar.classList.add('negative');

    progressWrap.appendChild(bar);
    box.append(title, description, progressWrap);
    container.appendChild(box);
  });
}
