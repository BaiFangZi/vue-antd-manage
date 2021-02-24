import {
    isEmpty,
    isArray
} from 'lodash'

export function formatMenu(menus) {
    for (let item of menus) {
        if (!isArray(item.children) && !isEmpty(item.children)) {
            formatMenu(item.children)
        } else {
            const {
                icon,
                title
            } = item
            return {
                icon,
                title
            }

        }
    }
}