import { createVNode } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal, notification } from 'ant-design-vue';

export function notifySuccess(message: string) {
  notification.success({
    message: '成功',
    description: message
  });
}

export function messageConfirm(content: string) {
  return Modal.confirm({
    content: '系统提示',
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
    
    },
    cancelText: '取消',
    onCancel() {
      
    },
  });
}