import * as types from '../actions/ActionTyeps';

// 초기 상태를 정의합니다.
const initialState = {
    counters: [
        {
            color: 'black',
            number: 0
        }
    ]
}

// 리듀서 함수를 정의합니다.
function counter( state = initialState, action ){
    // 레퍼런스 생성
    const { counters } = state;
    
    switch( action.type ){
        // 카운터를 새로 추가합니다.
        case types.CREATE:
            return{
                counters: [
                    ...counters,
                    {
                        color: action.color,
                        number: 0
                    }
                ]
            };
        // slice를 이용하여 맨  마지막 카운터를 제외시킵니다.
        case types.REMOVE:
            return{
                counters: counters.slice(0, counters.length - 1)
            }
        // action.index 번째 카운터의 number 에 1을 더합니다.
        case types.INCREMENT:
            return{
                counters: [
                    ...counters.slice(0, action.index),
                    {
                        ...counters[action.index],
                        number:  counters[action.index].number + 1
                    },
                    ...counters.slice(action.index + 1, counters.length)
                ]
            }
        // action.index 번째 카운터의 number에 1을 뺍니다.
        case types.DECREMENT:
            return{
                counters: [
                    ...counters.slice(0, action.index),
                    {
                        ...counters[action.index],
                        number: counters[action.index].number - 1
                    }
                ]
            };
        // action.idex 번째 카운터의 색상을 변경합니다
        case types.SET_COLOR:
            return{
                counters: [
                    ...counters.slice(0, action.index),
                    {
                        ...counters[action.index],
                        color: action.color
                    },
                    ...counters.slice(action.index + 1, counters.length)
                ]
            }
        default:
            return state;
    }
}

export default counter;