const Result = (props) =>
  props && !!props.grade && <h1>Du får {props.grade.toUpperCase()}</h1>;

  export default Result