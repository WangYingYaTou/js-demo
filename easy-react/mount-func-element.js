function mount(element) {
  if (typeof element === 'string') {
    return mountText(element)
  }
  if (typeof element.type === 'function') {
    return mountComposite(element)
  }
  return mountHost(element)
}

function mountComposite(element) {
  element = element.type(element.props)
  return mount(element)
}

function mountText(text) {
  return document.createTextNode(text)
}

function mountHost(element) {
  const type = element.type
  const props = element.props
  let children = element.props.children

  children = children.filter(Boolean)

  const node = document.createElement(type)

  Object.keys(props).forEach(propName => {
    if (propName !== 'children') {
      node.setAttribute(propName, props[propName])
    }
  })

  children.forEach(childElement => {
    if (typeof childElement === 'string') {
      childNode = mountText(childElement)
    } else {
      childNode = mount(childElement)
    }
    node.appendChild(childNode)
  })

  return node
}
