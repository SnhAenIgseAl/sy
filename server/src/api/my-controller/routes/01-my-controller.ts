export default {
    routes: [
        {
            method: 'POST',
            path: '/auth/update',
            handler: 'my-controller.updateMe',
        },
        {
            method: 'POST',
            path: '/detail/like',
            handler: 'my-controller.like',
        },
        {
            method: 'POST',
            path: '/detail/dislike',
            handler: 'my-controller.dislike',
        },
        {
            method: 'POST',
            path: '/detail/favor',
            handler: 'my-controller.favor',
        },
        {
            method: 'POST',
            path: '/detail/disfavor',
            handler: 'my-controller.disfavor',
        },
        {
            method: 'POST',
            path: '/auth/handle',
            handler: 'my-controller.handle',
        },
        {
            method: 'POST',
            path: '/shops/exchange',
            handler: 'my-controller.exchange',
        }
    ]
}