import React from 'react';

class Loading extends React.PureComponent {
  render() {
    const { progress } = this.props;

    return (
      <div className="loading">
        Loading
        <br />
        {progress && <progress value={progress.loaded} max={progress.total} />}
      </div>
    );
  }
}

export default Loading;
