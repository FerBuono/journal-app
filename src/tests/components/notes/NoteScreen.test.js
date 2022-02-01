import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import NoteScreen from "../../../components/notes/NoteScreen";
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '123',
        name: 'Fernando'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: '1234',
            title: 'titulo',
            body: 'body',
            date: 0
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <NoteScreen /> 
    </Provider>
);

describe('Pruebas en <NoteScreen />', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('debe de mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();
    });

    test('debe de disparar el activeNote', () => {

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola de nuevo'
            }
        });

        expect(activeNote).toHaveBeenLastCalledWith(
            '1234',
            {
                body: 'body',
                title: 'Hola de nuevo',
                id: '1234',
                date: 0
            }
        );
    });
});