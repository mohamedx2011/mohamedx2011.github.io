function calculateGCD() {
  const a = parseInt(document.getElementById('num1').value);
  const b = parseInt(document.getElementById('num2').value);
  const output = document.getElementById('output');
  const tbody = document.querySelector('#stepsTable tbody');
  const explain = document.getElementById('explain');
  tbody.innerHTML = '';
  explain.innerHTML = '';

  if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
    output.textContent = '⚠️ يرجى إدخال عددين صحيحين موجبَين.';
    return;
  }

  let x = a, y = b;
  const steps = [];

  while (y !== 0) {
    const q = Math.floor(x / y);
    const r = x % y;
    const result = `${r} + ${q} × ${y} = ${x}`;

    const row = document.createElement('tr');
    // ثلاث أعمدة: x ، y ، النتيجة
    row.innerHTML = `<td>${x}</td><td>${y}</td><td>${result}</td>`;
    tbody.appendChild(row);

    steps.push(result);

    x = y;
    y = r;
  }

  output.textContent = `✅ القاسم الأكبر المشترك (PGCD) بين ${a} و ${b} هو ${x}`;

  explain.innerHTML = `
    <strong>شرح العملية:</strong><br>
    في كل خطوة نقسم العدد الأكبر على الأصغر، ونكتب الناتج على شكل <code>a = b × q + r</code>، حيث:<br>
    <ul>
      <li><strong>a</strong>: العدد الأكبر في الخطوة.</li>
      <li><strong>b</strong>: العدد الأصغر.</li>
      <li><strong>q</strong>: خارج القسمة.</li>
      <li><strong>r</strong>: الباقي.</li>
    </ul>
    نكرر العملية باستخدام <strong>b</strong> و<strong>r</strong> كقيم جديدة حتى يصبح <strong>r = 0</strong>، وعندها يكون <strong>b الأخير</strong> هو القاسم الأكبر المشترك.<br>
    <br>بهذا تكون قد فهمت طريقة القسمة الإقليدية عمليًا وخطوة بخطوة 🔍.
  `;
}