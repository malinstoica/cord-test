import {checkAgainstRules} from "../express";
import { constructErrorBody } from "../helpers";
import { Messages } from "../constants";
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
        mockRequest.body = API_REQUESTS_DATA.validRoleRequestWithAdditionalParams.body;

        //When
        checkAgainstRules(mockRequest, mockResponse, nextFn);

        //Then
        expect(nextFn).toHaveBeenCalledTimes(1)

    });

    it("should return 200 when calling /profile with a valid request", () => {
         //Given
         mockRequest.originalUrl = API_ENDPOINTS.profile;
         mockRequest.method = "PUT";
         mockRequest.body = API_REQUESTS_DATA.validProfileRequest.body;
 
         //When
         checkAgainstRules(mockRequest, mockResponse, nextFn);
 
         //Then
         expect(nextFn).toHaveBeenCalledTimes(1)
    });

    it("should throw an error when calling /profile with a mismatched payload location", () => {
        //Given
        mockRequest.originalUrl = API_ENDPOINTS.profile;
        mockRequest.method = "PUT";
        mockRequest.query = API_REQUESTS_DATA.invalidProfileRequestLocation.query;

        //When
        try{
            checkAgainstRules(mockRequest, mockResponse, nextFn);
            throw new Error('it should have thrown');
        } catch (error) {
            //Then
            expect(error).toMatchObject(new Error(constructErrorBody(Messages.malformedQuery, 400)))
        };
    });

    it("should throw an error when calling /profile with an invalid payload property type", () => {
        //Given
        mockRequest.originalUrl = API_ENDPOINTS.profile;
        mockRequest.method = "PUT";
        mockRequest.query = API_REQUESTS_DATA.invalidProfileRequestType.query;

        //When
        try{
            checkAgainstRules(mockRequest, mockResponse, nextFn);
            throw new Error('it should have thrown');
        } catch (error) {
            //Then
            expect(error).toMatchObject(new Error(constructErrorBody(Messages.malformedQuery, 400)))
        };
    });

    it("should return 200 when calling covered /member method with a valid request", () => {
         //Given
         mockRequest.originalUrl = API_ENDPOINTS.member;
         mockRequest.method = "DELETE";
         mockRequest.body = API_REQUESTS_DATA.validMemberRequest.body;
 
         //When
         checkAgainstRules(mockRequest, mockResponse, nextFn);
 
         //Then
         expect(nextFn).toHaveBeenCalledTimes(1)
    });

    it("should throw an error when calling delete /member with an empty payload", () => {
        //Given
        mockRequest.originalUrl = API_ENDPOINTS.member;
        mockRequest.method = "DELETE";
        mockRequest.body = API_REQUESTS_DATA.invalidMemberRequestMissingBody.body;

        //When
        try{
            checkAgainstRules(mockRequest, mockResponse, nextFn);
            throw new Error('it should have thrown');
        } catch (error) {
            //Then
            expect(error).toMatchObject(new Error(constructErrorBody(Messages.malformedQuery, 400)))
        };
    });

    it("should throw an error when calling delete /member with a payload that is missing required fields", () => {
        //Given
        mockRequest.originalUrl = API_ENDPOINTS.member;
        mockRequest.method = "DELETE";
        mockRequest.body = API_REQUESTS_DATA.invalidMemberRequestMissingRequired.body;

        //When
        try{
            checkAgainstRules(mockRequest, mockResponse, nextFn);
            throw new Error('it should have thrown');
        } catch (error) {
            //Then
            expect(error).toMatchObject(new Error(constructErrorBody(Messages.malformedQuery, 400)))
        };
    });

    it("should return 200 when calling uncovered /member method with a valid request", () => {
         //Given
         mockRequest.originalUrl = API_ENDPOINTS.member;
         mockRequest.method = "POST";
         mockRequest.body = API_REQUESTS_DATA.validMemberRequest.body;
 
         //When
         checkAgainstRules(mockRequest, mockResponse, nextFn);
 
         //Then
         expect(nextFn).toHaveBeenCalledTimes(1)
    })

    it("should return 200 when calling /search with a valid request", () => {
         //Given
         mockRequest.originalUrl = API_ENDPOINTS.search;
         mockRequest.method = "GET";
         mockRequest.query = API_REQUESTS_DATA.validSearchRequest.query;
 
         //When
         checkAgainstRules(mockRequest, mockResponse, nextFn);
 
         //Then
         expect(nextFn).toHaveBeenCalledTimes(1)
    })
})