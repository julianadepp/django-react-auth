function setStateOrErrors(response, stateSetter, errorSetter) {
    console.log(response, stateSetter, errorSetter)
  if (response.errors) {
    errorSetter(response.errors);
  } else {
    stateSetter(response.data);
    errorSetter(response.errors);
  }
}
export default setStateOrErrors