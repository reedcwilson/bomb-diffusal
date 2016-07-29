
let dispatcher = new Flux.Dispatcher();

//╔══════════════════════════════════════════════════════════════════════════════╗
//║                                  HELPERS                                     ║
//╚══════════════════════════════════════════════════════════════════════════════╝

let modules = [ "Wires", "Button", "Keypads", "Simon Says", "Who's on First",
  "Memory", "Morse Code", "Complicated Wires", "Wire Sequences", "Mazes",
  "Passwords", "Knobs", "Bomb Information" ]; 

//╔══════════════════════════════════════════════════════════════════════════════╗
//║                                   STORES                                     ║
//╚══════════════════════════════════════════════════════════════════════════════╝

class Store {
  constructor(dispatcher, func, initialState={}) {
    this.data = initialState;
    this.subscribers = [];
    dispatcher.register((e) => {
      func(this.data, e)
      this.notifySubscribers();
    });
  }
  notifySubscribers() {
    for (let sub of this.subscribers) {
      sub();
    }
  }
  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
}

let onFirstStore = new Store(dispatcher, function(data, e) {
  switch (e.type) {
    case "wordPressed":
      data[!data.displayWord ? "displayWord" : "labelWord"] = e.data.word;
      break;
    case "clearOnFirst":
      data.displayWord = null;
      data.labelWord = null;
      break;
  }
}, {"displayWord": null, "labelWord": null});

let moduleListStore = new Store(dispatcher, function(data, e) {
  let oldFilterText = data.filterText;
  switch (e.type) {
    case "moduleChanged":
      data.selected = e.data.id;
      data.filterText = '';
      break;
    case "selectHighlightedModule":
      data.selected = data.modules[data.highlightedIndex];
      data.filterText = '';
      break;
    case "moduleFilterChanged":
      data.filterText = e.data.newFilterText;
      break;
    case "keyPressed":
      if (e.data.event.ctrlKey && e.data.event.keyCode === 75) {
        data.shouldFocusFilter = true;
        data.filterText = '';
      }
      else {
        data.shouldFocusFilter = false;

        switch (e.data.event.keyCode) {
          case 38: // UP
            data.highlightedIndex = Math.max(0, data.highlightedIndex - 1);
            break;
          case 40: // DOWN
            data.highlightedIndex = Math.min(data.modules.length - 1, data.highlightedIndex + 1);
            break;
          case 13: // ENTER
            data.selected = data.modules[data.highlightedIndex];
            data.filterText = '';
            break;
          case 27: // ESCAPE
            data.filterText = '';
            break;
        }
      }
      break;
  }
  if (oldFilterText !== data.filterText) {
    data.highlightedIndex = 0;
    data.modules = modules
      .filter((m) => {
        if (!data.filterText) {
          return true;
        }
        return new RegExp(`.*${data.filterText.split("").join(".*")}.*`, "i").test(m);
      });
  }
}, {selected: 'Wires', filterText: '', highlightedIndex: 0, modules: modules});


//╔══════════════════════════════════════════════════════════════════════════════╗
//║                                  COMPONENTS                                  ║
//╚══════════════════════════════════════════════════════════════════════════════╝

let Page = React.createClass({
  getInitialState: function() {
    return {
      moduleListState: moduleListStore.data,
      onFirstState: onFirstStore.data
    };
  },
  moduleListStoreChanged: function() {
    this.setState({
      moduleListState: moduleListStore.data
    });
  },
  onFirstWordSelected: function() {
    this.setState({
      onFirstState: onFirstStore.data
    });
  },
  componentWillMount: function() {
    moduleListStore.subscribe(this.moduleListStoreChanged);
    onFirstStore.subscribe(this.onFirstWordSelected);
    document.addEventListener("keyup", (e) => {
      Actions.keyPressed(e);
    });
  },
  render: function() {
    let getModule = (name) => {
      switch (name) {
        case "Mazes":
          return <MazeModule />;
        case "Keypads":
          return <KeypadModule />;
        case "Wires":
          return <WiresModule />;
        case "Button":
          return <ButtonModule />;
        case "Simon Says":
          return <SimonModule />;
        case "Who's on First":
          return <OnFirstModule displayWord={this.state.onFirstState.displayWord} labelWord={this.state.onFirstState.labelWord} />;
        case "Memory":
          return <MemoryModule />;
        case "Morse Code":
          return <MorseCodeModule />;
        case "Complicated Wires":
          return <ComplicatedWiresModule />;
        case "Wire Sequences":
          return <WireSequencesModule />;
        case "Passwords":
          return <PasswordsModule />;
        case "Knobs":
          return <KnobsModule />;
        case "Bomb Information":
          return <BombInfoModule />;
        default:
          return [];
      }
    };
    return (
      <div className="container-fluid">
        <h1>Bomb Manual v2</h1>
        <div className="row">
          <div className="col-md-3">
            <ModuleList moduleListState={this.state.moduleListState} />
          </div>
          <div className="col-md-9">
            {getModule(this.state.moduleListState.selected)}
          </div>
        </div>
      </div>
    );
  }
});

let ModuleItem = React.createClass({
  onModuleClicked: function() {
    Actions.changeModule(this.props.name);
  },
  propTypes: {
    name: React.PropTypes.string.isRequired,
    isSelected: React.PropTypes.bool.isRequired,
    isHighlighted: React.PropTypes.bool.isRequired,
  },
  render: function() {
    let extraClass = "";
    if (this.props.isSelected) {
      extraClass = "active";
    }
    else if (this.props.isHighlighted) {
      extraClass = "list-group-item-warning";
    }
    return (
      <a href="#" onClick={this.onModuleClicked} className={"list-group-item " + extraClass}>{this.props.name}</a>
    );
  }
});

let ModuleList = React.createClass({
  propTypes: {
    moduleListState: React.PropTypes.object.isRequired
  },
  componentDidUpdate: function() {
    if (this.props.moduleListState.shouldFocusFilter) {
      ReactDOM.findDOMNode(this.refs.filterInput).focus(); 
    }
  },
  handleFilterChange: function(e) {
    Actions.moduleFilterChanged(e.target.value);
  },
  handleButtonClicked: function() {
    Actions.selectHighlightedModule();
  },
  render: function() {
    let createList = () => {
      return this.props.moduleListState.modules
        .map((m, i) => {
          let isHighlighted = false;
          let isSelected = false;
          if (this.props.moduleListState.filterText) {
            isHighlighted = this.props.moduleListState.highlightedIndex === i;
          }
          else {
            isSelected = this.props.moduleListState.selected === m;
          }
          return (<ModuleItem name={m} key={i} isSelected={isSelected} isHighlighted={isHighlighted} />)
        });
    };
    return (
      <div className="list-group">
        <div className="list-group-item">
          <div className="input-group">
            <input type="text" ref="filterInput" className="form-control" placeholder="filter..." value={this.props.moduleListState.filterText} onChange={this.handleFilterChange} />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" onClick={this.handleButtonClicked}>Go!</button>
            </span>
          </div>
        </div>
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
          <tbody>
            <tr><td className="maze-path"></td><td className="maze-path"></td><td className="maze-path"></td><td></td><td></td><td></td></tr>
            <tr><td className="maze-path"><div className="maze-circle"></div></td><td></td><td className="maze-path"></td><td></td><td></td><td></td></tr>
            <tr><td className="maze-path"></td><td></td><td></td><td></td><td></td><td><div className="maze-circle"></div></td></tr>
            <tr><td className="maze-path"></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          </tbody>
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

let WiresModule = React.createClass({
  render: function() {
    return (
      <p>WiresModule</p>
    );
  }
});

let ButtonModule = React.createClass({
  render: function() {
    return (
      <p>ButtonModule</p>
    );
  }
});

let SimonModule = React.createClass({
  render: function() {
    return (
      <p>SimonModule</p>
    );
  }
});

let WordItem = React.createClass({
  propTypes: {
    word: React.PropTypes.string.isRequired
  },
  wordPressed: function() {
    Actions.wordPressed(this.props.word)
  },
  render: function() {
    return (<li onClick={this.wordPressed}>{this.props.word}</li>)
  }
});

let OnFirstModule = React.createClass({
  displayWords: [ "YES", "FIRST", "DISPLAY", "OKAY", "SAYS", "NOTHING", " ",
    "BLANK", "NO", "LED", "LEAD", "READ", "RED", "REED", "LEED", "HOLD ON",
    "YOU", "YOU ARE", "YOUR", "YOU'RE", "UR", "THERE", "THEY'RE", "THEIR",
    "THEY ARE", "SEE", "C", "CEE" ], 
  labelWords: [ "READY", "FIRST", "NO", "BLANK", "NOTHING", "YES", "WHAT",
    "WHAT?", "UHHH", "LEFT", "RIGHT", "MIDDLE", "OKAY", "WAIT", "PRESS", "YOU",
    "YOU ARE", "YOUR", "YOU'RE", "UR", "U", "UH HUH", "UH UH", "DONE", "NEXT",
    "HOLD", "SURE", "LIKE" ], 
  propTypes: { 
    displayWord: React.PropTypes.string,
    labelWord: React.PropTypes.string
  },
  clear: function() {
    Actions.clearOnFirst();
  },
  render: function() {
    let generateWords = () => {
      let words = this.props.displayWord ? this.labelWords : this.displayWords;
      return words.map((w, i) => (<WordItem key={i} word={w} />));
    };
    let getDisplayWord = () => {
      if (this.props.displayWord) {
        let position = manual.onFirst.findPosition(this.props.displayWord.toLowerCase().trim()).join('-');
        let displayWord = this.props.displayWord === " " ? "_" : this.props.displayWord;
        return (
          <div>
            <h3>Display: {displayWord}</h3>
            <h3>Position: {position}</h3>
          </div>
        );
      }
      return null;
    };
    let getWordList = () => {
      if (!this.props.labelWord) {
        return (<ul className="keypad-buttons">
          {generateWords()}
        </ul>)
      }
      else {
        let words = manual.onFirst.getWords(this.props.labelWord);
        return (
          <div>
            <h3>Label: {this.props.labelWord}</h3>
            {words}
          </div>
        )
      }
    };
    return (
      <div>
        <h2>Who's On First?</h2>
        {getDisplayWord()}
        {getWordList()}
        <button className="btn btn-primary" onClick={this.clear}>Start Over</button>
      </div>
    );
  }
});

let MemoryModule = React.createClass({
  render: function() {
    return (
      <p>MemoryModule</p>
    );
  }
});

let MorseCodeModule = React.createClass({
  render: function() {
    return (
      <p>MorseCodeModule</p>
    );
  }
});

let ComplicatedWiresModule = React.createClass({
  render: function() {
    return (
      <p>ComplicatedWiresModule</p>
    );
  }
});

let WireSequencesModule = React.createClass({
  render: function() {
    return (
      <p>WireSequencesModule</p>
    );
  }
});

let PasswordsModule = React.createClass({
  render: function() {
    return (
      <p>PasswordsModule</p>
    );
  }
});

let KnobsModule = React.createClass({
  render: function() {
    return (
      <p>KnobsModule</p>
    );
  }
});

let BombInfoModule = React.createClass({
  render: function() {
    return (
      <p>BombInfoModule</p>
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
  },
  moduleFilterChanged: (newFilterText) => {
    dispatcher.dispatch({
      type: "moduleFilterChanged",
      data: {
        newFilterText,
      }
    });
  },
  selectHighlightedModule: () => {
    dispatcher.dispatch({
      type: "selectHighlightedModule",
    });
  },
  keyPressed: (e) => {
    dispatcher.dispatch({
      type: "keyPressed",
      data: {
        event: e
      }
    });
  },
  wordPressed: (word) => {
    dispatcher.dispatch({
      type: "wordPressed",
      data: {
        word: word
      }
    });
  },
  clearOnFirst: () => {
    dispatcher.dispatch({
      type: "clearOnFirst"
    });
  }
};

