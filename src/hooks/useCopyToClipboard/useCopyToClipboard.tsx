import copy from 'copy-to-clipboard';
import { notification } from 'antd';
import { notificationOptions } from './interfaces';

function useCopyToClipboard() {
    function initCopy(
        value: string,
        { message }: notificationOptions,
    ) {
        copy(value);

        notification.open({
            message: message || 'Пустой заголовок',
            className: 'notification-success',
            duration: 0.8,
            maxCount: 2,
        });
    }

    return initCopy;
}

export default useCopyToClipboard;