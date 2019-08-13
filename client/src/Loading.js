import React from 'react';

function Loading({ progress: { loaded, total } }) {
  return (
    <div className="loading">
      Loading
      <br />
      <progress value={loaded} max={total} />
    </div>
  );
}

export default Loading;
