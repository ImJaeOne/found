import { Button } from '@/ui/shadcn/button';

const DetailInfo = () => {
  return (
    <div className="flex w-[380px] flex-col gap-6">
      <div>
        <div className="text-main1 text-title-sm font-bold">PLACE</div>
        <div className="text-medium-gray text-sm">KFC 홍대점</div>
      </div>
      <div>
        <div className="text-main1 text-title-sm font-bold">TIME</div>
        <div className="text-medium-gray text-sm">
          2025년 03월 23일 19시 20분
        </div>
      </div>
      <div>
        <div className="text-main1 text-title-sm font-bold">categories</div>
        <Button variant="label" size="label">
          축구
        </Button>
      </div>
    </div>
  );
};

export default DetailInfo;
