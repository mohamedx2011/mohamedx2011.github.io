function largestPerfectSquareFactor(n){
  let best = 1;
  for(let a = 2; a * a <= n; a++){
    const square = a * a;
    if(n % square === 0) best = square;
  }
  return best;
}

function simplifyRadical(n){
  n = Math.floor(Math.abs(n));
  const squareFactor = largestPerfectSquareFactor(n);
  const remaining = n / squareFactor;
  const steps = [];

  steps.push(createMath(`√${n} = √(${squareFactor} × ${remaining})`));

  if(squareFactor > 1){
    const outsideRoot = Math.sqrt(squareFactor);
    steps.push(createMath(`√${n} = √(${outsideRoot}<sup>2</sup> × ${remaining})`));

    if(remaining === 1){
      steps.push(createMath(`√${n} = ${outsideRoot}`));
    } else {
      steps.push(createMath(`√${n} = ${outsideRoot}√${remaining}`));
    }
  } else {
    steps.push(createMath(`لا يمكن تبسيط الجذر أكثر لأن العدد ليس لديه مربع كامل غير 1`));
  }

  return {steps, squareFactor, remaining};
}

function createMath(html){
  const div = document.createElement('div');
  div.className = 'math';
  div.innerHTML = html.replace(/√\((.*?)\)/g,'<span class="root-wrapper"><span class="root-symbol">√</span><span class="radicand">$1</span></span>');
  return div;
}

function renderSteps(list){
  const area = document.getElementById('stepsArea');
  area.innerHTML = '';
  list.forEach(line => area.appendChild(line));
}

document.getElementById('simplifyBtn').addEventListener('click', ()=>{
  const n = parseInt(document.getElementById('radicand').value, 10);
  if(isNaN(n) || n <= 0){
    alert('أدخل عددًا صحيحًا موجبًا داخل الجذر.');
    return;
  }

  const res = simplifyRadical(n);
  renderSteps(res.steps);

  // شرح نصي مكتوب كأحرف HTML
// بعد الحساب
// شرح نصي خطوة 3 مع توضيح العدد الذي أخذناه جذره
explainArea.innerHTML = `
  <strong>شرح تبسيط الجذر خطوة بخطوة:</strong>
  <p>1. نبحث عن أكبر مربع كامل يقسم العدد (${n}) بدون باقي.</p>
  <p>2. نكتب العدد على شكل حاصل ضرب: العدد = مربع كامل × باقي (${n} = ${res.squareFactor} × ${res.remaining}).</p>
  <p>3. نستخرج الجذر التربيعي للمربع الكامل √${res.squareFactor} = ${Math.sqrt(res.squareFactor)} ونضعه خارج الجذر.</p>
  <p>4. إذا كان الباقي 1، فالنتيجة النهائية هي ${Math.sqrt(res.squareFactor)}.</p>
  <p>5. إذا كان الباقي أكبر من 1، فالنتيجة النهائية تكون: ${Math.sqrt(res.squareFactor)}√${res.remaining}.</p>
  <p>بهذا تكون قد فهمت طريقة تبسيط الجذور عمليًا وخطوة بخطوة 🔍.</p>
`;


});
