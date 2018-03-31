function draggable(Component) {
  return class NewComponent extends React.Component {
    // 增加拖拽相关的功能
    render() {
      return <Component />
    }
  }
}


<Parent>
  <Child />
</Parent>


<Parent>
  {
    data=><Child data={data} />
  }
</Parent>


<Clock>
  {
    second=><Child second={second} />
  }
</Clock>