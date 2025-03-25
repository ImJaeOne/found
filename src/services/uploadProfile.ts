import { supabase } from './supabaseClient'; // Supabase 클라이언트 설정을 가져온다고 가정

export const uploadImage = async (filePath: string, file: File) => {
  // 1. 파일이 이미 버킷에 있는지 확인하기 위해 list 메서드 사용
  const { data: existingFiles } = await supabase.storage
    .from('profiles') // 'profiles'을 실제 버킷 이름으로 변경
    .list('profiles', { search: filePath }); // 'profiles' 폴더 안에서 파일 경로 검색

  // 2. 파일이 이미 존재하면 삭제
  if (existingFiles && existingFiles.length > 0) {
    const { error: deleteError } = await supabase.storage
      .from('profiles')
      .remove([filePath]); // 기존 파일을 삭제

    if (deleteError) {
      throw new Error(`이미지 삭제 실패: ${deleteError.message}`);
    }
  }

  // 3. 파일 업로드 (덮어쓰기 또는 신규 업로드)
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('profiles')
    .upload(filePath, file, { upsert: false }); // upsert: false로 기존 파일을 덮어쓰지 않고 새로 업로드

  if (uploadError) {
    throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
  }

  return uploadData; // 업로드된 데이터 반환
};

export const getProfileImg = async (user_id: number) => {
  const { data } = await supabase.storage
    .from('profiles')
    .getPublicUrl(`profile/${user_id}`);
  return data;
};
