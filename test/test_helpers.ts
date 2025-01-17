import * as users from '../src/users';
import * as sessions from '../src/sessions';

import { base, forSession } from '../test/test_config';

let admin_account
let moderator_account
let regular_account

function adminUserParams() {
  const num = randomStr()
  return {
    email: `adminuser${num}@libmalan.com`,
    username: `adminuser${num}`,
    password: `adminuser@libmalan.com`,
    first_name: `Admin{num}`,
    last_name: 'User',
  }
}

function moderatorUserParams() {
  const num = randomStr()
  return {
    email: `moderatoruser${num}@libmalan.com`,
    username: `moderatoruser${num}`,
    password: `moderatoruser@libmalan.com`,
    first_name: `Moderator{num}`,
    last_name: 'User',
  }
}

function regularUserParams() {
  const num = randomStr()
  return {
    email: `regularuser${num}@libmalan.com`,
    username: `regularuser${num}`,
    password: `regularuser@libmalan.com`,
    first_name: `Regular${num}`,
    last_name: 'User',
  }
}

export const randomStr = () => Math.random().toString().replace(/\./g, "")
export const randomUsername = () => `test${randomStr()}`

export async function adminAccount(): Promise<any> {
  if (!admin_account) {
    admin_account = (await users.createUser(base, adminUserParams())).data;
    return admin_account
  } else {
    return admin_account
  }
}

export async function moderatorAccount(): Promise<any> {
  if (!moderator_account) {
    moderator_account = (await users.createUser(base, moderatorUserParams())).data;
    return moderator_account
  } else {
    return moderator_account
  }
}

export async function regularAccount(): Promise<users.UserResponse & { session: sessions.SessionResponse }> {
  if (!regular_account) {
    try {
      let ra = await users.createUser(base, regularUserParams())
      ra = ra.data
      //ra['session'] = (await sessions.login(base, ra.username, ra.password)).data
      const session = (await sessions.login(base, ra.username, ra.password)).data
      ra = (await users.acceptTos(forSession(session), ra.id, true)).data
      ra = (await users.acceptPrivacyPolicy(forSession(session), ra.id, true)).data
      ra['session'] = session
      regular_account = ra
      return regular_account
    } catch(e) {
      console.log('CAUGHT THE ERROR')
      console.dir(e)
      return e.response
    }
  } else {
    //console.log('--- Using cached regular_account ---')
    return regular_account
  }
}

export const uuidRegex = /[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{10}/

export function testUser() {

}

export function testSession(user) {

}

