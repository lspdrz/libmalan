import { BaseResp } from './utils';
import MalanConfig from './config';
declare type BaseUserResp = {
    id: string;
    birthday: string;
    email: string;
    email_verified: boolean;
    ethnicity: string;
    first_name: string;
    gender: string;
    height: number;
    race: Array<String>;
    last_name: string;
    nick_name: string;
    password: string;
    preferences: {
        theme: string;
    };
    privacy_policy_accept_events: Array<string>;
    roles: Array<string>;
    sex: string;
    tos_accept_events: Array<string>;
    username: string;
    weight: number;
    latest_tos_accept_ver: number;
    latest_pp_accept_ver: number;
    tos_accepted: boolean;
    privacy_policy_accepted: boolean;
};
declare type UserResponse = BaseResp & BaseUserResp;
interface CreateUserParams {
    email: string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
}
interface UpdateUserParams {
    email?: string;
    username?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    nick_name?: string;
    sex?: string;
    gender?: string;
    race?: Array<string>;
    ethnicity?: string;
    birthday?: string;
    weight?: number;
    height?: number;
}
declare function createUser(c: MalanConfig, params: CreateUserParams): Promise<UserResponse>;
declare function getUser(c: MalanConfig, id: string): Promise<UserResponse>;
declare function updateUser(c: MalanConfig, id: string, params: UpdateUserParams): Promise<UserResponse>;
declare function acceptTos(c: MalanConfig, id: string, accept: boolean): Promise<UserResponse>;
declare function acceptPrivacyPolicy(c: MalanConfig, id: string, accept: boolean): Promise<UserResponse>;
export { UserResponse, getUser, createUser, updateUser, acceptTos, acceptPrivacyPolicy, };