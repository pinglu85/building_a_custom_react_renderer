import ReactReconciler from 'react-reconciler';

let reconciler = ReactReconciler({
  // configuration for how to talk to the host env
  // aka "host config"

  supportsMutation: true,

  createInstance(
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    let el = document.createElement(type);
    if (props.className) el.className = props.className;
    if (props.src) el.src = props.src;
    ['alt', 'className', 'href', 'rel', 'src', 'target'].forEach(k => {
      if (props[k]) el[k] = props[k];
    });
    if (props.onClick) {
      el.addEventListener('click', props.onClick);
    }
    if (props.bgColor) {
      el.style.backgroundColor = props.bgColor;
    }

    return el;
  },
  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    return document.createTextNode(text);
  },

  // Each time react wants to add a new element to the hierarchy,
  // it will call one of these three methods which will end up calling
  // the dom's appendChild api
  appendChildToContainer(container, child) {
    container.appendChild(child);
  },
  appendChild(parent, child) {
    parent.appendChild(child);
  },
  appendInitialChild(parent, child) {
    parent.appendChild(child);
  },

  removeChildFromContainer(container, child) {
    container.removeChild(child);
  },
  removeChild(parent, child) {
    parent.removeChild(child);
  },
  insertInContainerBefore(container, child, before) {
    container.insertBefore(child, before);
  },
  insertBefore(parent, child, before) {
    parent.insertBefore(child, before);
  },

  // Render phase
  prepareUpdate(
    instance,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
    currentHostContext
  ) {
    let payload;
    if (oldProps.bgColor !== newProps.bgColor) {
      payload = { newBgColor: newProps.bgColor };
    }
    return payload;
  },

  // Commit phase
  commitUpdate(
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    finishedWork
  ) {
    if (updatePayload.newBgColor) {
      instance.style.backgroundColor = updatePayload.newBgColor;
    }
  },

  finalizeInitialChildren() {},
  getChildHostContext() {},
  getPublicInstance() {},
  getRootHostContext() {},
  prepareForCommit() {},
  resetAfterCommit() {},
  shouldSetTextContent() {
    return false;
  }
});

let ReactDOMMini = {
  render(whatToRender, div) {
    let container = reconciler.createContainer(div, false, false);
    reconciler.updateContainer(whatToRender, container, null, null);
  }
};

export default ReactDOMMini;
