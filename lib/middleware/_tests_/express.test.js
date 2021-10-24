import {checkAgainstRules} from "../express";

describe("Rule checker middlware", () => {

    let mockRequest;
    let mockResponse;
    let nextFn = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {};
    });

    it("should return 200 when calling /roles with a valid request", () => {
        checkAgainstRules(mockRequest, mockResponse, nextFn);
        mockRequest.path = 'tets'
        expect(mockResponse).toBe({
            status: "success",
            data: {},
            message: null
        })
        expect(nextFn).toHaveBeenCalled()
    })

    it('should throw a 404 error when calling /roles with a malformed request', () => {
        try {
            checkAgainstRules(mockRequest, mockResponse, nextFn);
        } catch(e){
            expect(e).toBe('test')
        }
    });

})