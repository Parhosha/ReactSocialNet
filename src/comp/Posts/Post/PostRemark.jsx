import React, { useState, useEffect } from 'react';

const PostRemark = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  /*componentDidUpdate(prevProps,prevState){

      console.log(prevProps.status + ' / ' + this.props.status + ' / ' + this.state.status)

    if(prevProps.status !== this.props.status ){
         this.setState({
             status: this.props.status  
            })
     }
}
*/
  const changeStatusLocal = (e) => {
    setStatus(e.currentTarget.value);
  };

  const changeModeOffSwitch = () => {
    setEditMode(false);
    props.updStatus(status);
  };

  const changeModeOnSwitch = () => {
    setEditMode(true);
  };

  return (
    <div>
      {!editMode && (
        <div>
          {' '}
          <p>What on photo?</p>
          <div onClick={changeModeOnSwitch} className="status">
            <b>{status || '*click to write*'}</b>
          </div>
        </div>
      )}

      {editMode && (
        <div>
          <input
            type="text"
            onBlur={changeModeOffSwitch}
            autoFocus={true}
            onChange={changeStatusLocal}
          />
        </div>
      )}
    </div>
  );
};

export default PostRemark;
