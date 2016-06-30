

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
            <MazeModule />
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
        <a href="#" className="list-group-item">Keypads</a>
        <a href="#" className="list-group-item">Simon Says</a>
        <a href="#" className="list-group-item">Who's on First</a>
        <a href="#" className="list-group-item">Memory</a>
        <a href="#" className="list-group-item">Morse Code</a>
        <a href="#" className="list-group-item">Complicated Wires</a>
        <a href="#" className="list-group-item">Wire Sequences</a>
        <a href="#" className="list-group-item">Mazes</a>
        <a href="#" className="list-group-item">Passwords</a>
        <a href="#" className="list-group-item">Knobs</a>
        <a href="#" className="list-group-item">Bomb Information</a>
      </div>
    );
  }
});

let MazeModule = React.createClass({
  render: () => {
    return (
      <div>
        <h2>Mazes</h2>
        <table className="maze">
          <tr><td className="maze-path"></td><td className="maze-path"></td><td className="maze-path"></td><td></td><td></td><td></td></tr>
          <tr><td className="maze-path"><div className="maze-circle"></div></td><td></td><td className="maze-path"></td><td></td><td></td><td></td></tr>
          <tr><td className="maze-path"></td><td></td><td></td><td></td><td></td><td><div className="maze-circle"></div></td></tr>
          <tr><td className="maze-path"></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
        </table>
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
