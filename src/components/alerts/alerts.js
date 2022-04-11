// Alert  messages for registration

export const showErrorMessage = (error) => {
  return <div className="alert alert-danger">{error}</div>;
};
export const showFIBMessage = () => {
  return <h1 className="alert alert-warning">FIB</h1>;
};
