// 2. _filter, _map 으로 리팩토링
function _filter( list, predicate ) {

    var new_list = [];

    _each(list, function( item ) {
        if( predicate(item) ) {
            new_list.push(item);
        }
    });

    return new_list;
}

function _map( list, mapper ) {

    var new_list = [];

    _each( list, function(item) {
        new_list.push(mapper(item));
    });

    return new_list;
}

function _each( list, iter ) {
    var new_list = [];

    for( var i = 0; i < list.length; ++i ) {
        iter(list[i]);
    }

    return new_list;
}