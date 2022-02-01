import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'
import RegisterScreen from "../../../components/auth/RegisterScreen";
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { types } from '../../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {}
};

const store = mockStore(initState);

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen /> 
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en <RegisterScreen />', () => {

    beforeEach(() => {
        store.clearActions();
        jest.clearAllMocks();
    });

    test('debe de mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();
    });

    test('debe de hacer el dispatch de la acción respectiva', () => {

        const emailField = wrapper.find('input[name="email"]');

        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid'
        });
    });

    test('debe de mostrar la alerta con el error', () => {

        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email is not valid'
            },
            notes: {}
        };
        
        const store = mockStore(initState);
        
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen /> 
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);

        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError);
    });

});