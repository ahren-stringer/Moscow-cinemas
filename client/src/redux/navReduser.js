const SET_NAV_DATA = 'navReuser/SET-NAV-DATA';
const SET_NAMES = 'navReuser/SET-NAMES';
const SET_NEW_TEXT = 'navReuser/SET-NEW-TEXT';
const TOTAL_COUNT = 'navReuser/TOTAL-COUNT';
const SET_PAGE = 'navReuser/SET-PAGE';
const CONCAT_NAV_DATA="navReuser/CONCAT_NAV_DATA"

let init = {
    navData: [],
    names: [],
    newSearchText: '',
    liked: { ...localStorage },
    totalCount: 1,
    numberOfPage: 2,
    onOnePage: 6,
    request:true
};

const navReduser = (state = init, action) => {
    switch (action.type) {
        case SET_NAV_DATA:
            return { ...state, navData: action.navData }
        case CONCAT_NAV_DATA:
            let arr=[]
            for (let i=0;i<action.navData.length;i++){
                let count=0;
                for (let j=0;j<state.navData.length;j++){
                    if(state.navData[j].global_id==action.navData[i].global_id) count=count+1
                }
                if (!count) arr.push(action.navData[i])
            }
            return { ...state, navData: [].concat(state.navData, arr) }
        case SET_NAMES:
            return { ...state, names: action.names }
        case SET_NEW_TEXT:
            return { ...state, newSearchText: action.text }
        case TOTAL_COUNT:
            return { ...state, totalCount: action.totalCount }
        case SET_PAGE:
            return { ...state, numberOfPage: action.numberOfPage }
        default:
            return state
    }
}

export const setNavData = (navData) => ({ type: SET_NAV_DATA, navData });
export const concatNavData = (navData) => ({ type: CONCAT_NAV_DATA, navData });
export const setNames = (names) => ({ type: SET_NAMES, names });
export const SearchChange = (text) => ({ type: SET_NEW_TEXT, text })
export const SetTotalCount = (totalCount) => ({ type: TOTAL_COUNT, totalCount })
export const SetPageCount = (numberOfPage) => ({ type: SET_PAGE, numberOfPage })


export default navReduser