const state = {
  step: 'kit',
  kit: 'wallet',
  finish: null,
  color: null,
  targetProduct: 'wallet',
  design: null,
  text: 'KL',
  placement: null,
};

const steps = ['kit', 'finish', 'color', 'design', 'placement', 'review'];

const kits = [
  {
    id: 'wallet',
    label: 'WALLET ONLY',
    price: '$76.00',
    image: './assets/wallet-thumb.png',
  },
  {
    id: 'keycase',
    label: 'WALLET + KEYCASE',
    price: '+$29.00',
    image: './assets/kit-keycase.png',
  },
  {
    id: 'complete',
    label: 'WALLET + KEYCASE + PEN',
    price: '+$59.00',
    badge: 'BEST VALUE',
    image: './assets/kit-complete.png',
  },
];

const finishes = [
  {
    id: 'laser',
    label: 'LASER ENGRAVING',
    detail: 'Permanent, clean mark on metal. Best for text, monogram, and icons.',
    types: ['text', 'monogram', 'icon'],
    colors: ['Royal Black', 'Gunmetal', 'Matte Olive', 'Navy', 'Burnt Titanium', 'Carbon Fiber'],
  },
  {
    id: 'uv',
    label: 'UV PRINT',
    detail: 'Full-color artwork. Best for icons and bold monograms.',
    types: ['monogram', 'icon'],
    colors: ['Royal Black', 'White', 'Red', 'Aloha', 'Tropical', 'American Flag'],
  },
];

const colors = [
  { name: 'Royal Black', value: '#151515' },
  { name: 'Gunmetal', value: '#666865' },
  { name: 'Matte Olive', value: '#686a55' },
  { name: 'Navy', value: '#17233a' },
  { name: 'Burnt Titanium', value: 'linear-gradient(135deg,#152035,#c46b19)' },
  { name: 'Carbon Fiber', value: 'repeating-linear-gradient(45deg,#0b0b0b,#0b0b0b 5px,#363636 6px,#363636 10px)' },
  { name: 'White', value: '#f0f0ee' },
  { name: 'Red', value: '#c90011' },
  { name: 'Aloha', value: 'linear-gradient(135deg,#111,#f47721,#0b6570)' },
  { name: 'Tropical', value: 'linear-gradient(135deg,#172b16,#f7c94c,#1f6f9c)' },
  { name: 'American Flag', value: 'linear-gradient(135deg,#1b315c,#fff,#c90011)' },
];

const designTypes = [
  { id: 'text', label: 'TEXT' },
  { id: 'monogram', label: 'MONOGRAM' },
  { id: 'icon', label: 'ICON' },
];

const productTargets = [
  {
    id: 'wallet',
    label: 'Wallet',
    detail: 'Front face of the Ridge Wallet',
    image: './assets/wallet-thumb.png',
    preview: './assets/wallet-main.png',
    kits: ['wallet', 'keycase', 'complete'],
  },
  {
    id: 'keycase',
    label: 'Keycase',
    detail: 'Personalize the matching keycase',
    image: './assets/kit-keycase.png',
    preview: './assets/kit-keycase.png',
    kits: ['keycase', 'complete'],
  },
  {
    id: 'pen',
    label: 'Pen',
    detail: 'Apply the design to the pen barrel',
    image: './assets/kit-complete.png',
    preview: './assets/kit-complete.png',
    kits: ['complete'],
  },
];

const placements = [
  { id: 'center', label: 'CENTER' },
  { id: 'bottom-right', label: 'BOTTOM RIGHT' },
];

const labels = {
  kit: 'KIT',
  finish: 'FINISH',
  color: 'COLOR',
  design: 'DESIGN',
  placement: 'PLACEMENT',
  review: 'REVIEW',
};

const symbols = {
  kit: '▰',
  finish: '♢',
  color: '○',
  design: 'T',
  placement: '□',
  review: '✓',
};

const drawer = document.querySelector('#drawer');
const scrim = document.querySelector('#scrim');
const pageShell = document.querySelector('#pageShell');
const continueButton = document.querySelector('#continueButton');
const stepLabel = document.querySelector('#stepLabel');
const engravingInput = document.querySelector('#engravingText');
const charCount = document.querySelector('#charCount');
const engravingMark = document.querySelector('#engravingMark');
const placementImage = document.querySelector('#placementImage');
const placementCaption = document.querySelector('#placementCaption');
const reviewProductImage = document.querySelector('#reviewProductImage');
const reviewProductName = document.querySelector('#reviewProductName');
const appliedSummary = document.querySelector('#appliedSummary');
const personalizeLink = document.querySelector('#openDrawer');
const cartButton = document.querySelector('#cartButton');

function openDrawer() {
  drawer.classList.add('open');
  scrim.classList.add('open');
  pageShell.classList.add('muted');
}

function closeDrawer() {
  drawer.classList.remove('open');
  scrim.classList.remove('open');
  pageShell.classList.remove('muted');
}

function activeFinish() {
  return finishes.find((finish) => finish.id === state.finish);
}

function availableColors() {
  const finish = activeFinish();
  return finish ? finish.colors : [];
}

function availableTypes() {
  const finish = activeFinish();
  return finish ? finish.types : [];
}

function availableTargets() {
  return productTargets.filter((target) => target.kits.includes(state.kit));
}

function activeTarget() {
  return productTargets.find((target) => target.id === state.targetProduct);
}

function ensureTarget() {
  const targets = availableTargets();
  if (!targets.some((target) => target.id === state.targetProduct)) {
    state.targetProduct = targets[0]?.id || 'wallet';
  }
}

function renderKits() {
  const wrap = document.querySelector('#kitChoices');
  wrap.innerHTML = kits.map((kit) => `
    <button class="kit-choice ${state.kit === kit.id ? 'selected' : ''}" data-kit="${kit.id}">
      <img src="${kit.image}" alt="" />
      <span>
        <strong>${kit.label}</strong>
        <small>${kit.price}${kit.badge ? ` <span class="best-value">${kit.badge}</span>` : ''}</small>
      </span>
      ${state.kit === kit.id ? '<span class="check">✓</span>' : '<span></span>'}
    </button>
  `).join('');
}

function renderFinishes() {
  const wrap = document.querySelector('#finishChoices');
  wrap.innerHTML = finishes.map((finish) => `
    <button class="finish-choice ${state.finish === finish.id ? 'selected' : ''}" data-finish="${finish.id}">
      <span></span>
      <span>
        <strong>${finish.label}</strong>
        <small>${finish.detail}</small>
      </span>
      ${state.finish === finish.id ? '<span class="check">✓</span>' : '<span></span>'}
    </button>
  `).join('');

  document.querySelector('#finishNote').textContent = state.finish
    ? `${activeFinish().label} unlocks ${availableColors().length} color options and ${availableTypes().length} design types.`
    : 'Choose a finish to unlock eligible colors and design types.';
}

function renderColors() {
  const wrap = document.querySelector('#colorChoices');
  const available = availableColors();
  wrap.innerHTML = colors.map((color) => {
    const enabled = available.includes(color.name);
    return `
      <button
        class="color-choice ${state.color === color.name ? 'selected' : ''}"
        data-color="${color.name}"
        style="--swatch: ${color.value}"
        ${enabled ? '' : 'disabled'}
        title="${enabled ? color.name : `${color.name} is unavailable for this finish`}"
        aria-label="${color.name}"
      ></button>
    `;
  }).join('');
}

function renderTargetProducts() {
  ensureTarget();

  const section = document.querySelector('#targetSection');
  const wrap = document.querySelector('#targetChoices');
  const targets = availableTargets();
  section.hidden = targets.length < 2;

  wrap.innerHTML = targets.map((target) => `
    <button class="target-card ${state.targetProduct === target.id ? 'selected' : ''}" data-target="${target.id}">
      <img src="${target.image}" alt="" />
      <span>
        <strong>${target.label}</strong>
        <small>${target.detail}</small>
      </span>
      ${state.targetProduct === target.id ? '<span class="check">✓</span>' : '<span></span>'}
    </button>
  `).join('');
}

function renderDesignTypes() {
  const wrap = document.querySelector('#designTypes');
  const available = availableTypes();
  wrap.innerHTML = designTypes.map((type) => `
    <button
      class="type-button ${state.design === type.id ? 'selected' : ''}"
      data-design="${type.id}"
      ${available.includes(type.id) ? '' : 'disabled'}
    >${type.label}</button>
  `).join('');
}

function renderPlacements() {
  const wrap = document.querySelector('#placementChoices');
  wrap.innerHTML = placements.map((placement) => `
    <button class="placement-button ${state.placement === placement.id ? 'selected' : ''}" data-placement="${placement.id}">
      ${placement.label}
    </button>
  `).join('');
}

function selectedValues() {
  const kit = kits.find((item) => item.id === state.kit);
  const finish = activeFinish();
  const target = activeTarget();
  const type = state.design ? designTypes.find((item) => item.id === state.design) : null;
  const placement = state.placement ? placements.find((item) => item.id === state.placement) : null;
  const design = type?.label || 'Pending';

  return {
    kit: kit?.label || 'Pending',
    finish: finish?.label || 'Not selected',
    color: state.color || 'Pending',
    target: target?.label || 'Wallet',
    design,
    designSummary: availableTargets().length > 1 ? `${target?.label || 'Wallet'} / ${design}` : design,
    designValue: state.design === 'icon' ? 'Selected icon' : (state.text || 'KL').toUpperCase(),
    placement: placement?.label || 'Pending',
  };
}

function renderSummary() {
  const values = selectedValues();

  document.querySelector('#summaryRow').innerHTML = steps.map((step) => `
    <div class="summary-item">
      <span class="summary-icon">${symbols[step]}</span>
      <b>${labels[step]}</b>
      <span>${step === 'review' ? 'Before cart' : (step === 'design' ? values.designSummary : values[step])}</span>
    </div>
  `).join('');

  document.querySelector('#headerColor').textContent = state.color || 'Royal Black';
  document.querySelector('#pdpColor').textContent = state.color || 'Royal Black';
}

function renderReview() {
  const values = selectedValues();
  const target = activeTarget();
  const rows = [
    ['Kit', values.kit, 'kit'],
    ['Personalized item', values.target, 'design'],
    ['Finish', values.finish, 'finish'],
    ['Color', values.color, 'color'],
    ['Design type', values.design, 'design'],
    ['Design value', values.designValue, 'design'],
    ['Placement', values.placement, 'placement'],
  ];

  reviewProductImage.src = target?.image || './assets/wallet-thumb.png';
  reviewProductName.textContent = `RIDGE ${values.target.toUpperCase()}`;
  document.querySelector('#reviewSubtitle').textContent = `${values.target} personalized in ${values.color}`;
  document.querySelector('#reviewList').innerHTML = rows.map(([label, value, step]) => `
    <div class="review-row">
      <span>${label}</span>
      <strong>${value}</strong>
      <button data-review-edit="${step}">Edit</button>
    </div>
  `).join('');
}

function renderSteps() {
  const currentIndex = steps.indexOf(state.step);
  document.querySelectorAll('.step-dot').forEach((button) => {
    const index = steps.indexOf(button.dataset.step);
    button.classList.toggle('active', button.dataset.step === state.step);
    button.classList.toggle('done', index < currentIndex);
  });

  document.querySelectorAll('.step-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.panel === state.step);
  });

  stepLabel.textContent = `Step ${currentIndex + 1} of 6`;
  if (state.step === 'placement') {
    continueButton.textContent = 'REVIEW ORDER →';
  } else if (state.step === 'review') {
    continueButton.textContent = 'ADD TO CART →';
  } else {
    continueButton.textContent = 'CONTINUE →';
  }
}

function renderPlacementPreview() {
  const target = activeTarget();
  placementImage.src = target?.preview || './assets/wallet-main.png';
  placementCaption.textContent = `Applying to ${target?.label || 'Wallet'}`;
  engravingMark.textContent = state.design === 'icon' ? '★' : (state.text || 'KL').toUpperCase();
  engravingMark.className = `engraving-mark ${state.placement || 'bottom-right'} ${state.targetProduct || 'wallet'}`;
}

function renderTextCount() {
  const remaining = 12 - state.text.length;
  charCount.textContent = `${remaining} characters remaining`;
}

function render() {
  renderKits();
  renderFinishes();
  renderColors();
  renderTargetProducts();
  renderDesignTypes();
  renderPlacements();
  renderSummary();
  renderReview();
  renderSteps();
  renderPlacementPreview();
  renderTextCount();
}

function fillMissingChoices() {
  ensureTarget();
  if (!state.finish) state.finish = 'laser';
  if (!state.color) state.color = availableColors()[0] || 'Royal Black';
  if (!state.design) state.design = availableTypes()[0] || 'text';
  if (!state.placement) state.placement = 'bottom-right';
}

function applyPersonalization() {
  fillMissingChoices();

  const finishLabel = activeFinish().label;
  const targetLabel = activeTarget()?.label || 'Wallet';
  const typeLabel = designTypes.find((type) => type.id === state.design)?.label || 'TEXT';
  const placementLabel = placements.find((placement) => placement.id === state.placement)?.label || 'BOTTOM RIGHT';

  appliedSummary.hidden = false;
  appliedSummary.innerHTML = `
    <b>Added to cart</b>
    ${targetLabel} / ${finishLabel} / ${state.color} / ${typeLabel} / ${placementLabel}
  `;
  personalizeLink.textContent = 'Edit Personalization';
  cartButton.textContent = 'ADDED TO CART';
  render();
  closeDrawer();
}

function nextStep() {
  const index = steps.indexOf(state.step);
  if (state.step === 'finish' && !state.finish) state.finish = 'laser';
  if (state.step === 'color' && !state.color) state.color = availableColors()[0] || 'Royal Black';
  if (state.step === 'design') {
    ensureTarget();
    if (!state.design) state.design = availableTypes()[0] || 'text';
  }
  if ((state.step === 'placement' || state.step === 'review') && !state.placement) state.placement = 'bottom-right';

  if (index < steps.length - 1) {
    state.step = steps[index + 1];
    if (state.step === 'review') fillMissingChoices();
  } else {
    applyPersonalization();
    return;
  }
  render();
}

document.querySelector('#openDrawer').addEventListener('click', openDrawer);
document.querySelector('#closeDrawer').addEventListener('click', closeDrawer);
scrim.addEventListener('click', closeDrawer);
continueButton.addEventListener('click', nextStep);

document.addEventListener('click', (event) => {
  const kit = event.target.closest('[data-kit]');
  if (kit) {
    state.kit = kit.dataset.kit;
    ensureTarget();
    render();
    return;
  }

  const finish = event.target.closest('[data-finish]');
  if (finish) {
    state.finish = finish.dataset.finish;
    const available = availableColors();
    if (!available.includes(state.color)) state.color = null;
    const types = availableTypes();
    if (!types.includes(state.design)) state.design = null;
    render();
    return;
  }

  const color = event.target.closest('[data-color]');
  if (color && !color.disabled) {
    state.color = color.dataset.color;
    render();
    return;
  }

  const design = event.target.closest('[data-design]');
  if (design && !design.disabled) {
    state.design = design.dataset.design;
    render();
    return;
  }

  const target = event.target.closest('[data-target]');
  if (target) {
    state.targetProduct = target.dataset.target;
    render();
    return;
  }

  const placement = event.target.closest('[data-placement]');
  if (placement) {
    state.placement = placement.dataset.placement;
    render();
  }

  const step = event.target.closest('[data-step]');
  if (step) {
    state.step = step.dataset.step;
    if (state.step === 'review') fillMissingChoices();
    render();
    return;
  }

  const reviewEdit = event.target.closest('[data-review-edit]');
  if (reviewEdit) {
    state.step = reviewEdit.dataset.reviewEdit;
    render();
  }
});

engravingInput.addEventListener('input', (event) => {
  state.text = event.target.value.toUpperCase();
  renderPlacementPreview();
  renderTextCount();
});

openDrawer();
render();
