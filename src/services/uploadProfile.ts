import { supabase } from './supabaseClient'; // Supabase 클라이언트 설정을 가져온다고 가정

export const uploadImage = async (filePath: string, file: File) => {
  const bucketName = 'profiles'; // 실제 버킷 이름으로 변경

  // 파일을 업로드하며, 기존 파일이 있으면 덮어쓰기(upsert)
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, { upsert: true }); // upsert: true → 있으면 덮어쓰기, 없으면 새로 추가

  if (uploadError) {
    console.error('이미지 업로드 실패:', uploadError.message);
    throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
  }

  return uploadData; // 업로드된 데이터 반환
};

export const getProfileImg = async (filePath: string) => {
  try {
    const { data } = await supabase.storage
      .from('profiles')
      .getPublicUrl(filePath);
    return data;
  } catch (error) {
    console.error('프로필 이미지 로드 실패:', error);
    throw new Error(`프로필 이미지 로드 실패: ${error}`);
  }
};
