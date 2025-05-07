import { gql } from "@apollo/client";

export const ON_LOGIN = gql`
  mutation OnLogin($input: OnLogin) {
    onLogin(input: $input)
  }
`;
export const ON_SIGNUP = gql`
  mutation OnCreateacc($input: OnCreateAccount) {
    onCreateacc(input: $input)
  }
`;
export const SEND_OTP = gql`
  mutation OnSignupCode($input: OnSignUpCodeInput) {
    onSignupCode(input: $input)
  }
`;
export const VARIFY_OTP = gql`
  mutation OnVarify($input: onVetfyOtp) {
    onVarify(input: $input)
  }
`;

export const ON_FORGOTCODE = gql`
  mutation OnForgotCode($input: OnForgotcode) {
    onForgotCode(input: $input)
  }
`;
export const ONSET_FORGOTPASS = gql`
  mutation OnForgotPass($input: forgotpss) {
    onForgotPass(input: $input)
  }
`;

export const ONUPDATE_RENT = gql`
  mutation OnPayrent($input: rentUpdate) {
    onPayrent(input: $input)
  }
`;

export const ON_ADDTENENT = gql`
  mutation BuildingDetails($input: buildingdetail) {
    buildingDetails(input: $input)
  }
`;
export const TO_APPROVE = gql`
  mutation Isapprove($input: isApprove) {
    isapprove(input: $input)
  }
`;
export const TO_DELETE = gql`
  mutation DeleteTenant($input: Deletetenant) {
    deleteTenant(input: $input)
  }
`;

//
export const ADD_ROOMS = gql`
  mutation NoofRooms($input: nameandnoofrooms) {
    noofRooms(input: $input)
  }
`;

export const ADD_XTRAROOMS = gql`
  mutation Addnewcount($input: Addrooms) {
    addnewcount(input: $input)
  }
`;
export const ADD_TENANT = gql`
  mutation Addtentant($input: AddTenant) {
    addtentant(input: $input)
  }
`;
export const CHANGE_PASS = gql`
  mutation Changepass($input: Changingpass) {
    changepass(input: $input)
  }
`;
export const CREATE_ISSUES = gql`
  mutation Riseissues($input: riseissues) {
    Riseissues(input: $input)
  }
`;
export const REPLY_ISSUES = gql`
  mutation ReplyIssues($input: replyissues) {
    replyIssues(input: $input)
  }
`;

export const ON_TRANSACTION = gql`
  mutation Mutation($input: Onpayment) {
    paymenttransaction(input: $input)
  }
`;
//
