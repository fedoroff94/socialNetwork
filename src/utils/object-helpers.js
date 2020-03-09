export const updateObjectInArray = (items, itemId, propObjName, newObjProps) => {
    return items.map(i => {
        if (i[propObjName] === itemId) {
            return {...i, ...newObjProps}
        }
        return i;
    })
}