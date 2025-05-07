import { gql } from "@apollo/client";

export const USER_DATA = gql`
  query Users {
    users {
      useremail
      role
      uuid
      name
      phonenumber
    }
  }
`;

export const tenantdetails = gql`
  query Tenants {
    tenants {
      tenantphonenumber
      tenantname
      startingdate
      rentpermonth
      housetype
      housenumber
      advancepayment
      houseuuid
      tenantuuid
    }
  }
`;
export const PAYMENT_DETAILS = gql`
  query Payments {
    payments {
      paymentdetail {
        date
        payamount
      }
      roomuuid
      tenantuuid
    }
  }
`;
export const NOTIFY = gql`
  query Notify {
    notify {
      useremail
      uuid
      role
      isverified
    }
  }
`;

//
export const TOTAL_ROOMS = gql`
  query Totalrooms {
    totalrooms {
      name
      detail {
        uuid
        tenantuuid
        name
      }
    }
  }
`;

export const TENANT_PERSONAL = gql`
  query Tenantpersonal($uuid: String) {
    tenantpersonal(uuid: $uuid) {
      startingdate
      roomuuid
      rentpermonth
      phonenumber
      name
      email
      type
      advancepayment
    }
  }
`;

export const CHANGE_PASSPAGE = gql`
  query Chnagepasswordq($password: String) {
    chnagepasswordq(password: $password) {
      name
      phonenumber
      roomuuid
    }
  }
`;
export const GET_TENTANT_DETAILS = gql`
  query Gettenantdetail {
    gettenantdetail {
      phonenumber
      rentpermonth
      roomuuid
      startingdate
      status
      type
      name
      email
      advancepayment
      doornumber
    }
  }
`;

export const PERSONAL_PAYMENT = gql`
  query Tenentpayment($uuid: String) {
    tenentpayment(uuid: $uuid) {
      paymentdetail {
        date
        payamount
      }
      roomuuid
      tenantuuid
    }
  }
`;

export const GET_ISSUES = gql`
  query Query {
    getIssues {
      issues {
        answer {
          date
          ans
          who
        }
        date
        question
        status
        uuid
      }
      roomuuid
    }
  }
`;

export const GET_TENANT_DET = gql`
  query RoomDetails($roomuuid: String) {
    roomDetails(roomuuid: $roomuuid) {
      phonenumber
      name
      doornumber
      advancepayment
      email
      rentpermonth
      type
      startingdate
      password
    }
  }
`;
