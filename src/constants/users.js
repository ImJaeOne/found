export const AUTH_MODE = {
  LOGIN: 'login',
  SIGNUP: 'signUp',
};

export const AUTH_INPUT_PLACEHOLDER = {
  EMAIL: '이메일을 입력해주세요',
  PASSWORD: '비밀번호(6-12자)를 입력해주세요',
  CHECK_PASSWORD: '비밀번호 확인',
  NICKNAME: '닉네임(2-8자)을 입력해주세요',
  BIO: '상태메세지(1-50자)를 입력해주세요',
  SEARCH: '회사명 또는 지역을 입력해주세요',
};

export const AUTH_ERROR_MESSAGES = {
  EMAIL: {
    BLANK: '이메일을 입력해주세요!',
    MIN: '이메일은 3자 이상 입력해주세요!',
    MAX: '이메일은 30자 이하 입력해주세요!',
    INVALIDATE: '올바른 이메일 형식으로 입력해주세요!',
  },
  PASSWORD: {
    BLANK: '비밀번호 6-12글자를 입력해주세요!',
    MIN: '취약한 비밀번호입니다!',
    MAX: '비밀번호는 12자 이하 입력해주세요!',
    DIFFER: '비밀번호가 다릅니다!',
    INVALIDATE: '비밀번호는 영문+숫자 조합으로 입력해주세요!',
  },
  NICKNAME: {
    BLANK: '닉네임을 입력해주세요!',
    SAME: '동일한 닉네임이 존재합니다!',
    LENGTH: '닉네임은 2-8글자 여야합니다!',
    CHECK: '닉네임 중복을 확인해주세요!',
    SUCCESS: '사용 가능한 닉네임 입니다!',
  },
  CATEGORIES: {
    BLANK: '최소 하나의 카테고리를 선택해야 합니다!',
  },
  BIO: {
    BLANK: '상태메세지 1-50자를 입력해주세요!',
    MAX: '상태메세지는 50자 이하 입력해주세요!',
  },
  ALL_BLANK: '누락된 정보가 있습니다!',
};

export const AUTH_TOAST_MESSAGES = {
  LOGIN: {
    SUCCESS: '로그인에 성공했습니다!',
    FAIL: {
      WORNG: '잘못된 회원정보입니다.',
      BLANK: '이메일/비밀번호를 모두 입력해주세요.',
    },
    ERROR: {
      TITLE: '로그인에 실패했습니다.',
      DESCRIPTION: '다시 시도해주세요!',
    },
  },
  SIGNUP: {
    SUCCESS: '회원가입에 성공했습니다!',
    FAIL: {
      SAME: '이미 존재하는 회원입니다!',
    },
    ERROR: {
      TITLE: '회원가입에 실패했습니다.',
      DESCRIPTION: '다시 시도해주세요!',
    },
  },
};
