/* An illustrative editor. All state stays in memory; no history or files are read. */
(function () {
  'use strict';
  var demo = document.getElementById('agent-demo');
  if (!demo) return;
  var documentLines = demo.querySelector('#agent-document-lines');
  var originals = Array.from(documentLines.querySelectorAll('[data-line]'), function (line) {
    return { id: line.dataset.line, text: line.querySelector('.agent-line-text').textContent };
  });
  var buttons = Array.from(demo.querySelectorAll('[data-finding]'));
  var insights = {};
  demo.querySelectorAll('template[data-insight]').forEach(function (template) {
    insights[template.dataset.insight] = {
      reason: template.content.querySelector('[data-reason]').textContent,
      quote: template.content.querySelector('[data-quote]').textContent,
      after: Array.from(template.content.querySelectorAll('[data-after]'), function (line) { return line.textContent; })
    };
  });
  var states = {};
  var selected = 'testing';
  var insight = demo.querySelector('#agent-insight');
  var actions = demo.querySelector('#agent-insight-actions');
  var complete = demo.querySelector('#agent-complete');
  var notice = demo.querySelector('#agent-demo-notice');
  var caption = demo.querySelector('#agent-document-caption');

  function row(text, number, kind) {
    var line = document.createElement('div');
    line.className = 'agent-line' + (kind ? ' agent-line-' + kind : '');
    var gutter = document.createElement('span');
    gutter.className = 'agent-line-no';
    gutter.setAttribute('aria-hidden', 'true');
    gutter.textContent = kind === 'removed' ? '−' : kind === 'added' ? '+' : String(number);
    var content = document.createElement(kind === 'removed' ? 'del' : kind === 'added' ? 'ins' : 'span');
    content.className = 'agent-line-text' + (text.indexOf('#') === 0 ? ' agent-heading' : '');
    content.textContent = text || ' ';
    line.append(gutter, content);
    return line;
  }

  function render() {
    var fragment = document.createDocumentFragment();
    var number = 1;
    originals.forEach(function (original) {
      var proposal = insights[original.id];
      var state = states[original.id];
      if (proposal && state === 'kept') {
        proposal.after.forEach(function (text) { fragment.appendChild(row(text, number++, 'kept')); });
      } else if (proposal && original.id === selected && !state) {
        fragment.appendChild(row(original.text, number, 'removed'));
        proposal.after.forEach(function (text) { fragment.appendChild(row(text, number++, 'added')); });
      } else {
        fragment.appendChild(row(original.text, number++));
      }
    });
    documentLines.replaceChildren(fragment);
    buttons.forEach(function (button) {
      var key = button.dataset.finding;
      button.setAttribute('aria-pressed', String(key === selected));
      button.dataset.state = states[key] || 'pending';
      button.querySelector('.agent-finding-state').textContent = demo.dataset[states[key] || 'pending'];
    });
    var current = insights[selected];
    insight.hidden = !current;
    complete.hidden = Boolean(current);
    if (current) {
      demo.querySelector('#agent-insight-reason').textContent = current.reason;
      demo.querySelector('#agent-insight-quote').textContent = current.quote;
      actions.hidden = Boolean(states[selected]);
      caption.textContent = states[selected] ? demo.dataset[states[selected]] : demo.dataset.selected;
    } else {
      complete.textContent = demo.dataset.completeNote;
      caption.textContent = demo.dataset.complete;
    }
  }
  function decide(state) {
    if (!selected || states[selected]) return;
    states[selected] = state;
    var next = buttons.find(function (button) { return !states[button.dataset.finding]; });
    selected = next ? next.dataset.finding : null;
    notice.textContent = demo.dataset[state === 'kept' ? 'keepNote' : 'skipNote'];
    render();
    // Keep keyboard focus in a useful place when the last action disappears.
    if (!selected) demo.querySelector('#agent-reset').focus({ preventScroll: true });
  }
  buttons.forEach(function (button) {
    button.addEventListener('click', function () { selected = button.dataset.finding; render(); });
  });
  demo.querySelector('#agent-keep').addEventListener('click', function () { decide('kept'); });
  demo.querySelector('#agent-skip').addEventListener('click', function () { decide('skipped'); });
  demo.querySelector('#agent-reset').addEventListener('click', function () {
    states = {};
    selected = 'testing';
    notice.textContent = demo.dataset.resetNote;
    render();
  });
  render();
})();
