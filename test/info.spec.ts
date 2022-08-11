import app from "../src/server";

describe('Primer test', ()=> {

    const mockExpress = jest.fn();
    const mockExpressRequest = jest.fn();
    const mockExpressResponse = jest.fn();
    const mockExpressRouter = jest.fn();
    const mockExpressJSON = jest.fn();
    const mockUse = jest.fn();
    const mockGet = jest.fn();
    const mockPost = jest.fn();
    const mockReq = jest.fn();
    const mockStatus = jest.fn();
    const mockSend = jest.fn();
    const mockRes = {
        status: mockStatus.mockReturnValue({
            send: mockSend,
        }),
    }

    const mockCollections = jest.fn();
    const mockCollectionsInfo = jest.fn();
    const mockCollectionsInsertOne = jest.fn();

    const loadData = () => {
        jest.resetModules()
        return require('../src/routes/info.router')
    }

    jest.mock('express', () => {
        return {
            Request: mockExpressRequest,
            Response: mockExpressResponse,
            Router: mockExpressRouter.mockReturnValue({
                use: mockUse,
                get: mockGet,//.mockImplementation((url:string, fun:any) => fun(mockRes, mockReq)),
                post: mockPost//mockPost.mockImplementation((url:string, fun:any) => fun(mockRes, mockReq))
            }),
            json: mockExpressJSON
        }
    })

    jest.mock('../src/services/database.service', ()=>{
        return {
            collections: mockCollections.mockReturnValue({
                info: mockCollectionsInfo.mockReturnValue({
                    insertOne: mockCollectionsInsertOne.mockImplementationOnce((a:any)=>{return true})
                })
            })
            
        }
    })

    
    
    loadData();

    it('should post', ()=> {
        expect(mockPost).toBeCalledTimes(1)
    })

    it('should get', ()=> {
        expect(mockGet).toBeCalledTimes(1)
    })

})