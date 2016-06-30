
let dispatcher = new Flux.Dispatcher();

let Page = React.createClass({
  render: function() {
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

let modules = [ "Wires", "Button", "Keypads", "Simon Says", "Who's on First",
  "Memory", "Morse Code", "Complicated Wires", "Wire Sequences", "Mazes",
  "Passwords", "Knobs", "Bomb Information" ]; 

let ModuleItem = React.createClass({
  onModuleClicked: (name) => {
    Actions.changeModule(name);
  },
  propTypes: {
    name: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <a href="#" onClick={this.onModuleClicked} className="list-group-item">{this.props.name}</a>
    );
  }
});

let ModuleList = React.createClass({
  render: function() {
    let createList = () => {
      return modules.map((m, i) => (<ModuleItem name={m} key={i} />));
    };
    return (
      <div className="list-group">
        {createList()}
      </div>
    );
  }
});

let MazeModule = React.createClass({
  render: function() {
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
  render: function() {
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


//╔══════════════════════════════════════════════════════════════════════════════╗
//║                                   ACTIONS                                    ║
//╚══════════════════════════════════════════════════════════════════════════════╝

let Actions = {
  changeModule: (id) => {
    dispatcher.dispatch({
      type: "moduleChanged",
      data: {
        id: id
      }
    });
  }
};

//╔══════════════════════════════════════════════════════════════════════════════╗
//║                                   STORES                                     ║
//╚══════════════════════════════════════════════════════════════════════════════╝

