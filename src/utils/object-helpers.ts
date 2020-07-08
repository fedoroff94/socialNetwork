export const updateObjectInArray = (items: any, itemId: any, propObjName: any, newObjProps: any) => {
    return items.map((i: any) => {
        if (i[propObjName] === itemId) {
            return {...i, ...newObjProps}
        }
        return i;
    })
}