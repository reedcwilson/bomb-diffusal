

let Page = React.createClass({
  render: () => {
    return (
      <div className="container-fluid">
        <h1>Bomb Manual v2</h1>
        <div className="row">
          <div className="col-md-3">
            <ModuleList />
          </div>
          <div className="col-md-9">
            <h2>Wires</h2>
          </div>
        </div>
      </div>
    );
  }
});

let ModuleList = React.createClass({
  render: () => {
    return (
      <div className="list-group">
        <a href="#" className="list-group-item active">Wires</a>
        <a href="#" className="list-group-item">Button</a>
        <a href="#" className="list-group-item">Keypad</a>
      </div>
    );
  }
});

ReactDOM.render(
  <Page />,
  document.getElementById('content')
);
