export const $ = (id, root = document) => root.querySelector(id)
export const all$ = (id, root = document) => root.querySelectorAll(id)

export const createElement = (tag = '', root = document) => root.createElement(tag)