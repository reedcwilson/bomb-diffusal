

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
            <KeypadModule />
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

let KeypadModule = React.createClass({
  render: () => {
    return (
      <div>
        <h2>Keypads</h2>
        <ul className="keypad-buttons">
          <li>ὦ</li>
          <li>Ϙ</li>
          <li>¶</li>
          <li>Ω</li>
          <li>¿</li>
          <li>ƛ</li>
          <li>Ͽ</li>
          <li>Ͼ</li>
          <li>★</li>
          <li>☆</li>
          <li>æ</li>
          <li>ϗ</li>
          <li>ƀ</li>
          <li>Ԇ</li>
          <li>Ѱ</li>
          <li>ϟ</li>
          <li>Ϭ</li>
          <li>Ж</li>
          <li>Ѭ</li>
          <li>Ѧ</li>
          <li>Ѯ</li>
          <li>҂</li>
          <li>Ҋ</li>
          <li>Ҩ</li>
          <li>Ⓒ</li>
          <li>Ӟ</li>
          <li>ټ</li>
        </ul>
      </div>
    );
  }
});

ReactDOM.render(
  <Page />,
  document.getElementById('content')
);
