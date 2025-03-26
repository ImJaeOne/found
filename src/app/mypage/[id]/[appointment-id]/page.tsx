import { Button } from '@/ui/shadcn/button';
import DetailContent from '../../_components/appointment-detail/DetailContent';
import DetailInfo from '../../_components/appointment-detail/DetailInfo';
import DetailProfile from '../../_components/appointment-detail/DetailProfile';

const AppointmentDetailPage = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-start gap-12">
        <div className="flex w-[740px] justify-between items-center">
          <DetailProfile />
          <div className="flex gap-2">
            <Button variant="button" size="button">
              CHAT
            </Button>
            <Button variant="button" size="button">
              EDIT
            </Button>
            <Button variant="button" size="button">
              CANCEL
            </Button>
          </div>
        </div>
        <div className="flex gap-20">
          <DetailContent />
          <DetailInfo />
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailPage;
