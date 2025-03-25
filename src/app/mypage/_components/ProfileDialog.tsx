'use client';

import { useEditProfileMutation } from '@/hooks/mutations/useEditProfileMutation';
import { useUploadProfileImage } from '@/hooks/mutations/useUploadImageMutation';
import { useGetUserQuery } from '@/hooks/queries/useProfileQuery';
import { useAuthStore } from '@/providers/AuthProvider';
import { Button } from '@/ui/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/shadcn/dialog';
import { Input } from '@/ui/shadcn/input';
import { Label } from '@/ui/shadcn/label';
import { useState } from 'react';
import { UserQueryData } from '@/types/users';

const ProfileDialog = () => {
  const user = useAuthStore((state) => state.user);
  const { mutate: editProfile } = useEditProfileMutation(user?.id || 0);
  const { mutate: updateProfileImage } = useUploadProfileImage(user?.id || 0);
  const {
    data: userQueryData,
    isPending,
    isError,
    error,
  } = useGetUserQuery(user!.id);
  const [userData, setUserData] = useState({ ...userQueryData });

  const defaultUserData: UserQueryData = {
    id: 0,
    profile: '',
    nickname: '',
    bio: '',
    is_finding: false,
    address: '',
    categories: [],
    user_categories: [],
    sub: '',
  };

  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [preview, setPreview] = useState(user?.profile);
  const [filePath, setFilePath] = useState<string | null>(
    userQueryData?.profile || null,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setProfileImg(file);
        setFilePath(file.name);
      };
      reader.readAsDataURL(file);

      // Update the profile file in userData (before the upload is completed)
      setUserData({
        ...userQueryData,
        profile: filePath || userQueryData?.profile,
      });
    }
  };

  const handleSave = () => {
    try {
      let imageUrl = userQueryData?.profile;

      // 파일이 변경되었을 경우 업로드
      if (profileImg) {
        updateProfileImage({
          filePath: filePath || '',
          file: profileImg,
        });

        // 업로드 성공 시 반환된 이미지 URL을 저장
        imageUrl = filePath || ''; // Supabase가 반환하는 public URL 사용
      }

      // 프로필 정보 업데이트
      editProfile({
        data: { ...defaultUserData, ...userData, profile: imageUrl }, // 저장된 이미지 URL 사용
      });

      console.log('프로필 수정 완료:', userQueryData);
    } catch (error) {
      console.error('프로필 수정 중 오류 발생:', error);
    }
  };

  if (isPending)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p>사용자 정보를 불러올 수 없습니다.</p>
        <p>{error.message}</p>
      </div>
    );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="button" size="button">
          EDIT
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-2">
            <img
              src={preview}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover"
            />
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          {/* Nickname */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nickname" className="text-right">
              닉네임
            </Label>
            <Input
              id="nickname"
              value={userData.nickname}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          {/* Address */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              주소
            </Label>
            <Input
              id="address"
              value={userData.address}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          {/* Bio */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">
              상태메시지
            </Label>
            <Input
              id="bio"
              value={userData.bio}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="button"
            size="button"
            type="submit"
            onClick={handleSave}
          >
            SAVE
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
