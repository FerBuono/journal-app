import { finishLoading, removeError, setError, startLoading } from "../../actions/ui"
import { types } from "../../types/types";

describe('Pruebas en ui-actions', () => {

    test('todas las acciones deben de crearse', () => {

        const msg = 'Error';

        const setErrorAction = setError(msg);

        expect(setErrorAction).toEqual({
            type: types.uiSetError,
            payload: msg
        });

        const removeErrorAction = removeError();
        
        expect(removeErrorAction).toEqual({
            type: types.uiRemoveError
        });
        
        const startLoadingAction = startLoading();
        
        expect(startLoadingAction).toEqual({
            type: types.uiStartLoading
        });
        
        const finishLoadingAction = finishLoading();

        expect(finishLoadingAction).toEqual({
            type: types.uiFinishLoading
        });
    });
});