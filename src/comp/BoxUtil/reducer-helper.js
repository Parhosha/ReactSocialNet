export  const helper = (items, id, userId, method ) => {

   return items.map( p => {
        if( p[id] === userId ){
            return {...p, ...method}
        }
        return p;
    })
}