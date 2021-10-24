import {checkAgainstRules} from "../express";
const API_REQUESTS_DATA = require("./SAMPLE_API_REQUESTS_DATA.json")

describe("Rule checker middlware", () => {

    let mockRequest;
    let mockResponse;
    let nextFn;
    const ACCOUNT_ENDPOINT = "/api/account"
    const API_ENDPOINTS = {
        role: `${ACCOUNT_ENDPOINT}/role`,
        profile: `${ACCOUNT_ENDPOINT}/profile`,
        member: `${ACCOUNT_ENDPOINT}/member`,
        search: `${ACCOUNT_ENDPOINT}/search`,
    };

    beforeEach(() => {
        mockRequest = {
            originalUrl: '',
            method: '',
            body: '',
            query: ''
        };
        mockResponse = {};
        nextFn = jest.fn();
    });

    it("should return 200 when calling /roles with a valid request", () => {
        //Given
        mockRequest.originalUrl = API_ENDPOINTS.role;
        mockRequest.method = "GET";
        mockRequest.body = API_REQUESTS_DATA.validRoleRequestWithAdditionalParams;

        //When
        checkAgainstRules(mockRequest, mockResponse, nextFn);

        //Then
        expect(nextFn).toHaveBeenCalledTimes(1)

    })

    it("should return 200 when calling /profile with a valid request", () => {
         //Given
         mockRequest.originalUrl = API_ENDPOINTS.profile;
         mockRequest.method = "PUT";
         mockRequest.body = API_REQUESTS_DATA.validProfileRequest;
 
         //When
         checkAgainstRules(mockRequest, mockResponse, nextFn);
 
         //Then
         expect(nextFn).toHaveBeenCalledTimes(1)
    })

    it("should return 200 when calling covered /member method with a valid request", () => {
         //Given
         mockRequest.originalUrl = API_ENDPOINTS.member;
         mockRequest.method = "DELETE";
         mockRequest.body = API_REQUESTS_DATA.validMemberRequest;
 
         //When
         checkAgainstRules(mockRequest, mockResponse, nextFn);
 
         //Then
         expect(nextFn).toHaveBeenCalledTimes(1)
    })

    it("should return 200 when calling uncovered /member method with a valid request", () => {
         //Given
         mockRequest.originalUrl = API_ENDPOINTS.member;
         mockRequest.method = "POST";
         mockRequest.body = API_REQUESTS_DATA.validMemberRequest;
 
         //When
         checkAgainstRules(mockRequest, mockResponse, nextFn);
 
         //Then
         expect(nextFn).toHaveBeenCalledTimes(1)
    })

    it("should return 200 when calling /search with a valid request", () => {
         //Given
         mockRequest.originalUrl = API_ENDPOINTS.search;
         mockRequest.method = "GET";
         mockRequest.body = API_REQUESTS_DATA.validSearchRequest;
 
         //When
         checkAgainstRules(mockRequest, mockResponse, nextFn);
 
         //Then
         expect(nextFn).toHaveBeenCalledTimes(1)
    })
})