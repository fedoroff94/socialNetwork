import { actions, follow, unfollow } from "./users-reducer";
import { usersAPI } from "../../api/users-api";
import { APIResponseType, ResultCodesEnum } from "../../api/api";

jest.mock("../../api/users-api");
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    usersAPIMock.followUser.mockClear();
    usersAPIMock.unfollowUser.mockClear();
});

let result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
};

usersAPIMock.followUser.mockReturnValue(Promise.resolve(result));
usersAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result));

test('follow thunk test', async () => {
    const thunk = follow(1);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1));
});

test('unfollow thunk test', async () => {
    const thunk = unfollow(1);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1));
});