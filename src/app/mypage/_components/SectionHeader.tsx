'use client';

export type SectionHeaderProps = {
  selected?: 'upcoming' | 'previous';
  setSelected?: (type: 'upcoming' | 'previous') => void;
};

const SectionHeader = ({ selected, setSelected }: SectionHeaderProps) => {
  const TabButton = ({
    type,
    label,
  }: {
    type: 'upcoming' | 'previous';
    label: string;
  }) => (
    <div
      className={`flex items-center justify-center font-bold px-4 py-2 cursor-pointer 
        ${selected === type ? 'border-b-2 border-main1 text-main1 text-title-sm' : 'text-text-lg text-medium-gray'}
      `}
      onClick={() => setSelected?.(type)}
    >
      {label}
    </div>
  );

  return (
    <div className="w-[400px] border-b border-medium-gray flex justify-end">
      <>
        <TabButton type="upcoming" label="앞둔 약속" />
        <TabButton type="previous" label="지난 약속" />
      </>
    </div>
  );
};

export default SectionHeader;
