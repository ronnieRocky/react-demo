import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import Link from '../components/Link';

const mapStateProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
  }
}

const mapDipatchProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      console.log("mapDipatchProps");
      console.log(dispatch);
      console.log(ownProps);
      dispatch(setVisibilityFilter(ownProps.filter))
    },
  }
}

const FilterLink = connect(
  mapStateProps,
  mapDipatchProps
  )(Link);

export default FilterLink
