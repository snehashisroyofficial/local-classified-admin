import { ShoppingBag } from "lucide-react";

type Props = {
  setValue?: () => void;
  title: string;
};

const NoAdsFound = ({ title, setValue }: Props) => {
  return (
    <div className="text-center flex flex-col items-center justify-center h-full p-8">
      <div className="mx-auto h-12 w-12 text-slate-300 mb-3 flex items-center justify-center">
        <ShoppingBag size={48} strokeWidth={1} />
      </div>
      <h3 className="text-lg font-medium text-slate-900">{title}</h3>

      <button
        onClick={setValue}
        className=" mt-6 p-2 rounded-md border-1 border-slate-200  bg-slate-100 hover:bg-slate-200 text-sm"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default NoAdsFound;
