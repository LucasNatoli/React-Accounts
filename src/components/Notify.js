import React from 'react';
import { Modal } from 'antd'
import { notifyConstants } from '../constants'

function Notify (notify) {
  const props = {
    title: 'Atencion!',
    content: (
      <div>
        <p>{notify.message}</p>
      </div>
    ),
    onOk() { },
  }
  switch (notify.type) {
    case notifyConstants.SUCCESS:
        Modal.info(props);
        break;
    case notifyConstants.ERROR:
        Modal.error(props)
        break;
    default:
  }  
}

export default Notify