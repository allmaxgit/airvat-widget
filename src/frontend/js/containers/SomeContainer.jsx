// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as someActions from '../redux/actions/someActions';

import SomeComponent from '../components/SomeComponent';

type Props = {
  /*
  todos: {[todo_id: number]: todoType},
  sortedTodosArray: Array<todoType>,
  filter: string,
  editor: todoType,
  locationSuggestions: Array<{[string]: mixed}>,
  locationInput: string,
  actions: { [action: string]: Function },
  */
};

type State = {
  //isEditing: boolean
}

class SomeContainer extends React.Component<Props, State> {
  state = {
    //isEditing: false
  };

  render() {
    /*
    const {
      props: {
        actions,
        todos,
        filter,
        editor,
        sortedTodosArray,
        locationSuggestions,
        locationInput
      },
      state: {
        isEditing
      }
    } = this;
    */

    return (
      <div>
        <SomeComponent />
      </div>
    );
  }
}

function mapStateToProps(state, props) {

  const {
    // todos,
    // filter,
    // sortedTodos,
    // editor,
    // locationSuggestions,
    // locationInput
  } = state.root;

  // Some action performed on component connect
  // const sortedTodosArray = sortedTodos
  //   .filter(index => todos[index].isDeleted === (type === 'deleted') )
  //   .map(index => todos[index]);

  return {
    // todos,
    // filter,
    // editor,
    // type,
    // sortedTodosArray,
    // locationInput,
    // locationSuggestions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(someActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SomeContainer);
