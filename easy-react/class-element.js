class Component {
  render() {
    throw new Error('must implement render method')
  }
}
Component.prototype.isReactComponent = true

function isClass(type) {
  return Boolean(type.prototype) && Boolean(type.prototype.isReactComponent)
}

function hooks(obj, name, ...args) {
  obj[name] && obj[name].apply(obj, args)
}

class DomComponent {
  constructor(element) {
    this.currentElement = element
    this.renderedChildren = []
    this.node = null
  }
  getPublicInstance() {
    return this.node
  }
  mount() {
    const { type, props } = this.currentElement
    let children = props.children
    children = children.filter(Boolean)

    const node = document.createElement(type)
    Object.keys(props).forEach(propName => {
      if (propName !== 'children') {
        node.setAttribute(propName, props[propName])
      }
    })
    const renderedChildren = children.map(instantiateComponent)
    this.renderedChildren = renderedChildren
    const childNodes = renderedChildren.map(child => child.mount())
    for (let child of childNodes) {
      node.appendChild(child)
    }
    this.node = node
    return node
  }
}

class TextComponent {
  constructor(element) {
    this.currentElement = element
    this.node = null
  }
  getPublicInstance() {
    return this.node
  }
  mount() {
    const node = document.createTextNode(this.currentElement)
    this.node = node
    return node
  }
}

class CompositeComponent {
  constructor(element) {
    this.currentElement = element
    this.publicInstance = null // public instance
    this.renderedComponent = null
  }
  getPublicInstance() {
    return this.publicInstance
  }
  mount() {
    const { type, props } = this.currentElement
    const children = props.children
    let instance, renderedElement
    // delegate to mount
    if (isClass(type)) {
      instance = new type(props)
      instance.props = props
      hooks(instance, 'componentWillMount')
      renderedElement = instance.render()
      this.publicInstance = instance
    } else {
      renderedElement = type(props)
    }
    const renderedComponent = instantiateComponent(renderedElement)
    this.renderedComponent = renderedComponent
    return renderedComponent.mount()
  }
}
function instantiateComponent(element) {
  if (typeof element === 'string') return new TextComponent(element) // internal instance
  if (typeof element.type === 'string') return new DomComponent(element)
  if (typeof element.type === 'function') return new CompositeComponent(element)
}
function mount(element) {
  const rootComponent = instantiateComponent(element)
  return rootComponent.mount()
}

function Button(props) {
  return <button class="btn">{props.text}</button>
}

function createElement(type, props, ...args) {
  props = Object.assign({}, props)
  let children = [].concat(...args)
  props.children = children
  return { type, props }
}

class Link extends Component {
  componentWillMount() {
    console.log('Link will Mount')
  }
  render() {
    const { children } = this.props
    return <a href="http://www.baidu.com">{children}</a>
  }
}

const app = (
  <div class="container">
    <Button text="this is a button" />
    <Button text="this is another button" />
    <Link>baidu</Link>
  </div>
)

function render(element, mountNode) {
  var rootComponent = instantiateComponent(element) // top-level internal instance
  var node = rootComponent.mount() // top-level node
  mountNode.appendChild(node)
  var publicInstance = rootComponent.getPublicInstance() // top-level public instance
  console.log('internal instance:', rootComponent)
  console.log('public instance:', publicInstance)
  return publicInstance
}

render(app, document.querySelector('#root'))
