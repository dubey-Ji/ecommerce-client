import { notification } from 'antd'

export const CustomSnackbar = (type, message) => {
    const [api, contextHolder] = notification.useNotification();
    api[type]({
        message: message,
        description: 'Invalid email or password',
        duration: 2
    })
    return contextHolder;
}