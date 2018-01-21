//测试
const element1 = {
  type: 'a',
  props: {
    href: 'http://www.baidu.com',
    children: [
      {
        type: 'button',
        props: {
          class: 'btn',
          children: ['this is a button'],
        },
      },
      'hyperscript',
    ],
  },
}
console.log(mount(element1))

function mount(element) {
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

function mountText(text) {
  return document.createTextNode(text)
}
