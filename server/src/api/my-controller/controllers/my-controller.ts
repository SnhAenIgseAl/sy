/**
 * my-controller controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::my-controller.my-controller', ({ strapi }) => ({
    async updateMe(ctx) {
        const userId = ctx.state.user.documentId
        const { data } = ctx.request.body

        console.log(data);

        try {
            const res = await strapi.documents('plugin::users-permissions.user').update({
                documentId: userId,
                data: {
                    ...data
                }
            })

            return {
                code: 0,
                message: '更新成功',
                data: res
            }
        } catch (err) {
            return {
                code: -1,
                message: '更新失败：' + err,
                data: null
            }
        }
    },

    async like(ctx) {
        const { id } = ctx.request.body
        const userId = ctx.state.user.documentId

        const detailInfo = await strapi.documents('api::detail.detail').findOne({
            documentId: id
        })

        try {
            const res = await strapi.documents('api::like.like').create({
                data: {
                    user: userId,
                    detail: id
                },
                status: 'published'
            })

            const olgLikeCount = detailInfo.like_count
            await strapi.documents('api::detail.detail').update({
                documentId: id,
                data: {
                    like_count: olgLikeCount + 1
                },
                status: 'published'
            })
                
            return {
                code: 0,
                message: '点赞成功',
                data: res
            }
        } catch (err) {
            return {
                code: -10,
                message: '点赞失败：' + err,
                data: null
            }
        }
    },

    async dislike(ctx) {
        const { id } = ctx.request.body
        const userId = ctx.state.user.documentId

        const detailInfo = await strapi.documents('api::detail.detail').findOne({
            documentId: id
        })
        const likeInfo = await strapi.documents('api::like.like').findFirst({
            filters: {
                user: {
                    documentId: userId
                },
                detail: {
                    documentId: id
                }
            }
        })

        try {
            await strapi.documents('api::like.like').delete({
                documentId: likeInfo.documentId
            })

            const olgLikeCount = detailInfo.like_count
            await strapi.documents('api::detail.detail').update({
                documentId: id,
                data: {
                    like_count: olgLikeCount - 1
                },
                status: 'published'
            })
                
            return {
                code: 0,
                message: '取消点赞成功',
                data: null
            }
        } catch (err) {
            return {
                code: -11,
                message: '取消点赞失败：' + err,
                data: null
            }
        }
    },

    async favor(ctx) {
        const { id } = ctx.request.body
        const userId = ctx.state.user.documentId

        try {
            const res = await strapi.documents('api::favorite.favorite').create({
                data: {
                    user: userId,
                    detail: id
                },
                status: 'published'
            })
                
            return {
                code: 0,
                message: '收藏成功',
                data: res
            }
        } catch (err) {
            return {
                code: -10,
                message: '收藏失败：' + err,
                data: null
            }
        }
    },

    async disfavor(ctx) {
        const { id } = ctx.request.body
        const userId = ctx.state.user.documentId

        const favorInfo = await strapi.documents('api::favorite.favorite').findFirst({
            filters: {
                user: {
                    documentId: userId
                },
                detail: {
                    documentId: id
                }
            }
        }) 

        try {
            await strapi.documents('api::favorite.favorite').delete({
                documentId: favorInfo.documentId
            })
                
            return {
                code: 0,
                message: '取消收藏成功',
                data: null
            }
        } catch (err) {
            return {
                code: -11,
                message: '取消收藏失败：' + err,
                data: null
            }
        }
    },

    async handle(ctx) {
        const { id } = ctx.request.body
        const userId = ctx.state.user.documentId

        try {
            let isLiked = false
            let isFavorited = false

            const likeInfo = await strapi.documents('api::like.like').findFirst({
                filters: {
                    user: {
                        documentId: userId
                    },
                    detail: {
                        documentId: id
                    }
                }
            })
            const favorInfo = await strapi.documents('api::favorite.favorite').findFirst({
                filters: {
                    user: {
                        documentId: userId
                    },
                    detail: {
                        documentId: id
                    }
                }
            })

            if (likeInfo)      isLiked = true
            if (favorInfo) isFavorited = true

            return {
                code: 0,
                message: 'success',
                data: {
                    isLiked,
                    isFavorited
                }
            }
        } catch (err) {
            return {
                code: -1,
                message: 'fail: ' + err,
                data: null
            }
        }
    },

    async exchange(ctx) {
        const { id, address, postscript } = ctx.request.body
        const userId = ctx.state.user.documentId

        console.log(ctx.request.body,userId);
        
        const userScore = await strapi.documents('plugin::users-permissions.user').findOne({
            documentId: userId
        }).then(res => res.score)

        const shopInfo = await strapi.documents('api::shop.shop').findOne({
            documentId: id
        })

        if (userScore < shopInfo.price) {
            return {
                code: -1,
                message: '积分不足',
                data: null
            }
        }

        try {
            const res = await strapi.documents('api::exchange.exchange').create({
                data: {
                    user: userId,
                    shop: id,
                    address,
                    postscript
                },
                status: 'published'
            })

            await strapi.documents('plugin::users-permissions.user').update({
                documentId: userId,
                data: {
                    score: userScore - shopInfo.price
                },
                status: 'published'
            })
                
            return {
                code: 0,
                message: '兑换成功',
                data: res
            }
        } catch (err) {
            return {
                code: -2,
                message: 'fail: ' + err,
                data: null
            }
        }
    }
}));
