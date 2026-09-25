const storageKey = 'prototype-expenses-v1';
      let transactions = [];
      try {
        transactions = JSON.parse(localStorage.getItem(storageKey) || '[]');
      } catch (err) {
        console.error('Could not read saved transactions:', err);
        transactions = [];
      }

      const modal = document.querySelector('#transaction-modal');
      const form = document.querySelector('#transaction-form');
      const money = amount => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 2 }).format(amount);
      const colors = ['#a8d85d', '#f1b86a', '#77c9bc', '#9d91d8', '#e58d81', '#8db8e5'];
      const icons = { Food: '⌁', Transport: '↗', Shopping: '♧', Bills: '▤', Health: '✚', Entertainment: '★', Salary: '✦', Other: '○' };

      function saveTransactions() {
        try {
          localStorage.setItem(storageKey, JSON.stringify(transactions));
        } catch (err) {
          console.error('Could not save transactions:', err);
        }
      }

      function escapeHtml(text) {
        const el = document.createElement('div');
        el.textContent = text;
        return el.innerHTML;
      }

      function render() {
        const now = new Date();
        const monthItems = transactions.filter(t => {
          const d = new Date(t.date + 'T12:00:00');
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });

        document.querySelector('#month-label').textContent = now.toLocaleDateString('en-NG', { month: 'long', year: 'numeric' }).toUpperCase();

        const income = monthItems.filter(t => t.type === 'income').reduce((a, t) => a + t.amount, 0);
        const spent = monthItems.filter(t => t.type === 'expense').reduce((a, t) => a + t.amount, 0);
        const balance = transactions.reduce((a, t) => a + (t.type === 'income' ? t.amount : -t.amount), 0);

        document.querySelector('#balance').textContent = money(balance);
        document.querySelector('#income').textContent = money(income);
        document.querySelector('#spent').textContent = money(spent);
        document.querySelector('#transaction-count').textContent = monthItems.length;
        document.querySelector('#balance-note').textContent = balance >= 0 ? 'You are in control of your money.' : 'Your expenses are above your income.';

        const list = document.querySelector('#transaction-list');
        if (!transactions.length) {
          list.innerHTML = '<div class="empty-state"><span>◌</span><h4>No transactions yet</h4><p>Add your first income or expense to get started.</p></div>';
        } else {
          list.innerHTML = [...transactions]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 6)
            .map(t => `<div class="transaction"><div class="transaction-icon">${icons[t.category] || '○'}</div><div class="transaction-copy"><strong>${escapeHtml(t.description)}</strong><span>${escapeHtml(t.category)} · ${new Date(t.date + 'T12:00:00').toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}</span></div><div class="transaction-amount ${t.type}">${t.type === 'income' ? '+' : '−'}${money(t.amount)}</div></div>`)
            .join('');
        }

        const groups = {};
        monthItems.filter(t => t.type === 'expense').forEach(t => { groups[t.category] = (groups[t.category] || 0) + t.amount; });
        const entries = Object.entries(groups).sort((a, b) => b[1] - a[1]);

        document.querySelector('#donut-total').textContent = money(spent).replace('.00', '');

        const donut = document.querySelector('#donut');
        if (entries.length) {
          let pos = 0;
          donut.style.background = `conic-gradient(${entries.map(([_, v], i) => {
            const end = pos + (v / spent) * 100;
            const segment = `${colors[i % colors.length]} ${pos}% ${end}%`;
            pos = end;
            return segment;
          }).join(',')})`;
        } else {
          donut.style.background = 'conic-gradient(var(--line) 0 100%)';
        }

        document.querySelector('#category-list').innerHTML = entries.length
          ? entries.map(([name, value], i) => `<div class="category-row"><i class="dot" style="background:${colors[i % colors.length]}"></i><span>${escapeHtml(name)}</span><strong>${money(value).replace('.00', '')}</strong></div>`).join('')
          : '<p class="empty-categories">Your spending categories will appear here.</p>';
      }

      function openModal() {
        form.reset();
        form.date.value = new Date().toISOString().slice(0, 10);
        modal.showModal();
      }

      document.querySelector('#open-modal').addEventListener('click', openModal);
      document.querySelector('#close-modal').addEventListener('click', () => modal.close());

      form.addEventListener('submit', e => {
        e.preventDefault();
        const fields = form.elements;
        const entry = {
          id: Date.now(),
          type: fields.type.value,
          amount: Number(fields.amount.value),
          description: fields.description.value.trim(),
          category: fields.category.value,
          date: fields.date.value
        };
        transactions.push(entry);
        saveTransactions();
        modal.close();
        render();
      });

      document.querySelector('#clear-data').addEventListener('click', () => {
        if (transactions.length && confirm('Clear all saved transactions?')) {
          transactions = [];
          saveTransactions();
          render();
        }
      });

      render();