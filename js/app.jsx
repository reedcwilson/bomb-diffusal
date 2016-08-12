
let dispatcher = new Flux.Dispatcher();

//╔══════════════════════════════════════════════════════════════════════════════╗
//║                                  HELPERS                                     ║
//╚══════════════════════════════════════════════════════════════════════════════╝

let modules = [ "Wires", "Button", "Keypads", "Simon Says", "Who's on First",
  "Memory", "Morse Code", "Complicated Wires", "Wire Sequences", "Mazes",
  "Passwords", "Knobs", "Bomb Information" ]; 

let symbols = [ "Ϙ", "Ѧ", "ƛ", "ϟ", "Ѭ", "ϗ", "Ͽ", "Ӟ", "Ҩ", "☆", "¿", "Ⓒ",
  "ὦ", "Ж", "Ԇ", "Ϭ", "¶", "ƀ", "ټ", "Ѱ", "Ͼ", "Ѯ", "★", "҂", "æ", "Ҋ", "Ω" ]; 

let colors = [{ 
  label: "X",
  value: null,
  btnType: "btn-default"
}, { 
  label: "Red",
  value: 'r',
  btnType: "btn-danger"
}, { 
  label: "White",
  value: 'w',
  btnType: "btn-default"
}, { 
  label: "Blue",
  value: 'b',
  btnType: "btn-primary"
}, { 
  label: "Yellow",
  value: 'y',
  btnType: "btn-warning"
}, { 
  label: "Black",
  value: 'k',
  btnType: "btn-black"
}];


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
  },
  complicatedButtonClicked: (buttonLabel) => {
    dispatcher.dispatch({
      type: "complicatedButtonClicked",
      data: {
        buttonLabel: buttonLabel
      }
    });
  },
  bombInfoChanged: (questionType, buttonLabel) => {
    dispatcher.dispatch({
      type: "bombInfoChanged",
      data: {
        questionType: questionType,
        buttonLabel: buttonLabel,
      }
    });
  },
  keypadButtonPressed: (label) => {
    dispatcher.dispatch({
      type: "keypadButtonPressed",
      data: {
        label: label
      }
    });
  },
  clearKeypad: () => {
    dispatcher.dispatch({
      type: "clearKeypad"
    });
  },
  morseButtonPressed: (label) => {
    dispatcher.dispatch({
      type: "morseButtonPressed",
      data: {
        label: label
      }
    });
  },
  morseBackPressed: (label) => {
    dispatcher.dispatch({
      type: "morseBackPressed"
    });
  },
  clearMorse: () => {
    dispatcher.dispatch({
      type: "clearMorse"
    });
  },
  knobsButtonPressed: (row, col) => {
    dispatcher.dispatch({
      type: "knobsButtonPressed",
      data: {
        row: row,
        col: col
      }
    });
  },
  clearKnobs: () => {
    dispatcher.dispatch({
      type: "clearKnobs"
    });
  },
  passwordLettersChanged: (col, letters) => {
    dispatcher.dispatch({
      type: "passwordLettersChanged",
      data: {
        col: col,
        letters: letters
      }
    });
  },
  clearPasswords: () => {
    dispatcher.dispatch({
      type: "clearPasswords"
    });
  },
  wireColorChanged: (color, wireIdx) => {
    dispatcher.dispatch({
      type: "wireColorChanged",
      data: {
        color: color,
        wireIdx: wireIdx
      }
    });
  },
  clearWires: () => {
    dispatcher.dispatch({
      type: "clearWires"
    });
  },
  buttonColorChanged: (color) => {
    dispatcher.dispatch({
      type: "buttonColorChanged",
      data: {
        color: color
      }
    });
  },
  buttonWordChanged: (word) => {
    dispatcher.dispatch({
      type: "buttonWordChanged",
      data: {
        word: word
      }
    });
  },
  clearButton: () => {
    dispatcher.dispatch({
      type: "clearButton"
    });
  },
  holdIndicatorColorChanged: (color) => {
    dispatcher.dispatch({
      type: "holdIndicatorColorChanged",
      data: {
        color: color
      }
    });
  },
  memoryNumberChanged: (number, row) => {
    dispatcher.dispatch({
      type: "memoryNumberChanged",
      data: {
        number: number,
        row: row
      }
    });
  },
  clearMemory: () => {
    dispatcher.dispatch({
      type: "clearMemory"
    });
  },
  wireSequenceColorChanged: (color) => {
    dispatcher.dispatch({
      type: "wireSequenceColorChanged",
      data: {
        color: color
      }
    });
  },
  wireSequenceLetterChanged: (letter) => {
    dispatcher.dispatch({
      type: "wireSequenceLetterChanged",
      data: {
        letter: letter
      }
    });
  },
  clearWireSequences: () => {
    dispatcher.dispatch({
      type: "clearWireSequences"
    });
  }
};


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

let complicatedWiresStore = new Store(dispatcher, function(data, e) {
  switch (e.type) {
    case "complicatedButtonClicked":
      switch (e.data.buttonLabel) {
        case "On":
          data.led = true;
          break;
        case "Off":
          data.led = false;
          break;
        case "Blue":
          if (data.colors.includes('b')) {
            data.colors.splice(data.colors.indexOf('b'), 1);
          }
          else {
            data.colors.push('b');
          }
          break;
        case "Red":
          if (data.colors.includes('r')) {
            data.colors.splice(data.colors.indexOf('r'), 1);
          }
          else {
            data.colors.push('r');
          }
          break;
        case "Yes":
          data.star = true;
          break;
        case "No":
          data.star = false;
          break;
      }
      data.instruction = manual.complicatedWires.shouldCut(data.led, data.colors, data.star);
      break;
  }
}, {"led": false, "colors": [], "star": false, "instruction": manual.complicatedWires.shouldCut(false, [], false)});

let bombInfoStore = new Store(dispatcher, function(data, e) {
  switch (e.type) {
    case 'bombInfoChanged':
      data[e.data.questionType] = e.data.buttonLabel;
      break;
  }
}, {});

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

let morseStore = new Store(dispatcher, function(data, e) {
  switch (e.type) {
    case "morseButtonPressed":
      data.string.push(e.data.label);
      break;
    case "clearMorse":
      data.string = [];
      break;
    case "morseBackPressed":
      data.string.pop();
      break;
  }
  data.options = data.string.length > 3 ? manual.morse.interpret(data.string.join('')) : null;
}, {string: [], options: null});

let buildKnobs = function() {
  let knobs = [];
  for (let i = 0; i < 2; i++) {
    let row = [];
    for (let j = 0; j < 6; j++) {
      row.push(0);
    }
    knobs.push(row);
  }
  return knobs;
};
let knobsStore = new Store(dispatcher, function(data, e) {
  switch (e.type) {
    case "knobsButtonPressed":
      let row = e.data.row;
      let col = e.data.col;
      data.knobs[row][col] = data.knobs[row][col] === 0 ? 1 : 0;
      let four = [ data.knobs[0][3], data.knobs[1][3] ];
      let five = [ data.knobs[0][4], data.knobs[1][4] ];
      data.position = manual.knobs.getPosition(four, five);
      break;
    case "clearKnobs":
      data.knobs = buildKnobs();
      data.position = null;
      break;
  }
}, {knobs: buildKnobs(), position: null});
 
let passwordsStore = new Store(dispatcher, function(data, e) {
  switch (e.type) {
    case "passwordLettersChanged":
      data[e.data.col === 0 ? "first" : "last"] = e.data.letters;
      if (data.first.length === 6 && data.last.length === 6) {
        data.passwords = manual.passwords.crack(data.first, data.last);
      } else {
        data.passwords = [];
      }
      break;
    case "clearPasswords":
      data.first = "";
      data.last = "";
      data.passwords = [];
      break;
  }
}, {first: "", last: "", passwords: []});

let getDefaultWires = function() {
  return [null, null, null, null, null, null];
}; 
let wiresStore = new Store(dispatcher, function(data, e) {
  let getWiresStr = function(wires) {
    return wires.filter((wire) => wire).join("");
  };
  switch (e.type) {
    case "bombInfoChanged":
    case "wireColorChanged":
      data.wires[e.data.wireIdx] = e.data.color;
      data.result = manual.wires.cut(getWiresStr(data.wires), bombInfoStore.data.s === "Odd");
      break;
    case "clearWires":
      data.wires = getDefaultWires();
      data.result = null;
      break;
  }
}, {wires: getDefaultWires(), result: null});

let buttonStore = new Store(dispatcher, function(data, e) {
  let getResult = function(data) {
    if (data.color && data.word) {
      data.numBatteries = -1;
      if (bombInfoStore.data.b) {
        data.numBatteries = bombInfoStore.data.b === '2' ? 2 : bombInfoStore.data.b === '>' ? 3 : 0;
      }
      data.frk = bombInfoStore.data.f === 'Yes' ? 'y' : bombInfoStore.data.f === 'No' ? 'n' : null;
      data.result = manual.button.press(data.color, data.word, data.numBatteries, data.frk);
    }
    return data;
  };
  let buttonChanged = function(data, color, word) {
    data.color = color || data.color;
    data.word = word || data.word;
    data = getResult(data);
  };
  switch (e.type) {
    case "bombInfoChanged":
    case "buttonColorChanged":
    case "buttonWordChanged":
      buttonChanged(data, e.data.color, e.data.word);
      break;
    case "holdIndicatorColorChanged":
      data.holdColor = e.data.color;
      if (e.data.color || e.data.color === null) {
        data.holdResult = manual.button.hold(e.data.color);
      }
      break;
    case "clearButton":
      data.color = undefined;
      data.word = undefined;
      data.result = undefined;
      data.holdColor = undefined;
      data.holdResult = undefined;
      break;
  }
}, {color: undefined, word: undefined, result: undefined, holdColor: undefined, holdResult: undefined});

let keypadStore = new Store(dispatcher, function(data, e) {
  switch (e.type) {
    case "keypadButtonPressed":
      let idx = symbols.indexOf(e.data.label);
      if (data.keysPressed.includes(idx)) {
        data.keysPressed.splice(data.keysPressed.indexOf(idx), 1);
        data.answer = [];
      } else if (data.keysPressed.length < 4) {
        data.keysPressed.push(idx);
      }
      if (data.keysPressed.length === 4) {
        let keys = data.keysPressed.map(i => i+1);
        data.answer = manual.keypad.find(...keys);
      }
      break;
    case "clearKeypad":
      data.answer = [];
      data.keysPressed = [];
      break;

  }
}, {keysPressed: [], answer: []});

manual.memory.init();
let buildMemoryButtonsArray = function() {
  return [undefined, undefined, undefined, undefined, undefined];
};
let memoryStore = new Store(dispatcher, function(data, e) {
  switch (e.type) {
    case "memoryNumberChanged":
      data.buttons[e.data.row] = e.data.number;
      if (data.buttons.every(b => b !== undefined) || data.currentRound === 5 && data.buttons[0] !== undefined) {
        data.answer = manual.memory.getNumber(...data.buttons);
        data.buttons = buildMemoryButtonsArray();
        if (data.currentRound < 5) {
          data.currentRound++;
        }
      }
      break;
    case "clearMemory":
      data.buttons = buildMemoryButtonsArray();
      data.answer = undefined;
      data.currentRound = 1;
      manual.memory.init();
      break;
  }
}, {buttons: buildMemoryButtonsArray(), answer: undefined, currentRound: 1});

manual.wireSequences.init();
let wireSequencesStore = new Store(dispatcher, function(data, e) {
  let reset = function() {
    data.color = undefined
    data.letter = undefined
  };
  switch (e.type) {
    case "wireSequenceColorChanged":
      data.color = e.data.color;
      if (data.color && data.letter) {
        data.answer = manual.wireSequences.shouldCut(data.color, data.letter.toLowerCase());
        data.numWires++;
        reset();
      } else {
        data.answer = undefined;
      }
      break;
    case "wireSequenceLetterChanged":
      data.letter = e.data.letter;
      if (data.color && data.letter) {
        data.answer = manual.wireSequences.shouldCut(data.color, data.letter.toLowerCase());
        data.numWires++;
        reset();
      } else {
        data.answer = undefined;
      }
      break;
    case "clearWireSequences":
      reset();
      data.numWires = 0;
      data.answer = undefined;
      manual.wireSequences.init();
      break;
  }
}, {color: undefined, letter: undefined, numWires: 0, answer: undefined});

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

let Page = React.createClass({ getInitialState: function() {
    return {
      moduleListState: moduleListStore.data,
      onFirstState: onFirstStore.data,
      complicatedWiresState: complicatedWiresStore.data,
      bombInfoState: bombInfoStore.data,
      morseState: morseStore.data,
      knobsState: knobsStore.data,
      passwordsState: passwordsStore.data,
      wiresState: wiresStore.data,
      buttonState: buttonStore.data,
      memoryState: memoryStore.data,
      wireSequencesState: wireSequencesStore.data
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
  complicatedWiresStoreChanged: function() {
    this.setState({
      complicatedWiresState: complicatedWiresStore.data
    });
  },
  bombInfoChanged: function() {
    this.setState({
      bombInfoState: bombInfoStore.data
    });
  },
  keypadStoreChanged: function() {
    this.setState({
      keypadState: keypadStore.data
    });
  },
  morseStoreChanged: function() {
    this.setState({
      morseState: morseStore.data
    });
  },
  knobsStoreChanged: function() {
    this.setState({
      knobsState: knobsStore.data
    });
  },
  passwordsStoreChanged: function() {
    this.setState({
      passwordsState: passwordsStore.data 
    }); 
  }, 
  wiresStoreChanged: function() {
    this.setState({
      wiresState: wiresStore.data 
    }); 
  }, 
  buttonStoreChanged: function() {
    this.setState({
      buttonState: buttonStore.data 
    }); 
  }, 
  memoryStoreChanged: function() {
    this.setState({
      memoryState: memoryStore.data 
    }); 
  }, 
  wireSequencesStoreChanged: function() {
    this.setState({
      wireSequencesState: wireSequencesStore.data 
    }); 
  }, 
  componentWillMount: function() { 
    moduleListStore.subscribe(this.moduleListStoreChanged); 
    onFirstStore.subscribe(this.onFirstWordSelected); 
    complicatedWiresStore.subscribe(this.complicatedWiresStoreChanged); 
    bombInfoStore.subscribe(this.bombInfoChanged); 
    keypadStore.subscribe(this.keypadStoreChanged); 
    morseStore.subscribe(this.morseStoreChanged); 
    knobsStore.subscribe(this.knobsStoreChanged); 
    passwordsStore.subscribe(this.passwordsStoreChanged); 
    wiresStore.subscribe(this.wiresStoreChanged); 
    buttonStore.subscribe(this.buttonStoreChanged); 
    memoryStore.subscribe(this.memoryStoreChanged); 
    wireSequencesStore.subscribe(this.wireSequencesStoreChanged); 
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
          return <KeypadModule keysPressed={this.state.keypadState.keysPressed} answer={this.state.keypadState.answer} />;
        case "Wires":
          return <WiresModule wires={this.state.wiresState.wires} result={this.state.wiresState.result} oddSerial={this.state.bombInfoState.s ? this.state.bombInfoState.s === "Odd" : null} />;
        case "Button":
          return <ButtonModule color={this.state.buttonState.color} word={this.state.buttonState.word} result={this.state.buttonState.result} numBatteries={this.state.buttonState.numBatteries} frk={this.state.buttonState.frk} holdColor={this.state.buttonState.holdColor} holdResult={this.state.buttonState.holdResult} />;
        case "Simon Says":
          return <SimonModule />;
        case "Who's on First":
          return <OnFirstModule displayWord={this.state.onFirstState.displayWord} labelWord={this.state.onFirstState.labelWord} />;
        case "Memory":
          return <MemoryModule buttons={this.state.memoryState.buttons} answer={this.state.memoryState.answer} currentRound={this.state.memoryState.currentRound} />;
        case "Morse Code":
          return <MorseCodeModule string={this.state.morseState.string} options={this.state.morseState.options} />;
        case "Complicated Wires":
          return <ComplicatedWiresModule led={this.state.complicatedWiresState.led} colors={this.state.complicatedWiresState.colors} star={this.state.complicatedWiresState.star} instruction={this.state.complicatedWiresState.instruction} bombInfo={this.state.bombInfoState} />;
        case "Wire Sequences":
          return <WireSequencesModule letter={this.state.wireSequencesState.letter} color={this.state.wireSequencesState.color} numWires={this.state.wireSequencesState.numWires} answer={this.state.wireSequencesState.answer} />;
        case "Passwords":
          return <PasswordsModule first={this.state.passwordsState.first} last={this.state.passwordsState.last} passwords={this.state.passwordsState.passwords} />;
        case "Knobs":
          return <KnobsModule knobs={this.state.knobsState.knobs} position={this.state.knobsState.position} />;
        case "Bomb Information":
          return <BombInfoModule bombInfo={this.state.bombInfoState} />;
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
  propTypes: {
    keysPressed: React.PropTypes.array.isRequired,
    answer: React.PropTypes.array.isRequired
  },
  getButtons: function() {
    return symbols.map((s, i) => {
      let selected = this.props.keysPressed.includes(i);
      return <ButtonItem key={i} label={s} selected={selected} action={Actions.keypadButtonPressed} />
    });
  },
  getAnswer: function() {
    if (this.props.answer.length > 0) {
      let result = [];
      result.push(<h3 key={-1}>Answer</h3>);
      let symbolStr = this.props.answer.map((idx, i) => {
        return symbols[idx-1];
      }).join(" ");
      result.push(<p className="symbols-answer">{symbolStr}</p>);
      return result;
    }
  },
  render: function() {
    return (
      <div>
        <h2>Keypads</h2>
        <div className="keypad-buttons">
          {this.getButtons()}
          {this.getAnswer()}
        </div>
        <button className="btn btn-primary space-above" onClick={Actions.clearKeypad}>Start Over</button>
      </div>
    );
  }
});

let WiresModule = React.createClass({
  propTypes: {
    wires: React.PropTypes.array.isRequired,
    result: React.PropTypes.string,
    oddSerial: React.PropTypes.bool
  },
  render: function() {
    let getButtons = (wireIdx) => {
      let wire = this.props.wires[wireIdx];
      return colors.map((color, i) => {
        let active = wire === color.value;
        let btnType = active ? color.btnType : "btn-default";
        return <SegmentedButtonItem key={i} active={active} label={color.label} btnType={btnType} callback={Actions.wireColorChanged.bind(this, color.value, wireIdx)} />
      });
    };
    let getWire = function(idx) {
      return (
        <div className="form-group color-buttons" key={idx}>
          <div className="btn-toolbar">
            <div className="btn-group">
              {getButtons(idx)}
            </div>
          </div>
        </div>
      );
    };
    let getWires = function() {
      let wires = [];
      for (let i = 0; i < 6; i++) {
        wires.push(getWire(i));
      }
      return wires;
    };
    let getResult = () => {
      if (this.props.wires.filter(w => w).length > 3 && this.props.oddSerial == null) {
        return <BombInfoModule questionType="s" />
      } else {
        let result = this.props.result || "Invalid";
        return (
          <div className="form-group label-spacing">
            <label>Result</label>
            <p>{result}</p>
          </div>
        );
      }
    };
    return (
      <div>
        <h2>Wires</h2>
        {getWires()}
        {getResult()}
        <ButtonItem selected={false} label="Start Over" action={Actions.clearWires} />
      </div>
    );
  }
});

let ButtonModule = React.createClass({
  propTypes: {
    color: React.PropTypes.string,
    word: React.PropTypes.string,
    result: React.PropTypes.string,
    holdResult: React.PropTypes.number,
    numBatteries: React.PropTypes.number,
    frk: React.PropTypes.string,
    holdColor: React.PropTypes.string
  },
  render: function() {
    let buttonColors = ['w', 'b', 'r', 'y'];
    let holdColors = ['b', 'y', null]
    let buttonWords = ["detonate", "abort", "hold"];
    let results = { 'h': "Hold the button", 'i': "Press and release immediately" };
    let getHoldButtons = () => {
      if (this.props.result === 'h') {
        let color = this.props.holdColor;
        return colors.filter(c => holdColors.includes(c.value)).map((c, i) => {
          let active = color === c.value;
          let btnType = active ? c.btnType : "btn-default";
          let label = c.label === 'X' ? 'Other' : c.label;
          return <SegmentedButtonItem key={i} active={active} label={label} btnType={btnType} callback={Actions.holdIndicatorColorChanged.bind(this, c.value)} />
        });
      }
    };
    let getButtons = () => {
      let color = this.props.color;
      return colors.filter(c => buttonColors.includes(c.value)).map((c, i) => {
        let active = color === c.value;
        let btnType = active ? c.btnType : "btn-default";
        return <SegmentedButtonItem key={i} active={active} label={c.label} btnType={btnType} callback={Actions.buttonColorChanged.bind(this, c.value)} />
      });
    };
    let getButtonColors = function() {
      return (
        <div className="form-group color-buttons">
          <div className="btn-toolbar">
            <div className="btn-group">
              {getButtons()}
            </div>
          </div>
        </div>
      );
    };
    let getHoldButtonColors = function() {
      return (
        <div className="form-group color-buttons">
          <div className="btn-toolbar">
            <div className="btn-group">
              {getHoldButtons()}
            </div>
          </div>
        </div>
      );
    };
    let getWords = () => {
      let word = this.props.word;
      return buttonWords.map((w, i) => {
        let active = this.props.word === w;
        return <SegmentedButtonItem key={i} active={active} label={w} btnType="btn-default" callback={Actions.buttonWordChanged.bind(this, w)} />
      });
    };
    let getHoldButtonResult = () => {
      if (this.props.holdResult && this.props.result === 'h') {
        return <p>Release when the countdown timer has a {this.props.holdResult} in any position</p>
      }
    };
    let getWordList = function() {
      return (
        <div className="form-group color-buttons">
          <div className="btn-toolbar">
            <div className="btn-group">
              {getWords()}
            </div>
          </div>
        </div>
      );
    };
    let getBombInfoModules = () => {
      let modules = [];
      if (this.props.numBatteries === -1) {
        modules.push(<BombInfoModule key="1" questionType="b" />);
      }
      if (!this.props.frk) {
        modules.push(<BombInfoModule key="2" questionType="f" />);
      }
      return modules;
    };
    let getResult = () => {
      if (this.props.result == '?') {
        return (
          <div>
            {getBombInfoModules()}
          </div>
        );
      } else {
        let result = results[this.props.result] || "Invalid";
        return (
          <div className="form-group label-spacing">
            <label>Result</label>
            <p>{result}</p>
          </div>
        );
      }
    };
    return (
      <div>
        <h2>Button</h2>
        {getButtonColors()}
        {getWordList()}
        {getResult()}
        {getHoldButtonColors()}
        {getHoldButtonResult()}
        <ButtonItem selected={false} label="Start Over" action={Actions.clearButton} />
      </div>
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

let ButtonItem = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    action: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool.isRequired
  },
  pressed: function() {
    this.props.action(this.props.label);
  },
  render: function() {
    let buttonType = this.props.selected ? "btn-primary" : "btn-default";
    return (<button className={"btn " + buttonType} onClick={this.pressed}>{this.props.label}</button>)
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
      return words.map((w, i) => (<ButtonItem key={i} label={w} selected={false} action={Actions.wordPressed} />));
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
        return (<div className="keypad-buttons">
          {generateWords()}
        </div>)
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
  propTypes: {
    buttons: React.PropTypes.array.isRequired,
    currentRound: React.PropTypes.number.isRequired,
    answer: React.PropTypes.number
  },
  render: function() {
    let numbers = [ {
      value: 0,
      label: "Display"
    },{
      value: 1,
      label: "Button 1"
    },{
      value: 2,
      label: "Button 2"
    },{
      value: 3,
      label: "Button 3"
    },{
      value: 4,
      label: "Button 4"
    }];
    let getButtons = (row) => {
      let number = this.props.selectedNumber;
      let buttons = this.props.buttons;
      return [1, 2, 3, 4].map((n, i) => {
        let active = buttons[row] === n;
        return <SegmentedButtonItem key={i} active={active} label={String(n)} btnType={"btn-default"} callback={Actions.memoryNumberChanged.bind(this, n, row)} />
      });
    };
    let getButtonRow = function(row, key) {
      return (
        <div key={key} className="form-group color-buttons">
          <div className="btn-toolbar">
            <div className="btn-group">
              {getButtons(row)}
            </div>
          </div>
        </div>
      );
    };
    let getButtonRows = () => {
      let rows = [];
      for (let i = 0; i < (this.props.currentRound < 5 ? numbers.length : 1); i++) {
        rows.push(<h4 key={i*2}>{numbers[i].label}</h4>);
        rows.push(getButtonRow(i, i*2+1));
      }
      return rows;
    };
    let getAnswer = () => {
      if (this.props.answer && this.props.buttons.every(b => b === undefined)) {
        return <p>Press {this.props.answer}</p>
      }
    };
    return (
      <div>
        <h2>Memory</h2>
        <h3>Round {this.props.currentRound}</h3>
        {getButtonRows()}
        {getAnswer()}
        <button className="btn btn-primary" onClick={Actions.clearMemory}>Start Over</button>
      </div>
    );
  }
});

let MorseCodeModule = React.createClass({
  propTypes: {
    string: React.PropTypes.array.isRequired,
    options: React.PropTypes.string
  },
  render: function() {
    let getSection = (str, label) => {
      if (str) {
        return (
          <div className="form-group label-spacing">
            <label>{label}</label>
            <pre>{str}</pre>
          </div>
        )
      }
    };
    let getCurrentString = () => {
      return getSection(this.props.string.join(''), "Current String");
    };
    let getOptions = () => {
      return getSection(this.props.options, "Possible Answers");
    };
    return (
      <div>
        <h2>Morse Code</h2>
        <div className="form-group">
          <div className="btn-toolbar">
            <div className="btn-group">
              <SegmentedButtonItem active={false} label="dot" callback={Actions.morseButtonPressed.bind(this, '.')} />
              <SegmentedButtonItem active={false} label="dash" callback={Actions.morseButtonPressed.bind(this, '-')} />
              <SegmentedButtonItem active={false} label="break" callback={Actions.morseButtonPressed.bind(this, 'b')} />
            </div>
            <div className="btn-group">
              <SegmentedButtonItem active={false} label="backspace" callback={Actions.morseBackPressed} />
            </div>
          </div>
        </div>
        {getCurrentString()}
        {getOptions()}
        <ButtonItem selected={false} label="Start Over" action={Actions.clearMorse} />
      </div>
    );
  }
});

let SegmentedButtonItem = React.createClass({
  propTypes: {
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    btnType: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    callback: React.PropTypes.func.isRequired
  },
  render: function() {
    let active = this.props.active ? 'active' : '';
    let disabled = this.props.disabled ? 'disabled' : '';
    let btnType = this.props.btnType ? this.props.btnType : 'btn-primary';
    return (
      <button className={"btn " + btnType + " "  + active + " " + disabled} onClick={this.props.callback}>{this.props.label}</button>
    )
  }
});

let ComplicatedWiresModule = React.createClass({
  codeToInstructionMap: { 
    "c": "CUT!", 
    "d": "DON'T CUT"
  },
  propTypes: {
    led: React.PropTypes.bool.isRequired,
    colors: React.PropTypes.array.isRequired,
    star: React.PropTypes.bool.isRequired,
    instruction: React.PropTypes.string.isRequired,
    bombInfo: React.PropTypes.object.isRequired
  },
  getModuleOrInstruction: function() {
    switch (this.props.instruction) {
      case 'c':
      case 'd':
        return this.codeToInstructionMap[this.props.instruction];
      case 'p':
        if (this.props.bombInfo[this.props.instruction] === "Yes") {
          return this.codeToInstructionMap['c']
        } else if (this.props.bombInfo[this.props.instruction] === "Yes") {
          return this.codeToInstructionMap['d']
        }
        break;
      case 'b':
        if (this.props.bombInfo[this.props.instruction] === "<") {
          return this.codeToInstructionMap['d']
        } else if (this.props.bombInfo[this.props.instruction] === "2") {
          return this.codeToInstructionMap['c']
        } else if (this.props.bombInfo[this.props.instruction] === ">") {
          return this.codeToInstructionMap['c']
        }
        break;
      case 's':
        if (this.props.bombInfo[this.props.instruction] === "Even") {
          return this.codeToInstructionMap['c']
        } else if (this.props.bombInfo[this.props.instruction] === "Odd") {
          return this.codeToInstructionMap['d']
        }
        break;
    }
    return (<BombInfoModule questionType={this.props.instruction} />)
  },
  render: function() {
    let onButtonClicked = function(arg) {
      Actions.complicatedButtonClicked(this.props.label)
    }
    return (
      <div>
        <h2>Complicated Wires</h2>
        <div className="form-group label-spacing">
          <label>LED</label>
        </div>
        <div className="form-group">
          <div className="btn-group">
            <SegmentedButtonItem active={this.props.led} label="On" callback={Actions.complicatedButtonClicked.bind(this, "On")} />
            <SegmentedButtonItem active={!this.props.led} label="Off" callback={Actions.complicatedButtonClicked.bind(this, "Off")} />
          </div>
        </div>
        <div className="form-group label-spacing">
          <label>Wire Colors</label>
        </div>
        <div className="form-group">
          <div className="btn-group">
            <SegmentedButtonItem active={this.props.colors.includes('b')} label="Blue" callback={Actions.complicatedButtonClicked.bind(this, "Blue")} />
            <SegmentedButtonItem active={this.props.colors.includes('r')} label="Red" callback={Actions.complicatedButtonClicked.bind(this, "Red")} />
          </div>
        </div>
        <div className="form-group label-spacing">
          <label>Star</label>
        </div>
        <div className="form-group">
          <div className="btn-group">
            <SegmentedButtonItem active={this.props.star} label="Yes" callback={Actions.complicatedButtonClicked.bind(this, "Yes")} />
            <SegmentedButtonItem active={!this.props.star} label="No" callback={Actions.complicatedButtonClicked.bind(this, "No")} />
          </div>
        </div>
        {this.getModuleOrInstruction()}
      </div>
    );
  }
});

let WireSequencesModule = React.createClass({
  propTypes: {
    color: React.PropTypes.string,
    letter: React.PropTypes.string,
    numWires: React.PropTypes.number.isRequired,
    answer: React.PropTypes.bool
  },
  render: function() {
    let wireColors = ['r', 'b', 'k'];
    let letters = ['A', 'B', 'C'];
    let getLetters = () => {
      let letter = this.props.letter;
      return letters.map((c, i) => {
        let active = letter === c;
        return <SegmentedButtonItem key={i} active={active} label={c} btnType="btn-default" callback={Actions.wireSequenceLetterChanged.bind(this, c)} />
      });
    };
    let getLettersRow = function() {
      return (
        <div className="form-group color-buttons">
          <div className="btn-toolbar">
            <div className="btn-group">
              {getLetters()}
            </div>
          </div>
        </div>
      );
    };
    let getColors = () => {
      let color = this.props.color;
      return colors.filter(c => wireColors.includes(c.value)).map((c, i) => {
        let active = color === c.value;
        let btnType = active ? c.btnType : "btn-default";
        return <SegmentedButtonItem key={i} active={active} label={c.label} btnType={btnType} callback={Actions.wireSequenceColorChanged.bind(this, c.value)} />
      });
    };
    let getColorsRow = function() {
      return (
        <div className="form-group color-buttons">
          <div className="btn-toolbar">
            <div className="btn-group">
              {getColors()}
            </div>
          </div>
        </div>
      );
    };
    let getNumWires = () => {
      return <p>Number of wires: {this.props.numWires}</p>
    };
    let getAnswer = () => {
      if (this.props.answer !== undefined) {
        let instructions = { "true": "CUT IT!", "false": "DON'T CUT IT!" };
        return <p>{instructions[String(this.props.answer)]}</p>;
      }
    };
    return (
      <div>
        <h2>Wire Sequences</h2>
        {getColorsRow()}
        {getLettersRow()}
        {getNumWires()}
        {getAnswer()}
        <ButtonItem selected={false} label="Start Over" action={Actions.clearWireSequences} />
      </div>
    );
  }
});

let PasswordsModule = React.createClass({
  propTypes: {
    first: React.PropTypes.string.isRequired,
    last: React.PropTypes.string.isRequired,
    passwords: React.PropTypes.array.isRequired
  },
  firstLettersChanged: function(e) {
    if (e.target.value.length < 7) {
      Actions.passwordLettersChanged(0, e.target.value);
    }
  },
  lastLettersChanged: function(e) {
    if (e.target.value.length < 7) {
      Actions.passwordLettersChanged(1, e.target.value);
    }
  },
  render: function() {
    let getPassword = () => {
      let passwords = this.props.passwords.length > 0 ? this.props.passwords.join(',') : "Invalid";
      return (
        <div className="form-group label-spacing">
          <label>Possible Passwords</label>
          <p>{passwords}</p>
        </div>
      );
    };
    return (
      <div>
        <h2>Passwords</h2>
        <div className="form-group label-spacing">
          <label>First Position</label>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="letters (e.g. fixazl)" value={this.props.first} onChange={this.firstLettersChanged} />
        </div>
        <div className="form-group label-spacing">
          <label>Last Position</label>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="letters (e.g. qklvgh)" value={this.props.last} onChange={this.lastLettersChanged} />
        </div>
        {getPassword()}
        <ButtonItem selected={false} label="Start Over" action={Actions.clearPasswords} />
      </div>
    );
  }
});

let KnobsModule = React.createClass({
  propTypes: {
    knobs: React.PropTypes.array.isRequired,
    position: React.PropTypes.string
  },
  render: function() {
    let getButtons = (row) => {
      let result = [];
      for (let i = 0; i < 6; i++) {
        let disabled = (i === 3 || i === 4) ? false : true;
        let label = this.props.knobs[row][i] === 1 ? 'X' : '';
        result.push(<SegmentedButtonItem key={i} btnType={'btn-primary'} disabled={disabled} active={false} label={label} callback={Actions.knobsButtonPressed.bind(this, row, i)} />);
      }
      return result;
    };
    let getButtonRow = function(row) {
      return (
        <div className="form-group">
          <div className="btn-group">
            {getButtons(row)}
          </div>
        </div>
      )
    };
    let getPosition = () => {
      let position = this.props.position ? this.props.position : 'Invalid';
      return (
        <div className="form-group label-spacing">
          <label>Position</label>
          <p>{position}</p>
        </div>
      );
    };
    return (
      <div className="knob-buttons">
        <h2>Knobs</h2>
        {getButtonRow(0)}
        {getButtonRow(1)}
        {getPosition()}
        <ButtonItem selected={false} label="Start Over" action={Actions.clearKnobs} />
      </div>
    );
  }
});

let BombInfoModule = React.createClass({
  propTypes: {
    'questionType': React.PropTypes.string,
    'bombInfo': React.PropTypes.object
  },
  render: function() {
    let questions = {
      "p": "Does the bomb have a parallel port?", 
      "b": "How many batteries does the bomb have?", 
      "s": "Is the last digit in the serial number even or odd?",
      "f": "Is there a lit indicator with the letters 'FRK'?"
    };
    let getButtons = function(questionType, labelAndActivePairs) {
      return labelAndActivePairs.map((pair, i) => {
        return <SegmentedButtonItem key={i} active={pair.active} label={pair.label} callback={Actions.bombInfoChanged.bind(this, questionType, pair.label)} />
      });
    };
    let buildQuestion = (key, questionType) => {
      let labelAndActivePairs = [];
      switch (questionType) {
        case 'p':
          labelAndActivePairs.push({'active': this.props.bombInfo && this.props.bombInfo.p === "Yes", 'label': 'Yes'});
          labelAndActivePairs.push({'active': this.props.bombInfo && this.props.bombInfo.p === "No", 'label': 'No'});
          break;
        case 'b':
          labelAndActivePairs.push({'active': this.props.bombInfo && this.props.bombInfo.b === "<", 'label': '<'});
          labelAndActivePairs.push({'active': this.props.bombInfo && this.props.bombInfo.b === "2", 'label': '2'});
          labelAndActivePairs.push({'active': this.props.bombInfo && this.props.bombInfo.b === ">", 'label': '>'});
          break;
        case 's':
          labelAndActivePairs.push({'active': this.props.bombInfo && this.props.bombInfo.s === "Even", 'label': 'Even'});
          labelAndActivePairs.push({'active': this.props.bombInfo && this.props.bombInfo.s === "Odd", 'label': 'Odd'});
          break;
        case 'f':
          labelAndActivePairs.push({'active': this.props.bombInfo && this.props.bombInfo.f === "Yes", 'label': 'Yes'});
          labelAndActivePairs.push({'active': this.props.bombInfo && this.props.bombInfo.f === "No", 'label': 'No'});
          break;
      }
      return (
        <div key={key}>
          <div className="form-group label-spacing">
            <label>{questions[questionType]}</label>
          </div>
          <div className="form-group">
            <div className="btn-group">
              {getButtons(questionType, labelAndActivePairs)}
            </div>
          </div>
        </div>
      )
    };
    let getQuestions = () => {
      let uiElements = [];
      if (this.props.questionType == null) {
        uiElements.push(<h2 key="0">Bomb Information</h2>);
        Object.keys(questions).forEach((questionType, i) => {
          uiElements.push(buildQuestion(i+1, questionType));
        });
      } else {
        uiElements.push(buildQuestion(1, this.props.questionType));
      }
      return uiElements;
    };
    return (
      <div>
        {getQuestions()}
      </div>
    );
  }
});

ReactDOM.render(
  <Page />,
  document.getElementById('content')
);
