import * as Utils from './utils';
import { MEDIA_TYPE } from '../constants/MediaPlayer.constant';
import { mockLocalStorage, unMockLocalStorage } from '../test/fixture/Storage.fixture';
import { buildCreateReplyResponse, buildReply } from '../test/fixture/ReplyResponse.fixture';
import { buildComment, buildCreateCommentResponse } from '../test/fixture/CommentResponse.fixture';
import { buildCommentsTree, buildCommentsTreeAddedReply, buildCommentsTreeReply } from '../test/fixture/CommentsTree.fixture';
import CommentResponse from '../types/CommentsResponse';

const tokenObj = { token: 'exampleToken' };

describe('Testing util file', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage();
  })

  afterEach(() => {
    unMockLocalStorage();
  })

  it('Should return a valid string formatted', () => {
    const result = Utils.likesFormat(11000);

    expect(result).toBe('11.00K');
  })


  it('Should return the valid media type', () => {
    const result1 = Utils.getTypeBySrc(false, "video_src_example");
    const result2 = Utils.getTypeBySrc(true, "video_src_example");
    const result3 = Utils.getTypeBySrc(false, "video_src_example.gif");

    expect(result1).toBe(MEDIA_TYPE.LINK);
    expect(result2).toBe(MEDIA_TYPE.VIDEO);
    expect(result3).toBe(MEDIA_TYPE.IMAGE);
  })

  it('Should return a oauth reddit link', () => {
    const result = Utils.buildRedditOauthLink();

    expect(result).toBe('https://www.reddit.com/api/v1/authorize?client_id=example_client_id&response_type=code&state=example_client_state&redirect_uri=example_client_redirect&duration=temporary&scope=vote submit identity');

  })

  it('Should return a register reddit link', () => {
    const result = Utils.buildRedditRegisterLink();

    expect(result).toBe('https://www.reddit.com/register/?dest=example_client_redirect');
  })

  it('Should return local storage information by key', () => {
    const spyOnGetStorage = jest.spyOn(Utils, "getStore");
    (localStorage.getItem as any).mockImplementationOnce(() => JSON.stringify(tokenObj));

    Utils.getStore('token');

    expect(localStorage.getItem).toBeCalledWith('store');
    expect(spyOnGetStorage).toBeCalledWith('token');
  })

  it('Should return save information on local storage', () => {
    const spyOnSetStorage = jest.spyOn(Utils, "setStore");
    JSON.parse = jest.fn().mockImplementationOnce(() => tokenObj);

    Utils.setStore('token', tokenObj);

    expect(spyOnSetStorage).toBeCalledWith('token', tokenObj);
    expect(localStorage.setItem).toHaveBeenCalled();
  })

  it('Should return created reply from response', () => {
    const spyOnGetCreatedReply = jest.spyOn(Utils, "getCreatedReply");
    const response: any = buildCreateReplyResponse();
    const createdReply = Utils.getCreatedReply(response);

    expect(spyOnGetCreatedReply).toBeCalledWith(response);
    expect(Utils.getCreatedReply).toHaveBeenCalled();
    expect(createdReply).toBe(buildReply());
  })

  it('Should return created message from response', () => {
    const spyOnCreatedMessage = jest.spyOn(Utils, "getCreatedMessage");
    const response: any = buildCreateCommentResponse();
    const createdMessage = Utils.getCreatedMessage(response);

    expect(spyOnCreatedMessage).toBeCalledWith(response);
    expect(Utils.getCreatedMessage).toHaveBeenCalled();
    expect(createdMessage).toBe(buildComment())
  })

  it('Should return comments tree with added reply', () => {
    const spyOnCreatedMessage = jest.spyOn(Utils, "addReplyToTree");
    const commentTree: CommentResponse[] = buildCommentsTree();

    const updatedTree = Utils.addReplyToTree(commentTree, buildCommentsTreeReply());

    expect(spyOnCreatedMessage).toBeCalledWith(commentTree, buildCommentsTreeReply());
    expect(Utils.addReplyToTree).toHaveBeenCalled();
    expect(updatedTree).toStrictEqual(buildCommentsTreeAddedReply());
  })
})
