// 인자로 함수 본체를 전달 받음.
function _curry( fn ) {
    return function( a, b ) {
        return ( arguments.length == 2 ) ? fn( a, b ) : function( b ) { return fn( a, b ); };
    };
}

// 인자의 적용 순서를 오른쪽 부터 실행하는 _curryr 함수
function _curryr( fn ) {
    return function( a, b ) {
        return ( arguments.length == 2 ) ? fn( a, b ) : function( b ) { return fn( b, a ); };
    };
}

var _get = _curryr(function(obj, key) {
    return (!!obj) ? obj[key] : undefined;
});

var _length = _get('length');

function _each( list, iter ) {
    // 배열이 아니라 객체에 대해서도 동작하도록 수정
    var keys = _keys(list);

    for( var i = 0, len = keys.length; i < len; ++i ) {
        iter(list[keys[i]]);
    }

    return list;
}

function _filter( list, predicate ) {

    var new_list = [];

    _each(list, function( val ) {
        if( predicate(val) ) {
            new_list.push(val);
        }
    });

    return new_list;
}

function _map( list, mapper ) {

    var new_list = [];

    _each( list, function(val, key) {
        new_list.push(mapper(val, key));
    });

    return new_list;
}

var _map = _curryr(_map),
    _each = _curryr(_each),
    _filter = _curryr(_filter);

function _rest(list, num) {
    return Array.prototype.slice.call(list, num || 1);
}

function _reduce( list, iter, memo ) {

    if( arguments.length == 2 ) {
        memo = list[0];
        list = _rest(list);
    }

    _each( list, function(val) {
        memo = iter( memo, val );
    });

    return memo;
}

function _pipe() {
    var fns = arguments;

    return function(arg) {
        return _reduce( fns, function(arg, fn) {
            return fn(arg);
        }, arg );
    }
}

// _pipe의 즉시 실행 버전
function _go(arg) {
    // 첫번째 인자는 arg로 넘겨받고
    // 나머지 인자는 fns에 담는다.
    var fns = _rest(arguments);

    _pipe.apply( null, fns)(arg);
}

function _is_object( obj ) {
    return typeof obj == 'object' && !!obj;
}

function _keys( obj ) {
    return _is_object(obj) ? Object.keys(obj) : [];
}

function _values( data ) {
    return _map( data, _identity );
}

function _identity( val ) {
    return val;
}

var _values = _map(_identity);

function _pluck( data, key ) {
    return _map( data, _get(key) );
}
